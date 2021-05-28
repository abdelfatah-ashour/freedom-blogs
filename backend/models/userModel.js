const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    address: String,
    socialMedia: Array,
    profilePhoto: String,
    role: {
        type: Number,
        default: 0,
        enum: [0, 1], // 0 is user && 1 is admin
    },
});

module.exports = mongoose.model("User", userSchema);
