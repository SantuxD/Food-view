const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{ 
    console.log("MongoDB Connect Successfully✅");
})
.catch((err)=>{
    console.log("MongoDB Connection Error❎", err);

})}


module.exports = connectDB;