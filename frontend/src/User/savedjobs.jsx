import { useState, useEffect } from "react";
import axios from "axios";
import JobDetails from "../UserComponent/JobDetails";
import { FaBuilding } from "react-icons/fa";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          setMessage("User not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/job/savedjobs/${user._id}`);
        setSavedJobs(response.data.savedJobs || []);
      } catch (error) {
        setMessage("Failed to fetch saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleApply = async (job) => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        setMessage("User not found. Please log in again.");
        return;
      }

      const applicationData = {
        jobId: job._id,
        applicantId: user._id,
        fullname: user.fullname,
        email: user.email,
        city: user.city,
        mobileNumber: user.mobileNumber,
        workstatus: user.workstatus,
        skills: user.skills || [],
        education: user.education || [],
        experience: user.experience || [],
        jobTitle: job.title,
        companyname: job.companyname,
        designation: job.designation,
      };

      const storedApplications = JSON.parse(localStorage.getItem("applicationData")) || [];
      localStorage.setItem("applicationData", JSON.stringify([...storedApplications, applicationData]));

      const response = await axios.post(
        "http://localhost:5000/api/applications/applyJob",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Application submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to apply for the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold underline underline-offset-1 text-center mb-10">Saved Jobs</h2>

        {loading && <p className="text-white text-center">Loading...</p>}

        {message && (
          <p
            className={`text-center mb-6 ${
              message.toLowerCase().includes("fail") ? "text-red-200" : "text-green-200"
            }`}
          >
            {message}
          </p>
        )}

        {!loading && savedJobs.length === 0 && (
          <p className="text-white text-center">No saved jobs found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mb-2">
                <FaBuilding className="text-gray-700" />
                {job.companyname || "Untitled Company"}
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <p><span className="font-medium">💼 Designation:</span> {job.designation || "N/A"}</p>
                <p><span className="font-medium">📍 Job Type:</span> {job.jobType || "N/A"}</p>
                <p><span className="font-medium">📍 Location:</span> {job.location || "N/A"}</p>
                <p><span className="font-medium">💰 Salary:</span> {job.salaryRange?.min || "N/A"} - {job.salaryRange?.max || "N/A"}</p>
                <p><span className="font-medium">📍 Work Mode:</span> {job.workmode || "N/A"}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => handleApply(job)}
                  className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Apply
                </button>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowDetails(true);
                  }}
                  className="text-blue-600 text-sm underline hover:text-blue-800 text-left"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {showDetails && (
          <JobDetails job={selectedJob} onClose={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
