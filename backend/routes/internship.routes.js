const express = require("express");
const internshipController = require("../controllers/internship.controllers");
const router = express.Router();

router.route("/createById").post(internshipController.createInternshipById);
router.route("/getById").post(internshipController.getInternshipById);
router.route("/getAll").post(internshipController.getAllInternships);


module.exports = router;