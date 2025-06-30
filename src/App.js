import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import UserManagement from "./pages/UserManagement/UserManagement";
import JoinCourse from "./pages/JoinCourse/JoinCourse";
import CourseManagement from "./pages/CourseManagement/CourseManagement";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="join-course" element={<JoinCourse />} />
        <Route path="course-management" element={<CourseManagement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="accounts" element={<UserManagement />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  );
}

export default App;
