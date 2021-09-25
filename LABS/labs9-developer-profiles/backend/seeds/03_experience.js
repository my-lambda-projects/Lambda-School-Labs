var faker = require('faker')
require("dotenv").config();

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('experience')
        .del()
        .then(function () {
            let arr = []
            let num = process.env.SEEDS_NUM;
            while(num > 0){
                arr.push({
                    user_id: num,
                    job_title: faker.name.jobTitle(),
                    job_dates: "2008 - 2015",
                    job_description: faker.name.jobDescriptor(),  
                })
                num--;
            }
            return knex('experience')
                .truncate()
                .insert(arr);
        }).catch(err => {
            console.log(err)
        })
};