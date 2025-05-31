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
    imageURL: ""
  }));

  


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
    localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
  }, [companyDetails]);


  return (
    <EmployerContext.Provider
      value={{
        imageURL,
        setImageURL,
        employer,
        setEmployer, 
        companyDetails,
        setCompanyDetails, // Make sure this is included
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};
