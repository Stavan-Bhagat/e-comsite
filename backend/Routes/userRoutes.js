const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {uploadUserImage} = require("../config/multerConfig");

router.post(
  "/register",
  uploadUserImage.single("image"),
  userController.register
);
router.post("/login", userController.login);
router.get("/fetch-userdata", userController.getUserData);

router.get("/verify/:token", userController.verify);

module.exports = router;
