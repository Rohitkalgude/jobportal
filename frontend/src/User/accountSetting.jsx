import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";

function AccountSetting() {
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const [mailChange, setMailChange] = useState(false);
    const [numberChange, setNumberChange] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);

    // Fetch user details from local storage
    useEffect(() => {
        const userData = localStorage.getItem("user");
    
        if (userData) {
            try {
                const storedUser = JSON.parse(userData);
                setEmail(storedUser?.email || "");
                setMobileNumber(storedUser?.mobileNumber || "");  // ✅ Fixed key name
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    
    // Function to update user data on backend
    const updateUserData = async (updatedData) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const response = await fetch("http://localhost:5000/api/setting/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: storedUser._id, ...updatedData }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify({ ...storedUser, ...updatedData }));
                alert("Account updated successfully!");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error updating account:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="px-6 py-5 bg-blue-100 rounded-xl">
            <p className="text-2xl font-semibold text-gray-600">Account Settings</p>
            <p className="mt-1 font-light text-gray-500">Change your email, mobile number, or password.</p>

            {/* Email Section */}
            <div className="mt-6">
                <p className="font-semibold">Email Address</p>
                {mailChange ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            className="h-10 w-1/2 px-4 mt-2 border border-gray-400 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => setMailChange(false)} className="text-blue-500">Cancel</button>
                            <button
                                onClick={() => { updateUserData({ email }); setMailChange(false); }}
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500">{email}</p>
                        <p className="text-blue-500 cursor-pointer" onClick={() => setMailChange(true)}>Change Email</p>
                    </>
                )}
            </div>

            {/* Mobile Number Section */}
            <div className="mt-6">
                <p className="font-semibold">Mobile Number</p>
                {numberChange ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter new number"
                            className="h-10 w-1/2 px-4 mt-2 border border-gray-400 focus:outline-none focus:border-blue-500"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => setNumberChange(false)} className="text-blue-500">Cancel</button>
                            <button
                                onClick={() => { updateUserData({ mobileNumber }); setNumberChange(false); }}
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500">{mobileNumber}</p>
                        <FaRegEdit className="text-blue-500 cursor-pointer" onClick={() => setNumberChange(true)} />
                    </>
                )}
            </div>

            {/* Password Section */}
            <div className="mt-6">
                <p className="font-semibold">Password</p>
                {passwordChange ? (
                    <>
                        <input
                            type="password"
                            placeholder="New password"
                            className="h-10 w-1/2 px-4 mt-2 border border-gray-400 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => setPasswordChange(false)} className="text-blue-500">Cancel</button>
                            <button
                                onClick={() => { updateUserData({ password }); setPasswordChange(false); }}
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-blue-500 cursor-pointer" onClick={() => setPasswordChange(true)}>Change Password</p>
                )}
            </div>
        </div>
    );
}

export default AccountSetting;
