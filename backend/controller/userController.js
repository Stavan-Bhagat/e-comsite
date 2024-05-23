const userService = require("../service/userService");
const sendVerificationEmail = require("../config/emailConfig");
const jwt = require("jsonwebtoken");
const User=require("../model/user");
const TempUser = require("../model/TempUser");;

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, role, password } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
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

      await sendVerificationEmail(tempUser, token);

      res.status(200).json(response);
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: "internal server error" });
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const tempUser = await TempUser.findOne({ verificationToken: token });

      if (!tempUser || tempUser.email !== decoded.email) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      const user = new User({
        email: tempUser.email,
        password: tempUser.password,
      });
      await user.save();

      await TempUser.deleteOne({ _id: tempUser._id });

      res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
