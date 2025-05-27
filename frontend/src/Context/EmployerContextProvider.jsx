// import { createContext, useState, useEffect } from "react";

// export const EmployerContext = createContext();

// export const EmployerProvider = ({ children }) => {
//   // Load data from localStorage or set default values
//   const loadFromLocalStorage = (key, defaultValue) => {
//     try {
//       const storedData = localStorage.getItem(key);
//       if (!storedData) return defaultValue;
//       return JSON.parse(storedData);
//     } catch (error) {
//       console.error(`Error loading ${key} from localStorage:`, error);
//       return defaultValue;
//     }
//   };

//   const [jobs, setJobs] = useState(() => loadFromLocalStorage("jobs", []));
//   const [jobDetail, setJobDetail] = useState(() =>
//     loadFromLocalStorage("jobDetail", {
//       _id: "",
//       companyName: "",
//       jobTitle: "",
//       jobType: "",
//       workLocationType: "",
//       salaryType: "",
//       minSalary: "",
//       maxSalary: "",
//       incentive: "",
//       officeAddress: "",
//       jobCity: "",
//       fieldWorkArea: "",
//     })
//   );

//   const [candidateRequirements, setCandidateRequirements] = useState(() =>
//     loadFromLocalStorage("candidateRequirements", {
//       Education: "",
//       EnglishLevel: "",
//       ReqEnglishLevel: "",
//       AdditionalRequirements: {},
//       openForms: [],
//     })
//   );

//   const [companyDetails, setCompanyDetails] = useState(
    
//     {
//       companyName: "",
//       foundedDate: "",
//       website: "",
//       companySize: "",
//       companyType: "",
//       industry: "",
//       about: "",
//     }
//   );

//   // Save data to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem("jobDetail", JSON.stringify(jobDetail));
//   }, [jobDetail]);

//   useEffect(() => {
//     localStorage.setItem(
//       "candidateRequirements",
//       JSON.stringify(candidateRequirements)
//     );
//   }, [candidateRequirements]);

//   useEffect(() => {
//     localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
//   }, [companyDetails]);

//   useEffect(() => {
//     localStorage.setItem("jobs", JSON.stringify(jobs));
//   }, [jobs]);

//   // Function to add a new job
//   const addJob = () => {
//     const newJob = {
//       id: Date.now(),
//       ...jobDetail,
//     };

//     setJobs((prevJobs) => {
//       const updatedJobs = [...prevJobs, newJob];
//       localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//       return updatedJobs;
//     });

//     setJobDetail({
//       companyName: "",
//       jobTitle: "",
//       jobType: "",
//       workLocationType: "",
//       salaryType: "",
//       minSalary: "",
//       maxSalary: "",
//       incentive: "",
//       officeAddress: "",
//       jobCity: "",
//       fieldWorkArea: "",
//     });
//   };

//   // Function to update job details
//   const updateJobDetail = (field, value) => {
//     setJobDetail((prevData) => {
//       const updatedData = { ...prevData, [field]: value };
//       localStorage.setItem("jobDetail", JSON.stringify(updatedData));
//       return updatedData;
//     });
//   };

//   // Function to update candidate requirements
//   const updateCandidateRequirements = (field, value) => {
//     setCandidateRequirements((prev) => {
//       const updatedData = { ...prev, [field]: value };
//       localStorage.setItem(
//         "candidateRequirements",
//         JSON.stringify(updatedData)
//       );
//       return updatedData;
//     });
//   };

//   // Function to update company details
//   const updateCompanyDetails = (updatedDetails) => {
//     setCompanyDetails(updatedDetails);
//     localStorage.setItem("companyDetails", JSON.stringify(updatedDetails));
//   };

//   // Function to update a specific job
//   const updateJob = (updatedJob) => {
//     setJobs((prevJobs) =>
//       prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
//     );
//   };

//   const [imageURL, setImageURL] = useState("")
//   return (
//     <EmployerContext.Provider
//       value={{
//         jobDetail,
//         updateJobDetail,
//         candidateRequirements,
//         updateCandidateRequirements,
//         companyDetails,
//         setCompanyDetails,
//         updateCompanyDetails,
//         jobs,
//         addJob,
//         updateJob,
//         imageURL,
//         setImageURL
//       }}
//     >
//       {children}
//     </EmployerContext.Provider>
//   );
// };





import { createContext, useState, useEffect } from "react";

export const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (err) {
      console.error(`Error loading ${key}`, err);
      return defaultValue;
    }
  };

  const [imageURL, setImageURL] = useState(() => localStorage.getItem("employerImage") || "");
  const [employer, setEmployer] = useState(() => loadFromLocalStorage("employer", {
    fullname: "",
    email: "",
    company: "",
    mobileNumber: "",
    location: "",
  }));

  const [jobs, setJobs] = useState(() => loadFromLocalStorage("jobs", []));
  const [jobDetail, setJobDetail] = useState(() =>
    loadFromLocalStorage("jobDetail", {
      _id: "",
      companyName: "",
      jobTitle: "",
      jobType: "",
      workLocationType: "",
      salaryType: "",
      minSalary: "",
      maxSalary: "",
      incentive: "",
      officeAddress: "",
      jobCity: "",
      fieldWorkArea: "",
    })
  );

  const [candidateRequirements, setCandidateRequirements] = useState(() =>
    loadFromLocalStorage("candidateRequirements", {
      Education: "",
      EnglishLevel: "",
      ReqEnglishLevel: "",
      AdditionalRequirements: {},
      openForms: [],
    })
  );

  const [companyDetails, setCompanyDetails] = useState(() =>
    loadFromLocalStorage("companyDetails", {
      companyName: "",
      foundedDate: "",
      website: "",
      companySize: "",
      companyType: "",
      industry: "",
      about: "",
    })
  );

  useEffect(() => {
    localStorage.setItem("employerImage", imageURL);
  }, [imageURL]);

  useEffect(() => {
    localStorage.setItem("employer", JSON.stringify(employer));
  }, [employer]);

  useEffect(() => {
    localStorage.setItem("jobDetail", JSON.stringify(jobDetail));
  }, [jobDetail]);

  useEffect(() => {
    localStorage.setItem("candidateRequirements", JSON.stringify(candidateRequirements));
  }, [candidateRequirements]);

  useEffect(() => {
    localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
  }, [companyDetails]);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    const newJob = { id: Date.now(), ...jobDetail };
    const updated = [...jobs, newJob];
    setJobs(updated);
  };

  const updateJobDetail = (field, value) =>
    setJobDetail(prev => ({ ...prev, [field]: value }));

  const updateCandidateRequirements = (field, value) =>
    setCandidateRequirements(prev => ({ ...prev, [field]: value }));

  const updateCompanyDetails = (updated) => setCompanyDetails(updated);

  const updateJob = (updatedJob) => {
    const updatedJobs = jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
    setJobs(updatedJobs);
  };

  return (
    <EmployerContext.Provider
      value={{
        imageURL,
        setImageURL,
        employer,
        setEmployer,
        jobs,
        setJobs,
        jobDetail,
        setJobDetail,
        candidateRequirements,
        setCandidateRequirements,
        companyDetails,
        setCompanyDetails, // Make sure this is included
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};
