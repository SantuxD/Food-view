const foodModel = require("../models/food.models");
const foodPartner = require("../models/foodpartner.model");
const { fileUpload } = require("../services/storage.service");
const likesModel = require("../models/likes.model");
const savedFoodModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  try {
    const fileuploadResult = await fileUpload(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileuploadResult.url,
      foodpartner: req.foodPartner._id,
    });

    return res.status(200).json({
      message: "Food items created Successfully✅",
      food: foodItem,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
};

const getFoodItem = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food Items fetched Successfully✅",
    foodItems: foodItems,
  });
};

const likeFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user;

  const alreadyLiked = await likesModel.findOne({
    food: foodId,
    user: user._id,
  });

  if (alreadyLiked) {
    await likesModel.deleteOne({
      food: foodId,
      user: userId,
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

    return res
      .status(200)
      .json({ message: "You have already liked this food item" });
  }
  const like = await likesModel.create({
    food: foodId,
    user: user._id,
  });

  await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

  return res
    .status(200)
    .json({ message: "Food item liked successfully", like });
};

const saveFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user._id;
  
  const alreadySaved = await savedFoodModel.findOne({
    food: foodId,
    user: userId,
  });

  if (alreadySaved) {
    await savedFoodModel.deleteOne({
      food: foodId,
      user: userId,
    });
    return res
      .status(400)
      .json({ message: "You have already saved this food item" });
  }

  const savedFood = await savedFoodModel.create({
    food: foodId,
    user: userId,
  });
  return res
    .status(200)
    .json({ message: "Food item saved successfully", savedFood });
    
};

module.exports = { createFood, getFoodItem, likeFoodItem, saveFoodItem };
