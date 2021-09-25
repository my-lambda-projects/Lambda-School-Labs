// connection to db
const db = require('../db/dbConfig');
const {findGroupsByEventId} = require('./eventGroupModel');

module.exports = {
    findTemplatesByGoogleId,
    findTemplateById,
    addTemplate,
    removeTemplate,
    updateTemplate
}

// get all templates
async function findTemplatesByGoogleId(googleId) {
    const arr = await db('templates')
        .where({ googleId });

    let templates = [...arr]
    for(let i = 0; i < arr.length; i++){
        let eventId = arr[i].id;
        templates[i].groups = await findGroupsByEventId(eventId);
    }

    return templates;
}

// find template by id 
function findTemplateById(templateId) {
    return db('templates')
        .where("id", templateId)
        .first();
}

// post new template
function addTemplate(template) {
    return db('templates')
        .insert(template)
        .returning(["id"]);
}

// delete specific template
function removeTemplate(templateId) {
    return db('templates')
        .where("id", templateId)
        .del();
}

function updateTemplate(templateId, changes) {
    return db("templates")
        .where("id", templateId)
        .update(changes)
}
