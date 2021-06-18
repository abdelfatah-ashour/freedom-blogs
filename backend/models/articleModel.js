const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const schemaArticle = new mongoose.Schema(
    {
        author: {
            type: ObjectId,
            ref: "User",
        },
        imageOfArticle: String,
        head: String,
        content: String,
        category: String,
        comments: [{ userId: String, comment: String }],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Article", schemaArticle);
