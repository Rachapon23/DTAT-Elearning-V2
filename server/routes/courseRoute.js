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
    uploadimg,
    updateimg,
    uploadfile,
    enablecourse,
    
    getRoom,
    getPlant,
    getUserCourse,~
    getCourseHome

} = require("../controllers/courseController");

// test pull
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
//room
router.get("/list-room", checkUser, checkTeacher, getRoom);
router.get("/list-plant",  getPlant);
//get course home
router.get("/get-courses-home",  getCourseHome);

router.get("/get-user-course/:id", getUserCourse);


// student
router.post("/searchcourse", checkUser, searchCourse);
router.post("/addchcourse", checkUser, addCourse);
router.get("/get-my-course/:id", checkUser, getMyCourse);
router.get("/get-course/:id", getCourse);
router.get("/list-public-courses", checkUser, publicCourses);
router.post("/delete-my-course/:id", checkUser, deleteMyCourse);


module.exports = router