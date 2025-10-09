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
  const { foodItemId } = req.body;
  const userId = req.user._id;

   const foodItem = await foodModel.findById(foodItemId);

   
  if (!foodItem) return res.status(404).json({ message: "Food not found" });

  const liked = foodItem.likes.includes(userId);

  if (liked) {
    foodItem.likes.pull(userId);
    foodItem.likeCount -= 1;
  } else {
    foodItem.likes.push(userId);
    foodItem.likeCount += 1;
  }

   await foodItem.save();

  res.json({ message: liked ? "Unliked" : "Liked", likeCount: foodItem.likeCount });
};



//   const alreadyLiked = await likesModel.findOne({
//     foodItem: foodItemId,
//     user: userId,
//   });

//   if (alreadyLiked) {
//     await likesModel.deleteOne({
//       foodItem: foodItemId,
//       user: userId,
//     });
//     await foodModel.findByIdAndUpdate(foodItemId, { $inc: { likeCount: -1 } });

//     return res
//       .status(200)
//       .json({ message: "Like removed Successfully" });
//   }
//   const like = await likesModel.create({
//     foodItem: foodItemId,
//     user: userId,
//   });

//   await foodModel.findByIdAndUpdate(foodItemId, { $inc: { likeCount: 1 } });

//   return res
//     .status(200)
//     .json({ message: "Food item liked successfully", like });
// };

const saveFoodItem = async (req, res) => {
  const { foodItemId } = req.body;
  const userId = req.user._id;

  if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
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
    return res
      .status(200)
      .json({ message: "You have already saved this food item", });
  }

  const savedFood = await savedFoodModel.create({
    foodItem: foodItemId,
    user: userId,
  });
  return res
    .status(200)
    .json({ message: "Food item saved successfully", savedFood });
    
};

module.exports = { createFood, getFoodItem, likeFoodItem, saveFoodItem };
