const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const HomeSchema = new mongoose.Schema({

    carousel: [],
    course_public: [{
        type: ObjectId,
        ref:"coursee"
    }],
    course_private: [{
        type: ObjectId,
        ref:"coursee"
    }]
});

module.exports = Home = mongoose.model("home", HomeSchema);