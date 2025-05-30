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
        companyDetails,
        setCompanyDetails, // Make sure this is included
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};
