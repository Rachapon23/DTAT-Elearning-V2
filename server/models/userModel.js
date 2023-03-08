const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema({

    employee_ID: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    department_ID: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "student",
    },
    profile: {
        type: String,
    },
    email: {
        type: String,
    },
    tel: {
        type: String,
    },
    coursee: [{
        type: ObjectId,
        ref: "coursee",
        // unique: true,
    }],
    history: [{
        type: ObjectId,
        ref: "history",
    }],
    targetstudent: {
        type: Number,
        default: 0,
    },
    amountstudent: {
        type: Number,
        default: 0,
    },
    plant: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = User = mongoose.model("users", UserSchema);