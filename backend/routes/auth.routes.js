const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

//router.route('/').post(checkUser);
router.route("/signup").post(authController.signupUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").post(authController.logoutUser);
router.route("/check").post(authController.checkUser);

module.exports = router;
