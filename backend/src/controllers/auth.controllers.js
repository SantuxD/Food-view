const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = JWT.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(200).json({
    newUser: {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    },
    message: "User registered Successfully🎉🎉🎉",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }
  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in Successfully 🎉🎉🎉",

    user: {
      _id: user._id,
      email: user.email,
      
    },
  });
};
const logoutUSer = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logout Successfully ✅",
  });
};

const foodPartnerRegisterUser = async (req, res) => {
  const { companyName,contactName,contactNumber, address, email, password,} = req.body;

  const isexistsRegisterUser = await foodPartnerModel.findOne({
    email,
  });

  if (isexistsRegisterUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await foodPartnerModel.create({
    companyName,
    contactName,
    contactNumber,
    address,
    email,
   password: hashedPassword,
   
   
  });
  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User Registered successfully ✅",

    user: {
      _id: user._id,
      companyName: user.companyName,
      contactName: user.contactName,
      contactNumber: user.contactNumber,
      address:user.address,
      email: user.email,
      //password: user.password,

    },
  });
};

const foodPartnerloginUser = async (req, res) =>{
  const {email, password} = req.body;


  const user = await foodPartnerModel.findOne({
    email
  })
   
  if(!user){
    return res.status(400).json({
      message: "Invalid User or Password ❎ "
    })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  


  if(!isPasswordValid){
     return res.status(400).json({
      message: "Invalid User or password ❎"
    })
  }
  const token = JWT.sign({
    id: user._id

  }, process.env.JWT_SECRET)
  res.cookie("token", token)
  res.status(200).json({
    message: "User loggedin Sucessfully ✅",

    user:{
         _id: user._id,
         email: user.email,
         

    }

  })
}

const foodPartnerLogOutUser = (req, res)=>{
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logout Successfully✅"
  })

}

module.exports = {
  registerUser,
  loginUser,
  logoutUSer,
  foodPartnerRegisterUser,
  foodPartnerloginUser,
  foodPartnerLogOutUser
};
