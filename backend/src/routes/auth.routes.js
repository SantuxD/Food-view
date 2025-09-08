const express = require("express");
const authController = require("../controllers/auth.controllers")

const route = express.Router();

route.post("/user/register", authController.registerUser)
route.post("/user/login", authController.loginUser)

module.exports = route;