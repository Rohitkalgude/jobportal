const bcrypt = require("bcryptjs");
const Setting = require("../../models/setting");
const User = require("../../models/User");

const contoalprofile = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find settings based on the user's email
        const userSettings = await Setting.findOne({ email: user.email });

        res.status(200).json({
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobileNumber: user.mobileNumber,
                workstatus: user.workstatus,
                location: user.Location,
                city: user.city,
                education: user.education,
                experience: user.experience,
                skills: user.skills,
                resume: user.resume,
                profilePhoto: user.profilePhoto,
                gender: user.gender,
                age: user.age,
            },
            settings: userSettings || {}, // Return empty object if no settings found
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = contoalprofile;
