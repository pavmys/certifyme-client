import { useState } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import AboutProject from "./pages/AboutProject";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import RegisterSubject from "./pages/RegisterSubject";
import RegisterUser from "./pages/RegisterUser";
import UpdateUserInfo from "./pages/UpdateUserInfo";
import ShowApplies from "./pages/ShowApplies";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <HomePage />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/about-project",
      element: (
        <>
          <AboutProject />
        </>
      ),
    },
    {
      path: "/courses",
      element: (
        <>
          <Courses />
        </>
      ),
    },
    {
      path: "/courses/:id",
      element: (
        <>
          <Course />
        </>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <>
          <Profile />
        </>
      ),
    },
    {
      path: "/register-subject",
      element: (
        <>
          <RegisterSubject />
        </>
      ),
    },
    {
      path: "/register-new-user",
      element: (
        <>
          <RegisterUser />
        </>
      ),
    },
    {
      path: "/update-user",
      element: (
        <>
          <UpdateUserInfo />
        </>
      ),
    },
    {
      path: "/show-all-applies",
      element: (
        <>
          <ShowApplies />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
