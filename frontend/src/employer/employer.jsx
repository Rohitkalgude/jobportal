import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidSchool } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import "../index.css";
import { EmployerContext } from "../Context/EmployerContextProvider";

function Employer() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { imageURL, employer } = useContext(EmployerContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    company: "",
    mobileNumber: "",
    location: "",
  });

  useEffect(() => {
    setFormData({
      fullname: employer.fullname || "",
      email: employer.email || "",
      company: employer.company || "",
      mobileNumber: employer.mobileNumber || "",
      location: employer.location || "",
    });
  }, [employer]);

  const handleSidePanelToggle = () => {
    setIsSidePanelOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/employerLogin");
  };

  return (
    <>
      {isSidePanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden ">
          <div
            className="absolute inset-0 bg-opacity-25 bg-black"
            onClick={handleSidePanelToggle}
          />
          <section className="absolute inset-y-3 right-24 max-w-full flex">
            <div className="w-screen max-w-md -mt-10 -mr-28">
              <div className="h-fit w-4/5 mt-16 flex flex-col py-6 rounded-2xl bg-white border border-black shadow-lg shadow-black">
                <div className="flex justify-end mx-5 text-gray-500">
                  <IoClose
                    onClick={handleSidePanelToggle}
                    className="text-4xl"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-fit text-gray-600 bg-gray-300 mx-8 rounded-full">
                    {imageURL ? (
                      <img
                        className="rounded-full h-24 w-24 object-cover"
                        src={imageURL}
                        alt="Profile"
                      />
                    ) : (
                      <FaUser className="text-white text-5xl m-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formData.fullname}
                    </p>
                    <p className="text-lg">{formData.mobileNumber}</p>
                  </div>
                </div>

                <div className="flex justify-center mt-5">
                  <hr className="border-gray-400 w-4/5" />
                </div>
                <div
                  className="flex mx-10 mt-6 cursor-pointer"
                  onClick={() => {
                    navigate("/employer/home");
                    setIsSidePanelOpen(false);
                  }}
                >
                  <IoHomeOutline className="text-2xl" />
                  <p className="text-lg font-semibold text-gray-600 mx-2">
                    Home
                  </p>
                </div>

                <div
                  className="flex mx-10 mt-6 cursor-pointer"
                  onClick={() => {
                    navigate("/employer/profile");
                    setIsSidePanelOpen(false);
                  }}
                >
                  <FaRegUser className="text-2xl text-gray-800" />
                  <p className="text-lg font-semibold text-gray-600 mx-2">
                    View Profile
                  </p>
                </div>

                <div
                  className="flex mx-10 mt-6 cursor-pointer"
                  onClick={() => {
                    navigate("/employer/company_profile");
                    setIsSidePanelOpen(false);
                  }}
                >
                  <BiSolidSchool className="text-2xl" />
                  <p className="text-lg font-semibold text-gray-600 mx-2">
                    Company Profile
                  </p>
                </div>

                <div
                  className="flex mx-10 mt-6 cursor-pointer"
                  onClick={handleLogout}
                >
                  <IoMdLogOut className="text-2xl text-red-600" />
                  <p className="text-lg font-semibold text-red-600 mx-2">
                    Log out
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="flex fixed w-screen justify-between h-14 border-b bg-white border-gray-400">
        <div className="my-auto mx-10"><img src="/Logo.png" className="h-12" /></div>
        <div
          onClick={handleSidePanelToggle}
          className="p-4 px-10 cursor-pointer"
        >
          <GiHamburgerMenu className="text-2xl" />
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Employer;


// import { Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose, IoHomeOutline } from "react-icons/io5";
// import { FaUser, FaRegUser } from "react-icons/fa";
// import { BiSolidSchool } from "react-icons/bi";
// import { IoMdLogOut } from "react-icons/io";
// import "../index.css";
// import { EmployerContext } from "../Context/EmployerContextProvider";

// function Employer() {
//   const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
//   const navigate = useNavigate();

//   const { imageURL, employer } = useContext(EmployerContext);

//   const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);

//   const menuItems = [
//     {
//       label: "Home",
//       icon: <IoHomeOutline className="text-2xl" />,
//       route: "/employer/home",
//     },
//     {
//       label: "View Profile",
//       icon: <FaRegUser className="text-2xl text-gray-800" />,
//       route: "/employer/profile",
//     },
//     {
//       label: "Company Profile",
//       icon: <BiSolidSchool className="text-2xl" />,
//       route: "/employer/company_profile",
//     },
//     {
//       label: "Log out",
//       icon: <IoMdLogOut className="text-2xl text-red-600" />,
//       route: "/employerLogin",
//       className: "text-red-600",
//     },
//   ];

//   return (
//     <>
//       {isSidePanelOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-25">
//           <section className="absolute right-24 inset-y-3 w-screen max-w-md flex -mt-10 -mr-28">
//             <div className="h-fit w-4/5 mt-16 flex flex-col py-6 rounded-2xl bg-white border border-black shadow-lg shadow-black">
//               <div className="flex justify-end mx-5 text-gray-500">
//                 <IoClose onClick={toggleSidePanel} className="text-4xl cursor-pointer" />
//               </div>

//               <div className="flex items-center px-8 mt-4">
//                 <div className="w-fit text-gray-600 bg-gray-300 rounded-full mr-5">
//                   {imageURL ? (
//                     <img
//                       src={imageURL}
//                       alt="Profile"
//                       className="rounded-full h-24 w-24 object-cover"
//                     />
//                   ) : (
//                     <FaUser className="text-white text-5xl m-6" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {employer.fullname}
//                   </p>
//                   <p className="text-lg">{employer.mobileNumber}</p>
//                 </div>
//               </div>

//               <div className="flex justify-center mt-5">
//                 <hr className="border-gray-400 w-4/5" />
//               </div>

//               {menuItems.map(({ label, icon, route, className = "" }) => (
//                 <div
//                   key={label}
//                   onClick={() => {
//                     navigate(route);
//                     toggleSidePanel();
//                   }}
//                   className={`flex items-center mx-10 mt-6 cursor-pointer ${className}`}
//                 >
//                   {icon}
//                   <p className={`text-lg font-semibold mx-2 ${className}`}>
//                     {label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       )}

//       <div className="flex fixed top-0 w-screen justify-between h-14 border-b bg-white border-gray-400 z-40">
//         <div className="p-4 px-10 font-bold text-lg">Employer Panel</div>
//         <div
//           onClick={toggleSidePanel}
//           className="p-4 px-10 cursor-pointer"
//         >
//           <GiHamburgerMenu className="text-2xl" />
//         </div>
//       </div>

//       <div className="pt-14">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// export default Employer;
