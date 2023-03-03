const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    listAlluser,
    listStudentuser,
    ChangeRole,
    listTeacheruser,
    changeEnable
} = require('../controllers/adminController')

router.get('/listalluser',checkUser, checkAdmin, listAlluser)
router.get('/liststudentuser',checkUser, checkAdmin, listStudentuser)
router.get('/listteacheruser',checkUser, checkAdmin, listTeacheruser)


router.post('/change-role',checkUser, checkAdmin, ChangeRole)
router.post('/change_enable',checkUser, checkAdmin, changeEnable)

module.exports = router;