const mongoose = require("mongoose");

const travelExperienceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  location: {
    type: String,
    required: [true, "Please enter a location"],
  },
  costOfTravel: {
    type: Number,
    required: [true, "Please enter a cost of travel"],
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
  review: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      value: {
        type: String,
        required: [true, "Please enter a category"],
      },
      label: {
        type: String,
        required: [true, "Please enter a category"],
      },
    },
  ],
});

// Static method to get avg of travel experience ratings
// travelExperienceSchema.statics.getAverageRating = async function (
//   travelExperienceId
// ) {
//   const obj = await this.aggregate([
//     {
//       $match: { _id: travelExperienceId },
//     },
//     {
//       $project: {
//         rating: "$ratings",
//         numberOfRatings: "$numberOfRatings",
//       },
//     },
//     {
//       $unwind: "$ratings",
//     },
//     {
//       $group: {
//         _id: "$ratings",
//         averageRating: { $avg: "$ratings" },
//       },
//     },
//   ]);

//   try {
//     await this.model("TravelExperience").findByIdAndUpdate(travelExperienceId, {
//       averageRating: obj[0].averageRating,
//       numberOfRatings: obj[0].numberOfRatings,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// Call getAverageRating after save
// travelExperienceSchema.post("save", function () {
//   this.constructor.getAverageRating(this._id);
// });

// Call getAverageRating before remove
// travelExperienceSchema.pre("remove", function () {
//   this.constructor.getAverageRating(this._id);
// });

module.exports = mongoose.model("TravelExperience", travelExperienceSchema);
