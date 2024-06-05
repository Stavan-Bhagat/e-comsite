const {
  register_service,
  login_service,
  getUserData_service,
  updateUserData_service,
  deleteData_service,
} = require("../service/user.service");
const sendVerificationEmail = require("../config/email.config");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const TempUser = require("../model/TempUser.model");
const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

exports.register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    const token = jwt.sign({ email }, verifyKey, {
      expiresIn: "5m",
    });

    const response = await register_service({
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
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await login_service({ email, password });
    if (userData.success) {
      const email = userData.user.email;

      const accessToken = jwt.sign({ email }, jwtKey, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      });
      const refreshToken = jwt.sign(
        { email: userData.user.email },
        jwtRefreshKey,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
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
};

exports.getUserData = async (req, res) => {
  try {
    const data = await getUserData_service();
    if (data && data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "No user data found" });
    }
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.updateData = async (req, res) => {
  const { id } = req.query;
  try {
    const { name, email, role } = req.body;
    const response = await updateData_service({
      id,
      name,
      email,
      role,
    });
    res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const { id } = req.query;
    const blogData = await deleteData_service(id);
    res.status(200).json(blogData);
  } catch (error) {
    console.error(`deleteUserdata controller error : ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verify = async (req, res) => {
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
      imageUrl: tempUser.imageUrl,
    });
    await user.save();

    await TempUser.deleteOne({ _id: tempUser._id });

    // res.status(200).json({ message: "Email verified successfully." });
    res.redirect(`${process.env.CLIENT_URL}/verification-success`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
