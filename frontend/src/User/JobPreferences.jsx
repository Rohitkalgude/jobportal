import { FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Account() {
  const navigate = useNavigate(); // <-- Ensure this is declared correctly

  const handleLogout = () => {
    toast.success("Logout successfully!");
    navigate("/"); 
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.clear(); // Clear all localStorage on account deletion
        toast.success("Your account has been deleted successfully.");
        navigate("/signup"); // You can also redirect to login if you prefer
      } else {
        const data = await response.json();
        alert(`Failed to delete account: ${data.error}`);
        
      }
    } catch (error) {
      const message = error.message || " Delete failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start px-6 py-10 bg-blue-100 rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Account Settings
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 w-44 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mb-4"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>

      <button
        onClick={handleDeleteAccount}
        className="flex items-center px-4 py-2 w-44 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
      >
        <FaTrashAlt className="mr-2" /> Delete Account
      </button>
    </div>
  );
}

export default Account;
