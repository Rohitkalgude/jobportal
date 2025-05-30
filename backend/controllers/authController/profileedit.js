// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");

// const profileedit = async (req, res) => {
//   const userId = req.params.id;
//   const {
//     fullname,
//     email,
//     password,
//     workstatus,
//     city,
//     education,
//     MobileNumber,
//     skills,
//     resume,
//     description, // Corrected typo
//     profilePhoto,
//   } = req.body;

//   try {
//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if email is being updated and already exists
//     if (email && email !== user.email) {
//       const existingEmail = await User.findOne({ email });
//       if (existingEmail) {
//         return res.status(400).json({ message: "Email is already in use" });
//       }
//       user.email = email;
//     }

//     // Update user fields
//     if (fullname) user.fullname = fullname;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }
//     if (workstatus) user.workstatus = workstatus;
//     if (city) user.city = city;
//     if (education) user.education = education;
//     if (MobileNumber) user.MobileNumber = MobileNumber;
//     if (skills) user.skills = skills;
//     if (resume) user.resume = resume;
//     if (description) user.description = description;
//     if (profilePhoto) user.profilePhoto = profilePhoto;

//     // Save the updated user
//     await user.save();

//     // Return updated user fields (exclude sensitive data)
//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         city: user.city,
//         education: user.education,
//         skills: user.skills,
//         workstatus: user.workstatus,
//         resume: user.resume,
//         description: user.description,
//         profilePhoto: user.profilePhoto,
//         updatedAt: user.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = profileedit;



const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const profileedit = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required in the URL params." });
  }

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }

  const {
    fullname,
    email,
    password,
    workstatus,
    city,
    education,
    mobileNumber,
    skills,
    resume,
    profilePhoto,
    experience,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields only if provided
    if (fullname !== undefined) user.fullname = fullname;
    if (email !== undefined) user.email = email;
    if (workstatus !== undefined) user.workstatus = workstatus;
    if (city !== undefined) user.city = city;
    if (education !== undefined) user.education = education;
    if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
    if (skills !== undefined) user.skills = skills;
    if (resume !== undefined) user.resume = resume;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;
    if (experience !== undefined) user.experience = experience;

    // If password provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({ user: userObj });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ message: "Server error while updating profile" });
  }
};

module.exports = profileedit;
