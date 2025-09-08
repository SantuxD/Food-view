const express = require("express");
const authController = require("../controllers/auth.controllers");

const route = express.Router();

// Normal User auth route apis
route.post("/user/register", authController.registerUser);
route.post("/user/login", authController.loginUser);
route.get("/user/logout", authController.logoutUSer);

// Food partner auth route apis
route.post("/foodpartneruser/register", authController.foodPartnerRegisterUser);
route.post("/foodpartneruser/login", authController.foodPartnerloginUser);
route.get("/foodpartneruser/logout", authController.foodPartnerLogOutUser);

module.exports = route;
