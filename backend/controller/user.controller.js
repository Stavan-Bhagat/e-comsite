const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const sendVerificationEmail = require('../config/email.config');
const CryptoJS = require('crypto-js');
const secretKey = process.env.CRYPTO_PASSWORD;

const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

exports.register = async(req, res) => {
  try {
    const { name, email, role, password } = req.body;
    console.log(name, role, email);
    let image;
    if (req.file) {
      image = req.file.path;
    }

    const token = jwt.sign({ email }, verifyKey, {
      expiresIn: '5m'
    });

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

    res.status(200).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: 'Email not verified. Please verify your email.'
      });
    }

    const accessToken = jwt.sign({ email }, jwtKey, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME
    });

    const refreshToken = jwt.sign({ email }, jwtRefreshKey, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      accessToken,
      refreshToken,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verify = async(req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, verifyKey);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.verified) {
      return res.status(400).json({ message: 'Email already verified.' });
    }

    user.verified = true;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/verification-success`);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getUserData = async(req, res) => {
  try {
    const userData = await User.find({});
    if (userData && userData.length > 0) {
      res.status(200).json({ data: userData });
    } else {
      res.status(404).json({ message: 'No user data found' });
    }
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({ error: 'Internal server error' });
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

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteData = async(req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('Delete user data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.headers['refresh-token'];
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME
    });
    return res.status(200).json({
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid refresh token' });
    } else {
      console.error('Error refreshing access token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
