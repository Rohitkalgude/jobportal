const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    foundedDate: {type: String, require: true},
    companySize: {type: String, },
    companyType:{type: String, require: true},
    website: { type: String, default: "" },
    about:{type: String, require: true},
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);