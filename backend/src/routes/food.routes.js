const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const foodController = require("../controllers/food.controller")
const { addComment, getComments } = require("../controllers/comment.controller");
//const commentController = require("../controllers/comment.controller.js")
 
const multer = require("multer");

const route = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})



route.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood )


route.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItem )


route.post("/like",authMiddleware.authUserMiddleware,foodController.likeFoodItem )

route.post("/save",authMiddleware.authUserMiddleware,foodController.saveFoodItem )


route.post("/comment",authMiddleware.authUserMiddleware,addComment )
route.get("/comment/:foodItemId", authMiddleware.authUserMiddleware, getComments);




module.exports= route;