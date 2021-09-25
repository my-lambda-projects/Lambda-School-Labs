const db = require('../dbConfig.js');

module.exports ={
    findUser,
    getUser
};
function findUser(id){
    if (id){
        return db('users').where({ internal_Id: Number(id)})
    }
    return db('users');
}
async function getUser(id){
    const user = await db('users').where({internal_Id: id})
    const achievements = await db('user_achievements')
        .where({'user_id': id})
        .join('achievements', 'user_achievements.achievement_id', 'achievements.id')
        .select('achievements.title', 'achievements.description', 'achievements.id')
    const taco_logs = await db('taco-log').where({user_id: id})    
    const { name, internal_id, username, email, ext_user_id, photoURL } = user[0];
    const stats = await db('user_stats').where({user_id: id})
    const user_stats = stats[0]
    const result = {
        internal_id, username, name, email, ext_user_id, taco_logs, achievements, user_stats, photoURL
    }
    return result;
}

