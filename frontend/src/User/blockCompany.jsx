import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBan } from "react-icons/fa";

function BlockCompany() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyname, setCompanyName] = useState("");

  const handleBlockCompany = async () => {
    if (!companyname) {
      alert("Please enter the company name.");
      return;
    }

    if (!window.confirm(`Are you sure you want to block "${companyname}"?`)) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/job/block", {
        method: "PUT", // Ensure this is PUT (not POST)
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyname }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Company has been blocked successfully.");
        setCompanyName("");
        navigate("/");
      } else {
        alert(`Failed to block company: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error blocking company:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-l-xl p-6 w-full max-w-md bg-blue-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Block Company
      </h1>

      <label htmlFor="companyName" className="block text-gray-600 mb-2">
        Company Name
      </label>
      <input
        type="text"
        id="companyName"
        value={companyname}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter company name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
      />

      <button
        onClick={handleBlockCompany}
        disabled={loading}
        className={`flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
        }`}
        aria-label="Block this company"
      >
        <FaBan className="mr-2" /> {loading ? "Blocking..." : "Block Company"}
      </button>
    </div>
  );
}

export default BlockCompany;
