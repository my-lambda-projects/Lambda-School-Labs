require('dotenv').config()
const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

const user_helpers = require('./user_helpers')
const skills_helpers = require('./skills_helpers')

module.exports = {
    user_helpers,
    skills_helpers,

    //uses array of IDs from user skills/places column and grabs the 
    //skills/places associated with those IDs in a batch
    getUserSkills: async function(id, type){
      let currentSkills = await user_helpers.getUserSkillID(id, type)
      if (currentSkills[type] === null) {
          return []
      } else {
      currentSkills = currentSkills[type].split(",");
      currentSkills = currentSkills.map(string => Number(string))
      return db("skills")
          .whereIn('id', currentSkills)
        }
    },

    addKeywords: function(id, type, keywordsArr) {
        return db("users")
            .where({id: id})
            .update({[type]: keywordsArr})
    },
    createKeywords: function(keyword) {
        return db("skills")
            .insert(keyword).returning('id')

    },
    getExtras: function(id, type) {
        return db(`${type}`)
            .where({user_id: id})
    },
    addExtra: function(type, input) {
        return db(`${type}`)
            .insert(input)
    },
    editExtra: function(id, type, input) {
        return db(`${type}`)
            .where({id: id})
            .update(input)
    },
    deleteExtra: function(id, type) {
        return db(`${type}`)
          .where({id: id})
          .delete()
    }
}