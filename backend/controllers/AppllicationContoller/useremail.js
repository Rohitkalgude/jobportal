// const mongoose = require("mongoose");
// const Application = require("../../models/Application");
// const sendEmail = require("../../config/sendEmail");

// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { status, applicantId } = req.body;
    
//     if (!applicantId || !status) {
//       return res.status(400).json({ message: "Application ID and status are required." });
//     }

//     const validStatuses = ["approved", "rejected"];
//     if (!validStatuses.includes(status.toLowerCase())) {
//       return res.status(400).json({ message: "Invalid status. Use 'approved' or 'rejected'." });
//     }

//     // ✅ Ensure applicantId is always an array
//     const applicationIds = Array.isArray(applicantId) ? applicantId : [applicantId];

//     // ✅ Query using `applicant` field (Not `_id`)
//     const applications = await Application.find({ applicant: { $in: applicationIds.map(String) } }).lean();

//     if (!applications.length) {
//       return res.status(404).json({ message: "Applications not found." });
//     }

//     const emailRecipients = applications.map((app) => app.email);

//     const subject = `Your Job Application Status - ${status.charAt(0).toUpperCase() + status.slice(1)}`;
//     const message = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2>Job Application Status Update</h2>
//         <p>Your application status has been updated to:</p>
//         <h3 style="color: ${status === "approved" ? "green" : "red"};">
//           ${status.charAt(0).toUpperCase() + status.slice(1)}
//         </h3>
//         ${status === "approved"
//           ? `<p>🎉 Congratulations! Our team will be in touch.</p>`
//           : `<p>😔 We appreciate your effort. Please apply again in the future.</p>`
//         }
//         <p>Best regards,<br><strong>HR Team</strong></p>
//       </div>
//     `;

//     // ✅ Update Status in Bulk
//     await Application.updateMany(
//       { applicant: { $in: applicationIds.map(String) } },
//       { $set: { status: status.toLowerCase() } }
//     );

//     // ✅ Fetch Updated Data
//     const updatedApplications = await Application.find({ applicant: { $in: applicationIds.map(String) } });

//     // ✅ Send email asynchronously
//     setImmediate(() => {
//       sendEmail(emailRecipients.join(","), subject, message)
//         .then(() => console.log("✅ Email sent successfully"))
//         .catch((error) => console.error("❌ Error sending email:", error));
//     });

//     // ✅ Send updated data in response
//     res.json({
//       message: `✅ Application statuses updated to ${status}.`,
//       updatedApplications,
//     });

//   } catch (error) {
//     console.error("❌ Error updating application status:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// module.exports = updateApplicationStatus;




const mongoose = require("mongoose");
const Application = require("../../models/Application");
const sendEmail = require("../../config/sendEmail");

const updateApplicationStatus = async (req, res) => {
  try {
    const { status, applicantId, email } = req.body;

    // Ensure all required fields are provided
    if (!applicantId || !status || !email) {
      return res.status(400).json({ message: "Applicant ID, status, and email are required." });
    }

    // Ensure only one application is processed at a time
    if (Array.isArray(applicantId)) {
      return res.status(400).json({ message: "Only one application can be updated at a time." });
    }

    // Validate status
    const validStatuses = ["approved", "rejected"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status. Use 'approved' or 'rejected'." });
    }

    // Find the application in the database based only on `applicantId`
    const application = await Application.findOne({ applicant: String(applicantId) }).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Update the application status
    application.status = status.toLowerCase();
    await application.save();

    // Get job-specific details
    const jobTitle = application.job?.title || "Unknown Job";
    const jobCompany = application.job?.companyname || "Unknown Company";

    setImmediate(() => {
      sendEmail(
        email,
        `Your Application Status - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        `
          <p>Dear Candidate,</p>
    
          <p>We are pleased to inform you that your application for the position of <b>${jobTitle}</b> at <b>${jobCompany}</b> has been <b>${status}</b>.</p>
    
          <p>Thank you for your interest in joining our team. We will be in touch with the next steps shortly.</p>
    
          <p>Best regards,<br><b>${jobCompany} Recruitment Team</b></p>
        `
      )
        .then(() => console.log(`✅ Email sent to ${email}`))
        .catch((error) => console.error("❌ Error sending email:", error));
    });
    

    return res.json({
      message: `✅ Application status updated.`,
      updatedApplication: application,
    });

  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateApplicationStatus;
