import { useState, useEffect, useContext } from "react";
import { EmployerContext } from "../Context/EmployerContextProvider";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const storedEmployer = JSON.parse(localStorage.getItem("employer")) || {};
  const storedImageURL = localStorage.getItem("employerImage");

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { imageURL, setImageURL } = useContext(EmployerContext);
  const [formData, setFormData] = useState({
    fullname: storedEmployer.fullname || "",
    email: storedEmployer.email || "",
    company: storedEmployer.company || "",
    mobileNumber: storedEmployer.mobileNumber || "",
    location: storedEmployer.location || "",
  });

  useEffect(() => {
    if (storedImageURL) {
      setImageURL(storedImageURL);
    }
  }, [setImageURL, storedImageURL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!storedEmployer?._id) {
      alert("Employer ID not found!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/employerr/profile/${storedEmployer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, imageURL }),
        }
      );

      const data = await response.json();

      if (response.ok && data.updatedEmployer) {
        localStorage.setItem("employer", JSON.stringify(data.updatedEmployer));
        localStorage.setItem("employerImage", imageURL);
        setIsEditable(false);
        alert("Profile updated successfully!");
        navigate("/employer/home"); // ✅ Navigate after save
      } else {
        alert(data.message || "Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
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

      const uploadedImage = await response.json();
      setImageURL(uploadedImage.url);
      localStorage.setItem("employerImage", uploadedImage.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-16">
      <div className="max-w-3xl w-full min-h-[400px] mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          {loading ? (
            <FaUser className="text-white text-5xl" />
          ) : (
            <img
              className="rounded-full h-24 w-24 object-cover"
              src={imageURL || "https://via.placeholder.com/150"}
              alt="Profile"
            />
          )}
          {isEditable && <input onChange={handleImageUpload} type="file" />}
        </div>

        <h3 className="text-lg font-semibold text-gray-700">Basic Details</h3>
        <div className="flex flex-col gap-6 mt-2">
          <div>
            <label className="text-gray-600 text-sm">Full Name *</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Mobile *</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 disabled:opacity-70"
            />
          </div>
        </div>

        <button
          onClick={() => (isEditable ? handleSave() : setIsEditable(true))}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-8"
        >
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
