const express = require('express');

const {
    findAllPlacementExams,
    findPlacementExamById,
    findPlacementExamsByStudentId,
    findPlacementExamsByType,
    findPlacementExamsByStudentIDAndType,
    createPlacementExam,
    createOnlineExam,
    deletePlacementExam,
    editPlacementExam
} = require('../controllers/placement_exam.controller');

const { validateStudentID } = require('../middlewares/student.middleware');
const { fullOuterJoin } = require('../../database/db-config');

const router = express.Router();

router.param('studentID', validateStudentID);
// router.param('examID');

router.get('/placementExam', findAllPlacementExams); // gets all records in PE table

router.get('/placementExam/:id', findPlacementExamById); // gets a single placement exam

router.get('/placementExam/student/:studentID', findPlacementExamsByStudentId); // gets all placement exams taken by a single student

router.get('/placementExam/examType/:typeID', findPlacementExamsByType); // gets all placement exams taken online or oral

router.get('/placementExam/examType/:typeID/student/:studentID', findPlacementExamsByStudentIDAndType); // gets all placement exams by a single student with either oral or online type

router.post('/placementExam', createPlacementExam); // creates a new record in PE table

router.post('/placementExam/student', createOnlineExam); // creates a new Online record in PE table

router.put('/placementExam/:id', editPlacementExam); // edits a current record in PE table

router.delete('/placementExam/:id', deletePlacementExam); // deletes a record in PE table

module.exports = router;