const foodModel = require("../models/food.models")
const foodPartner = require("../models/foodpartner.model")

const createFood = async(req, res)=>{
    try{
    console.log(req.foodPartner)
    console.log(req.body);
    console.log(req.file)

    return res.send(200).json({
        message: "Food items created"
    })

    }catch(err){
        return res.status(500).json({
            err: err.message 

        })
     

    }

   

}


module.exports = {createFood}