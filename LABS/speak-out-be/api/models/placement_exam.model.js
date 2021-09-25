const db = require('../../database/db-config');

const returning = [
    'pe.id',
    'pe.student_id',
    'pe.test_type',
    'pe.test_date',
    'pe.test',
    'pe.level_id',
    'pe.fluency',
    'pe.accuracy',
    'pe.comprehension',
    'pe.writing_level',
    'pe.mc_correct',
    'pe.mc_marked',
    'pe.answers',
    'pe.notes',
    'l.description',
    'l.certificate_text'
];

const create = body => {
    return db('placement_exam')
        .insert(body)
        .returning('*');
};

const createOnline = (body) => {
    let newBody = {
        student_id: body.student_id,
        mc_marked: body.questionsDone,
        mc_correct: body.score,
        answers: JSON.stringify(body.answers),
        test_date: new Date(),
        test_type: 1,
        test: 'primary',
        level_id: 1,
    }
    return db('placement_exam')
        .insert(newBody)
        .returning('*');
}

const findAll = () => {
    return db('placement_exam as pe')
        .join('level as l', 'l.id', 'pe.level_id')
        .select(returning)
        .orderBy('pe.id', 'desc');
};

const findByExamId = id => {
    return db('placement_exam as pe')
        .where("pe.id", "=", id)
        .join('level as l', 'l.id', 'pe.level_id')
        .select(returning)
        .first();
};

const findByStudentId = id => {
    return db('placement_exam as pe')
        .where('pe.student_id', '=', id)
        .join('level as l', 'l.id', 'pe.level_id')
        .select(returning)
        .orderBy('pe.test_date', 'desc');
};

const findByType = typeID => {
    return db('placement_exam as pe')
        .where('pe.test_type', '=', typeID)
        .join('level as l', 'l.id', 'pe.level_id')
        .select(returning);
};

const findByStudentIdAndType = (id, typeID) => {
    return db('placement_exam as pe')
        .where('pe.student_id', '=', id)
        .where('pe.test_type', '=', typeID)
        .join('level as l', 'l.id', 'pe.level_id')
        .select(returning);
};

const remove = id => {
    return db('placement_exam as pe')
        .del()
        .where("pe.id", "=", id);
};

const update = (id, body) => {
    return db('placement_exam as pe')
        .update(body)
        .where("pe.id", "=", id)
        .returning('*');
};

module.exports = {
    create,
    createOnline,
    findAll,
    findByExamId,
    findByStudentId,
    findByType,
    findByStudentIdAndType,
    remove,
    update
};