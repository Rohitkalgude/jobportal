const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary").v2; 
require("dotenv").config(); 


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

cloudinary.js