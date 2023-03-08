
const express = require('express')
const router = express.Router()
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleward')
const { updateProcess } = require('../controllers/studentActivity')

router.post('/quiz/send-quiz', checkUser, sendQuizStudent)
router.post("/quiz/list-score", checkUser, listScore)
router.post("/quiz/get-access-number", checkUser, getAccessNumber)
router.post('/student-activity/update-process',checkUser, updateProcess)

module.exports = router;
