const userModel = require("..models/user.model.js")
const bcrypt = require("bcryptjs")

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

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = userModel.create({
        fullName, email, hashPassword
    });
    res.status(200).json(newUser)

}

module.exports = registerUser;