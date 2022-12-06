const express = require("express");
const {
  loginUser,
  registerUser,
  logout,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
