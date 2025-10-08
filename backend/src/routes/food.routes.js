const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const foodController = require("../controllers/food.controller")
const multer = require("multer");

const route = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})



route.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood )


route.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItem )


route.post("/like",authMiddleware.authUserMiddleware,foodController.likeFoodItem )

route.post("/save",authMiddleware.authUserMiddleware,foodController.saveFoodItem )







module.exports= route;