const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({

    plantname: {
        type: String,
    },

});

module.exports = Plant = mongoose.model("plant", PlantSchema);