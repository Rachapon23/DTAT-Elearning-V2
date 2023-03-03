const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const HomeSchema = new mongoose.Schema({

    carousel: [],
    coursee: [{
        type: ObjectId,
        ref:"coursee"
    }]
});

module.exports = Home = mongoose.model("home", HomeSchema);