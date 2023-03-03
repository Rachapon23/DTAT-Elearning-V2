const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ExaminerSchema = new mongoose.Schema({
    examiner_id: {
        type: ObjectId,
        ref: "users",
    },
    examiner_name: {
        type: String,
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
    }
}, {timestamps: true});

module.exports = Examiner = mongoose.model("examiner", ExaminerSchema);