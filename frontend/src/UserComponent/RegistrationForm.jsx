// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/authContext";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const RegistrationForm = () => {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     gender: "",
//     password: "",
//     age: "",
//     city: "",
//     workstatus: "",
//     mobileNumber: "",
//   });

//   const [error, setError] = useState("");

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Registration failed");

//       // ✅ Ensure ID is stored properly
//       localStorage.setItem("token", data.token);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           id: data.user.id, // ✅ Store user ID
//           fullname: data.user.fullname,
//           email: data.user.email,
//           city: data.user.city,
//           workstatus: data.user.workstatus,
//           mobileNumber: data.user.mobileNumber,
//           experience: data.user.experience,

//         })
//       );

//       alert("Registration successful!");
//       navigate("/user/home");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleRegister = async (credentialResponse) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           tokenId: credentialResponse.credential,
//           fullname: formData.fullname || "",
//           email: formData.email || "", // ✅ Include email
//           password: formData.password || "", // ✅ Include password
//           gender: formData.gender || "",
//           age: formData.age || "",
//           city: formData.city || "",
//           workstatus: formData.workstatus || "",
//           mobileNumber: formData.mobileNumber || "",
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.message || "Google registration failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       alert("Google Registration Successful!");
//       navigate("/user/home");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="h-fit w-11/12 sm:w-3/4 md:w-4/6 lg:w-2/5 my-10 mx-auto pb-8 rounded-xl shadow-xl bg-white border border-gray-300">
//       <div className="flex justify-center items-center mt-8">
//         <p className="text-2xl text-blue-700 font-bold">
//           Create your job profile at
//         </p>
//         <img className="h-14 ml-2" src="/Logo.png" alt="Logo" />
//       </div>
//       <form className="mx-10 mt-5" onSubmit={handleRegistration}>
//         {Object.keys(formData).map((field, index) => (
//           <div key={index} className="mt-4">
//             <label className="block font-bold text-lg capitalize">
//               {field.replace("status", " Status")}
//             </label>
//             <input
//               type={
//                 field === "password"
//                   ? "password"
//                   : field === "age"
//                   ? "number"
//                   : "text"
//               }
//               name={field}
//               value={formData[field]}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               placeholder={`Enter your ${field}`}
//               required
//             />
//           </div>
//         ))}
//         {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         <button
//           type="submit"
//           className="w-full mt-5 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-2xl"
//         >
//           Register now
//         </button>
//       </form>

//       {/* Google Registration Button */}
//       <div className="flex flex-col items-center mt-5">
//         <p className="mb-2 text-gray-600">Or register with Google</p>
//         <GoogleOAuthProvider clientId="635751711559-ct5n87g36u8ks7eodmtldmi722h840le.apps.googleusercontent.com">
//           <GoogleLogin
//             onSuccess={handleGoogleRegister}
//             onError={() => console.log("Google Login Failed")}
//           />
//         </GoogleOAuthProvider>
//       </div>

//       <p
//         onClick={() => navigate("/")}
//         className="mt-3 text-center cursor-pointer font-medium"
//       >
//         Back to home page?
//       </p>
//     </div>
//   );
// };

// export default RegistrationForm;





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const RegistrationForm = () => {
  const navigate = useNavigate();

  let quotes = [
    "Build your profile and let recruiters find you",
    "Get job postings delivered right to your email",
    "Find your job and grow your career",
  ];

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    gender: "",
    password: "",
    age: "",
    city: "",
    workstatus: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          fullname: data.user.fullname,
          email: data.user.email,
          city: data.user.city,
          workstatus: data.user.workstatus,
          mobileNumber: data.user.mobileNumber,
          experience: data.user.experience,
        })
      );

      alert("Registration successful!");
      navigate("/user/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex w-11/12 sm:w-3/4 md:w-4/6 lg:w-3/5 my-10 mx-auto rounded-xl shadow-xl bg-white border border-gray-300">

      {/* Left Sidebar (Vertical Card) */}
      <div className="w-96 bg-white rounded-l-xl border-gray-200 border-r-2 shadow-md shadow-gray-600 flex flex-col justify-start">
        <div className="h-64 flex justify-center items-center p-2 bg-gradient-to-t from-ebg to-purple-700 rounded-tl-xl">
          <img src="/Untitled.png" className="h-32 sm:h-48 md:h-36 lg:h-40" alt="Profile Image" />
        </div>
        <p className="text-lg sm:text-lg lg:text-2xl my-4 text-center font-semibold underline underline-offset-8">On Registration, you can</p>
        <div className="pl-10 pr-5 mt-3 flex-1">
          <ul>
            {quotes.map((quote, index) => (
              <li key={index} className="text-sm sm:text-base lg:text-lg font-medium mt-1">
                <GoDotFill className="inline text-black" /> <p className="inline">{quote}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 px-6 py-4 flex flex-col justify-between">
        <div className="flex justify-center items-center mt-4">
          <p className="text-2xl text-blue-700 font-bold">Create your job profile at</p>
          <img className="h-14 ml-2 bg-gradient-to-t from-ebg to-purple-700" src="/Logo.png" alt="Logo" />
        </div>

        <form className="mt-5" onSubmit={handleRegistration}>
          {Object.keys(formData).map((field, index) => (
            <div key={index} className="mt-4">
              <label className="block font-bold text-lg capitalize">{field.replace("status", " Status")}</label>
              <input
                type={field === "password" ? "password" : field === "age" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-5 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-2xl"
          >
            Register now
          </button>
        </form>

        <p
          onClick={() => navigate("/")}
          className="mt-3 text-center cursor-pointer font-medium"
        >
          Back to home page?
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
