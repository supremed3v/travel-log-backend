const express = require("express");
const { createTravelExperience } = require("../controllers/TravelController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/addExp").post(createTravelExperience, isAuthenticatedUser);

module.exports = router;
