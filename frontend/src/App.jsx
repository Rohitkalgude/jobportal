import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// Import User Components
import Registration from "./User/registration.jsx";
import LoginForm from "./User/login.jsx";
import Landing from "./landing.jsx";
import User from "./User/user.jsx";
import UserProfile from "./User/UserProfile.jsx";
import UserEdit from "./User/UserEdit.jsx";
import Setting from "./User/Setting.jsx";
import AccountSetting from "./User/accountSetting.jsx";
import JobPreferences from "./User/JobPreferences.jsx";
import BlockCompany from "./User/blockCompany.jsx";
import ListJob from "./User/dashboard.jsx";
import DashBoard from "./UserComponent/Dashboard.jsx";
import AboutUs from "./User/AboutUs.jsx";
import Filter from "./UserComponent/Fillter.jsx";
// import Navbar from "./UserComponent/Navbar.jsx";
import CompanyData from "./User/Companydata.jsx"
import AppliedJobs from "./User/appliedJobs.jsx"
import Savedjobs from "./User/savedjobs.jsx"


// Import Employer Components
import Employer from "./employer/employer.jsx";
import EmployerRegistration from "./employer/employerRegistration.jsx";
import EmployerLogin from "./employer/employerLogin.jsx";
import EmployerHome from "./employer/employerHome.jsx";
import JobPost from "./EmployerComponents/jobPost.jsx";
import JobDetail from "./employer/jobDetail.jsx";
import Profile from "./employer/EmployerProfile.jsx";
import CompanyProfile from "./employer/CompanyProfile.jsx";
import EditJob from "./employer/editjob.jsx";
import View from "./employer/view.jsx"

// Import Context Providers
import { UserProvider } from "./Context/UserContextProvider.jsx";
import { EmployerProvider } from "./Context/EmployerContextProvider.jsx";
import { AuthProvider } from "./Context/authContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/userLogin", element: <LoginForm /> },
  { path: "/userRegistration", element: <Registration /> },
  { path: "/employerRegistration", element: <EmployerRegistration /> },
  { path: "/employerLogin", element: <EmployerLogin /> },
  { path: "/alljobs", element: <ListJob /> },
  { path: "/filter", element: <Filter /> },
  {path: "/companyData", element:<CompanyData/>},
  {path: "/appliedjobs", element:<AppliedJobs/>},
  {path: "/savedjobs", element:<Savedjobs/>},


  {
    path: "/user",
    element: <User />, 
    children: [
      { path: "home", element: <DashBoard /> },
      { path: "job", element: <ListJob /> },
      { path: "aboutus", element: <AboutUs /> },
      {
        path: "profile",
        element: <UserProfile />, 
        children: [{ path: "edit", element: <UserEdit /> }],
      },
      {
        path: "setting",
        element: <Setting />, 
        children: [
          { path: "account", element: <AccountSetting /> },
          { path: "preference", element: <JobPreferences /> },
          { path: "blockCompany", element: <BlockCompany /> },
        ],
      },
    ],
  },

  {
    path: "/employer",
    element: <Employer />, 
    children: [
      { path: "home", element: <EmployerHome /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "company_profile", element: <CompanyProfile /> },
      { path: "job_post", element: <JobPost /> },
      { path: "job/detail/:id", element: <JobDetail /> },
      { path: "home/edit/:id", element: <EditJob /> },
      { path: "home/view/:id", element: <View /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <EmployerProvider>
          <RouterProvider router={router} />
          <UserProfile />
        </EmployerProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
