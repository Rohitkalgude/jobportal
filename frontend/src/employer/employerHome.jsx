import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";


function EmployerHome() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/api/job/alljob", config);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/job/delete/${jobId}`, config);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
    } catch (err) {
      const message = err.message || "Failed to delete job.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-5">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 mt-16">
        {/* View Job Button */}
        <button
          onClick={() => navigate("/employer/home/view/detail")}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 font-medium rounded-md shadow-md hover:bg-cyan-600 hover:text-white transition"
        >
          <FaEye className="text-lg" /> View JOB
        </button>

        {/* All Jobs Heading */}
        <h2 className="text-2xl font-extrabold underline text-center flex-1">
          All Jobs ({jobs.length})
        </h2>

        {/* Post Job Button */}
        <button
          onClick={() => navigate("/employer/job_post/detail")}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 font-medium rounded-md shadow-md hover:bg-cyan-600 hover:text-white transition"
        >
          <FaEdit className="text-lg" /> Post a New Job
        </button>
      </div>

      {/* Job List Section */}
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              {/* Job Title & Designation */}
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaBuilding className="text-gray-700" /> {job.companyname || "Untitled Company"}
              </h1>
              <p className="text-gray-600 text-sm mb-3">💼 {job.designation || "No designation provided"}</p>

              {/* Job Details */}
              <div className="space-y-2 text-gray-700 text-sm">
                <p><strong>📍 Job Type:</strong> {job.jobType || "N/A"}</p>
                <p><strong>📍 Location:</strong> {job.location || "N/A"}</p>
                <p><strong>💰 Salary:</strong> {job.salaryRange?.min || "N/A"} - {job.salaryRange?.max || "N/A"}</p>
                <p><strong>🎓 Education:</strong> {job.education || "N/A"}</p>
                <p><strong>🛠 Skills:</strong> {job.skills?.join(", ") || "N/A"}</p>
                <p><strong>🕒 Experience:</strong> {job.experience || "N/A"} years</p>
                <p><strong>📝 Description:</strong> {job.description || "N/A"}</p>
                <p><strong>📌 Title:</strong> {job.title || "N/A"}</p>
                <p><strong>📍 Work Mode:</strong> {job.workmode || "N/A"}</p>
              </div>

              {/* Job Actions */}
              <div className="flex gap-3 mt-5">
                {/* View Button */}
                {/* <button
                  onClick={() => navigate(`/employer/home/view/${job._id}`)}
                  className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
                >
                  <FaEye /> View
                </button> */}

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/employer/home/edit/${job._id}`)}
                  className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
                >
                  <FaEdit /> Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg mt-10 col-span-full">
            No jobs posted yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default EmployerHome;
