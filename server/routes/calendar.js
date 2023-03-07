// /create-calendar

const express = require('express')
const router = express.Router()

const {
    createCalendar ,
    listCalendar,
    updateCalendar,
    deleteCalendar,
    getCalendar
} = require('../controllers/calendarController')
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

router.post('/create-calendar', checkUser, checkTeacher, createCalendar)
router.get('/list-calendar', checkUser, listCalendar)
router.get('/get-calendar/:id', getCalendar)
router.put('/update-calendar', checkUser, checkTeacher, updateCalendar)
router.delete('/delete-calendar/:id', checkUser, checkTeacher, deleteCalendar)


module.exports = router;