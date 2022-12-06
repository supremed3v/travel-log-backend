const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

// Return JWT token from model, create a method in the user model
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_TIME,
//     });
//   };

module.exports = sendToken;
