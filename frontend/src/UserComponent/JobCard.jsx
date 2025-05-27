import { useState } from "react";
import PropTypes from "prop-types";
import JobApply from "./JobApply";


const JobCard = ({ jobs = [] }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    if (!Array.isArray(jobs) || jobs.length === 0) {
        return <p className="text-gray-600 text-center">No jobs available</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {jobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-300">
                    <div className="flex items-center gap-4">
                        <img
                            src={job.companyLogo || "https://via.placeholder.com/64"}
                            alt={job.title || "Company Logo"}
                            className="w-16 h-16 rounded-full border border-gray-400"
                        />
                        <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p className="text-gray-700">{job.designation}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">{job.jobType}</span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">{job.workMode}</span>
                    </div>
                    <p className="mt-2 text-gray-800 text-sm">{job.location} | ₹{job.salary}</p>
                    <h4 className="mt-4 font-semibold">Skills Required:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills?.map((skill, i) => (
                            <span key={i} className="bg-gray-300 px-2 py-1 rounded-full text-xs">{skill}</span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm italic">"{job.description}"</p>
                    <p className="mt-4 text-sm font-medium">{job.experience} Years Experience | {job.education}</p>
                    <button
                        onClick={() => {
                            setSelectedJob(job);
                            setModalOpen(true);
                        }}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                        aria-label={`Apply for ${job.title}`}
                    >
                        Apply Now
                    </button>
                </div>
            ))}

            {isModalOpen && <JobApply job={selectedJob} onClose={() => setModalOpen(false)} />}
        </div>
    );
};

JobCard.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            companyLogo: PropTypes.string,
            title: PropTypes.string.isRequired,
            designation: PropTypes.string.isRequired,
            jobType: PropTypes.string.isRequired,
            workMode: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            salary: PropTypes.number.isRequired,
            skills: PropTypes.arrayOf(PropTypes.string),
            description: PropTypes.string.isRequired,
            experience: PropTypes.number.isRequired,
            education: PropTypes.string.isRequired,
        })
    ),
};

export default JobCard;
