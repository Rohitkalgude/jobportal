import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const clientId =
    "635751711559-r2l5d2hrbrp7g507vsmdvg9rioonkp2e.apps.googleusercontent.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔹 Sending login request...");
      const response = await fetch(
        "http://localhost:5000/api/employerr/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("🔹 Server response:", data);

      if (!response.ok) throw new Error(data.message || "Login failed");

      toast.success("Login successful!");
      localStorage.setItem("employerr", JSON.stringify(data)); 
      navigate("/employer/home");
    } catch (err) {
      const message = err.message || "Login failed";
      setError(message);
      toast.error(message);
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  const handleGoogleSuccess = async (response) => {
    try {
      console.log("🔹 Google Login Response:", response);

      const googleResponse = await fetch(
        "http://localhost:5000/api/employerr/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }), // ✅ Fix: Use `credential`
        }
      );

      const data = await googleResponse.json();
      if (!googleResponse.ok)
        throw new Error(data.message || "Google login failed");

      localStorage.setItem("token", data.token);
      toast.success("Google login successful!");
      navigate("/employer/home");
    } catch (error) {
      const message = error.message || "Google login failed";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="w-2/3 max-w-xl bg-white shadow-lg rounded-xl py-10 px-20">
          <div className="flex justify-center mb-5">
            <img className="h-72" src="/emp.png" alt="Logo" />
          </div>
         
          {error && <p className="text-red-600 text-center mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="email" className="block text-xl font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 py-2 px-3 w-full bg-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="my-5">
              <label htmlFor="password" className="block text-xl font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 py-2 px-3 w-full bg-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* ✅ Google Login Button */}
          <div className="mt-5 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
            />
          </div>

          <p
            onClick={backToHome}
            className="mt-5 cursor-pointer font-medium text-black text-center"
          >
            Back to home page?
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default EmployerLogin;
