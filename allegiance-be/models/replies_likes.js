const db = require('../data/db-config')

module.exports = {
  add,
  find,
  update,
  remove,
}

function add(replies_likes) {
  return db('replies_likes')
    .insert(replies_likes, ['*'])
    .then(replies_likes => find({ 'r_l.id': replies_likes[0].id }).first())
}

function find(filters) {
  if (Array.isArray(filters.reply_id)) {
    return db('replies_likes as r_l')
      .leftJoin('users as u', 'u.id', 'r_l.user_id')
      .select(
        'r_l.id',
        'u.id as user_id',
        'r_l.reply_id',
        'r_l.created_at',
        'r_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .whereIn('reply_id', filters.reply_id)
  } else if (filters) {
    return db('replies_likes as r_l')
      .leftJoin('users as u', 'u.id', 'r_l.user_id')
      .select(
        'r_l.id',
        'u.id as user_id',
        'r_l.reply_id',
        'r_l.created_at',
        'r_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .where(filters)
  } else {
    return db('replies_likes as r_l')
      .leftJoin('users as u', 'u.id', 'r_l.user_id')
      .select(
        'r_l.id',
        'u.id as user_id',
        'r_l.reply_id',
        'r_l.created_at',
        'r_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
  }
}

function update(filters, changes) {
  // only allow one update at a time, so uses .first()
  return db('replies_likes')
    .update(changes, ['*'])
    .where(filters)
    .then(r =>
      find({
        'r_l.id': r[0].id,
      }).first()
    )
}

function remove(filters) {
  // only returns the number of deleted entries
  return db('replies_likes')
    .where(filters)
    .del()
    .returning('*')
}
