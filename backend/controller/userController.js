const userService = require("../service/userService");
const sendVerificationEmail = require("../config/emailConfig");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const TempUser = require("../model/TempUser");
const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, role, password } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const token = jwt.sign({ email }, verifyKey, {
        expiresIn: "5m",
      });

      const response = await userService.register({
        name,
        email,
        password,
        role,
        image,
        token,
      });

      await sendVerificationEmail(response, token);

      res.status(200).json(response);
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: "internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });
      if (userData.success) {
        const expiresIn = "15m";
        const email = userData.user.email;
        const accessToken = jwt.sign({ email }, jwtKey, {
          expiresIn,
        });
        // Generate refresh token
        const refreshToken = jwt.sign(
          { email: userData.user.email },
          jwtRefreshKey,
          { expiresIn: "60m" }
        );
        res.status(200).json({
          success: true,
          message: userData.message,
          accessToken,
          refreshToken,
          user: userData.user,
        });
      } else {
        let statusCode = 401;
        if (userData.message === "Login failed") {
          statusCode = 404;
        }
        res
          .status(statusCode)
          .json({ success: false, message: userData.message });
      }
    } catch (error) {
      console.error(`login controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, verifyKey);
      const tempUser = await TempUser.findOne({ verificationToken: token });

      if (!tempUser || tempUser.email !== decoded.email) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      const user = new User({
        email: tempUser.email,
        password: tempUser.password,
        name: tempUser.name,
        role: tempUser.role,
        imageUrl: tempUser.imageUrl
      });
      await user.save();

      await TempUser.deleteOne({ _id: tempUser._id });

      // res.status(200).json({ message: "Email verified successfully." });
      res.redirect(`${process.env.CLIENT_URL}/verification-success`);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
