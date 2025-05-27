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

const UserJobApplications = ({ applicantId }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("applicationData");

    if (storedData) {
      setApplications(JSON.parse(storedData));
    } else {
      const fetchApplications = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/applications/appliedJobs/${applicantId}`
          );
          const applicationData = response.data.applications;

          localStorage.setItem("applicationData", JSON.stringify(applicationData));
          setApplications(applicationData);
        } catch (err) {
          setError(err.response?.data?.message || "Something went wrong");
        }
      };

      fetchApplications();
    }
  }, [applicantId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold underline underline-offset-1 mb-8 text-center">Your Job Applications</h2>

        {error && <p className="text-red-100 text-center mb-4">{error}</p>}

        {applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <FaBriefcase /> {application.designation}
                </h3>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <FaBuilding className="text-gray-600" />
                    <strong>Company:</strong> {application.companyname}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserTie className="text-gray-600" />
                    <strong>Job Title:</strong> {application.jobTitle}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCity className="text-gray-600" />
                    <strong>City:</strong> {application.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGraduationCap className="text-gray-600" />
                    <strong>Education:</strong>{" "}
                    {Array.isArray(application.education)
                      ? application.education.join(", ")
                      : application.education || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaTools className="text-gray-600" />
                    <strong>Skills:</strong>{" "}
                    {Array.isArray(application.skills)
                      ? application.skills.join(", ")
                      : application.skills || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserTie className="text-gray-600" />
                    <strong>Experience:</strong>{" "}
                    {Array.isArray(application.experience)
                      ? application.experience.join(", ")
                      : application.experience || "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {application.jobType}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    {application.workmode}
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaMoneyBillWave className="text-yellow-600" />{" "}
                    {application.salary || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default UserJobApplications;
