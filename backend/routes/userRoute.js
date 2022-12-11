const express = require('express')
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(userController.addUser);
router.route('/login').post(userController.loginUser);

module.exports = router;