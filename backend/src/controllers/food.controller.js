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
  const userId = req.user._id;
  const foodItems = await foodModel.find({});

  const updatedFoodItems = foodItems.map((item) => ({
    ...item.toObject(),
    isLiked: item.likes.includes(userId),
    isSaved: false,
  }));

  res.status(200).json({
    message: "Food Items fetched Successfully✅",
    foodItems: updatedFoodItems,
  });
};

const likeFoodItem = async (req, res) => {
  const { foodItemId } = req.body;
  const userId = req.user._id;

  const alreadyLiked = await likesModel.findOne({
    foodItem: foodItemId,
    user: userId,
  });

  if (alreadyLiked) {
    await likesModel.deleteOne({
      foodItem: foodItemId,
      user: userId,
    });
    await foodModel.findByIdAndUpdate(foodItemId, { $inc: { likeCount: -1 } });

    return res.status(200).json({ message: "Like removed Successfully" });
  }
  const like = await likesModel.create({
    foodItem: foodItemId,
    user: userId,
  });

  await foodModel.findByIdAndUpdate(foodItemId, { $inc: { likeCount: 1 } });

  return res
    .status(200)
    .json({ message: "Food item liked successfully", like });
};

const saveFoodItem = async (req, res) => {
  const { foodItemId } = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  const foodItem = await foodModel.findById(foodItemId);
  if (!foodItem) {
    return res.status(404).json({ message: "Food item not found" });
  }

  const alreadySaved = await savedFoodModel.findOne({
    foodItem: foodItemId,
    user: userId,
  });

  if (alreadySaved) {
    await savedFoodModel.deleteOne({
      foodItem: foodItemId,
      user: userId,
    });
    foodItem.saveCount = Math.max(foodItem.saveCount - 1, 0);
    await foodItem.save();
    return res
      .status(200)
      .json({
        message: "You have already saved this food item",
        saveCount: foodItem.saveCount,
        isSaved: false,
      });
  }

  const savedFood = await savedFoodModel.create({
    foodItem: foodItemId,
    user: userId,
  });
  foodItem.saveCount += 1;
  await foodItem.save();

  return res
    .status(200)
    .json({
      message: "Food item saved successfully",
      saveCount: foodItem.saveCount,
      isSaved: true,
    });
};

module.exports = { createFood, getFoodItem, likeFoodItem, saveFoodItem };
