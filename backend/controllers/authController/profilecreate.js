const User = require("../../models/User");

const updateProfile = async (req, res) => {
  try {
    const { email, fullname, city, mobileNumber, workstatus, education, profilePhoto, skills, experience,resume } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Ensure skills and experience are always arrays
    const formattedSkills = Array.isArray(skills) ? skills : skills ? skills.split(",").map(skill => skill.trim()) : [];
    const formattedExperience = Array.isArray(experience) ? experience : experience ? experience.split(",").map(exp => exp.trim()) : [];

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    // Update user profile
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        fullname,
        city,
        mobileNumber,
        workstatus,
        education,
        profilePhoto,
        resume,
        experience: formattedExperience,
        skills: formattedSkills,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = updateProfile;
