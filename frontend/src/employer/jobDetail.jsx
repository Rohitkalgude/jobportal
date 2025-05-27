import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const JobDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyname: "",
    jobType: "",
    workmode: "",
    designation: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    education: "",
    experience: "",
    title: "",
    description: "",
    skills: "",
    companyLogo: "",
  });
  const user = JSON.parse(localStorage.getItem("employer"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const salaryRange = {
        min: parseInt(formData.minSalary) || 0,
        max: parseInt(formData.maxSalary) || 0,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        id: user._id,
        companyname: formData.companyname,
        jobType: formData.jobType,
        workmode: formData.workmode,
        designation: formData.designation,
        location: formData.location,
        salaryRange,
        education: formData.education,
        experience: formData.experience,
        title: formData.title,
        description: formData.description,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        companyLogo: formData.companyLogo,
      };

      const response = await axios.post(
        "http://localhost:5000/api/job/jobpost",
        body,
        config
      );
      localStorage.setItem("jobpost", JSON.stringify(response.data));

      toast.success("Job Posted successfully!");
      navigate("/employer/Home");
    } catch (err) {
      const message = err.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 mx-auto mt-24 p-8 bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6 underline">
        Post a Job
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Company Name Field */}
        <label className="block">
          Company Name:
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Job Type:
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          >
            <option value="">Select</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
          </select>
        </label>

        <label className="block">
          Work Mode:
          <select
            name="workmode"
            value={formData.workmode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          >
            <option value="">Select</option>
            <option value="work-from-home">Work From Home</option>
            <option value="office">Office</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <label className="block">
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Minimum Salary:
          <input
            type="number"
            name="minSalary"
            value={formData.minSalary}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Maximum Salary:
          <input
            type="number"
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Education:
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          >
            <option value="">Select</option>
            {[
              "Any postGraduate",
              "BCA",
              "MCA",
              "BSC",
              "MSC",
              "Any Graduate",
              "B.Tech/B.E",
              "Diploma",
            ].map((edu) => (
              <option key={edu} value={edu}>
                {edu}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Experience (Years):
          <input
            type="number"
            name="experience"
            value={formData.experience}
            min="0"
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Job Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Job Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          ></textarea>
        </label>

        <label className="block">
          Skills (Comma separated):
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>

        <label className="block">
          Company Logo (URL):
          <input
            type="text"
            name="companyLogo"
            value={formData.companyLogo}
            onChange={handleChange}
            required
            className="w-full p-2 border border-blue-400 rounded-lg"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
      >
        Post Job
      </button>
    </form>
  );
};

export default JobDetail;
