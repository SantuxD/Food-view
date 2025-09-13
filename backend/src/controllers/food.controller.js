const foodModel = require("../models/food.models")
const foodPartner = require("../models/foodpartner.model")
 const {fileUpload} = require("../services/storage.service")
const {v4: uuid} = require("uuid")

const createFood = async(req, res)=>{
    try{
    console.log(req.foodPartner)
    console.log(req.body);
    console.log(req.file)

     const fileuploadResult = await fileUpload(req.file.buffer, uuid())
    console.log(fileuploadResult)

    return res.status(200).json({
        message: "Food items created"
    })

    }catch(err){
        return res.status(500).json({
            err: err.message 

        })
     

    }

   

}


module.exports = {createFood}