import { useEffect, useState } from "react";
import {
  FaIndustry,
  FaMapMarkerAlt,
  FaUsers,
  FaBuilding,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

const CompanyProfile = ({ companyId }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        let storedCompanyId = companyId || localStorage.getItem("companyId");

        if (!storedCompanyId) {
          console.error("No company ID found");
          return;
        }

        storedCompanyId = storedCompanyId.replace(/^:/, "");

        const response = await fetch(
          `http://localhost:5000/api/company/all/${storedCompanyId}`
        );
        const data = await response.json();

        if (data.success) {
          setCompany(data.company);
          localStorage.setItem("companyId", storedCompanyId);
          localStorage.setItem("companyDetails", JSON.stringify(data.company));
        } else {
          console.error("Company not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyProfile();
  }, [companyId]);

  if (!company)
    return (
      <p className="text-white text-center mt-5">Loading company profile...</p>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center underline">
          All Listed Company
        </h2>
        <div className="min-h-screen p-6 flex flex-col items-start justify-start">
          <div className="p-6 w-96 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              {company.companyName}
            </h2>

            <p className="flex items-center gap-2 text-gray-700">
              <FaBuilding className="text-gray-700" /> <strong>Type:</strong>{" "}
              {company.companyType}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              <strong>Location:</strong> {company.location}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaBuilding className="text-gray-700" /> <strong>Founded:</strong>{" "}
              {company.foundedDate}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaUsers className="text-blue-500" /> <strong>Size:</strong>{" "}
              {company.companySize} Employees
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaIndustry className="text-gray-600" />{" "}
              <strong>Industry:</strong> {company.industry}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaGlobe className="text-green-500" /> <strong>Website:</strong>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {company.website}
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaInfoCircle className="text-purple-500" />{" "}
              <strong>About:</strong> {company.about}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
