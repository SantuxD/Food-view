const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const foodController = require("../controllers/food.controller")
const multer = require("multer");

const route = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})



route.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood )




module.exports= route;