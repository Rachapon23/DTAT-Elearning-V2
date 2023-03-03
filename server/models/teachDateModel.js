const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const TeachTimeSchema = new mongoose.Schema({

    course: {
        type: ObjectId,
        ref:"coursee",
        require: true,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    teacher: {
        type: ObjectId,
        ref:"users",
    },
    floor: {
        type: Number
    }
}, { timestamps: true });

module.exports = TeachTime = mongoose.model("teachTime", TeachTimeSchema);