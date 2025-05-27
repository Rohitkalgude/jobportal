import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmployer = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", { email, verificationCode });
      setMessage(res.data.message);
      navigate("/employer/home")
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 mb-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter verification code"
        className="border p-2 mb-2 w-80"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerify} className="bg-blue-500 text-white p-2 rounded w-80">
        Verify
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default VerifyEmployer;
