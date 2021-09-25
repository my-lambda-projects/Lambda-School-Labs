const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const User = require('../models/userModel');

// end point for /user/applications
// should return all applications for logged in user
router.get('/', (req, res) => {
    const userId = req.session.userId; // the user id of the logged in user
    User
    .findById(userId)
    .populate({path: 'applications'})
    .then(user => {
        res.status(200).send(user.applications);
    })
    .catch(error => {
        res.status(500).json({error: 'Request could not be fulfilled.'});
    });
});

// this endpoint gets the list of refs from user.applications (for testing purposes)
router.get('/refs', (req, res) => {
    const userId = req.session.userId; // the user id of the logged in user
    User
    .findById(userId)
    .then(user => {
        res.status(200).send(user.applications);
    })
    .catch(error => {
        res.status(500).json({error: 'Request could not be fulfilled.'});

    })
});

// end point for retrieving a single application by id
router.get('/:applicationId', (req, res) => {
    const { applicationId } = req.params;
    Application
    .findById(applicationId)
    .then(application => {
        res.status(200).json(application);
    })
    .catch(error => {
        res.status(500).json({error: 'Application could not be retrieved'})
    })

})

// end point for adding an application to user
router.post('/add', (req, res) => {
    const userId = req.session.userId;
    if (!req.body.company || !req.body.position) {
        error = new Error('Missing poistion and/or company');
        res.status(422).json({ error: 'company and position are required' });
        return;
    }

    const newApplication = new Application(req.body);
    newApplication
    .save(function(error){
        if (error)
            res.status(500).json({ error: 'Application creation failed' });
        else {
            User
            .findById(userId)
            .populate('applications')
            .then(user => {
                user.applications.push(newApplication);
                user
                .save()
                .then(savedUser => {
                    res.status(201).json(savedUser);
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to save the document.' });
                });
            })
            .catch(error => {
                res.status(500).json({ error: 'Application creation failed' });
            });
        }
    });

});

// end point for deleting an applications
router.delete('/delete/:applicationId', (req, res) => {
    const { applicationId } = req.params;

    // delete the actual application
    Application
    .findByIdAndDelete(applicationId)
    .then(deletedApplication => {
        // delete the reference in user.applications
        User
        .findOneAndUpdate({_id: req.session.userId}, { $pull: { applications: applicationId } })
        .then(response => {
            res.status(200).json({ message:'Application successfully deleted' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Ref not deleted' });
        });
    })
    .catch(error => {
        res.status(500).json({ error: 'Delete failed' });
    });
});

// this end point modifies a single application
router.put('/update/:applicationId', (req, res) => {
    const { applicationId } = req.params;
    Application
    .findByIdAndUpdate(applicationId, { ...req.body })
    .then(response => {
        res.status(200).json({ message: 'Application Successfully updated' });
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to update' });
    });
});

module.exports = router;
