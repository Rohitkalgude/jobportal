const bcrypt = require("bcryptjs");
const Setting = require("../../models/setting");
const User = require("../../models/User");

const notification = async (req, res) => {
    try {
        const { id } = req.params; // 
        console.log("User ID:", id);

        const { email, mobileNumber, password, profileVisibility, notificationsEnabled } = req.body;


        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        let updateData = { email, mobileNumber, profileVisibility, notificationsEnabled };

        // ✅ Hash password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // ✅ Find settings by userId
        const updatedSettings = await Setting.findOneAndUpdate(
            { userId: userExists._id },  // Match by userId
            updateData,
            { new: true }
        );

        if (!updatedSettings) {
            return res.status(404).json({ message: "Settings not found for this user" });
        }

        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = notification;
