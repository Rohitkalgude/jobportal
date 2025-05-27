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
import { Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({
    fullname: "",
    city: "",
    email: "",
    mobileNumber: "",
    workstatus: "experienced",
    education: "",
    profilePhoto: "",
    resume: "", // <- ✅ Add this line
    experience: [],
    skills: "",
    savedJobs: [],
    appliedJobs: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);


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
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        user
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsEditing(false);
      // navigate("/user/job");
    } catch (error) {
      console.error("Error updating profile:", error);
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

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PDF or Word document.");
      return;
    }
  
    setLoading(true);
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "HireBridge");
    data.append("cloud_name", "dizgp2fdp");
    data.append("resource_type", "raw");
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dizgp2fdp/raw/upload",
        {
          method: "POST",
          body: data,
        }
      );
  
      const result = await response.json();
  
      if (result.secure_url) {
        const updatedUser = { ...user, resume: result.secure_url };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser)); 
        console.log("Resume uploaded and saved:", updatedUser.resume);
      } else {
        alert("Resume upload failed. Try again.");
      }
    } catch (err) {
      console.error("Resume upload failed", err);
      alert("An error occurred while uploading resume.");
    } finally {
      setLoading(false);
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
            {user.email}
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

        {isEditing && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
            />
            {loading && (
              <p className="text-sm text-gray-500 mt-2">Uploading resume...</p>
            )}
            {user.resume && !loading && (
              <p className="mt-2 text-sm text-green-600">
                Uploaded:{" "}
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  View Resume
                </a>
              </p>
            )}
          </div>
        )}

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







// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUser } from "react-icons/fa";
// import {
//   IoLocationOutline,
//   IoMailOutline,
//   IoCallOutline,
// } from "react-icons/io5";
// import { BiUpload, BiSolidShoppingBags } from "react-icons/bi";
// import { MdSchool, MdBookmark } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";

