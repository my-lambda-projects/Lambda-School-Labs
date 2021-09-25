const router = require('express').Router();
const Groups = require('../model/groupsModel.js');

// middleware functions
const{ validateGroupId, validateContactId, validateContactInGroup, validateAllContactsInGroup} = require('../api/middleware/authenticator');

// middleware to generate hash
const {generateGroupInviteHash} = require('../api/middleware/hashGenerator');

// GET Groups by adminId
router.get('/:adminId', (req, res) => {
    
    Groups.findGroupsByAdminId(req.params.adminId)
        .then(response => {
            res.status(200).json({ groups: response })
        })
        .catch(err => {
            console.log('findGroupsByAdminId', err.details);
            res.status(500).json(err)
        });
});

// GET Group by groupId
router.get('/:adminId/:groupId', validateGroupId, (req, res) => {
    Groups.findContactsByGroupId(req.params.groupId)
        .then(response => {
            req.group.contacts = response;
            res.status(200).json(req.group)
        })
        .catch(err => console.log(err));

})

// POST Group 
router.post('/:adminId', (req, res) => {
    const adminId = req.params.adminId;
    const {groupName, groupDescription, groupColor, groupIcon} = req.body;
    
    // add group to the database
    Groups.addGroup({groupName, groupDescription, groupColor, groupIcon, adminId})
        .then(async response => {
            // get groupId
            const groupId = response[0].id;
            // generate hash for group
            const groupInviteHash = await generateGroupInviteHash(groupId, adminId);

            console.log('*************', groupInviteHash);

            // add the hash to the group in database
            Groups.updateGroup(groupId, {groupInviteHash: groupInviteHash})
                .then(updateResponse => {

                    // fetch groups
                    Groups.findGroupsByAdminId(adminId)
                        .then(groups => {
                            res.status(201).json({
                                newGroupId: groupId, 
                                groups: groups
                            })
                        })
                        .catch(err => {
                            console.log('error in retrieving groups', err);
                            res.status(500).json(err);
                        })
                })
                .catch(err => {
                    console.log('error in storing hash', err);
                    res.status(500).json(err);
                })
        })
        .catch(error => {
            console.log('Group post error',error)
            res.status(500).json(error)
        })
})

// POST Contact to the group
router.post('/:adminId/:groupId/contacts', validateGroupId,  (req, res) => {
    const groupId = req.params.groupId;
    const contacts = req.body.contacts
    console.log('CONTACTS ARRAY: ', contacts)

   Groups.addContacts(contacts, groupId)
   .then(response => {
       console.log('AWESOMENESS', response);
        res.status(201).json({ message: 'contacts added successfylly to the group'});
   })
   .catch(error => {
       console.log(error)
   })
})
// Delete Contact from the group
router.delete('/:adminId/:groupId/contacts/:relationshipId', validateGroupId, async (req, res) => {
    const contact = req.params.relationshipId;
    const groupId = req.params.groupId;

        Groups.deleteContactFromGroup(contact, groupId)
        .then(response => {
            console.log('deleteContactFromGroup: ', response)
            res.status(201).json({message: 'contact removed from the group successfully!'})
        })
        .catch(error => {
            console.log('Add contact to the group error',error)
            res.status(500).json(error)
        });
})

// PUT Group
router.put('/:adminId/:groupId', validateGroupId, (req, res) => {
    const {groupName, groupDescription, groupIcon, groupColor} = req.body;
    const groupId = req.params.groupId;

    Groups.updateGroup(groupId, {groupName, groupDescription, groupIcon, groupColor})
    .then(response => {
        console.log('Group Updated', response)
        res.status(201).json({ response: response })
    })
    .catch(error => {
        console.log('Group/PUT error', error) 
        res.status(500).json(error)
    })
})

// Delete Group
router.delete('/:adminId/:groupId', validateGroupId, (req, res) => {
    Groups.deleteGroup(req.params.groupId)
    .then(response => {
        res.status(201).json({message: 'group deleted successfully!'})
    })
    .catch(err => {console.log(err); res.status(500).json(err)})
})



module.exports = router;
