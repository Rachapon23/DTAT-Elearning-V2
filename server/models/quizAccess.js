// not use ??? -> wait for clean up
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const QuizAccessSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "users",
    },
    quiz: {
        type: ObjectId,
        ref: "quize",
    },
    attemp: {
        type: Number,
    }
}, {timestamps: true});

module.exports = QuizAccess = mongoose.model("quizAccess", QuizAccessSchema);