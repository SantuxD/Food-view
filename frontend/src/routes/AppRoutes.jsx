import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../pages/User/userRegister";
import UserLogin from "../pages/User/userLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route
        path="/food-partner/register"
        element={<h1>Food Partner register</h1>}
      />
      <Route path="/food-partner/login" element={<h1>Food Partner Login</h1>} />
    </Routes>
  );
};

export default AppRoutes;
