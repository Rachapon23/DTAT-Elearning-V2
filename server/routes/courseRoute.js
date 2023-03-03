const express = require("express");
const router = express.Router();

/* Multer  */
const multer = require('multer')


const {
    listCourses,
    createCourse,
    searchCourse,
    addCourse,
    getMyCourse,
    getCourse,
    publicCourses,
    deleteMyCourse,
    getMyCourseTeacher,
    updateCourse,
    deleteCourse,
    getRoom,
    createRoom,
    uploadimg,
    updateimg,
    uploadfile,
    enablecourse

} = require("../controllers/courseController");


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

const {checkUser,checkAdmin,checkTeacher} = require('../middleware/middleward')



// // teacher
router.post("/upload-img",upload, checkUser, checkTeacher, uploadimg);
router.post("/update-img",upload, checkUser, checkTeacher, updateimg);
router.post("/upload-file",upload, checkUser ,checkTeacher, uploadfile);


router.post("/create-course", checkUser, checkTeacher, createCourse);
router.post("/enable-course", checkUser, checkTeacher, enablecourse);
router.put("/update-course", checkUser, checkTeacher, updateCourse);
router.get("/list-courses", checkUser, listCourses);
router.delete("/delete-courses/:id", checkUser, checkTeacher, deleteCourse);
router.get("/get-mycourse-teacher",checkUser, checkTeacher, getMyCourseTeacher);
router.get("/list-room", checkUser, checkTeacher, getRoom);
// router.post("/create-room", createRoom);

// student
router.post("/searchcourse", checkUser, searchCourse);
router.post("/addchcourse", checkUser, addCourse);
router.get("/get-my-course/:id", checkUser, getMyCourse);
router.get("/get-course/:id", checkUser, getCourse);
router.get("/list-public-courses", checkUser, publicCourses);
router.post("/delete-my-course/:id", checkUser, deleteMyCourse);


module.exports = router