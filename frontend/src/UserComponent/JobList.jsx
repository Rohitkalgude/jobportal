// import { useState, useEffect } from "react";
// import JobCard from "./JobCard";
// import Filter from "./Fillter";

// const JobList = () => {
//     const [jobs, setJobs] = useState([]);
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [filters, setFilters] = useState({
//         workMode: [],
//         salary: [],
//         education: [],
//         experience: 0,
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/api/job/jobs");
//                 if (!response.ok) throw new Error("Failed to fetch jobs");
//                 const data = await response.json();
//                 setJobs(data);
//                 setFilteredJobs(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJobs();
//     }, []);

//     useEffect(() => {
//         let filtered = jobs.filter((job) => {
//             return (
//                 (filters.workMode.length === 0 || filters.workMode.includes(job.workMode)) &&
//                 (filters.salary.length === 0 || filters.salary.includes(job.salaryRange)) &&
//                 (filters.education.length === 0 || filters.education.includes(job.education)) &&
//                 (filters.experience === 0 || job.experience >= filters.experience)
//             );
//         });
//         setFilteredJobs(filtered);
//     }, [filters, jobs]);

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold text-center mb-6">Available Jobs</h2>
//             <div className="flex gap-6">
//                 <Filter filters={filters} setFilters={setFilters} />
//                 <div className="flex-1">
//                     {loading ? (
//                         <p className="text-center text-gray-600">Loading jobs...</p>
//                     ) : error ? (
//                         <p className="text-center text-red-500">Error: {error}</p>
//                     ) : filteredJobs.length === 0 ? (
//                         <p className="text-center text-gray-600">No jobs available</p>
//                     ) : (
//                         <JobCard jobs={filteredJobs} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobList;
