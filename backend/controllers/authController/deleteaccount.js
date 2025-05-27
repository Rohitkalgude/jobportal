const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const deleteAccount = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the token

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);
        res.json({ message: "Account deleted successfully." });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account." });
    }
};

module.exports = deleteAccount;
