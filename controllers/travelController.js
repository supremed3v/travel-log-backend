const TravelExperience = require("../models/TravelExperience");
const ErrorHandler = require("../middlewares/error");
const catchAsyncErrors = require("../middlewares/asyncErrorHandler");

exports.createTravelExperience = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "travel-experiences",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const travelExperience = await TravelExperience.create(req.body);

  res.status(201).json({
    success: true,
    travelExperience,
  });
});
