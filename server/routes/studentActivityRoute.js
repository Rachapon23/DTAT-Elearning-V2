const express = require('express')
const router = express.Router()
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleward')
const { updateProcess } = require('../controllers/studentActivity')

router.post('/student-activity/update-process',checkUser, updateProcess)

module.exports = router;
