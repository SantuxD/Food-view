const foodModel = require("../models/food.models");
const foodPartner = require("../models/foodpartner.model");
const { fileUpload } = require("../services/storage.service");
const likesModel = require("../models/likes.model");
const savedFoodModel = require("../models/savedFood.model");
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
  const foodId = req.params.id;
  const userId = req.user._id;
  try {
    const foodItem = await foodModel.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    // Check if the user has already liked the food item
    const alreadyLiked = foodItem.likesModel.includes(userId);
    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "You have already liked this food item" });
    }

    foodItem.likeCount += 1;
    foodItem.likesModel.push(userId);

    await foodItem.save();

    return res
      .status(200)
      .json({ message: "Food item liked successfully", foodItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const saveFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user._id;
  try {
    const foodItem = await foodModel.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    const user = req.user;
    if (user.savedFoodModel.includes(foodId)) {
      return res
        .status(400)
        .json({ message: "You have already saved this food item" });
    }
    user.savedFoodModel.push(foodId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Food item saved successfully", foodItem });
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = { createFood, getFoodItem, likeFoodItem, saveFoodItem };
