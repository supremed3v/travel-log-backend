const TravelExperience = require("../model/TravelExperience");
const catchAsyncErrors = require("../middlewares/asyncErrorHandler");
const cloudinary = require("cloudinary");

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

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

  const travelExperience = await TravelExperience.create(req.body);

  res.status(201).json({
    success: true,
    travelExperience,
  });
});

exports.singleUserExperience = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const travelExperiences = await TravelExperience.find({ user: id });

  if (!travelExperiences) {
    return next(new ErrorHandler("Travel experiences not found", 404));
  }

  res.status(200).json({
    success: true,
    travelExperiences,
  });
});

exports.findTravelExperience = catchAsyncErrors(async (req, res, next) => {
  const travelExperiences = await TravelExperience.find();

  if (!travelExperiences) {
    return next(new ErrorHandler("Travel experience not found", 404));
  }

  res.status(200).json({
    success: true,
    travelExperiences,
  });
});

exports.getSingleExperiece = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const travelExperience = await TravelExperience.findById(id);
  if (!travelExperience) {
    return next(new ErrorHandler("Travel experience not found", 404));
  }
  res.status(200).json({
    success: true,
    travelExperience,
  });
});
