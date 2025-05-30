import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { BiUpload, BiSolidShoppingBags } from "react-icons/bi";
import { MdSchool, MdBookmark } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    city: "",
    email: "",
    mobileNumber: "",
    workstatus: "experienced",
    education: "",
    profilePhoto: "",
    resume: "", // <-- Add this
    experience: [],
    skills: "",
    savedJobs: [],
    appliedJobs: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        user
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Profile updated successfully!");
      setUser(response.data.user);
      setIsEditing(false);
      navigate("/user/job");
    } catch (err) {
      console.error("Error updating profile:", err);
      const message = err.message || "Update failed";
      setError(message);
      toast.error(message);
    }
    setLoading(false);
  };

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "HireBridge");
    data.append("cloud_name", "dizgp2fdp");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dizgp2fdp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      const updatedUser = { ...user, profilePhoto: result.url };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setImgLoading(false);
    }
  };

  // Resume upload handler - minor improvements, logs result for debug
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "HireBridge");
    data.append("cloud_name", "dizgp2fdp");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dizgp2fdp/raw/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log("Cloudinary upload result:", result); // for debugging

      if (result.secure_url) {
        const updatedUser = { ...user, resume: result.secure_url };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Resume uploaded successfully!");
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (err) {
      console.error("Resume upload failed", err);
      toast.error("Resume upload failed");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen fixed bg-gray-100 py-10 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-11/12 max-w-3xl mb-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center border-b pb-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {imgLoading ? (
                <FaUser className="text-white text-4xl" />
              ) : user.profilePhoto ? (
                <img
                  className="rounded-full h-24 w-24 object-cover"
                  src={user.profilePhoto}
                  alt="Profile"
                />
              ) : (
                <FaUser className="text-white text-4xl" />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                <BiUpload className="text-lg" />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="ml-6 w-full">
            {isEditing ? (
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user.fullname}</h2>
            )}

            {isEditing ? (
              <input
                type="text"
                name="skills"
                value={user.skills}
                onChange={handleInputChange}
                className="border p-2 rounded w-full mt-2"
              />
            ) : (
              <p className="text-gray-600">{user.skills}</p>
            )}

            <div className="flex mt-2 text-gray-500">
              <IoLocationOutline className="text-xl" />
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full ml-2"
                />
              ) : (
                <p className="ml-2">{user.city}</p>
              )}
            </div>
          </div>
          <button
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
          >
            {isEditing ? (loading ? "Saving..." : "Save") : "Edit Profile"}
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>

          <p className="flex items-center">
            <IoMailOutline className="text-xl mr-2 text-blue-500" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              user.email
            )}
          </p>

          <p className="flex items-center mt-2">
            <IoCallOutline className="text-xl mr-2 text-blue-500" />
            {isEditing ? (
              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              user.mobileNumber
            )}
          </p>
        </div>

        {/* Work Status */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Work Status</h3>
          <div className="flex items-center">
            {isEditing ? (
              <select
                name="workstatus"
                value={user.workstatus}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="experienced">Experienced</option>
                <option value="fresher">Fresher</option>
              </select>
            ) : (
              <p className="text-gray-700">
                {user.workstatus === "experienced" ? "Experienced" : "Fresher"}
              </p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <p className="flex items-center">
            <MdSchool className="text-xl mr-2 text-blue-500" />
            {isEditing ? (
              <input
                type="text"
                name="education"
                value={user.education}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              user.education
            )}
          </p>
        </div>

        {/* Experience */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {isEditing ? (
            <textarea
              name="experience"
              value={user.experience ? user.experience.join("\n") : ""}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  experience: e.target.value.split("\n"),
                }))
              }
              className="border p-2 rounded w-full"
            />
          ) : user.experience && user.experience.length > 0 ? (
            <ul className="list-disc ml-6">
              {user.experience.map((exp, i) => (
                <li key={i}>{exp}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No experience added</p>
          )}
        </div>

        {/* Resume Upload */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Resume</h3>

          {user.resume ? (
            <div className="flex items-center justify-between">
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                View Resume
              </a>

              {isEditing && (
                <label className="inline-flex items-center bg-blue-600 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                  <span>Upload New</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ) : isEditing ? (
            <label className="inline-flex items-center bg-blue-600 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              <span>Upload Resume</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          ) : (
            <p className="text-gray-500 italic">No resume uploaded</p>
          )}
        </div>

        {/* My Jobs */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">My Jobs</h3>
          <div className="flex justify-between">
            <Link
              to="/user/savedjobs"
              className="flex items-center text-blue-600 hover:underline"
            >
              <MdBookmark className="text-xl mr-2" /> Saved Jobs
            </Link>
            <Link
              to="/user/appliedJobs"
              className="flex items-center text-blue-600 hover:underline"
            >
              <BiSolidShoppingBags className="text-xl mr-2" /> Applied Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
