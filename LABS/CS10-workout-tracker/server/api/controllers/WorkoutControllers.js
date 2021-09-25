const Exercise = require("../models/Exercise");
const Performance = require("../models/Performance");
const User = require("../models/User");
const Routine = require("../models/Routine");
const Workout = require("../models/Workout");

const fetchWorkoutDoc = (req, res) => {
  const { workoutId } = req.body;
  Workout.findById(workoutId)
    .populate("performances")
    .populate("user")
    .populate("routine")
    .populate("workout")
    .then(workoutDocument => {
      return res.status(200).json(workoutDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

// this is for displaying the scheduled workouts onto the calendar
const fetchAllWorkouts = (req, res) => {
  const { userId } = req;
  Workout.find({ user: userId })
    .populate({ path: "performances", populate: { path: "exercise" } })
    .populate({ path: "routine", populate: { path: "exercises" } })
    .then(workouts => {
      res.status(200).json(workouts);
    })
    .catch(err => {
      res.json("Can not find workouts!");
    });
};

// This is substantially the most complicated route - it absorbs a lot of complexity
// to make things easier later on. Here a step-by-step rundown:
//   1. We extract the necessary info from the request for the Workout - which routine
//   we're performing, who we are, when we're doing it (defaults to now) and any note.
//   2. We create a new Workout document to represent the upcoming Workout. At this point, the Workout
//   still doesn't have its actual list of exercises to perform.
//   3. We add the Workout documentId to the list of Workouts performed for this Routine.
//   4. We grab the Routine document for the Workout and use its `exercises` prop to grab the
//   relevant Exercise documents
//   5. We iterate over the Exercise documents and create a Performance document for each exercise.
//   6. We add each Performance document to the `performances` field in Workout and the `performanceLog` field in Exercise
//   7. Each future Performance of an exercise now has a MongoDB document in the Performance collection.
//   This document is referenced in the records of the corresponding Exercise and Workout.
//   8. Our final step is to save the Workout to the embedded calendar for the User, along with a date.

const scheduleWorkout = async (workoutDoc, routineId, userId, date, next) => {
  try {
    const workoutRoutine = await Routine.findByIdAndUpdate(routineId, {
      $push: { workoutLog: workoutDoc._id }
    });

    /* temp solution (if/else wrap) is for handling issue that arises if the user tries 
    to copy a workout that contains a deleted routine */
    if (workoutRoutine) {
      workoutRoutine.populate(
        "exercises",
        async (err, hydratedWorkoutRoutine) => {
          if (err) {
            reject(err);
          }
          const promisesToSchedulePerformances = hydratedWorkoutRoutine.exercises.map(
            async exercise => {
              const futureExercisePerformance = new Performance({
                exerciseName: exercise.name,
                exercise: exercise._id,
                weight: exercise.currentWeight,
                reps: exercise.currentReps,
                sets: exercise.currentSets,
                date,
                user: userId
              });
              const scheduledPerformance = await futureExercisePerformance.save();
              const workoutWithPerformanceRecord = await Workout.findByIdAndUpdate(
                workoutDoc._id,
                {
                  $push: { performances: scheduledPerformance._id },

                  /* each workout doc contains a routineName field so that in case the user deletes a routine, 
                  then the routine name for the already scheduled workout can still be displayed */

                  $set: { routineName: workoutRoutine.title } //
                },
                { new: true }
              );
              const exerciseWithUpdatedPerformanceLog = await Exercise.findByIdAndUpdate(
                exercise._id,
                {
                  $push: { performanceLog: scheduledPerformance._id }
                }
              );
              return true;
            }
          );
          const promiseResults = await Promise.all(
            promisesToSchedulePerformances
          );
          const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: {
              calendar: {
                date: workoutDoc.date,
                workout: workoutDoc._id
              }
            }
          });
          const updatedWorkoutDoc = await Workout.findById(workoutDoc._id);
          const hydratedWorkout = await updatedWorkoutDoc.populate(
            [
              {
                path: "routine",
                populate: { path: "exercises" }
              },
              {
                path: "performances"
              }
            ],
            (err, hydratedWorkout) => {
              if (err) {
                reject(err);
              }
              const success = {
                status: 201,
                msg: "Succeeded in scheduling workout!",
                updatedUser,
                hydratedWorkout
              };
              return next(success);
            }
          );
        }
      );
    } else {
      routineNoLongerExists = {
        status: 410,
        msg: "routine no longer exists",
        workoutDoc
      };
      return next(routineNoLongerExists);
    }
  } catch (err) {
    const error = {
      status: 500,
      msg: "Error scheduling the workout",
      err
    };
    return next(error);
  }
};

const createAndScheduleWorkout = (req, res) => {
  const { routineId, date, note } = req.body;
  const userId = req.userId;
  const workoutParams = { routine: routineId, user: userId, date, note };
  const newWorkout = new Workout(workoutParams);

  newWorkout
    .save()
    .then(savedWorkout => {
      scheduleWorkout(
        savedWorkout,
        routineId,
        userId,
        date,
        schedulingResult => {
          res.status(schedulingResult.status).json(schedulingResult);
        }
      );
    })
    .catch(err => {
      res.status(410).json({
        msg: "There was an issue creating the new Workout document: ",
        err
      });
    });
};

const copyWorkoutRange = (req, res) => {
  const { startDate, endDate, shiftDistance } = req.body;
  const { userId } = req;

  User.findById(userId)
    .populate("calendar.workout")

    .then(foundUser => {
      const filteredCalendar = foundUser.calendar.filter(calendarEntry => {
        return (
          Date.parse(calendarEntry.date) >= Date.parse(startDate) &&
          Date.parse(calendarEntry.date) <=
            Date.parse(endDate) +
              86000399 /* 86000399 ms / day. This is an additional 
          buffer on the end date, to ensure the workout on the end date is captured. */
        );
      });
      const numberOfWorkoutsToSchedule = filteredCalendar.length;
      const scheduledWorkouts = [];
      filteredCalendar.forEach((workoutInRange, index) => {
        const routineId = workoutInRange.workout.routine;
        const millisecondsDate =
          Date.parse(workoutInRange.date) + shiftDistance;
        const unixDate = new Date(millisecondsDate);
        const newWorkout = new Workout({
          routine: routineId,
          user: userId,
          date: unixDate
        });
        newWorkout
          .save()
          .then(savedWorkout => {
            scheduleWorkout(
              savedWorkout,
              routineId,
              userId,
              savedWorkout.date,
              schedulingResult => {
                scheduledWorkouts.push(schedulingResult);
                if (scheduledWorkouts.length === numberOfWorkoutsToSchedule) {
                  res.status(201).json(scheduledWorkouts);
                }
              }
            );
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      });
    });
};

const deleteWorkout = (req, res) => {
  const { id } = req.params;
  Workout.findByIdAndRemove({ _id: id }).then(removedWorkout => {
    let user_id = removedWorkout.user;
    let routine_id = removedWorkout.routine;

    User.findByIdAndUpdate(user_id, { $pull: { calendar: { workout: id } } })
      .then(removedRefFromUser => {
        Routine.findByIdAndUpdate(routine_id, { $pull: { workoutLog: id } })
          .then(removedRefFromRoutine => {
            res.status(201).json({
              msg: "DELETED SUCCESSFULLY",
              removedRefFromUser,
              removedRefFromRoutine
            });
          })
          .catch(err => {
            res
              .status(500)
              .json({ msg: "FAILED TO DELETE REF FROM ROUTINE COLLECTION" });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ msg: "FAILED TO DELETE REF FROM USER COLLECTION" });
      });
  });
};

module.exports = {
  fetchWorkoutDoc,
  fetchAllWorkouts,
  copyWorkoutRange,
  createAndScheduleWorkout,
  deleteWorkout
};
