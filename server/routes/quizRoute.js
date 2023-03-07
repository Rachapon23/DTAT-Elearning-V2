const express = require('express')
const router = express.Router()

//middleware
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleward')

const {
    // create,
    listquizby,
    // listquiz,
    remove,
    getQuiz,
    // createQusetion,
    // createExaminer,
    // // listquizbyUser,
    // listquizUser
    createQuiz,
    listQuiz,
    updateQuiz,
    createExaminer,
    getQuizByCourseID
} = require('../controllers/quizController')


// router.post('/quiz/create',checkUser,checkTeacher,create)

// router.get('/quiz/listquizby/:params',checkUser,listquizby)
// router.get('/quiz/listquizuser/:params',checkUser,listquizUser)
// // router.get('/quiz/listquizbyuser/:params',checkUser,checkTeacher,listquizbyUser)
// router.get('/quiz/listquiz',checkUser,listquiz)
// router.delete('/quiz/removequiz/:params',checkUser,checkTeacher,remove)
// router.put('/quiz/createqusetion/:params',checkUser,checkTeacher,createQusetion)
// router.put('/quiz/createexaminer/:params',checkUser,createExaminer)


// teacher
router.post('/quiz/create', checkUser, checkTeacher, createQuiz)
router.get('/quiz/list-teacher',checkUser, checkTeacher, listQuiz)
router.get('/quiz/get-quiz/:id', checkUser, checkTeacher, getQuiz)
router.delete('/quiz/remove-quiz/:params', checkUser, checkTeacher, remove)
router.put("/quiz/update-quiz", checkUser, checkTeacher, updateQuiz);
router.get('/quiz/get-course-quiz/:id', checkUser, getQuizByCourseID)

//student
router.get('/quiz/list-quiz-by/:params', checkUser, listquizby) 

module.exports = router;