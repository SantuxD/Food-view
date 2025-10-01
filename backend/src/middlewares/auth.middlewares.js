const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
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

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Go to Login Page",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unautharized access",
    });
  }
};

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
