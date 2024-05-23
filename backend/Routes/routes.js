const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const upload = require("../config/multerConfig");

router.post("/register", upload.single("image"), userController.register);
// router.post("/register", userController.register);

// router.post("/register", userController.register);
router.get("/verify/:token", userController.verify);

module.exports = router;
