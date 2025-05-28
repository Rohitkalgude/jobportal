import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import UserContext from "../Context/userContext";
import { toast } from "react-toastify";



function User() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { imageURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    mobileNumber: "",
    profilePhoto: "",
    city: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <nav className="sticky top-0 bg-white border-b-2 border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="h-14" src="/Logo.png" alt="Logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-evenly flex-1">
              <div>
                <a
                  onClick={() => navigate("/user/job")}
                  className="text-gray-700 hover:text-gray-900 hover:font-extrabold cursor-pointer text-lg font-semibold"
                >
                  Job
                </a>
              </div>
              <div>
                <a
                  onClick={() => navigate("/user/CompanyData")}
                  className="text-gray-700 hover:text-gray-900 hover:font-extrabold cursor-pointer text-lg font-semibold"
                >
                  Company
                </a>
              </div>
              <div>
                <a
                  onClick={() => navigate("/user/aboutus")}
                  className="text-gray-700 hover:text-gray-900 hover:font-extrabold cursor-pointer text-lg font-semibold"
                >
                  About Us
                </a>
              </div>
            </div>
            {/*user menu icon*/}
            <div
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="flex border-2 border-gray-400 hover:border-blue-500 rounded-3xl px-2 cursor-pointer"
            >
              <div className="flex items-center">
                <button className="p-2 rounded-md text-gray-700 hover:text-gray-900 ">
                  <HiOutlineMenuAlt2 className="h-6 w-6" />
                </button>
              </div>
              <FaRegUserCircle className="h-10 text-3xl text-gray-500" />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMenuOpen ? (
                  <IoClose className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <TiThMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                onClick={() => navigate("/user/job")}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Job
              </a>
              <a
                onClick={() => navigate("/user/")}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Company
              </a>
              <a
                onClick={() => navigate("/user/")}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About Us
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Login
                </button>
                <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Register
                </button>
              </div>
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="px-2 mt-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                  >
                    <CiSearch className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
      {/* Side Panel */}
      {isSidePanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-opacity-25 bg-black"
              onClick={() => setIsSidePanelOpen(false)}
            />
            <section className="absolute inset-y-3 right-24 max-w-full flex">
              {" "}
              {/* Modified to open from the right */}
              <div className="w-screen max-w-md">
                <div className="h-2/5 w-4/5 mt-16 flex flex-col py-6 rounded-2xl bg-white border border-black shadow-lg shadow-black overflow-y-scroll">
                  <div className="flex justify-end mx-5 text-gray-500">
                    <IoClose
                      onClick={() => setIsSidePanelOpen(false)}
                      className="text-4xl"
                    />
                  </div>
                  <div className="flex items-center space-x-6 -mt-2 bg-white rounded-lg">
                    {/* Profile Image Section */}
                    <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center ml-5">
                      {imageURL || userData.profilePhoto ? (
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={imageURL || userData.profilePhoto} // Use imageURL from context or profilePhoto from localStorage
                          alt="Profile"
                        />
                      ) : (
                        <FaUser className="text-white text-5xl" /> // Fallback to the default icon if no image available
                      )}
                    </div>

                    {/* User Info Section */}
                    <div>
                      {/* Full Name */}
                      <p className="text-xl font-semibold text-gray-900">
                        {userData.fullname || "Full Name Not Available"}
                      </p>

                      {/* Mobile Number */}
                      <p className="text-lg text-gray-700">
                        {userData.mobileNumber || "Mobile Number Not Available"}
                      </p>

                      {/* City */}
                      <p className="text-md text-gray-500">
                        {userData.city || "Surat, Guj"}
                      </p>

                      {/* View and Update Profile */}
                      <p
                        onClick={() => {
                          setIsSidePanelOpen(false); // Assuming this function controls panel visibility
                          navigate("/user/profile"); // Redirect to user profile
                        }}
                        className="text-blue-600 pt-2 font-medium cursor-pointer hover:underline"
                      >
                        View & update profile
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-5">
                    <hr className="border-gray-400 w-4/5" />
                  </div>
                  <div className="flex mx-10 mt-6 cursor-pointer">
                    <IoHomeOutline className="text-2xl" />
                    <p
                      className="text-lg font-semibold text-gray-600 mx-2"
                      onClick={() => {
                        navigate("/user/home");
                        setIsSidePanelOpen(!isSidePanelOpen);
                      }}
                    >
                      Home
                    </p>
                  </div>
                  <div className="flex mx-10 mt-6 cursor-pointer">
                    <IoSettingsOutline className="text-2xl" />
                    <p
                      className="text-lg font-semibold text-gray-600 mx-2"
                      onClick={() => {
                        navigate("/user/setting/account");
                        setIsSidePanelOpen(!isSidePanelOpen);
                      }}
                    >
                      Setting
                    </p>
                  </div>
                  <div className="flex mx-10 mt-6 cursor-pointer">
                    <IoMdLogOut className="text-2xl" />
                    <p
                      className="text-lg font-semibold text-gray-600 mx-2"
                      onClick={() => {
                        toast.success("Logout successfully!");
                        navigate("/userLogin");
                        setIsSidePanelOpen(!isSidePanelOpen);
                      }}
                    >
                      Log out
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default User;
