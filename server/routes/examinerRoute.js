const express = require("express");
const router = express.Router();
const {createExaminer, getAccessNumber, listScore} = require("../controllers/examinerController")
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

router.post('/quiz/send-quiz', checkUser, createExaminer)
router.post("/quiz/get-access-number", checkUser, getAccessNumber)
router.post("/quiz/list-score", checkUser, listScore)

module.exports = router;