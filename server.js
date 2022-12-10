const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes

const user = require("./routes/auth");
const post = require("./routes/travelRoute");

app.use("/api/v1", user);
app.use("/api/v1", post);

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// Handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
