const mongoose = require("mongoose");

module.exports = function (url) {
    try {
        mongoose.connect(url, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        }).then(() => {
            console.log("connected database");
        }).catch((error) => {
            throw new Error(error);
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
