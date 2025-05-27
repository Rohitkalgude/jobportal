const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  jobTitle: { type: String, required: true }, // ✅ Store job title
  companyName: { type: String, required: true }, // ✅ Store company name

  education: { type: [String], required: true }, // ✅ Changed to array
  skills: { type: [String], required: true }, // ✅ Changed to array

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  fullname: { 
    type: String, 
    required: true 
  },
    
  email: { 
    type: String, 
    required: true 
  },

  resumeUrl: { 
    type: String, 
    default: "" 
  }, 

  saved: {
    type: Boolean,
    default: false, // false means not saved yet
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);






