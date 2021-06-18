module.exports = (app, express) => {
  const cors = require("cors");
  const path = require("path");
  const cookieParser = require("cookie-parser");
  const helmet = require("helmet");
  const morgan = require("morgan");

  // middleware
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      path: "/",
      credentials: true,
      exposedHeaders: ["authorization", "Set-Cookie"],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // static path to get images
  app.use(express.static(path.join(__dirname, "../uploads/images/article")));
  app.use(cookieParser());
  app.use(helmet());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // routes
  app.use("/api/auth", require("../routes/userRoutes"));
  app.use("/api/article", require("../routes/articleRoutes"));
};
