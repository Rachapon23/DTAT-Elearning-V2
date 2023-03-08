const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const HistorySchema = new mongoose.Schema({
    // user: {
    //     type: ObjectId,
    //     ref: "users",
    // },
   
    result: {
        type: String,
    },
    score: {
        type: String,
    },
    maxscore: {
        type: String,
    },
    course:{
        type:String
    }

}, {timestamps: true});

module.exports = History = mongoose.model("history", HistorySchema);