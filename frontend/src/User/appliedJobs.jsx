import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaBriefcase,
  FaCity,
  FaGraduationCap,
  FaTools,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";
import { toast } from "react-toastify";

const UserJobApplications = ({ applicantId }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const cachedData = localStorage.getItem("applicationData");

      if (cachedData) {
        setApplications(JSON.parse(cachedData));
        toast.info("Loaded from cache.");
        return;
      }

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/applications/appliedJobs/${applicantId}`
        );

        const applicationData = data.applications || [];
        setApplications(applicationData);
        localStorage.setItem("applicationData", JSON.stringify(applicationData));
        toast.success("Applications loaded successfully!");
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to load applications.";
        setError(message);
        toast.error(message);
      }
    };

    fetchApplications();
  }, [applicantId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold underline underline-offset-1 mb-8 text-center text-blue-900">
          Your Job Applications
        </h2>

        {error && (
          <p className="text-red-600 font-medium text-center mb-4">
            {error}
          </p>
        )}

        {applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <FaBriefcase /> {app.designation}
                </h3>

                {/* Job Details */}
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <FaBuilding className="text-gray-600" />
                    <strong>Company:</strong> {app.companyname || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserTie className="text-gray-600" />
                    <strong>Job Title:</strong> {app.jobTitle || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCity className="text-gray-600" />
                    <strong>City:</strong> {app.city || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGraduationCap className="text-gray-600" />
                    <strong>Education:</strong>{" "}
                    {Array.isArray(app.education)
                      ? app.education.join(", ")
                      : app.education || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaTools className="text-gray-600" />
                    <strong>Skills:</strong>{" "}
                    {Array.isArray(app.skills)
                      ? app.skills.join(", ")
                      : app.skills || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserTie className="text-gray-600" />
                    <strong>Experience:</strong>{" "}
                    {Array.isArray(app.experience)
                      ? app.experience.join(", ")
                      : app.experience || "N/A"}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {app.jobType && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {app.jobType}
                    </span>
                  )}
                  {app.workmode && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {app.workmode}
                    </span>
                  )}
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaMoneyBillWave className="text-yellow-600" />
                    {app.salary || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <p className="text-gray-600 text-center font-medium">
              No applications found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default UserJobApplications;
