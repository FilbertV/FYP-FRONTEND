import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AppUser from "./user/AppUser";
import AppAdmin from './admin/AppAdmin';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AppAdmin />} />
        <Route path="/user/*" element={<AppUser />} />
        <Route path="/*" element={<AppUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;