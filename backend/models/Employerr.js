const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EmployerrSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  company: {
    type: String,
    required: true,
  },
  companylogo: {
    type: String,
  },
  mobileNumber: { 
    type: String, 
    required: true,  // ✅ Make mobile number mandatory
    unique: true,    // ✅ Ensure mobile number is unique
  },
  location : {
    type: String,
  }
});

EmployerrSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Employerr", EmployerrSchema);
