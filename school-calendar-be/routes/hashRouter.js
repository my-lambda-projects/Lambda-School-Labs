const router = require('express').Router();
const Hash = require('../model/hashModel');
const Groups = require('../model/groupsModel');
const Contacts = require('../model/contactsModel');

// middleware functions
const {validateUser, validateGroupId} = require('../api/middleware/authenticator');

// find hash in database and get admin and group info - groupId, adminId, and groupInviteHash in the req.body
router.get('/verify/:groupInviteHash', (req, res) => {
    const groupInviteHash = req.params.groupInviteHash;

    // find group using the hash provided
    Hash.findGroupByHash(groupInviteHash)
        .then(group => {
            // if group not found, respond with invalid hash
            if(!group){
                res.status(404).json({error: 'invalid group invite hash'})
            } else {
                // if group found, find admin info using adminId from group
                Hash.findAdminById(group.adminId)
                    .then(adminInfo => {
                        // send 200 response with adminInfo and groupInfo
                        res.status(200).json({
                            message: 'invite hash found', 
                            adminInfo: adminInfo,
                            groupInfo: group
                        })
                    })
                    .catch(err => {
                        console.log('error finding the admin', err);
                        res.status(500).json(err);
                    })
            }
        })
        .catch(err => {
            console.log('error finding the groupInviteHash', err);
            res.status(500).json(err);
        });
})

// get groupInviteHash from the database for groupId
router.get('/:adminId/:groupId', validateUser, validateGroupId, (req, res) => {
    const groupId = req.params.groupId;

    // find group using groupId
    Groups.findGroupByGroupId(groupId)
        .then(group => {
            // respond with the hash
            res.status(200).json({groupInviteHash: group.groupInviteHash});
        })
        .catch(err => {
            console.log('error in finding group', err);
            res.status(500).json(err);
        })
})

// endpoint to add contact for invitee
router.post('/addContact', validateGroupId, (req, res) => {
    const adminId = req.body.adminId;
    const newContactInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };
    // add contact to the database
    Contacts.addContact(adminId, newContactInfo)
        .then(response => {
            console.log('postResponse: ', response)
            // fetch contactId from response
            const contactId = response[0].id;

            // add contact to the group
            Groups.addContact(contactId, req.body.groupId)
                .then(groupResponse => {
                    // send back response with success message and contactId
                    res.status(201).json({ 
                        message: 'contact added successfylly to the group', 
                        contactId: contactId
                    });
                })
                .catch(error => {
                    console.log('Add contact to the group error',error)
                    res.status(500).json(error)
                });
        })
        .catch(error => {
            console.log('Add Contact error', error)
            res.status(500).json(error)
        })
})

module.exports = router;
