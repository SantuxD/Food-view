const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Go to Login Page",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;

    next();
    
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = {
  authFoodPartnerMiddleware,
};
