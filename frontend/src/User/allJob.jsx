import { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import axios from "axios";
import JobDetails from "../UserComponent/JobDetails";

function AllJob() {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5000/api/job/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobList = response.data.jobs || [];
      setFilteredJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  

  const handleApply = async (jobId, jobTitle, companyName, designation) => {
    try {
      // Show confirmation alert
      const isConfirmed = window.confirm(
        `Are you sure you want to apply for ${jobTitle} at ${companyName} ?`
      );
      if (!isConfirmed) return;

      setMessage("");

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setMessage("User not found. Please log in again.");
        return;
      }

      const {
        _id,
        fullname,
        email,
        city,
        mobileNumber,
        workstatus,
        skills = [],
        education = [],
        experience = [],
      } = user;

      if (
        !_id ||
        !fullname ||
        !email ||
        !city ||
        !mobileNumber ||
        !workstatus ||
        !skills.length ||
        !education.length ||
        !experience.length
      ) {
        setMessage("Incomplete user details. Please update your profile.");
        return;
      }

      const applicantData = {
        jobId,
        applicantId: _id,
        fullname,
        email,
        city,
        mobileNumber,
        workstatus,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((s) => s.trim()),
        education: Array.isArray(education)
          ? education
          : education.split(",").map((e) => e.trim()),
        experience: Array.isArray(experience)
          ? experience
          : experience.split(",").map((e) => e.trim()),
        jobTitle,
        companyname: companyName,
        designation,
      };

      // Store application locally
      const storedApplications =
        JSON.parse(localStorage.getItem("applicationData")) || [];
      storedApplications.push(applicantData);
      localStorage.setItem(
        "applicationData",
        JSON.stringify(storedApplications)
      );

      // Send API request
      const response = await axios.post(
        "http://localhost:5000/api/applications/applyJob",
        applicantData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(
        response.data.message || "Application submitted successfully!"
      );
      alert("Your application has been submitted successfully!"); // ✅ Success alert
    } catch (error) {
      console.error("Error applying for job:", error);
      setMessage(
        error.response?.data?.message || "Failed to apply for the job."
      );
      alert("Failed to apply for the job. Please try again."); // ❌ Error alert
    } 
  };

  const handleSaveJob = async (jobId) => {
    try {
      setMessage("");

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setMessage("User not found. Please log in again.");
        return;
      }

      const userId = user._id;

      const response = await axios.post(
        "http://localhost:5000/api/job/savejob",
        { userId, jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Get saved jobs from localStorage
      let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

      // Check if the job is already saved
      if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      }

      setMessage(response.data.message || "Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error);
      setMessage(error.response?.data?.message || "Failed to save the job.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      
      <div className="flex flex-col lg:flex-row gap-8 w-11/12 mx-auto">
        <div className="w-full lg:w-3/4">
          {message && (
            <p className="text-center text-white bg-green-500 px-4 py-2 rounded mb-4">
              {message}
            </p>
          )}

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                    <FaBuilding className="text-gray-700" />
                    {job.companyname || "Untitled Company"}
                  </div>

                  <div className="space-y-2 text-gray-700 text-sm mt-4">
                    <p>
                      <span className="font-medium">💼 Designation:</span>{" "}
                      {job.designation || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">📍 Job Type:</span>{" "}
                      {job.jobType || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">📍 Location:</span>{" "}
                      {job.location || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">💰 Salary:</span>{" "}
                      {job.salaryRange?.min || "N/A"} -{" "}
                      {job.salaryRange?.max || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">📍 Work Mode:</span>{" "}
                      {job.workmode || "N/A"}
                    </p>
                  </div>

                  <div className="flex justify-between gap-4 mt-6">
                    <button
                      onClick={() =>
                        handleApply(
                          job._id,
                          job.title,
                          job.companyname,
                          job.designation
                        )
                      }
                      className="w-1/2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>

                    <button
                      onClick={() => handleSaveJob(job._id)}
                      className="w-1/2 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
                    >
                      Save
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowDetails(true);
                    }}
                    className="w-full mt-4 text-blue-600 text-sm underline text-left hover:text-blue-800"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 text-lg mt-10 col-span-full">
                No jobs found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {showDetails && selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setShowDetails(false)}
          onApply={() => handleApply(selectedJob._id)}
        />
      )}
    </div>
  );
}

export default AllJob;
