const Schedule = require('../models/ScheduleModel');
const Employee = require('../models/EmployeeModel');
const Employer = require('../models/EmployerModel');

const createSchedule = (req, res) => {
    const { day, date, startTime, endTime } = req.body;
    const schedule = new Schedule(req.body);
    // console.log(req.body.startTime);
    // console.log(schedule);
    let emplId;
    schedule
        .save()
        .then(newSched => {
            let availability = newSched.day;
            let allEmployees;
            let employeesToUpdate = [];
            Employee.
                find({ availability })
                .then(res => {
                    allEmployees = res
                    // console.log("got the employees", allEmployees);
                })
                .catch(err => console.log(err));
            Employer
                .findByIdAndUpdate(req.params.id, {
                    $push: { schedules: newSched._id }
                })
                .then(updatedEmployer => {
                    console.log("Im in here");
                    for (let i = 0; i < allEmployees.length; i++) {
                        // console.log("in the for loop:", allEmployees);
                        for (let j = 0; j < updatedEmployer.employees.length; j++) {
                            console.log("Im in the second for loop");
                            if (allEmployees[i]._id.toString() === updatedEmployer.employees[j]._id.toString()) employeesToUpdate.push(allEmployees[i]._id);
                            // console.log(employeesToUpdate);
                        }
                    }
                    for (let k = 0; k < employeesToUpdate.length; k++) {
                        console.log(employeesToUpdate[k]);
                        Employee.findByIdAndUpdate(employeesToUpdate[k], { $push: { schedules: newSched._id } })
                            .then(foundEmp => {
                                console.log("one employee", foundEmp);
                                res.status(200).json("success");
                            })
                    }
                    // .then(newSched => {
                    //     console.log('schedule ', newSched);
                    //     let availability = newSched.day;
                    //     console.log(availability);
                    //     // Employee
                    //     //     .find(availability)
                    //     //     .then(empl=> {
                    //     //         emplId = empl._id;
                    //     //     })
                    //     Employer
                    //         .findByIdAndUpdate(req.params.id, {
                    //             $push: { schedules: newSched._id }
                    //         })
                    //         .then(updatedEmployer => {
                    //             // console.log("response: ", updatedEmployer.employees);
                    //             updatedEmployer.employees.map(employeeId =>{
                    //                 Employee.find(employeeId)
                    //                 .then(foundEmp =>{
                    //                     console.log("one employee", foundEmp)

                    //                 })
                    //             })
                    // Employee.find({}).then(employees => {
                    //     console.log("employees:",employees);

                    // })
                    // Employee
                    //     .findOneAndUpdate(availability, {
                    //         $push: { schedules: newSched._id }
                    //     })
                    //     .then(employees => {
                    //         console.log("response: ", employees);
                    //         res.status(200).json({ Message: "schedule saved in the Employee collection." });
                    //     })
                    //     .catch(error => {
                    //         res.status(500).json({ error: "There was an error saving the schedule in the Employee collection." });
                    //     });
                })
                .catch(error => {
                    res.status(500).json({ error: "There was an error saving the schedule." });
                });
        })
        .catch(error => {
            res.status(500).json({ Error: "There was an error creating the schedule" })
        });
}

const getSchedule = (req, res) => {
    console.log('ID: ', req.params.id);
    if (req.params.id || _id) {
        const id = req.params.id || _id;

        Employer
            .findById(id)
            .sort({ _id: -1 })
            .populate('schedules')
            .then((employer) => {
                res.status(200).json(employer.schedules);
            })
            .catch((error) => {
                res.status(500).json({ Error: "Unable to get the schedule" })
            });
    } else {
        console.log("There was an error completing the request. Please include an Employee ID")
    }
}

const getEmpsSched = (req, res) => {
    if (req.params.id || _id) {
        const id = req.params.id || _id;
        // Employer
        //     .findById(id)
        //     .then((employees) => {
        //         Employee
        //             .find
        //     })
        // let emps = Employer.employees.find().toArray();
        Employee
            .find({ "employer": req.params.id })
            .sort({ _id: -1 })
            .populate('schedules')
            .then((employees) => {
                res.status(200).json(employees)
            })
            .catch((error) => {
                res.status(500).json({ Error: error });
            });
    }
}

const deleteSchedule = (req, res) => {
    Schedule
        .findByIdAndRemove(req.params.id)
        .then((response) => {
            if (response) {
                res.status(200).json({ Message: 'Schedule successfully deleted!' });
            } else {
                res.status(404).json({ Message: "Schedule does not exist" })
            }
        })
        .catch((error) => {
            res.status(500).json({ Error: 'There was an error deleting the Schedule', error })
        });
}

module.exports = {
    createSchedule,
    getSchedule,
    getEmpsSched,
    deleteSchedule
};