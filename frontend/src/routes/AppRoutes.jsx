import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../pages/User/userRegister";
import UserLogin from "../pages/User/userLogin";
import FoodPartnerLogin from "../pages/Food-partner/foodPartnerLogin";
import FoodPartnerRegister from "../pages/Food-partner/foodPartnerRegister";
import Home from "../pages/Home";
import CreateFood from "../pages/Food-partner/CreateFood";


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
      <Route path = "/" element={<Home/>}/>
      <Route path = "/create-food" element={<CreateFood/>}/>

    </Routes>
  );
};

export default AppRoutes;
