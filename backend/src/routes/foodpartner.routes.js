const express = require("express");
const foodPartnerController = require("../controllers/foodPartner.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = express.Router();

router.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  foodPartnerController.getFoodPartnerById
);

module.exports = router;
