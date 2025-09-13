const foodModel = require("../models/food.models");
const foodPartner = require("../models/foodpartner.model");
const { fileUpload } = require("../services/storage.service");
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

const getFoodItem = async (req, res) =>{

    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food Items fetched Successfully✅",
        foodItems : foodItems
    })

}

module.exports = { createFood, getFoodItem};
