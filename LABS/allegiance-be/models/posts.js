const db = require('../data/db-config')

module.exports = {
  add,
  find,
  update,
  remove,
}

function add(post) {
  return db('posts')
    .insert(post, ['*'])
    .then(post => find({ 'p.id': post[0].id }).first())
}

function find(filters) {
  if (Array.isArray(filters.group_id)) {
    return db('posts as p')
      .leftJoin('users as u', 'u.id', 'p.user_id')
      .select(
        'p.id',
        'u.id as user_id',
        'p.group_id',
        'p.post_content',
        'p.created_at',
        'p.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .whereIn('group_id', filters.group_id)
  } else if (filters) {
    return db('posts as p')
      .leftJoin('users as u', 'u.id', 'p.user_id')
      .select(
        'p.id',
        'u.id as user_id',
        'p.group_id',
        'p.post_content',
        'p.created_at',
        'p.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .where(filters)
  } else {
    return db('posts as p')
      .leftJoin('users as u', 'u.id', 'p.user_id')
      .select(
        'p.id',
        'u.id as user_id',
        'p.group_id',
        'p.post_content',
        'p.created_at',
        'p.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
  }
}

function update(filters, changes) {
  // only allow one update at a time, so uses .first()
  return db('posts')
    .update(changes, ['*'])
    .where(filters)
    .then(p =>
      find({
        'p.id': p[0].id,
      }).first()
    )
}

function remove(filters) {
  // only returns the number of deleted entries
  return db('posts')
    .where(filters)
    .del()
    .returning('*')
}
