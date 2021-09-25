const router = require('express').Router();
const Template = require('../model/templateModel');
const EventGroups = require('../model/eventGroupModel');
const Groups = require('../model/groupsModel');

// middleware checks for templateID
const {validateTemplateID, validateGroupId} = require('../api/middleware/authenticator');
const { Events } = require('pg');

// GET global posts
router.get('/:googleId', (req, res) => {
  const googleId = req.params.googleId;
  Template.findTemplatesByGoogleId(googleId)
    .then(templates => {
        if(templates.length === 0){
            res.status(200).json({ templates: [] })
        } else {
            res.status(200).json({templates: templates})
        }
    })
    .catch(err => {
        console.log('findTemplatesByGoogleId', err);
        res.status(500).json(err);
    });
});
 
// GET Template by TemplateID
router.get('/templateInfo/:templateId', validateTemplateID, async (req, res) => {
    EventGroups.findGroupsByEventId(req.params.templateId)
        .then(groups => {
            console.log('groups', groups);
            res.status(200).json({...req.template, groups: groups});
        })
        .catch(err => res.status(500).json(err));
})

// POST to DB
router.post('/', (req, res) => {
    const { title, notes, starttime, endtime, googleId, groupId } = req.body;  
    Template.addTemplate({title, notes, starttime, endtime, googleId})
    .then(templates => {
        if(templates.length === 0){
            res.status(500).json({ message: 'error creating template'})
        } else {
            if(groupId){
                EventGroups.addGroupToEvent(templates[0].id, groupId)
                .then(response => {
                    res.status(201).json({ message: 'template created successfully' });
                })
                .catch(err => {
                    console.log('error in adding groups to template', err);
                    res.status(500).json(err);
                })
            }
        }
    })
    .catch(err => {
      console.log('addTemplate', err);
      res.status(500).json({errorMessageCatch: err});
    });
  
});

// ADD GROUPS TO TEMPLATE
router.post('/:templateId/groups', validateTemplateID, validateGroupId, (req, res) => {
    // get eventId from params
    const eventId = req.params.templateId;
    // get groupId from req.body
    const groupId = req.body.groupId;
    // add group to the event
    EventGroups.addGroupToEvent(eventId, groupId)
        .then(response => {
            res.status(201).json({message: 'group successfully added to the event'});
        })
        .catch(err => {
            console.log('error in adding group to the event', err);
            res.status(500).json(err);
        })
})

// REMOVE GROUPS FROM THE TEMPLATE
router.delete('/:templateId/groups/:adminId/:groupId', validateTemplateID, validateGroupId, (req, res) => {
    // get eventId from params
    const eventId = req.params.templateId;
    // get groupId from params
    const groupId = req.params.groupId;
    // add group to the event
    EventGroups.removeGroupFromEvent(eventId, groupId)
        .then(response => {
            res.status(200).json({message: 'group successfully deleted from the event'});
        })
        .catch(err => {
            console.log('error in removing group from the event', err);
            res.status(500).json(err);
        })
})

// DELETE a specific template
router.delete('/:templateId', validateTemplateID, (req, res) => {
    const templateId = req.params.templateId;
    Template.removeTemplate(templateId)
    .then(response => res.status(200).json({ message: 'template deleted successfully' }))
    .catch(err => res.status(500).json(err))
});

// EDIT a specific template
router.put('/:templateId', validateTemplateID, (req, res) => {
    const templateId = req.params.templateId;
    const changes = req.body;
    Template.updateTemplate(templateId, changes)
    .then(response => {
        if(response === 1){
            if(changes.groupId){
                EventGroups.updateGroupForEvent(templateId, changes.groupId)
                    .then(success => {
                        res.status(200).json({ message: 'template updated successfully' });
                    })
                    .catch(err => {
                        console.log('error in updating the group');
                        res.status(500).json({ message: 'error updating template'})
                    })
            }
        }
        else {
            res.status(500).json({ message: 'error updating template'})
        }
    })
    .catch(err => res.status(500).json(err))
});


module.exports = router;

