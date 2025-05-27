import { AiOutlineClose } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";

const JobDetails = ({ job, onClose, onApply, onSave }) => {
  if (!job) return null;

  // Handle Apply Click
  const handleApply = () => onApply && onApply(job._id);

  // Handle Save Click
  const handleSave = () => onSave && onSave(job._id);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 p-1 transition"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Company Name & Icon */}
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 left-5">
          <FaBuilding className="text-gray-700" />
          {job.companyname || "Company Name"}
        </h2>

        {/* Job Details */}
        <div className="space-y-2 mt-4 text-gray-700 divide-y">
          <p className="pt-2">
            <strong>💼 Designation:</strong> {job.designation || "N/A"}
          </p>
          <p className="pt-2">
            <strong>📍 jobType:</strong> {job.jobType || "N/A"}
          </p>
          <p className="pt-2">
            <strong>📍 Location:</strong> {job.location || "N/A"}
          </p>
          <p className="pt-2">
            <strong>💰 Salary:</strong> {job.salaryRange?.min || "N/A"} -{" "}
            {job.salaryRange?.max || "N/A"}
          </p>
          <p className="pt-2">
            <strong>🎓 Education:</strong> {job.education || "N/A"}
          </p>
          <p className="pt-2">
            <strong>🛠 Skills:</strong> {job.skills?.join(", ") || "N/A"}
          </p>
          <p className="pt-2">
            <strong>🕒 Experience:</strong> {job.experience} years
          </p>
          <p className="pt-2 whitespace-pre-line">
            <strong>📝 Description:</strong> {job.description || "N/A"}
          </p>
          <p className="pt-2">
            <strong>📌 Title:</strong> {job.title || "N/A"}
          </p>
          <p className="pt-2">
            <strong>📍 Workmode:</strong> {job.workmode || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-5">
          <button
            onClick={handleApply}
            className="flex-1 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Apply
          </button>

          <button
            onClick={handleSave}
            className="flex-1 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
