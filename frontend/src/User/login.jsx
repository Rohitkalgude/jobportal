import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "635751711559-ct5n87g36u8ks7eodmtldmi722h840le.apps.googleusercontent.com";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/user/home");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleSuccess = async (response) => {
    try {
      const googleResponse = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: response.credential }),
      });

      const data = await googleResponse.json();
      if (!googleResponse.ok) throw new Error(data.message || "Google login failed");

      localStorage.setItem("token", data.token);
      alert("Google Login successful!");
      navigate("/user/home");
    } catch (error) {
      setError(error.message || "Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="w-2/3 max-w-xl bg-white shadow-2xl rounded-xl py-16 px-10">
          <div className="flex justify-center mb-4">
            <img src="/user.png" alt="logo" className="h-32" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">User Login</h2>

          {/* Normal Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-xl font-medium">Email ID</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email-Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-500 rounded-lg focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-xl font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-500 rounded-lg focus:outline-none"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-sky-500 w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed. Try again.")}
            />
          </div>

          <p onClick={() => navigate("/")} className="mt-5 cursor-pointer font-medium text-black text-center">
            Back to home page?
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;








// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const clientId =
//   "635751711559-ct5n87g36u8ks7eodmtldmi722h840le.apps.googleusercontent.com";

// function LoginForm() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login failed");

//       localStorage.setItem("token", data.token);
//       alert("Login successful!");
//       navigate("/user/home");
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (response) => {
//     try {
//       const googleResponse = await fetch(
//         "http://localhost:5000/api/auth/google",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ tokenId: response.credential }),
//         }
//       );

//       const data = await googleResponse.json();
//       if (!googleResponse.ok)
//         throw new Error(data.message || "Google login failed");

//       localStorage.setItem("token", data.token);
//       alert("Google Login successful!");
//       navigate("/user/home");
//     } catch (error) {
//       setError(error.message || "Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">

//         {/* Right Side - Form */}
//         <div className="md:w-1/2 lg:w-2/5 flex items-center justify-center px-6 py-12">
//           <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
//             <div className="flex justify-center mb-4">
//               <img className="h-16" src="/Logo.png" alt="Logo" />
//             </div>
//             <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//               User Login
//             </h2>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-lg font-semibold">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-lg font-semibold">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               {error && <p className="text-red-500 mb-4">{error}</p>}

//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition duration-300"
//                 disabled={loading}
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>
//             </form>

//             <div className="mt-6 flex justify-center">
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => setError("Google login failed.")}
//               />
//             </div>

//             <p
//               onClick={() => navigate("/")}
//               className="mt-6 text-center text-blue-600 cursor-pointer hover:underline"
//             >
//               Back to home page?
//             </p>
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default LoginForm;
