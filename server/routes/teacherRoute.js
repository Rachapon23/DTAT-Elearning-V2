const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')
const {getStudentby} = require('../controllers/teacherController')

router.get('/listudentby/:params',checkUser,checkTeacher,getStudentby) // ???




module.exports = router;