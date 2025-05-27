import { useState, useEffect, useContext } from "react";
import { EmployerContext } from "../Context/EmployerContextProvider";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";


function CompanyProfile() {
  const { companyDetails = {}, setCompanyDetails } =
    useContext(EmployerContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    companyName: "",
    foundedDate: "",
    website: "",
    companySize: "",
    companyType: "",
    industry: "",
    location: "", // Added missing location field
    about: "",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("companyDetails");
      if (storedData) {
        setCompanyDetails(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error parsing company details:", error);
    }
  }, [setCompanyDetails]);

  // Initialize form values when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setInputValue({
        companyName: companyDetails.companyName || "",
        foundedDate: companyDetails.foundedDate || "",
        website: companyDetails.website || "",
        companySize: companyDetails.companySize || "",
        companyType: companyDetails.companyType || "",
        industry: companyDetails.industry || "",
        location: companyDetails.location || "", // Initialize location
        about: companyDetails.about || "",
      });
    }
  }, [isModalOpen, companyDetails]);

  // Save data to backend
  const handleSave = async () => {
    setError("");

    if (
      !inputValue.companyName ||
      !inputValue.industry ||
      !inputValue.location
    ) {
      setError("Company Name, Industry, and Location are required.");
      return;
    }

    setIsSaving(true);
    setIsModalOpen(false);

    try {
      const updatedDetails = { ...companyDetails, ...inputValue };

      const response = await fetch(
        "http://localhost:5000/api/company/profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDetails),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to save company details");

      // Store company ID in localStorage
      localStorage.setItem("companyId", data.companyId); // Store ID
      localStorage.setItem("companyDetails", JSON.stringify(updatedDetails));

      // Update state
      setCompanyDetails(updatedDetails);
      toast.success("Company details saved successfully!");
      
    } catch (error) {
      const errMsg = error.message || "Something went wrong, please try again.";
      setError(errMsg);
      toast.error(errMsg);    
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-20">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Company Profile</h2>
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mt-2">
          ⚠ Please share company information to improve job seekers' trust.
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <div className="mt-4 space-y-4 px-16">
          {Object.entries(companyDetails || {})
            .filter(([key]) =>
              [
                "companyName",
                "foundedDate",
                "website",
                "companySize",
                "companyType",
                "industry",
                "location",
                "about",
              ].includes(key)
            )
            .map(([key, value], index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)} :
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-md italic">
                    {typeof value === "object"
                      ? value?.value || "Not provided"
                      : value || "Not provided"}
                  </p>
                </div>
              </div>
            ))}
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-green-700 px-3 py-2 text-green-600 rounded-xl font-medium hover:text-white hover:bg-green-600"
            >
              Add Details
            </button>
          </div>
        </div>

        {/* Modal for Editing Field */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <div className="flex justify-end text-2xl cursor-pointer">
                <IoClose onClick={() => setIsModalOpen(false)} />
              </div>
              <form className="mt-2">
                <div>
                  <label
                    htmlFor="companyName"
                    className="font-medium text-lg block"
                  >
                    Company Name :
                  </label>
                  <input
                    id="companyName"
                    placeholder="Enter your company name"
                    value={inputValue.companyName}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        companyName: e.target.value,
                      })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="foundedDate"
                    className="font-medium text-lg block"
                  >
                    Founded Date :
                  </label>
                  <input
                    id="foundedDate"
                    placeholder="Enter company foundation date"
                    value={inputValue.foundedDate}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        foundedDate: e.target.value,
                      })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="website"
                    className="font-medium text-lg block"
                  >
                    Website URL :
                  </label>
                  <input
                    id="website"
                    placeholder="Enter web URL"
                    value={inputValue.website}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, website: e.target.value })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="companySize"
                    className="font-medium text-lg block"
                  >
                    Company Size :
                  </label>
                  <input
                    id="companySize"
                    placeholder="Enter number of total employee"
                    value={inputValue.companySize}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        companySize: e.target.value,
                      })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="companyType"
                    className="font-medium text-lg block"
                  >
                    Company type :
                  </label>
                  <input
                    id="companyType"
                    placeholder="Enter company type"
                    value={inputValue.companyType}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        companyType: e.target.value,
                      })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="industry"
                    className="font-medium text-lg block"
                  >
                    Industry :
                  </label>
                  <input
                    id="industry"
                    placeholder="Enter your company industry"
                    value={inputValue.industry}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, industry: e.target.value })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="location"
                    className="font-medium text-lg block"
                  >
                    Location :
                  </label>
                  <input
                    id="location"
                    placeholder="Enter company location"
                    value={inputValue.location}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, location: e.target.value })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="about" className="font-medium text-lg block">
                    About Company :
                  </label>
                  <input
                    id="about"
                    placeholder="Enter about company"
                    value={inputValue.about}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, about: e.target.value })
                    }
                    className="border border-gray-400 px-2 h-9 rounded w-full"
                  />
                </div>
              </form>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`mt-4 w-full py-2 rounded-md ${
                  isSaving
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyProfile;
