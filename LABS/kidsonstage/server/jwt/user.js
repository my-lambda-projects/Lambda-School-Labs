import db from "../config/db.js";

import { compare } from "bcrypt";
const saltRounds = 10;

class UserClass {
  constructor() {
    this.record = {};
  }
  get id () {
    // console.log(`id this: ${this}`)
    return this.record.id;
  }
  findOne = (o, f) => {
    // console.log(`findone username "${o.username}"`);
    const { username } =  o;
    return db('users')
      .where({ username })
      .then(record => {
        if (record) {
          this.record = record[0];
          return f(null, this);
        }
        return f(new Error("bad login"), null);
      })
      .catch(function (err) {
        console.log(`err: ${err}`);
        f(new Error(`User does not exist `), null);
      });
  }
  checkPassword = (password, f) => {
    compare(password, this.record.password, (err, res) => {
      if (res === true) {
        return f(null, res);
      }
      return f(err, null);
    });
  }
  findById = (id, f) => {
    //console.log(`findById id ${id}`);
    return db('users')
      .where({ id })
      .then(record => {
        if (record) {
          this.record = record[0];
          return f(null, this);
        }
        return f(new Error(`${id} not found`), null);
      });
  }

}
const User = new UserClass();
// console.log(`User: ${Object.keys(User)}`);
// console.log(`User.findOne: ${User.findOne}`);
// findOne
module.exports = { User };