// function UserProfile() {
//   const [user, setUser] = useState({
//     fullname: "",
//     city: "",
//     email: "",
//     mobileNumber: "",
//     workstatus: "experienced",
//     education: "",
//     profilePhoto: "",
//     resume: "",
//     experience: [],
//     skills: "",
//     savedJobs: [],
//     appliedJobs: [],
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [imgLoading, setImgLoading] = useState(false);
//   const [resumeLoading, setResumeLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImgLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "HireBridge");
//     formData.append("cloud_name", "dizgp2fdp");

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dizgp2fdp/image/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       const updatedUser = { ...user, profilePhoto: data.url };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch (err) {
//       console.error("Image upload failed", err);
//     } finally {
//       setImgLoading(false);
//     }
//   };

//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setResumeLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "HireBridge");
//     formData.append("cloud_name", "dizgp2fdp");

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dizgp2fdp/raw/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       const updatedUser = { ...user, resume: data.secure_url }; // ✅ fixed typo
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch (err) {
//       console.error("Resume upload failed", err);
//     } finally {
//       setResumeLoading(false);
//     }
//   };

//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.put("http://localhost:5000/api/auth/profile", user);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);
//       setIsEditing(false);
//       navigate("/user/job");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-screen h-screen fixed bg-gradient-to-r from-blue-100 to-purple-100 py-10 overflow-auto">
//       <div className="w-11/12 max-w-3xl mb-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
//         {/* Profile Header */}
//         <div className="flex items-center border-b pb-4">
//           <div className="relative">
//             <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//               {imgLoading ? (
//                 <FaUser className="text-white text-4xl" />
//               ) : user.profilePhoto ? (
//                 <img
//                   src={user.profilePhoto}
//                   alt="Profile"
//                   className="rounded-full h-24 w-24 object-cover"
//                 />
//               ) : (
//                 <FaUser className="text-white text-4xl" />
//               )}
//             </div>
//             {isEditing && (
//               <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
//                 <BiUpload className="text-lg" />
//                 <input type="file" onChange={handleImageUpload} className="hidden" />
//               </label>
//             )}
//           </div>

//           <div className="ml-6 w-full">
//             {isEditing ? (
//               <input
//                 name="fullname"
//                 value={user.fullname}
//                 onChange={handleInputChange}
//                 className="border p-2 rounded w-full"
//               />
//             ) : (
//               <h2 className="text-2xl font-semibold">{user.fullname}</h2>
//             )}

//             {isEditing ? (
//               <input
//                 name="skills"
//                 value={user.skills}
//                 onChange={handleInputChange}
//                 className="border p-2 rounded w-full mt-2"
//               />
//             ) : (
//               <p className="text-gray-600">{user.skills}</p>
//             )}

//             <div className="flex mt-2 text-gray-500">
//               <IoLocationOutline className="text-xl" />
//               {isEditing ? (
//                 <input
//                   name="city"
//                   value={user.city}
//                   onChange={handleInputChange}
//                   className="border p-2 rounded w-full ml-2"
//                 />
//               ) : (
//                 <p className="ml-2">{user.city}</p>
//               )}
//             </div>
//           </div>

//           <button
//             className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
//           >
//             {isEditing ? (loading ? "Saving..." : "Save") : "Edit Profile"}
//           </button>
//         </div>

//         {/* Contact Information */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
//           <p className="flex items-center">
//             <IoMailOutline className="text-xl mr-2 text-blue-500" />
//             {user.email}
//           </p>
//           <p className="flex items-center mt-2">
//             <IoCallOutline className="text-xl mr-2 text-blue-500" />
//             {isEditing ? (
//               <input
//                 name="mobileNumber"
//                 value={user.mobileNumber}
//                 onChange={handleInputChange}
//                 className="border p-2 rounded w-full"
//               />
//             ) : (
//               user.mobileNumber
//             )}
//           </p>
//         </div>

//         {/* Work Status */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Work Status</h3>
//           {isEditing ? (
//             <select
//               name="workstatus"
//               value={user.workstatus}
//               onChange={handleInputChange}
//               className="border p-2 rounded w-full"
//             >
//               <option value="experienced">Experienced</option>
//               <option value="fresher">Fresher</option>
//             </select>
//           ) : (
//             <p className="text-gray-700 capitalize">{user.workstatus}</p>
//           )}
//         </div>

//         {/* Education */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Education</h3>
//           <p className="flex items-center">
//             <MdSchool className="text-xl mr-2 text-blue-500" />
//             {isEditing ? (
//               <input
//                 name="education"
//                 value={user.education}
//                 onChange={handleInputChange}
//                 className="border p-2 rounded w-full"
//               />
//             ) : (
//               user.education
//             )}
//           </p>
//         </div>

//         {/* Experience */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Experience</h3>
//           {isEditing ? (
//             <textarea
//               name="experience"
//               value={user.experience.join("\n")}
//               onChange={(e) =>
//                 setUser((prev) => ({
//                   ...prev,
//                   experience: e.target.value.split("\n"),
//                 }))
//               }
//               className="border p-2 rounded w-full"
//             />
//           ) : user.experience.length ? (
//             <ul className="list-disc ml-6">
//               {user.experience.map((exp, idx) => (
//                 <li key={idx}>{exp}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No experience added</p>
//           )}
//         </div>

//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//   <h3 className="text-lg font-semibold mb-2">Resume</h3>

//   {isEditing && (
//     <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">
//       <BiUpload /> Upload Resume
//       <input
//         type="file"
//         onChange={handleResumeUpload}
//         className="hidden"
//         accept=".pdf,.doc,.docx"
//       />
//       {resumeLoading && (
//         <span className="text-sm text-gray-500">Uploading...</span>
//       )}
//     </label>
//   )}

//   {user.resume && (
//     <p className="mt-2">
//       <a
//         href={user.resume}
//         target="_blank"
//         rel="noreferrer"
//         className="text-blue-500 underline"
//       >
//         View Uploaded Resume
//       </a>
//     </p>
//   )}
// </div>

//         {/* Jobs Section */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">My Jobs</h3>
//           <div className="flex justify-between">
//             <Link to="/user/savedjobs" className="flex items-center text-blue-600 hover:underline">
//               <MdBookmark className="text-xl mr-2" />
//               Saved Jobs
//             </Link>
//             <Link to="/user/appliedJobs" className="flex items-center text-blue-600 hover:underline">
//               <BiSolidShoppingBags className="text-xl mr-2" />
//               Applied Jobs
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
