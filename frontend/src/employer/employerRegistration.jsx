import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FcBusinessman } from "react-icons/fc";
import { LuAsterisk } from "react-icons/lu";

function EmployerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    companylogo: "",
    mobileNumber: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match!");
    try {
      const response = await fetch(
        "http://localhost:5000/api/employerr/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("employer", JSON.stringify(data.employer));
      localStorage.setItem("token", data.token);
      alert("Registration successful! Please verify your email.");
      navigate("/employer/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-10">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left side image/content */}
        <div className="w-full max-w-xs bg-gradient-to-t from-ebg to-purple-700 text-white p-5 flex flex-col items-center">
          <FcBusinessman className="text-8xl mb-4" />
          <p className="text-lg text-center font-semibold">On Registration, you can</p>
          <ul className="mt-4 space-y-2 text-sm font-light">
            {[
              "You can post a job",
              "You can hire employees",
              "Search employees using filters",
            ].map((quote, index) => (
              <li key={index}>
                <GoDotFill className="inline text-black mr-1" />
                {quote}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side form */}
        <form onSubmit={handleSubmit} className="w-full p-8 sm:p-10 md:p-12">
          <p className="text-3xl text-gray-800 font-semibold mb-6">
            Let's get you started!
          </p>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {[
            "fullname",
            "company",
            "mobileNumber",
            "email",
            "password",
            "confirmPassword",
            "companylogo",
            "location",
          ].map((field, index) => (
            <div className="mb-5" key={index}>
              <label className="block text-gray-700 font-medium capitalize mb-1">
                {field.replace("Password", " password")}
                <LuAsterisk className="inline ml-1 text-red-600" />
              </label>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formData[field]}
                placeholder={`Enter your ${field}`}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mt-4 transition duration-200"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployerRegistration;
