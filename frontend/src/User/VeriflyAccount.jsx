import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const email = localStorage.getItem("userEmail"); // Retrieve stored email

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Verification failed");

      alert("Account verified successfully!");
      navigate("user/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600">Verify Your Account</h2>
      <form onSubmit={handleVerify} className="mt-5">
        <label className="block font-bold">Enter Verification Code</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full p-2 border rounded-lg mt-2"
          placeholder="Enter code"
          required
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button type="submit" className="w-full mt-5 py-2 bg-blue-500 text-white rounded-lg">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
