import { useEffect, useState } from "react";
import { FaBuilding, FaSearch } from "react-icons/fa";
import axios from "axios";
import JobDetails from "../UserComponent/JobDetails";
import JobFilters from "../UserComponent/Fillter";
import { toast } from "react-toastify";


function EmployerHome() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5000/api/job/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobList = response.data.jobs || [];
      setJobs(jobList);
      setFilteredJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const applyFilters = () => {
    let filtered = jobs;

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filtered = filtered.filter((job) => {
            const jobValue = job[key];

            // Handle Salary Filter
            if (key === "salary") {
              const salaryRanges = {
                "1-3 Lakhs": [100000, 300000],
                "1-5 Lakhs": [100000, 500000],
                "1-6 Lakhs": [100000, 600000],
                "1-10 Lakhs": [100000, 1000000],
              };

              if (salaryRanges[value]) {
                const [filterMin, filterMax] = salaryRanges[value];
                return (
                  job.salaryRange.min >= filterMin &&
                  job.salaryRange.max <= filterMax
                );
              }
              return false;
            }

            // General filter for other fields
            if (typeof jobValue === "string") {
              return jobValue.toLowerCase() === value.toLowerCase();
            }
            if (typeof jobValue === "number") {
              return jobValue === Number(value);
            }
            return false;
          });
        }
      });
    }

    if (searchTitle.trim()) {
      const lowercasedQuery = searchTitle.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.companyname?.toLowerCase().includes(lowercasedQuery) ||
          job.designation?.toLowerCase().includes(lowercasedQuery) ||
          job.jobType?.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (searchLocation.trim()) {
      const lowercasedLocation = searchLocation.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(lowercasedLocation)
      );
    }

    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId, jobTitle, companyName, designation) => {
    try {
      // Show confirmation alert
      const isConfirmed = window.confirm(
        `Are you sure you want to apply for ${jobTitle} at ${companyName} companyName?`
      );
      if (!isConfirmed) return;

      setLoading(true);

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("User not found. Please log in again.");
        setLoading(false);
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
        toast.error("Incomplete user details. Please update your profile.");
        setLoading(false);
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

      toast.success(
        response.data.message || "Applay Job successfully!"
      );
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("User not found. Please log in again.");
        setLoading(false);
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

      toast.success(response.data.message || "Job saved successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error(error.response?.data?.message || "Failed to save the job.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed w-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="flex flex-col lg:flex-row gap-8 w-11/12 mx-auto ml-5">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-1/4">
          <JobFilters onFiltersChange={setFilters} />
        </div>

        {/* Right Side - Job Listings */}
        <div className="w-full lg:w-3/4">
          <div className="relative mb-6 flex flex-col md:flex-row gap-4">
            {/* Search by Job Title, Company, Job Type */}
            <div className="relative flex items-center bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden w-full">
              <div className="relative flex items-center bg-white border focus-within:border-blue-500 rounded-xl shadow-md overflow-hidden w-full">
                <FaSearch className="text-gray-500 absolute left-4 text-lg" />
                <input
                  type="text"
                  placeholder="Search job titles, companies..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-lg border-none outline-none bg-white"
                />
              </div>

              <span className="mx-2 text-gray-500 cursor-default">|</span>

              <div className="relative flex items-center bg-white border focus-within:border-blue-500 rounded-xl shadow-md overflow-hidden w-full">
                <FaBuilding className="text-gray-500 absolute left-4 text-lg" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-lg border-none outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <button
                onClick={applyFilters}
                className="w-28 py-3 bg-white border border-gray-30 text-blue-500 font-bold  hover:bg-blue-600 hover:text-white rounded-xl transition"
              >
                Find Jobs
              </button>
            </div>
          </div>

      
          {/* Job Cards */}
          <div className="overflow-x-hidden h-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between h-full min-h-[320px] w-full"
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

export default EmployerHome;





// import { useEffect, useState } from "react";
// import { FaBuilding, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import JobDetails from "../UserComponent/JobDetails";
// import JobFilters from "../UserComponent/Fillter";

// function EmployerHome() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [filters, setFilters] = useState({});
//   const [searchTitle, setSearchTitle] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [filters, jobs]);

//   const fetchJobs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axios.get("http://localhost:5000/api/job/jobs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const jobList = response.data.jobs || [];
//       setJobs(jobList);
//       setFilteredJobs(jobList);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = jobs;

//     if (Object.keys(filters).length > 0) {
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value) {
//           filtered = filtered.filter((job) => {
//             const jobValue = job[key];

//             // Handle Salary Filter
//             if (key === "salary") {
//               const salaryRanges = {
//                 "1-3 Lakhs": [100000, 300000],
//                 "1-5 Lakhs": [100000, 500000],
//                 "1-6 Lakhs": [100000, 600000],
//                 "1-10 Lakhs": [100000, 1000000],
//               };

//               if (salaryRanges[value]) {
//                 const [filterMin, filterMax] = salaryRanges[value];
//                 return (
//                   job.salaryRange.min >= filterMin &&
//                   job.salaryRange.max <= filterMax
//                 );
//               }
//               return false;
//             }

//             // General filter for other fields
//             if (typeof jobValue === "string") {
//               return jobValue.toLowerCase() === value.toLowerCase();
//             }
//             if (typeof jobValue === "number") {
//               return jobValue === Number(value);
//             }
//             return false;
//           });
//         }
//       });
//     }

//     if (searchTitle.trim()) {
//       const lowercasedQuery = searchTitle.toLowerCase();
//       filtered = filtered.filter(
//         (job) =>
//           job.companyname?.toLowerCase().includes(lowercasedQuery) ||
//           job.designation?.toLowerCase().includes(lowercasedQuery) ||
//           job.jobType?.toLowerCase().includes(lowercasedQuery)
//       );
//     }

//     if (searchLocation.trim()) {
//       const lowercasedLocation = searchLocation.toLowerCase();
//       filtered = filtered.filter((job) =>
//         job.location?.toLowerCase().includes(lowercasedLocation)
//       );
//     }

//     setFilteredJobs(filtered);
//   };

//   const handleApply = async (jobId, jobTitle, companyName, designation) => {
//     try {
//       // Show confirmation alert
//       const isConfirmed = window.confirm(
//         `Are you sure you want to apply for ${jobTitle} at ${companyName} companyName?`
//       );
//       if (!isConfirmed) return;

//       setLoading(true);
//       setMessage("");

//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user) {
//         setMessage("User not found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       const {
//         _id,
//         fullname,
//         email,
//         city,
//         mobileNumber,
//         workstatus,
//         skills = [],
//         education = [],
//         experience = [],
//       } = user;

//       if (
//         !_id ||
//         !fullname ||
//         !email ||
//         !city ||
//         !mobileNumber ||
//         !workstatus ||
//         !skills.length ||
//         !education.length ||
//         !experience.length
//       ) {
//         setMessage("Incomplete user details. Please update your profile.");
//         setLoading(false);
//         return;
//       }

//       const applicantData = {
//         jobId,
//         applicantId: _id,
//         fullname,
//         email,
//         city,
//         mobileNumber,
//         workstatus,
//         skills: Array.isArray(skills)
//           ? skills
//           : skills.split(",").map((s) => s.trim()),
//         education: Array.isArray(education)
//           ? education
//           : education.split(",").map((e) => e.trim()),
//         experience: Array.isArray(experience)
//           ? experience
//           : experience.split(",").map((e) => e.trim()),
//         jobTitle,
//         companyname: companyName,
//         designation,
//       };

//       // Store application locally
//       const storedApplications =
//         JSON.parse(localStorage.getItem("applicationData")) || [];
//       storedApplications.push(applicantData);
//       localStorage.setItem(
//         "applicationData",
//         JSON.stringify(storedApplications)
//       );

//       // Send API request
//       const response = await axios.post(
//         "http://localhost:5000/api/applications/applyJob",
//         applicantData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage(
//         response.data.message || "Application submitted successfully!"
//       );
//       alert("Your application has been submitted successfully!"); // ✅ Success alert
//     } catch (error) {
//       console.error("Error applying for job:", error);
//       setMessage(
//         error.response?.data?.message || "Failed to apply for the job."
//       );
//       alert("Failed to apply for the job. Please try again."); // ❌ Error alert
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveJob = async (jobId) => {
//     try {
//       setLoading(true);
//       setMessage("");

//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user) {
//         setMessage("User not found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       const userId = user._id;

//       const response = await axios.post(
//         "http://localhost:5000/api/job/savejob",
//         { userId, jobId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Get saved jobs from localStorage
//       let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

//       // Check if the job is already saved
//       if (!savedJobs.includes(jobId)) {
//         savedJobs.push(jobId);
//         localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
//       }

//       setMessage(response.data.message || "Job saved successfully!");
//       setLoading(false);
//     } catch (error) {
//       console.error("Error saving job:", error);
//       setMessage(error.response?.data?.message || "Failed to save the job.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed w-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
//       <div className="flex flex-col lg:flex-row gap-8 w-11/12 mx-auto ml-5">
//         {/* Left Sidebar - Filters */}
//         <div className="w-full lg:w-1/4">
//           <JobFilters onFiltersChange={setFilters} />
//         </div>

//         {/* Right Side - Job Listings */}
//         <div className="w-full lg:w-3/4">
//           <div className="relative mb-6 flex flex-col md:flex-row gap-4">
//             {/* Search by Job Title, Company, Job Type */}
//             <div className="relative flex items-center bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden w-full">
//               <div className="relative flex items-center bg-white border focus-within:border-blue-500 rounded-xl shadow-md overflow-hidden w-full">
//                 <FaSearch className="text-gray-500 absolute left-4 text-lg" />
//                 <input
//                   type="text"
//                   placeholder="Search job titles, companies..."
//                   value={searchTitle}
//                   onChange={(e) => setSearchTitle(e.target.value)}
//                   className="w-full py-3 pl-12 pr-4 text-lg border-none outline-none bg-white"
//                 />
//               </div>

//               <span className="mx-2 text-gray-500 cursor-default">|</span>

//               <div className="relative flex items-center bg-white border focus-within:border-blue-500 rounded-xl shadow-md overflow-hidden w-full">
//                 <FaBuilding className="text-gray-500 absolute left-4 text-lg" />
//                 <input
//                   type="text"
//                   placeholder="Search locations..."
//                   value={searchLocation}
//                   onChange={(e) => setSearchLocation(e.target.value)}
//                   className="w-full py-3 pl-12 pr-4 text-lg border-none outline-none bg-white"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 onClick={applyFilters}
//                 className="w-28 py-3 bg-white border border-gray-30 text-blue-500 font-bold  hover:bg-blue-600 hover:text-white rounded-xl transition"
//               >
//                 Find Jobs
//               </button>
//             </div>
//           </div>

//           {message && (
//             <p className="text-center text-white bg-green-500 px-4 py-2 rounded mb-4">
//               {message}
//             </p>
//           )}

//           {/* Job Cards */}
//           <div className="overflow-x-hidden h-full ">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredJobs.length > 0 ? (
//                 filteredJobs.map((job) => (
//                   <div
//                     key={job._id}
//                     className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between h-full min-h-[320px] w-full"
//                   >
//                     <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
//                       <FaBuilding className="text-gray-700" />
//                       {job.companyname || "Untitled Company"}
//                     </div>

//                     <div className="space-y-2 text-gray-700 text-sm mt-4">
//                       <p>
//                         <span className="font-medium">💼 Designation:</span>{" "}
//                         {job.designation || "N/A"}
//                       </p>
//                       <p>
//                         <span className="font-medium">📍 Job Type:</span>{" "}
//                         {job.jobType || "N/A"}
//                       </p>
//                       <p>
//                         <span className="font-medium">📍 Location:</span>{" "}
//                         {job.location || "N/A"}
//                       </p>
//                       <p>
//                         <span className="font-medium">💰 Salary:</span>{" "}
//                         {job.salaryRange?.min || "N/A"} -{" "}
//                         {job.salaryRange?.max || "N/A"}
//                       </p>
//                       <p>
//                         <span className="font-medium">📍 Work Mode:</span>{" "}
//                         {job.workmode || "N/A"}
//                       </p>
//                     </div>

//                     <div className="flex justify-between gap-4 mt-6">
//                       <button
//                         onClick={() =>
//                           handleApply(
//                             job._id,
//                             job.title,
//                             job.companyname,
//                             job.designation
//                           )
//                         }
//                         className="w-1/2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//                       >
//                         Apply
//                       </button>

//                       <button
//                         onClick={() => handleSaveJob(job._id)}
//                         className="w-1/2 border border-gray-700 text-gray-700 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
//                       >
//                         Save
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => {
//                         setSelectedJob(job);
//                         setShowDetails(true);
//                       }}
//                       className="w-full mt-4 text-blue-600 text-sm underline text-left hover:text-blue-800"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-700 text-lg mt-10 col-span-full">
//                   No jobs found.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Details Modal */}
//       {showDetails && selectedJob && (
//         <JobDetails
//           job={selectedJob}
//           onClose={() => setShowDetails(false)}
//           onApply={() => handleApply(selectedJob._id)}
//         />
//       )}
//     </div>
//   );
// }

// export default EmployerHome;
