const db = require('../data/db-config')

module.exports = {
  add,
  find,
  update,
  remove,
}

function add(posts_likes) {
  return db('posts_likes')
    .insert(posts_likes, ['*'])
    .then(posts_likes => find({ 'p_l.id': posts_likes[0].id }).first())
}

function find(filters) {
  if (Array.isArray(filters.post_id)) {
    return db('posts_likes as p_l')
      .leftJoin('users as u', 'u.id', 'p_l.user_id')
      .select(
        'p_l.id',
        'u.id as user_id',
        'p_l.post_id',
        'p_l.created_at',
        'p_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .whereIn('post_id', filters.post_id)
  } else if (filters) {
    return db('posts_likes as p_l')
      .leftJoin('users as u', 'u.id', 'p_l.user_id')
      .select(
        'p_l.id',
        'u.id as user_id',
        'p_l.post_id',
        'p_l.created_at',
        'p_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
      .where(filters)
  } else {
    return db('posts_likes as p_l')
      .leftJoin('users as u', 'u.id', 'p_l.user_id')
      .select(
        'p_l.id',
        'u.id as user_id',
        'p_l.post_id',
        'p_l.created_at',
        'p_l.updated_at',
        'u.first_name',
        'u.last_name',
        'u.image'
      )
  }
}

function update(filters, changes) {
  // only allow one update at a time, so uses .first()
  return db('posts_likes')
    .update(changes, ['*'])
    .where(filters)
    .then(p =>
      find({
        'p_l.id': p[0].id,
      }).first()
    )
}

function remove(filters) {
  // only returns the number of deleted entries
  return db('posts_likes')
    .where(filters)
    .del()
    .returning('*')
}
