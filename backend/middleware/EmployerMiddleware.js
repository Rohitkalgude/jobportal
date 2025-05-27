  const jwt = require("jsonwebtoken");
  const Employer = require("../models/Employerr");

  const EmployerMiddleware = async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token, authorization denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Ensure `req.user` is set
      console.log(req.user)
      console.log("Decoded Employer ID:", req.user.employerId);

      const employer = await Employer.findById(req.user.employerId);
      if (!employer) return res.status(404).json({ message: "Employer not found" });

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  module.exports = EmployerMiddleware;
