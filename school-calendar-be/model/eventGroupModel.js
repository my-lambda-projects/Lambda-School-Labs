const db = require('../db/dbConfig');
const {findGroupByGroupId} = require('./groupsModel');
const {findTemplateById} = require('./templateModel');

module.exports = {
    addGroupToEvent,
    removeGroupFromEvent,
    updateGroupForEvent,
    findGroupsByEventId,
    findEventsByGroupId
}

function addGroupToEvent(eventId, groupId){
    return db('event_group')
        .insert({eventId: eventId, groupId: groupId})
        .returning(["id"]);
}

function updateGroupForEvent(eventId, groupId){
    return db('event_group')
        .where({eventId})
        .update({eventId, groupId});
}

function removeGroupFromEvent(eventId, groupId){
    return db('event_group')
        .where({eventId})
        .where({groupId})
        .delete();
}

async function findGroupsByEventId(eventId){
    const arr = await db('event_group')
        .where({eventId});

    let groups = []
    for(let i = 0 ; i < arr.length; i++){
        let groupId = arr[i].groupId;
        let group = await findGroupByGroupId(groupId);
        groups = [...groups, group];
    }
    return groups;
}

async function findEventsByGroupId(groupId){
    const arr = await db('event_group')
        .where({groupId});
    let events = []
    for(let i = 0 ; i < arr.length; i++){
        let eventId = arr[i].eventId;
        let event = await findTemplateById(eventId);
        events = [...events, event];
    }
    return events;
}
