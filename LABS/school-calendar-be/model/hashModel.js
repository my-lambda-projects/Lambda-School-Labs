const db = require('../db/dbConfig');

module.exports = {
    findGroupByHash,
    findAdminById,
    addHash
}

function findGroupByHash(groupInviteHash){
    return db('groups')
        .where({groupInviteHash})
        .first();
}
function findAdminById(id){
    return db('admin')
        .where({id})
        .first();
}
function addHash(id, groupInviteHash){
    return db('groups')
        .where({id})
        .update({groupInviteHash});
}