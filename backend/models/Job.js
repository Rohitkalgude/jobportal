const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyname: {
    type: String,
    require: true,
  },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      required: true,
    },
    workmode: {
      type: String,
      enum: ["work-from-home", "office", "hybrid"],
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    education: {
      type: String,
      enum: [
        "Any postGraduate", "BCA", "MCA", "BSC", "MSC",
        "Any Graduate", "B.Tech/B.E", "Diploma"
      ],
      required: true,
    },
    experience: {
      type: Number,
      min: 0,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employerr",
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    isBlocked: { type: Boolean, default: false }, // Ensure this field exists
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model("Job", jobSchema);
