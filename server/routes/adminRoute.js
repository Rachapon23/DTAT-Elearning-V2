const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    listAlluser,
    listStudentuser,
    ChangeRole,
    listTeacheruser,
    changeEnable,
    removeRoom,
    createRoom,
    removePlant,
    createPlant,
} = require('../controllers/adminController')

router.get('/listalluser',checkUser, checkAdmin, listAlluser)
router.get('/liststudentuser',checkUser, checkAdmin, listStudentuser)
router.get('/listteacheruser',checkUser, checkAdmin, listTeacheruser)
//room
router.post("/create-room", createRoom);
router.delete("/delete-room/:id", removeRoom);
//plant
router.post("/create-plant", createPlant);
router.delete("/delete-plant/:id", removePlant);

router.post('/change-role',checkUser, checkAdmin, ChangeRole)
router.post('/change_enable',checkUser, checkAdmin, changeEnable)

module.exports = router;