const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');
const Groups = require('../../model/groupsModel');
const Contacts = require('../../model/contactsModel');
const Admin = require('../../model/adminModel');
const Template = require('../../model/templateModel');

// user validation using google token
function validateUser(req, res, next){
    const token = req.headers.authorization;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
    }
    verify().catch(console.error);
    axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
        .then(response => {
        if(response.status === 200){
            next();
        } else{
            res.status(400).json({ error: 'invalid user.' })
        }
        })
        .catch(error => {
        res.status(500).json({ error: 'failed to authenticate user.' })
        })
}

// validate group if it belongs to the admin
function validateGroupId(req, res, next) {

    const groupId = req.params.groupId ? req.params.groupId : req.body.groupId;
    const adminId = req.params.adminId ? req.params.adminId : req.body.adminId;

    Groups.findGroupByGroupId(groupId)
        .then(group => {
            console.log('from validateGroupId', group);
            if(!group) {
                // if group not found, respond with error
                res.status(404).json({ error: 'invalid group id'});
            } else if(group.adminId == adminId) { // check if admin is same as adminId from request
                req.group = group;
                console.log('moving on!');
                next();
            } else {
                // respond with error
                res.status(404).json({ error: 'invalid group id' });
            }
        })
        .catch(err => {
            console.log('from validateGroupId', err);
            res.status(500).json(err)
        });
}


// validate contact if it belongs to the admin
function validateContactId(req, res, next){
    const contactId = req.params.contactId ? req.params.contactId : req.body.contactId;
    const adminId = req.params.adminId ? req.params.adminId : req.body.adminId;

    // find the contact using contactId
    Contacts.findContactById(contactId)
        .then(contact => {
            // check if admin is same as adminId from request
            if(!contact) {
                // if contact not found, respond with error
                res.status(404).json({ error: 'invalid contact id'});
            } else if(contact.adminId == adminId) {
                req.contact = contact;
                next();
            } else {
                // if not respond with error message
                res.status(404).json({ error: 'invalid contact id'});
            }
        })
        .catch(error => {
                console.log('from validateContactId', error);
                res.status(500).json(error)
            });
}

// validate contact if it belongs to the group
function validateContactInGroup(req, res, next) {
    const groupId = req.params.groupId;
    const contactId = req.body.contactId;
    
    // find all groups for contactId
    Groups.findGroupsByContact(contactId)
        .then(groups => {
            // find the group with given groupId
            const group = groups.find(g => g.groupId == groupId);
            // if group not found, respond with error
            if (!group) {
                res.status(404).json({ error: `contact does not belong to the groupId ${groupId}`});
            } else {
                next();
            }
        })
        .catch(err => {
            console.log('from validateContactInGroup', err);
            res.status(500).json(err);
        })
}

function validateAllContactsInGroup(req, res, next) {
    const groupId = req.params.groupId;
    const contacts = req.body.contacts;
    
    for(let i = 0; i <= contacts.length; i++){
         // find all groups for contactId
    Groups.findGroupsByContact(contacts[i])
    .then(groups => {
        // find the group with given groupId
        const group = groups.find(g => g.groupId == groupId);
        // if group not found, respond with error
        if (!group) {
            // res.status(404).json({ error: `contact does not belong to the groupId ${groupId}`});
        } else {
            next();
        }
    })
    .catch(err => {
        console.log('from validateContactInGroup', err);
        res.status(500).json(err);
    })
    }
}

function validateTemplateID(req, res, next){
    // find template using Id
    Template.findTemplateById(req.params.templateId)
        .then(template => {
            // if template not found, respond with error
            if(!template) {
                res.status(404).json({ message: 'template ID does not exist' });
            } else {
                req.template = template;
                next();
            }
        })
        .catch(err => {
            console.log('from validateTemplateID', err);
            res.status(500).json({ error: 'error finding template' })}
        );
}

// middleware to check whether user exists
function checkforAdmin(req, res, next) {
    const googleId = req.body.googleId;
    Admin.findAdminByGoogleId(googleId)
        .then(response => {
            console.log('did i find you?', response);
            // if googleId is not found, proceed to add admin to the database
            if(!response) {
                next();
            }
            // if admin is found respond with the adminId
            res.status(200).json({message: 'admin exists in database', adminId: response.id});
        })
        .catch(err => console.log(err));
}

module.exports = {
    validateUser,
    validateGroupId,
    validateContactId,
    validateContactInGroup,
    validateAllContactsInGroup,
    validateTemplateID,
    checkforAdmin
};