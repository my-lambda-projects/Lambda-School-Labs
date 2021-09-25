const db = require('../data/db-config');

module.exports = {
    findByUserId,
    findByGroupId,
    privateInvitation,
    deleteInvitation,
}

function findByUserId(user_id){
    return db('join_private_group_request').where({ user_id });
}

function findByGroupId(group_id){
    return db('join_private_group_request as g')
        .where({ group_id })
        .join('users as u', 'u.id', 'g.user_id')
        .select('u.email', 'u.username', 'u.id', 'u.first_name', 'u.last_name', 'u.image');
}

function privateInvitation(user_id, group_id) {
    return db('join_private_group_request')
        .insert({ user_id, group_id})
        .returning('*');
}

function deleteInvitation( user_id, group_id) {
    return db("join_private_group_request")
      .where({  user_id, group_id })
      .del()
      .returning("*");
  }