if (process.env.NODE_ENV === 'production') {
    exports.seed = async function (knex, Promise) {
        // Deletes ALL existing entries
        // await knex.raw('TRUNCATE TABLE questionAnswers RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE surveys RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE questions RESTART IDENTITY CASCADE');
        // await knex.raw('TRUNCATE TABLE houst_ast RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE item_complete RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE after_list RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE list RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE stay RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE house RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE manager_ast RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE assistant RESTART IDENTITY CASCADE');
        await knex.raw('TRUNCATE TABLE manager RESTART IDENTITY CASCADE');
        // await knex.raw('TRUNCATE TABLE user RESTART IDENTITY CASCADE');
    };
} else if (process.env.NODE_ENV === 'development') {
    exports.seed = async function (knex, Promise) {
        await knex('surveys').truncate();
        await knex('questionAnswers').truncate();
        await knex('questions').truncate();
        await knex('house_ast').truncate();
        await knex('item_complete').truncate();
        await knex('after_list').truncate();
        await knex('items').truncate();
        await knex('list').truncate();
        await knex('stay').truncate();
        await knex('house').truncate();
        await knex('manager_ast').truncate();
        await knex('assistant').truncate();
        await knex('manager').truncate();
        await knex('user').truncate();
    };
} else if (process.env.NODE_ENV === 'test') {
    exports.seed = () => { };
}
