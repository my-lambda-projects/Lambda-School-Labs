const Employee = require('../models/EmployeeModel');
const Employer = require('../models/EmployerModel');

const createEmployee = (req, res) => {
    const { username, password, email, firstName, lastName, phoneNumber, availability, availableHours } = req.body;
    const employee = new Employee({ username, password, email, firstName, lastName, phoneNumber, availability, availableHours });
    employee
        .save((error, employee) => {
            if (error) {
            }
            Employer.findByIdAndUpdate(req.params.id, {
                $push: { employees: employee._id }
            })
                .then(employer => {
                    res.status(200).json({ Message: "Employee saved in the Employers collection" });
                })
                .catch(error => {
                    res.status(500).json({ error: "There was an error saving the employee" });
                });
        });
}

const getEmployees = (req, res) => {
    if (req.params.id || _id) {
        const id = req.params.id || _id;
        Employer
            .findById(id)
            .select(-"password")
            .populate('employees')
            .then(employer => {
                res.status(200).json(employer.employees)
            })
            .catch((error) => {
                res.status(500).json({ Error: 'There was an error', error })
            });
    }
}

const getOneEmployee = (req, res) => {
    if (req.params.id || _id) {
        const id = req.params.id || _id;
        Employee
            .findById(id)
            .select(-"password")
            .then(employee => {
                res.status(200).json(employee)
            })
            .catch((error) => {
                res.status(500).json({ Error: 'There was an error getting the employee', error })
            })
    }
}

const deleteEmployee = (req, res) => {
    Employee
        .findByIdAndRemove(req.params.id)
        .then((response) => {
            if(response) {
                res.status(200).json({ Message: 'Employee successfully deleted!' });
            } else {
                res.status(404).json({Message:"Employee does not exist"})
            }
        })
        .catch((error) => {
            res.status(500).json({ Error: 'There was an error deleting the Employee', error })
        });
};

const editEmployeePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        re.status(422).json({ Message: 'Please enter both current and new passwords' })
    }

    const id = req.body._id || req.params.id;

    Employee
        .findById(id)
        .then((employee) => {
            employee.checkPassword(currentPassword, (error, isValid) => {
                if (error) {
                    return res.status(500).json(error);
                }
                if (isValid) {
                    employee.password = newPassword;
                    employee
                        .save()
                        .then((response) => {
                            const temp = { ...response._doc }
                            delete temp.password;
                            res.json({ employee: temp });
                        })
                        .catch((error) => {
                            res.status(501).json(error);
                        })
                } else {
                    res.status(403).json({ Message: 'Unauthorized. Unable to change password', error })
                }
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'There was and error updating the password', error });
        });
};

const editEmployee = (req, res) => {
    const { id } = req.params;

    Employee
        .findByIdAndUpdate(id, req.body, {new :true})
        .then(updatedEmployee => {
            res.status(200).json(updatedEmployee);
        })
        .catch(error => {
            res.status(500).json({Error: "There was an error updating the employee"});
        });
};

module.exports = {
    createEmployee,
    getEmployees,
    getOneEmployee,
    deleteEmployee,
    editEmployeePassword,
    editEmployee
};