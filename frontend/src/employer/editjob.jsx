import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const EditJob = () => {

 
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Job ID from URL:", id); // Debugging
    const [error, setError] = useState("");

  // Retrieve job data stored in localStorage
  const storedJob = localStorage.getItem("postedJob");
  const initialData = storedJob ? JSON.parse(storedJob) : {};

  const [formData, setFormData] = useState({
    jobType: initialData?.jobType || "",
    workmode: initialData?.workmode || "",
    designation: initialData?.designation || "",
    location: initialData?.location || "",
    salaryRange: {
      min: initialData?.salaryRange?.min || "",
      max: initialData?.salaryRange?.max || ""
    },
    education: initialData?.education || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    skills: initialData?.skills || [],
  });
  

  // Helper function to update specific fields in the form
  const updateJobDetails = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Ensure the job ID exists (you can also use initialData._id if stored)
    if (!id && !initialData.id) {
      setError("Job ID is missing!");
      return;
    }

    try {
      const jobpost = JSON.parse(localStorage.getItem("jobpost"));
      console.log(jobpost)

      const response = await fetch(`http://localhost:5000/api/job/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      // Optionally update localStorage with the new data
      localStorage.setItem("jobToEdit", JSON.stringify({ ...initialData, ...formData }));

      toast.success("Job updated successfully!");
      navigate("/employer/Home");
    } catch (err) {
      const message = err.message || "Job not updated successfully!";
      setError(err.message);
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center py-10 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-blue-100 to-purple-100">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-xl mt-16 p-6 shadow-lg bg-white">
        <p className="text-2xl font-semibold mb-4">Edit Job Details</p>
        {error && <p className="text-red-600 font-medium text-sm mb-4">{error}</p>}

        {/* Job Title */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Job Title</label>
          <input
            type="text"
            value={formData.title}
            placeholder="Enter job title"
            onChange={(e) => updateJobDetails("title", e.target.value)}
            className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          />
        </div>

        {/* Designation */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Designation</label>
          <input
            type="text"
            value={formData.designation}
            placeholder="Enter designation"
            onChange={(e) => updateJobDetails("designation", e.target.value)}
            className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          />
        </div>

        {/* Job Type */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Job Type</label>
          <select
            value={formData.jobType}
            onChange={(e) => updateJobDetails("jobType", e.target.value)}
            className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Location */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Location</label>
          <input
            type="text"
            value={formData.location}
            placeholder="Enter location"
            onChange={(e) => updateJobDetails("location", e.target.value)}
            className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          />
        </div>

        {/* Salary Range */}
        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <label className="text-lg font-semibold">Min Salary</label>
            <input
              type="number"
              value={formData.salaryRange.min}
              placeholder="Min salary"
              onChange={(e) =>
                updateJobDetails("salaryRange", { ...formData.salaryRange, min: e.target.value })
              }
              className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
            />
          </div>

          <div className="flex-1">
            <label className="text-lg font-semibold">Max Salary</label>
            <input
              type="number"
              value={formData.salaryRange.max}
              placeholder="Max salary"
              onChange={(e) =>
                updateJobDetails("salaryRange", { ...formData.salaryRange, max: e.target.value })
              }
              className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Description</label>
          <textarea
            value={formData.description}
            placeholder="Enter job description"
            onChange={(e) => updateJobDetails("description", e.target.value)}
            className="w-full h-32 rounded-lg mt-1 px-4 py-2 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          ></textarea>
        </div>
  
  
        {/* Skills */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Skills (comma-separated)</label>
          <input
            type="text"
            value={formData.skills.join(", ")}
            placeholder="e.g., React, Node.js, MongoDB"
            onChange={(e) =>
              updateJobDetails("skills", e.target.value.split(",").map((s) => s.trim()))
            }
            className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditJob;










// import { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// // import { EmployerContext } from "../Context/EmplyerContext";
// import { EmployerProvider } from "../Context/EmployerContextProvider";

// const EditJob = () => {
//     const { jobType, designation, location, salaryRange, title, description, skills} = useContext(EmployerProvider);
//     const navigate = useNavigate();
//     const { id } = useParams(); // Get job ID from URL

//     const [error, setError] = useState("");
//     const [formData, setFormData] = useState({
//         jobType,
//         designation,
//         location,
//         salaryRange,
//         title,
//         description,
//         skills
//     });

//     const updateJobDetails = (field, value) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!id) {
//             setError("Job ID is missing!");
//             return;
//         }
    
//         try {
//             const response = await fetch(`http://localhost:5000/api/job/edit/${id}`, { 
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });
    
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || "Update failed");
    
//             alert("Job updated successfully!");
//             navigate("/employer/jobs");
//         } catch (err) {
//             setError(err.message);
//         }
//     };
    
//     return (
//         <div className="flex flex-col overflow-y-auto items-center py-10 px-4 sm:px-6 md:px-10">
//             <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-lg mt-5 p-6 shadow-lg">
//                 <p className="text-2xl font-semibold">Edit Job Details</p>
//                 {error && <p className="text-red-600 font-medium text-sm">{error}</p>}

//                 {/* Company Name */}
//                 <div className="mt-4">
//                     <label className="text-lg font-semibold">Company Name <span className="text-red-600">*</span></label>
//                     <input
//                         type="text"
//                         value={formData.companyName}
//                         placeholder="Enter company name"
//                         onChange={(e) => updateJobDetails("companyName", e.target.value)}
//                         className="w-full h-12 rounded-lg mt-1 px-4 border border-gray-600 focus:outline-none focus:border-2 focus:border-blue-600"
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700"
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditJob;
