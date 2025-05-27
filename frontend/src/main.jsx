import ReactDOM from "react-dom/client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Registration from "./User/registration.jsx";
import LoginForm from "./User/login.jsx";
import Landing from "./landing.jsx";
import EmployerLogin from "./employer/employerLogin.jsx";
import User from "./User/user.jsx";
import UserProfile from "./User/UserProfile.jsx";
import UserEdit from "./User/UserEdit.jsx";
import Setting from "./User/Setting.jsx";
import AccountSetting from "./User/accountSetting.jsx";
import JobPreferences from "./User/JobPreferences.jsx";
import BlockCompany from "./User/blockCompany.jsx";
import Employer from "./employer/employer.jsx";
import EmployerRegistration from "./employer/employerRegistration.jsx";
import EmployerHome from "./employer/employerHome.jsx";
import JobPost from "./EmployerComponents/jobPost.jsx";
import JobDetail from "./employer/jobDetail.jsx";
import { UserProvider } from "./Context/UserContextProvider.jsx";
import { EmployerProvider } from "./Context/EmployerContextProvider.jsx";
import Profile from "./employer/EmployerProfile.jsx";
import CompanyProfile from "./employer/CompanyProfile.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import ListJob from "./User/dashboard.jsx";
import DashBoard from "./UserComponent/Dashboard.jsx";
import AboutUs from "./User/AboutUs.jsx";
import EditJob from "./employer/editjob.jsx";
import View from "./employer/view.jsx";
import Filter from "./UserComponent/Fillter.jsx";
import CompanyData from "./User/Companydata.jsx";
import AppliedJobs from "./User/appliedJobs.jsx";
import Savedjobs from "./User/savedjobs.jsx";
import AllJob from "./User/allJob.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "userLogin",
    element: <LoginForm />,
  },
  {
    path: "employerRegistration",
    element: (
      <EmployerProvider>
        <EmployerRegistration />
      </EmployerProvider>
    ),
  },
  {
    path: "employerLogin",
    element: <EmployerLogin />,
  },
  {
    path: "CompanyData",
    element: <CompanyData />,
  },
  {
    path: "employer",
    element: (
      <EmployerProvider>
        <Employer />
      </EmployerProvider>
    ),
    children: [
      {
        path: "home",
        element: <EmployerHome />,
      },
      {
        path: "home/edit/:id",
        element: <EditJob />,
      },
      {
        path: "home/view/:id",
        element: <View />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "company_profile",
        element: <CompanyProfile />,
      },
      {
        path: "job_post",
        element: <JobPost />,
        children: [
          {
            path: "detail",
            element: <JobDetail />,
          },
        ],
      },
    ],
  },

  {
    path: "userRegistration",
    element: (
      <AuthProvider>
        <Registration />
      </AuthProvider>
    ),
  },

  {
    path: "alljobs",
    element: <AllJob />,
  },
  {
    path: "user",
    element: (
      <UserProvider>
        <User />
      </UserProvider>
    ),
    children: [
      {
        path: "home",
        element: <DashBoard />,
      },
      {
        path: "filter",
        element: <Filter />,
      },
      {
        path: "job",
        element: <ListJob />,
      },
      {
        path: "CompanyData",
        element: <CompanyData />,
      },
      {
        path: "appliedJobs",
        element: <AppliedJobs />,
      },
      {
        path: "savedjobs",
        element: <Savedjobs />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "profile",
        element: <UserProfile />,
        children: [
          {
            path: "edit",
            element: <UserEdit />,
          },
        ],
      },
      {
        path: "setting",
        element: <Setting />,
        children: [
          {
            path: "account",
            element: <AccountSetting />,
          },
          {
            path: "preference",
            element: <JobPreferences />,
          },
          {
            path: "blockCompany",
            element: <BlockCompany />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <EmployerProvider>
          <RouterProvider router={Router} />
          <ToastContainer position="top-center" autoClose={2000} />
        </EmployerProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
