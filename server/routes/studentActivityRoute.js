const express = require("express");
const router = express.Router();
const {sendQuizStudent,  listScore,getAccessNumber,} = require("../controllers/studentActivity")
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

router.post('/quiz/send-quiz', checkUser, sendQuizStudent)
router.post("/quiz/list-score", checkUser, listScore)
router.post("/quiz/get-access-number", checkUser, getAccessNumber)

module.exports = router;