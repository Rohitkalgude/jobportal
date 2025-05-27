// import { useState, useEffect } from "react";
// import axios from "axios";

// const JobApply = ({ job, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     try {
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } catch (error) {
//       console.error("Failed to parse user data from localStorage", error);
//     }
//   }, []);

//   const storeAppliedJob = (jobId, applicantId) => {
//     try {
//       const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
//       const jobExists = appliedJobs.some((j) => j.jobId === jobId && j.applicantId === applicantId);

//       if (!jobExists) {
//         const updatedJobs = [...appliedJobs, { jobId, applicantId }];
//         localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
//       }
//     } catch (error) {
//       console.error("Error storing applied job in localStorage:", error);
//     }
//   };

//   const applyForJob = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       const token = localStorage.getItem("token");

//       if (!token || !user?.id || !user?.fullname || !user?.email) {
//         setMessage("⚠️ You must be logged in to apply.");
//         setLoading(false);
//         return;
//       }

//       const applicantData = {
//         jobId: job._id,
//         applicantId: user.id,
//         fullname: user.fullname,
//         email: user.email,
//       };

//       await axios.post("http://localhost:5000/api/applications/applyJob", applicantData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage("✅ Application submitted successfully!");
//       storeAppliedJob(job._id, user.id);

//       setTimeout(onClose, 2000);
//     } catch (error) {
//       console.error("Error applying for job:", error);
//       setMessage(error.response?.data?.message || "❌ Failed to apply for the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold text-gray-800">Apply for {job?.designation}</h2>
//         <p className="text-gray-700">{job?.companyname}</p>

//         {message && (
//           <p className={`mt-2 ${message.includes("⚠️") ? "text-yellow-500" : "text-green-500"}`}>
//             {message}
//           </p>
//         )}

//         <div className="flex justify-between mt-5">
//           <button
//             onClick={applyForJob}
//             disabled={loading}
//             className={`w-1/2 mr-2 border border-gray-700 text-gray-700 py-2 rounded-md transition ${
//               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:text-white"
//             }`}
//           >
//             {loading ? "Applying..." : "Apply"}
//           </button>

//           <button
//             onClick={onClose}
//             className="w-1/2 ml-2 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobApply;
