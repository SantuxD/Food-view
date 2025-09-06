const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")


const registerUser = async (req, res)=>{

    const {fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        fullName, email, password: hashedPassword
    });

    const token = JWT.sign({
        id: newUser._id,

    }, "c7d0a81d925b639f2bffd5fbe824ada4");
    res.cookie("token", token)
    res.status(200).json({
        newUser: {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName
        },
         message : " User registered Successfully",

    })

}

const loginUser = async (req, res) =>{

}
module.exports = {registerUser,
    loginUser

};