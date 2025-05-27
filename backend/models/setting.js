const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Reference User
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    mobileNumber: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileVisibility: {
        type: String,
        enum: ["public", "only_recruiters", "private"],
        default: "public",
    },
    notificationsEnabled: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
