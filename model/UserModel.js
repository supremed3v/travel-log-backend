const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  travelExperience: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TravelExperience",
      required: true,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
