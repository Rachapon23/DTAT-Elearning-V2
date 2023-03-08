const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const QuizeSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    explanation: {
        type: String,
    },
    question: [],
    teacher: {
        type: ObjectId,
        ref:"users"
    },
    // attemp: {
    //     type: Number,
    //     default: 1,
    // },
    course: {
        type: ObjectId,
        ref:"coursee"
    }
}, { timestamps: true });

module.exports = Quize = mongoose.model("quize", QuizeSchema);