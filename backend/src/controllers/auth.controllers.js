const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, email, password } =  req.body;

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
    message: " User registered Successfully",
  });
};

const loginUser = async (req, res) => {
  const { email, password } =  req.body;

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
    message: "User loged in Successfully",

    user: {
      _id: user._id,
      email: user.email,
      password: user.password,
    },
  });
};
module.exports = { registerUser, loginUser };
