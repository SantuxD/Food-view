const express = require("express");
const authController = require("../controllers/auth.controllers")

const route = express.Router();

route.post("/user/register", authController.registerUser)
route.post("/user/login", authController.loginUser)
route.post("/user/logout", authController.logoutUSer)

route.post("/foodpartneruser/register",authController.foodPartnerRegisterUser)
 route.post("/foodpartneruser/login",authController.foodPartnerloginUser)
  route.post("/foodpartneruser/logout",authController.foodPartnerLogOutUser)

module.exports = route;