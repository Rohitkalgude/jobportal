// import { createContext, useState, useEffect } from "react";

// // Create Context
// export const CompanyContext = createContext();

// // Context Provider Component
// export const CompanyProvider = ({ children }) => {
//     const [companyDetails, setCompanyDetails] = useState(() => {
//         const storedData = localStorage.getItem("companyDetails");
//         return storedData
//             ? JSON.parse(storedData)
//             : [
//                 { label: "Company name", value: "Enter company name" },
//                 { label: "Founded", value: "Enter founding year" },
//                 { label: "Website", value: "Enter website URL" },
//                 { label: "Company size", value: "Enter company size" },
//                 { label: "Type of company", value: "Enter type" },
//                 { label: "Industry", value: "Enter industry" },
//                 { label: "About Company", value: "Enter company description" },
//             ];
//     });

//     // Save updates to localStorage whenever companyDetails change
//     useEffect(() => {
//         localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
//     }, [companyDetails]);

//     // Function to update company details
//     const updateCompanyDetails = (field, value) => {
//         setCompanyDetails((prevDetails) =>
//             prevDetails.map((item) =>
//                 item.label === field ? { ...item, value } : item
//             )
//         );
//     };

//     return (
//         <CompanyContext.Provider value={{ companyDetails, updateCompanyDetails }}>
//             {children}
//         </CompanyContext.Provider>
//     );
// };
