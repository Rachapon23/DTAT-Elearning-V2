const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema({

    room: {
        type: String,
    },
    floor: {
        type: String,
    },
    // detail: {
    //     type: String,
    // }
});

module.exports = Layout = mongoose.model("layout", LayoutSchema);