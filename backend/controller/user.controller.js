const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const sendVerificationEmail = require('../config/email.config');
const CryptoJS = require('crypto-js');
const secretKey = process.env.CRYPTO_PASSWORD;
const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;
const {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_REGISTER_SUCCESS,
  MSG_LOGIN_SUCCESS,
  MSG_EMAIL_NOT_VERIFIED,
  MSG_INCORRECT_PASSWORD,
  MSG_USER_NOT_FOUND,
  MSG_EMAIL_VERIFIED,
  MSG_NO_USER_DATA_FOUND,
  MSG_USER_UPDATED,
  MSG_USER_DELETED,
  MSG_ACCESS_TOKEN_REFRESHED,
  MSG_REFRESH_TOKEN_EXPIRED,
  MSG_INVALID_REFRESH_TOKEN,
  MSG_INTERNAL_SERVER_ERROR
} = require('../errorMessage.constant');

exports.register = async(req, res) => {
  try {
    const { name, email, role, password } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }

    const token = jwt.sign({ email }, verifyKey, { expiresIn: '5m' });

    const newUser = new User({
      name,
      email,
      password,
      role,
      imageUrl: image,
      verified: false
    });
    await newUser.save();
    await sendVerificationEmail(email, token);

    res.status(STATUS_SUCCESS).json({ message: MSG_REGISTER_SUCCESS });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ success: false, message: MSG_USER_NOT_FOUND });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(STATUS_UNAUTHORIZED).json({ success: false, message: MSG_INCORRECT_PASSWORD });
    }

    if (!user.verified) {
      return res.status(STATUS_UNAUTHORIZED).json({ success: false, message: MSG_EMAIL_NOT_VERIFIED });
    }

    const accessToken = jwt.sign({ email }, jwtKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
    const refreshToken = jwt.sign({ email }, jwtRefreshKey, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME });

    res.status(STATUS_SUCCESS).json({
      success: true,
      message: MSG_LOGIN_SUCCESS,
      accessToken,
      refreshToken,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.verify = async(req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, verifyKey);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ message: MSG_USER_NOT_FOUND });
    }

    if (user.verified) {
      return res.status(STATUS_BAD_REQUEST).json({ message: MSG_EMAIL_VERIFIED });
    }

    user.verified = true;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/verification-success`);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(STATUS_BAD_REQUEST).json({ message: error.message });
  }
};

exports.getUserData = async(req, res) => {
  try {
    const userData = await User.find({});
    if (userData && userData.length > 0) {
      res.status(STATUS_SUCCESS).json({ data: userData });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_NO_USER_DATA_FOUND });
    }
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.updateData = async(req, res) => {
  const { id } = req.query;
  try {
    const { name, email, role } = req.body;
    const updateFields = { name, email, role };

    if (role) {
      updateFields.role = role.value;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    res.status(STATUS_SUCCESS).json({ message: MSG_USER_UPDATED, updatedUser });
  } catch (error) {
    console.error('Update user data error:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.deleteData = async(req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(STATUS_SUCCESS).json({ message: MSG_USER_DELETED, deletedUser });
  } catch (error) {
    console.error('Delete user data error:', error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.headers['refresh-token'];
  try {
    const decoded = jwt.verify(refreshToken, jwtRefreshKey);
    const newAccessToken = jwt.sign({ email: decoded.email }, jwtKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
    return res.status(STATUS_SUCCESS).json({
      message: MSG_ACCESS_TOKEN_REFRESHED,
      accessToken: newAccessToken
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(STATUS_UNAUTHORIZED).json({ message: MSG_REFRESH_TOKEN_EXPIRED });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(STATUS_UNAUTHORIZED).json({ message: MSG_INVALID_REFRESH_TOKEN });
    } else {
      console.error('Error refreshing access token:', error);
      return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  }
};
