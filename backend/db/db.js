const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view").then(()=>{
    console.log("MongoDB Connect Successfully");
})
.catch((err)=>{
    console.log("MongoDB Connection Error", err);

})}


module.exports = connectDB;