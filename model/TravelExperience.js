const mongoose = require("mongoose");

const travelExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    trim: true,
    maxLength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
    trim: true,
    maxLength: [1000, "Description cannot exceed 1000 characters"],
  },
  location: {
    type: String,
    required: [true, "Please enter a location"],
    trim: true,
    maxLength: [100, "Location cannot exceed 100 characters"],
  },
  costOfTravel: {
    type: Number,
    required: [true, "Please enter a cost of travel"],
    maxLength: [10, "Cost of travel cannot exceed 10 characters"],
    default: 0.0,
  },
  travelDate: {
    type: Date,
    required: [true, "Please enter a travel date"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Rating",
      required: true,
    },
  ],
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
});

// Static method to get avg of travel experience ratings
travelExperienceSchema.statics.getAverageRating = async function (
  travelExperienceId
) {
  const obj = await this.aggregate([
    {
      $match: { _id: travelExperienceId },
    },
    {
      $project: {
        rating: "$ratings",
        numberOfRatings: "$numberOfRatings",
      },
    },
    {
      $unwind: "$ratings",
    },
    {
      $group: {
        _id: "$ratings",
        averageRating: { $avg: "$ratings" },
      },
    },
  ]);

  try {
    await this.model("TravelExperience").findByIdAndUpdate(travelExperienceId, {
      averageRating: obj[0].averageRating,
      numberOfRatings: obj[0].numberOfRatings,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
travelExperienceSchema.post("save", function () {
  this.constructor.getAverageRating(this._id);
});

// Call getAverageRating before remove
travelExperienceSchema.pre("remove", function () {
  this.constructor.getAverageRating(this._id);
});

module.exports = mongoose.model("TravelExperience", travelExperienceSchema);
