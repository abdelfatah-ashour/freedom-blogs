const mongoose = require("mongoose");

module.exports = async function (url) {
  await mongoose
    .connect(url, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("connected to database successfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
