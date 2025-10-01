const foodPartnerModel = require("../models/foodpartner.model")

const getFoodPartnerById = async(req, res) =>{
    const foodPartnerId = req.params.id ;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    if(!foodPartner){
        return res.status(404).json({
            message: "Food partner not Found"
        })
    }
    res.status(200).json({
        message: "Food Partner data found",
        foodPartner
    })

}

module.exports = {getFoodPartnerById};