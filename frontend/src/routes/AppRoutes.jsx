import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../pages/User/userRegister";
import UserLogin from "../pages/User/userLogin";
import FoodPartnerLogin from "../pages/Food-partner/foodPartnerLogin";
import FoodPartnerRegister from "../pages/Food-partner/foodPartnerRegister";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route
        path="/food-partner/register"
        element={<FoodPartnerRegister/>}
      />
      <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
    </Routes>
  );
};

export default AppRoutes;
