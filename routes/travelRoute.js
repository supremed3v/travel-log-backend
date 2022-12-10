const express = require("express");
const {
  createTravelExperience,
  findTravelExperience,
  singleUserExperience,
  getSingleExperiece,
} = require("../controllers/TravelController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/addExp").post(createTravelExperience, isAuthenticatedUser);
router.route("/find/:id").get(singleUserExperience, isAuthenticatedUser);
router.route("/all").get(findTravelExperience);
router.route("/findSingle/:id").get(getSingleExperiece);

module.exports = router;
