const express = require('express');
const userRouter = express.Router();
const {
  verify,
  getUserData,
  register,
  login,
  updateData,
  deleteData,
  refreshToken
} = require('../../controller/user.controller');
const { uploadUserImage } = require('../../config/multer.config');
const authentication = require('../../middleware/authentication.middleware');

userRouter.get('/verify/:token', verify);
userRouter.get('/fetch-user', authentication, getUserData);
userRouter.get('/refreshtoken', refreshToken);
userRouter.post('/register', uploadUserImage.single('image'), register);
userRouter.post('/login', login);
userRouter.patch('/update-user', uploadUserImage.single('image'), updateData);
userRouter.delete('/delete-user', deleteData);

module.exports = userRouter;
