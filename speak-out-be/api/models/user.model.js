const db = require('../../database/db-config');

const findUserByCriteria = (field, arg) => {
  return db('user').where(field, '=', arg).first();
};

const findById = id => {
  return db('user').where({ id });
  // .first();
};

const findAllByUserId = user_id => {
  return db('student').where({ user_id });
};

const create = body => {
  return db('user').insert(body).returning('id');
};

const remove = id => {
  return db('user').del().where({ id: id });
};

const findAll = () => {
  return db('user').select(['id', 'user.name', 'user_type', 'email']);
};

function update(id, changes) {
  return db('user').where({ id }).update(changes);
}

module.exports = {
  findById,
  findAllByUserId,
  create,
  remove,
  findAll,
  findUserByCriteria,
  update,
};
