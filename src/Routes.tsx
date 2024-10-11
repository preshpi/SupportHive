import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/home.tsx";
import ResetPassword from "./views/auth/ResetPassword.jsx";
import React from "react";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
