const Router = require("express").Router();
const multer = require("multer");
const path = require("path");

const {isAuth} = require("../controllers/userControllers");

const {
    createNewArticle,
    getHomeArticles,
    getArticlesWithCategory,
    getOneArticle,
    getAllNotifications,
} = require("../controllers/articleControllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/images/article/"));
    },

    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") +
				"-" +
				file.originalname,
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadArticle = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

Router.post(
    "/create-article",
    uploadArticle.single("imageArticle"),
    isAuth,
    createNewArticle,
);

Router.get("/getHomeArticles", getHomeArticles);
Router.get("/getArticlesWithCategory", getArticlesWithCategory);
Router.get("/getAllNotifications", isAuth, getAllNotifications);
Router.get("/getOneArticle", getOneArticle);

module.exports = Router;
