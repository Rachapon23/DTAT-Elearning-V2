
const express = require('express')
const router = express.Router()
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleward')

const { updateProcess,sendQuizStudent,listScore ,getAccessNumber, getProcess} = require('../controllers/studentActivity')

router.put('/student-activity/update-process',checkUser, updateProcess)
router.post('/quiz/send-quiz', checkUser, sendQuizStudent)
router.post("/quiz/list-score", checkUser, listScore)
router.post("/quiz/get-access-number", checkUser, getAccessNumber)
router.post('/student-activity/update-process',checkUser, updateProcess)
router.post("/student-activity/get-process",checkUser, getProcess )

module.exports = router;
