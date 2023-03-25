const express = require("express");
const userController = require("../controllers/user.controllers");
const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").post(userController.logoutUser);
router.route("/check").post(userController.checkUser);
router.route("/getAll").post(userController.getAllUsers);


module.exports = router;
