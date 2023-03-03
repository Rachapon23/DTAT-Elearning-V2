const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const calendarSchema = mongoose.Schema({
    title: {
        type: String
    },
    coursee: {
        type: ObjectId,
        ref:"coursee",
        // require: true,
    },
    filename: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    color: {
        type: String
    },
    allDay: {
        type: Boolean,
        default: true
    } ,
    teacher: {
        type: ObjectId,
        ref:"users",
    },
    floor: {
        type: Number
    }
}, { timestamps: true })

module.exports = Calendar = mongoose.model('calendar', calendarSchema)