const express = require("express");
const userRouter = express.Router();
const {
  verify,
  getUserData,
  register,
  login,
  updateData,
  deleteData,
} = require("../../controller/user.controller");
const { uploadUserImage } = require("../../config/multer.config");

userRouter.get("/verify/:token", verify);
userRouter.get("/fetch-user", getUserData);
userRouter.post("/submit/register", uploadUserImage.single("image"), register);
userRouter.post("/login", login);
userRouter.patch("/update-user", updateData);
userRouter.delete("/delete-user", deleteData);

module.exports = userRouter;
