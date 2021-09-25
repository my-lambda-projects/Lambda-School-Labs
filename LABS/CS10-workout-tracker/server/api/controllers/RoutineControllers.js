const User = require("../models/User");
const Routine = require("../models/Routine");

// A Routine is a set of Exercises you intend to perform together. Once you have a
// Routine with at least one Exercise, you can use it to schedule a Workout.
const fetchRoutineDoc = (req, res) => {
  const { routineId } = req.body;
  Routine.findById(routineId)
    .then(routineDocument => {
      return res.status(200).json(routineDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

const updateRoutineDoc = (req, res) => {
  const { routineId, title } = req.body;
  Routine.findByIdAndUpdate(
    routineId,
    { $set: { title: title } },
    { new: true }
  )
    .then(updatedRoutine => {
      return res.status(200).json(updatedRoutine);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

const deleteRoutineDoc = (req, res) => {
  const { routineId } = req.body;
  Routine.findByIdAndDelete(routineId)
    .then(deletedDoc => {
      User.findByIdAndUpdate(req.userId, {
        $pull: { routines: { $in: [routineId] } }
      })
        .then(updatedUser => {
          res.status(200).json(deletedDoc);
        })
        .catch(err => {
          return res.status(404).json({ err });
        });
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

const fetchHydratedRoutine = (req, res) => {
  Routine.findById(req.body.routineId)
    .then(routine => {
      routine.populate("exercises", (err, richRoutine) => {
        if (err) {
          res.status(400).json({ err });
        }
        res.status(200).json(richRoutine);
      });
    })
    .catch(err => {
      res.status(404).json({ err });
    });
};

// This responds with a list of the User's Routines, hydrated with Exercise documents.
// This is useful for performing CRUD at the Routine level.
const fetchHydratedRoutines = (req, res) => {
  User.findById(req.userId)
    .then(user => {
      user.populate(
        { path: "routines", populate: { path: "exercises" } },
        (err, userWithRoutinesHydrated) => {
          if (err) {
            res.status(400);
            res.json({
              msg: "Failed to hydrate the User's routines",
              err
            });
          }
          res.status(200).json({ routines: userWithRoutinesHydrated.routines });
        }
      );
    })
    .catch(err => res.status(404).json({ err }));
};

const createNewRoutine = (req, res) => {
  const { userId } = req;
  let { title } = req.body;
  if (!title) title = "Untitled Routine";
  const newRoutineParameters = { user: userId, title };
  const newRoutine = Routine(newRoutineParameters);
  newRoutine.save((err, createdRoutine) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { routines: createdRoutine._id } })
      .then(updatedUser => {
        res.status(200);
        return res.json({
          msg: "Successfully created a Routine document.",
          routine: createdRoutine,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        return res.json({ err });
      });
  });
};

const addExerciseToRoutine = (req, res) => {
  const { routineId, exerciseId } = req.body;
  Routine.findByIdAndUpdate(routineId, { $push: { exercises: exerciseId } })
    .then(updatedRoutine => {
      res.status(200);
      return res.json({
        msg: "Successfully updated a Routine document with a new Exercise.",
        routine: updatedRoutine
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({
        msg: "Couldn't update the Routine's Exercise list. Error follows: ",
        err
      });
    });
};

module.exports = {
  createNewRoutine,
  addExerciseToRoutine,
  fetchRoutineDoc,
  updateRoutineDoc,
  fetchHydratedRoutine,
  fetchHydratedRoutines,
  deleteRoutineDoc
};
