const User = require("../models/userModel");
const { loginValid, signupValid } = require("../utilities/validAuth");
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { serialize } = require("cookie");
const { loggerError } = require("../utilities/winston");
module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const { error } = signupValid(req.body);
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      // find one user is already exists
      const user = await User.findOne(
        { email },
        null,
        { new: true },
        (error, docs) => {
          if (error) throw new Error(error);
          return docs;
        }
      );
      if (user)
        return res.status(400).json({
          success: false,
          message: "user is already exists",
        });

      //hashed passport for store it in database with hashing string
      await hash(password, 10, async (error, hashedPassport) => {
        if (error) throw new Error(error);
        const createNewUser = new User({
          username,
          email,
          password: hashedPassport,
        });

        await createNewUser.save((error) => {
          if (error) throw new Error(error);
          return res.status(201).json({
            success: false,
            message: "created new Account",
          });
        });
      });
    } catch (error) {
      loggerError.error(error.message);
      return res.status(500).json({
        success: false,
        message: "😓 something wrong ... try again",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = loginValid(req.body);
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      const isUser = await User.findOne(
        { email },
        null,
        { new: true },
        (error, docs) => {
          if (error) throw new Error(error);
          return docs;
        }
      );

      // check if user is already exists
      if (!isUser)
        return res.status(404).json({
          success: false,
          message: "😥 email or password incorrect",
        });

      // there we checked user is exists
      // now check password verified
      await compare(password, isUser.password, (error, same) => {
        if (error) throw new Error(error);
        if (!same)
          return res.status(404).json({
            success: false,
            message: "😥 email or password incorrect",
          });

        // here we checked email and password is valid
        // so now it's time to send cookie
        const dataCookie = {
          _id: isUser._id,
          role: isUser.role,
        };

        res.setHeader(
          "Set-Cookie",
          serialize("auth", accessToken(dataCookie), {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : false,
            path: "/",
            maxAge: 60 * 60 * 24 * 1, // 1 day
          })
        );
        return res
          .header("authorization", accessToken(dataCookie))
          .status(200)
          .json({
            success: true,
            message: "🚀 login success",
            info: {
              email: isUser.email,
              role: isUser.role,
              username: isUser.username,
            },
          });
      });
    } catch (error) {
      loggerError.error(error.message);
      return res.status(500).json({
        success: false,
        message: "😓 something wrong ... try again",
      });
    }
  },
  isAuth: async (req, res, next) => {
    const authToken = req.cookies.auth || req.headers.authorization;
    try {
      if (!authToken)
        return res.status(401).json({
          success: false,
          message: "📛 access denied",
        });
      const decoded = await verify(authToken, process.env.ACCESS_TOKEN);

      // check if decoded is right
      if (!decoded)
        return res.status(401).json({
          success: false,
          message: "📛 access denied",
        });
      req.user = decoded;

      next();
    } catch (error) {
      loggerError.error(error.message);
      return res.status(500).json({
        success: false,
        message: "something wrong ... try again",
      });
    }
  },
  logout: async (req, res) => {
    try {
      await res.clearCookie("auth");
      res.status(200).json({
        success: true,
        message: "see you later Blogger 👋🏻",
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  },
};

const accessToken = (data) => {
  return sign(data, process.env.ACCESS_TOKEN);
};
