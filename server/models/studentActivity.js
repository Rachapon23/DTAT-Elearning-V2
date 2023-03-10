const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const studentActivitySchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "users",
    },
    coursee:{
        type: ObjectId,
        ref:"coursee"
    },
    score: {
        type: Number,
    },
    max_score: {
        type: Number,
    },
    quiz:{
        type: ObjectId,
        ref: "quize",
    },
    ans: {
        type: []
    },
    process: {
        type: [],
    },
    completed: {
        type: Boolean,
    }
}, {timestamps: true});

module.exports = studentActivity = mongoose.model("studentactivity", studentActivitySchema);