const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const CourseeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    teacher: {
        type: ObjectId,
        ref: "users",
    },
    room: {
        type: ObjectId,
        ref: "layout",
    },
    description: {
        type: String,
    }
    ,
    // course_number: {
    //     type: String,
    //     Text:true
    // },
    // password:{
    //     type:String
    // },
    image:{
        type:String
    },
    status:{
        type:String,
        default:"private"
    },
    enabled:{
        type:Boolean,
        default: false,
    },
    topic: [],
}, {timestamps: true});

module.exports = Coursee = mongoose.model("coursee", CourseeSchema);