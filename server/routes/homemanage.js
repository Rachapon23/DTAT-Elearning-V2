const express = require('express')
const router = express.Router()
const multer = require('multer')

const {
    carousel,
    listHome,
    removeCarousel,
    course,
    ReGiscourse,
    removeCourse,
    removeCourse2,
} = require('../controllers/homeControler')


/* Multer  */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage }).single('file')
/* Multer  */


router.post('/home/carousel', upload, carousel)
router.post('/home/course',  course)
router.post('/home/regiscourse',  ReGiscourse)
router.get('/home/list', listHome)
router.put('/home/remove', removeCarousel)
router.put('/home/remove-course', removeCourse)
router.put('/home/remove-course2', removeCourse2)




module.exports = router;