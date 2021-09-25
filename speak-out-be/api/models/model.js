const db = require('../../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findAny,
  remove,
  update,
  updateAny,
  makeWhere,
  addUser,
  addMeeting,
  addStudent,
  findByEmail,
};

function find(view, where) {
  const rows = db.raw(
    'select * from ' + view + (where ? ' where ' + where : '')
  );
  return rows;
}

function findAny(perPage, skip, table, where, orderBy) {
  let propName;
  let propValue;

  if (where) {
    propName = where.split('=')[0];
    propValue = where.split('=')[1];
  }

  return db(table).modify(function (queryBuilder) {
    if (orderBy) {
      queryBuilder.orderBy(orderBy);
    }

    if (where) {
      queryBuilder.where(propName, propValue);
    }

    if (perPage) {
      queryBuilder.limit(perPage);
    }

    if (skip) {
      queryBuilder.offset(skip);
    }
  });
}

function makeWhere(body, conn) {
  if (!conn) conn = 'and';
  let where = '';
  let i = 0;
  for (let [key, value] of Object.entries(body)) {
    if (!i) where = where + `${key} = '${value}'`;
    else where = where + ` ${conn} ${key} = '${value}'`;
    i++;
  }
  return where;
}

function findBy(view, filter) {
  return db.raw('select * from "' + view + '" where ' + filter);
}


function findByEmail(email) {
  return db('user').where(email).first();
}

async function add(table, body) {
  let where = makeWhere(body);
  await db(table).insert(body);

  return findBy(table, where);
}

function findById(view, id) {
  return db(view).where({ id }).first();
}

function remove(tab, whe) {
  return db.raw('delete from "' + tab + '" where ' + whe);
}

function update(table, where, body) {
  let id = where;
  return db(table).where({ id: body.id }).update(body);
}

function updateAny(table, where, body) {
  return db.raw(
    'update "' + table + '" set ' + makeWhere(body, ',') + ' where ' + where
  );
}

function addUser(userData) {
  return db('user').insert(userData).returning(['id', 'name']);
}

function addMeeting(meeting) {
  return db('meeting').insert(meeting).returning({ id: 'id' });
}

function addStudent(studentData) {
  return db('student').insert(studentData).returning('first_name');
}





