const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    employerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Employerr", 
        required: true 
    },
    resumeUrl: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
