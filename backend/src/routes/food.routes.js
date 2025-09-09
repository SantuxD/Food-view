const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const foodController = require("../controllers/food.controller")
const multer = require("multer")
const route = express.Route();



route.post("/", authMiddleware.authFoodPartnerMiddleware, foodController.createFood )




module.exports= router;