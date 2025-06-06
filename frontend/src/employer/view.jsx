import { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import {
  FaGraduationCap,
  FaTools,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import {  toast } from "react-toastify";

const EmployerJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const storedApplications =
          JSON.parse(localStorage.getItem("applicationData")) || [];

        if (!storedApplications.length) {
          throw new Error("No job application data found.");
        }

        const jobIds = [...new Set(storedApplications.map((app) => app.jobId))];
        const allApplications = [];

        for (const jobId of jobIds) {
          const res = await fetch(
            `http://localhost:5000/api/applications/applicantjob/${jobId}`
          );
          if (!res.ok) throw new Error("Failed to fetch applications");
          const data = await res.json();

          if (Array.isArray(data.applicants)) {
            allApplications.push(...data.applicants);
          }
        }

        setApplications(allApplications);
      } catch (err) {
        setError(err.message || "Something went wrong.");
        toast.error(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusUpdate = async (applicantId, jobId, email, status) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/applications/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicantId, jobId, status, email }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status.");

      toast.success(`Application ${status.toUpperCase()} successfully!`);

      // Optionally update the UI
      setApplications((prev) =>
        prev.map((app) =>
          app.applicantId === applicantId && app.jobId === jobId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      toast.error(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Applied Jobs</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && applications.length === 0 && (
          <p className="text-center text-gray-500">No applications found.</p>
        )}

        <div className="grid gap-6">
          {applications.map((app, index) => (
            <div
              key={`${app.applicantId}-${index}`}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaBuilding className="text-indigo-600" />
                {app.companyName || "Company"}
              </p>
              <p className="text-md font-medium flex items-center gap-2 mb-3">
                <FaBuilding className="text-indigo-400" />
                {app.designation || "Designation"}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <AiOutlineUser className="text-blue-600" />
                <span className="font-semibold">Fullname:</span> {app.fullname}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <AiOutlineMail className="text-red-500" />
                <span className="font-semibold">Email:</span> {app.email}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <MdLocationOn className="text-orange-500" />
                <span className="font-semibold">City:</span> {app.city}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <FaGraduationCap className="text-indigo-500" />
                <span className="font-semibold">Education:</span>{" "}
                {app.education}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <FaTools className="text-teal-500" />
                <span className="font-semibold">Skills:</span>{" "}
                {app.skills?.join(", ") || "N/A"}
              </p>

              <p className="text-gray-700 flex items-center gap-2">
                <FaBriefcase className="text-pink-500" />
                <span className="font-semibold">Experience:</span>{" "}
                {app.experience?.join(", ") || "N/A"}
              </p>

              {app.resume && app.resume !== "No resume uploaded" ? (
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-400 mt-2">No Resume Available</p>
              )}

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      app.applicantId,
                      app.jobId,
                      app.email,
                      "approved"
                    )
                  }
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      app.applicantId,
                      app.jobId,
                      app.email,
                      "rejected"
                    )
                  }
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerJobApplications;
