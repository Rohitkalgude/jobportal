// import { useState } from "react";

// const defaultFilters = {
//   workMode: "",
//   salary: "",
//   education: "",
//   experience: 0,
// };

// function Filter() {
//   const [filters, setFilters] = useState(defaultFilters);

//   const handleChange = (category, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [category]: value,
//     }));
//   };

//   const handleReset = () => {
//     setFilters(defaultFilters);
//   };

//   return (
//     <div className="p-3 bg-white rounded-lg w-full px-10 max-w-xs grid mt-8 shadow-lg">
//       <div className="flex justify-between items-center mb-3">
//         <h1 className="text-xl font-bold">Filters</h1>
//         <button
//           onClick={handleReset}
//           className="text-blue-500 text-sm underline"
//         >
//           Reset
//         </button>
//       </div>

//       <div className="border-t border-gray-300 pt-3">
//         {[
//           {
//             label: "Work Mode",
//             options: ["Work-from-home", "Office", "Hybrid"],
//             key: "workMode",
//           },
//           {
//             label: "Salary",
//             options: ["0-3 Lakhs", "3-6 Lakhs", "6-10 Lakhs"],
//             key: "salary",
//           },
//           {
//             label: "Education",
//             options: [
//               "Any PostGraduate",
//               "BCA",
//               "MCA",
//               "BSC",
//               "MSC",
//               "Any Graduate",
//               "B.Tech/B.E.",
//               "Diploma",
//             ],
//             key: "education",
//           },
//         ].map(({ label, options, key }) => (
//           <div key={key}>
//             <h2 className="font-medium text-left text-sm mb-3">{label}</h2>
//             {options.map((option) => {
//               const optionId = `${key}-${option.replace(/\s+/g, "-").toLowerCase()}`;
//               return (
//                 <div key={optionId} className="flex items-center mb-2">
//                   <input
//                     type="radio"
//                     id={optionId}
//                     name={key}
//                     value={option}
//                     checked={filters[key] === option}
//                     onChange={() => handleChange(key, option)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={optionId} className="text-gray-600 text-sm">
//                     {option}
//                   </label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}

//         <h2 className="font-medium text-left text-sm mb-3">Experience</h2>
//         <div className="flex items-center">
//           <input
//             type="range"
//             min="0"
//             max="30"
//             value={filters.experience}
//             onChange={(e) => handleChange("experience", parseInt(e.target.value, 10))}
//             className="mr-3 w-3/4"
//           />
//           <label className="text-gray-600 text-sm">
//             {filters.experience} years
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Filter;

import { useState } from "react";

const JobFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    jobType: "",
    workmode: "",
    salary: "",
    education: "",
    experience: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleExperienceChange = (e) => {
    const updatedFilters = {
      ...filters,
      experience: parseInt(e.target.value, 10),
    };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      jobType: "",
      workmode: "",
      salary: "",
      education: "",
      experience: 0,
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <form className="bg-white p-10 rounded-xl shadow-md space-y-5 relative text-lg">
      {/* Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-blue-500 text-lg font-medium underline"
        >
          Reset
        </button>
      </div>

      {/* Job Type */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-800">Job Type</legend>
        {["full-time", "part-time", "internship"].map((type) => (
          <label key={type} className="flex items-center space-x-2 text-xs">
            <input
              type="radio"
              name="jobType"
              value={type}
              checked={filters.jobType === type}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700 capitalize">{type}</span>
          </label>
        ))}
      </fieldset>

      {/* Work Mode */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-800">Work Mode</legend>
        {["work-from-home", "office", "hybrid"].map((mode) => (
          <label key={mode} className="flex items-center space-x-2 text-xs">
            <input
              type="radio"
              name="workmode"
              value={mode}
              checked={filters.workmode === mode}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700 capitalize">
              {mode.replace(/-/g, " ")}
            </span>
          </label>
        ))}
      </fieldset>

      {/* Education */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-800">Education</legend>
        {[
          "Any PostGraduate",
          "BCA",
          "MCA",
          "BSC",
          "MSC",
          "Any Graduate",
          "B.Tech/B.E",
          "Diploma",
        ].map((edu) => (
          <label key={edu} className="flex items-center space-x-2 text-xs">
            <input
              type="radio"
              name="education"
              value={edu}
              checked={filters.education === edu}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700">{edu}</span>
          </label>
        ))}
      </fieldset>

      {/* Experience Slider */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-800">
          Experience (years)
        </legend>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            name="experience"
            min="0"
            max="30"
            value={filters.experience}
            onChange={handleExperienceChange}
            className="w-40 cursor-pointer"
          />
          <span className="text-xs font-medium text-gray-700">
            {filters.experience} yrs
          </span>
        </div>
      </fieldset>

      {/* Salary Selection */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-800">
          Salary Range
        </legend>
        {["1-3 Lakhs", "1-5 Lakhs", "1-7 Lakhs", "1-10 Lakhs"].map((salary) => (
          <label key={salary} className="flex items-center space-x-2 text-xs">
            <input
              type="radio"
              name="salary"
              value={salary}
              checked={filters.salary === salary}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700">{salary}</span>
          </label>
        ))}
      </fieldset>
    </form>
  );
};

export default JobFilters;
