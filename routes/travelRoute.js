const express = require("express");
const {
  createTravelExperience,
  findTravelExperiences,
  singleUserExperience,
} = require("../controllers/TravelController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/addExp").post(createTravelExperience, isAuthenticatedUser);
router.route("/find/:id").get(singleUserExperience);
// router.route("/allExp").get(findTravelExperiences);

module.exports = router;
