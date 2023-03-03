// /create-calendar

const express = require('express')
const router = express.Router()

const {
    createCalendar ,
    listCalendar,
    updateCalendar,
    deleteCalendar
} = require('../controllers/calendarController')
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

router.post('/create-calendar', checkUser, checkTeacher, createCalendar)
router.get('/list-calendar', checkUser, listCalendar)
router.put('/update-calendar', checkUser, checkTeacher, updateCalendar)
router.delete('/delete-calendar/:id', checkUser, checkTeacher, deleteCalendar)


module.exports = router;