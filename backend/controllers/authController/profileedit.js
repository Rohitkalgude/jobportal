const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const profileedit = async (req, res) => {
  const userId = req.params.id;
  const {
    fullname,
    email,
    password,
    workstatus,
    city,
    education,
    MobileNumber,
    skills,
    resume,
    description, // Corrected typo
    profilePhoto,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being updated and already exists
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      user.email = email;
    }

    // Update user fields
    if (fullname) user.fullname = fullname;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (workstatus) user.workstatus = workstatus;
    if (city) user.city = city;
    if (education) user.education = education;
    if (MobileNumber) user.MobileNumber = MobileNumber;
    if (skills) user.skills = skills;
    if (resume) user.resume = resume;
    if (description) user.description = description;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    // Save the updated user
    await user.save();

    // Return updated user fields (exclude sensitive data)
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        city: user.city,
        education: user.education,
        skills: user.skills,
        workstatus: user.workstatus,
        resume: user.resume,
        description: user.description,
        profilePhoto: user.profilePhoto,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = profileedit;
