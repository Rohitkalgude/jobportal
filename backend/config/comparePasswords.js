const bcrypt = require("bcryptjs");

const comparePasswords = async (enteredPassword, storedHash) => {
  try {
    if (!enteredPassword || !storedHash) {
      console.error("❌ Missing password or hash for comparison");
      return false;
    }

    console.log("🔹 Entered Password:", enteredPassword);
    console.log("🔹 Stored Hash:", storedHash);

    // Ensure entered password is a string and trimmed
    const passwordString = enteredPassword.toString().trim();

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(passwordString, storedHash);
    console.log("🔹 Password Match Result:", isMatch);

    return isMatch;
  } catch (error) {
    console.error("❌ Error comparing passwords:", error);
    return false;
  }
};

module.exports = comparePasswords;
