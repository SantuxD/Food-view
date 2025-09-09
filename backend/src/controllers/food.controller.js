const foodModel = require("../models/food.models")

const createFood = async(req, res)=>{

    console.log(req.body);

    res.send(200).json({
        message: "Food items created"
    })

}


module.exports ={createFood}