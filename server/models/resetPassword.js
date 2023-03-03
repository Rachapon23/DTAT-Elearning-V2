const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    token: {
        type: String,
    },
    is_used: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = ResetPassword = mongoose.model("resetPassword", ResetPasswordSchema);