const bcrypt = require("bcryptjs");
const Setting = require("../../models/setting");
const User = require("../../models/User");

const updateaccount = async (req, res) => {
    try {
        const { userId, email, mobileNumber, password } = req.body;

        if (!userId) {
            console.log("❌ User ID not provided");
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("🔍 Searching for user with ID:", userId);

        let user = await Setting.findById(userId);
        let isFromSetting = true;

        if (!user) {
            console.log("❌ User not found in Setting model. Checking User model...");
            user = await User.findById(userId);
            isFromSetting = false;
            if (!user) {
                return res.status(404).json({ message: "User not found in both collections" });
            }
        }

        // Check for existing mobileNumber in both collections before updating
        if (mobileNumber) {
            const mobileExistsInSetting = await Setting.findOne({ mobilenumber: mobileNumber });
            const mobileExistsInUser = await User.findOne({ mobileNumber: mobileNumber });

            if ((mobileExistsInSetting && mobileExistsInSetting._id.toString() !== userId) ||
                (mobileExistsInUser && mobileExistsInUser._id.toString() !== userId)) {
                return res.status(400).json({ message: "Mobile number is already registered" });
            }
        }

        // Update fields
        if (email) user.email = email;
        if (mobileNumber) {
            if (isFromSetting) {
                user.mobilenumber = mobileNumber;  // Update in Setting collection
            } else {
                user.mobileNumber = mobileNumber;  // Update in User collection
            }
        }
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        console.log("📞 Updated Mobile Number:", mobileNumber);
        await user.save();
        console.log("✅ User updated successfully:", user);

        res.status(200).json({ message: "Account updated successfully", user });

    } catch (error) {
        console.error("🚨 Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = updateaccount;
