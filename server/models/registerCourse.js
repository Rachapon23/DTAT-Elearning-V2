const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const RegisterCourseSchema = new mongoose.Schema({

    coursee: [{
        type: ObjectId,
        ref:"coursee"
    }]
});

module.exports = RegisterCourse = mongoose.model("registerCourse", RegisterCourseSchema);