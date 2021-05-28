const Router = require("express").Router();
const { signup, login,logout} = require("../controllers/userControllers");

Router.route("/signup").post(signup);
Router.route("/login").post(login);
Router.route("/logout").get(logout);

module.exports = Router;
