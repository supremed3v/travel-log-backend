const express = require("express");
const {
  createTravelExperience,
  findTravelExperience,
  singleUserExperience,
  getSingleExperiece,
  addComment,
} = require("../controllers/TravelController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/addExp").post(createTravelExperience, isAuthenticatedUser);
router.route("/find/:id").get(singleUserExperience, isAuthenticatedUser);
router.route("/all").get(findTravelExperience);
router.route("/findSingle/:id").get(getSingleExperiece);
router.route("/review/:id").post(addComment, isAuthenticatedUser);

module.exports = router;
