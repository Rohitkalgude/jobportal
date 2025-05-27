const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true ,lowercase: true },
    password: { type: String, required: true, },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type:String},  // Ensure this exists
    workstatus: { type: String, enum: ["experienced", "fresher"] ,required: true},
    Location: { type: String, enum: ["india", "outside india"] },
    city: { type: String, required: true },
    education: { type: String },
    experience: { type: [String], default: [] },
    mobileNumber: { type: String, require:true, unique: true},
    skills: { type: [String], default: []},
    resume: { type: String },
    profilePhoto: { type: String,},
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    age: { type: Number, required: true },
    savedJobs: { type: [mongoose.Schema.Types.ObjectId], ref: "Job", default: [] }, // ✅ Ensure this field
  },
  { timestamps: true }
);


UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};


module.exports = mongoose.model("User", UserSchema);
