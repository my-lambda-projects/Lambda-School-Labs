const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    getUsers: function(email) {
        //if id: return all information on user for focused profile page
        if (email) {
            return db("users")
                .where({email: email}).first();
        }
        return db("users")
      },
    
    //grabs set of IDs from user skills/places column
    getUserSkillID: function(id, type) {
        return db("users")
            .where({id: id})
            .select(`${type}`)
            .first();
    },

    // ==== add functions ====
    addUser: function(user) {
      return db("users")
        .insert(user, ['email', 'first_name', 'last_name'])
    },

    editUser: function(id, input) {
        return db("users")
            .where({id: id})
            .update(input)
    },

    deleteUser: function(id) {
        return db("users")
            .where({id: id})
            .delete()
    },
}