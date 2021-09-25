const router = require('express').Router();
const Contacts = require('../model/contactsModel');
const Groups = require('../model/groupsModel');

// middleware function to see if contact belongs to the admin
const {validateContactId} = require('../api/middleware/authenticator');

// GET contacts for admin Id
router.get('/:adminId', (req, res) => {
    // get adminId from request body
    const adminId = req.params.adminId;
    // get contacts using adminId
    Contacts.findContactsByAdmin(adminId)
        .then(contacts => {
            res.status(200).json({contacts: contacts});
        })
        .catch(err => {
            console.log('findContactsByAdmin', err.details);
            res.status(500).json(err);
        });
});

// GET contact by contactId
router.get('/:adminId/:contactId', validateContactId, (req, res) => {
    res.status(200).json(req.contact);
})

// GET groups for a contact
router.get('/:adminId/:contactId/groups', validateContactId, (req, res) => {
    const contactId = req.params.contactId;

    Groups.findGroupsByContact(contactId)
        .then(groups => {
            res.status(200).json({...req.contact, groups: groups});
        })
        .catch(err => res.status(500).json(err));
})

// POST contact
router.post('/', (req, res) => {
    const adminId = req.body.adminId
    const {firstName, lastName, phoneNumber, email} = req.body; 

    // console.log('from add contact', adminId, {firstName, lastName, email, phoneNumber});
    Contacts.addContact(adminId, {firstName, lastName, email, phoneNumber})
    .then(response => {
        console.log('postResponse: ', response)
        res.status(201).json(response[0].id)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})
// PUT contact
router.put('/:contactId', validateContactId, (req, res) => {
    const {firstName, lastName, phoneNumber, email} = req.body;
    const contactId = req.params.contactId;

    Contacts.updateContact(contactId, {firstName, lastName, phoneNumber, email})
    .then(response => {
        console.log('updateResponse: ', response)
        res.status(201).json({ response: response })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})
// DELETE contact
router.delete('/:adminId/:contactId', validateContactId, (req, res) => {
    const contactId = req.params.contactId;

    Contacts.deleteContact(contactId)
    .then(response => {
        console.log('deleteResponse: ', response)
        res.status(201).json({ message: 'contact deleted successfully!' })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


module.exports = router;
