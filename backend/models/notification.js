const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema(
    {
        from: String,
        to: {type: ObjectId, ref: "User"},
        typeNotification: {
            type: String,
            enum: ["comments"],
        },
        articleId: String,
        contentNotification: String,
        category: String,
        stateSeen: {
            type: Number,
            default: 0,
            enum: [0, 1], // 0 is not seen && 1 notification already seen
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("Notification", notificationSchema);
