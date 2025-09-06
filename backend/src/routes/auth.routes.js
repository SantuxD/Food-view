const express = require("express");

const route = express.Router();

route.post("/user/register",(req, res)=>{
    res.send("User registered")

})

module.exports = route;