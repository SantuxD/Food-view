const foodPartnerModel = require("../models/foodpartner.model")
const foodModel = require("../models/food.models")

const getFoodPartnerById = async(req, res) =>{
    const foodPartnerId = req.params.id ;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foods = await foodModel.find({foodPartner: foodPartnerId})

    if(!foodPartner){
        return res.status(404).json({
            message: "Food partner not Found"
        })
    }
    res.status(200).json({
        message: "Food Partner data found",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foods,
            totalMeals: foods.length,
            customersServed: Math.floor(foods.length * 1.5)
        }   

    })

}

module.exports = {getFoodPartnerById};