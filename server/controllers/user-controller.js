const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: `Name , Email and Password Required !` });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: `Email already registered !` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({
      msg: `User Registered Successfully !`,
      token,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        admin: userExists.admin,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: `Error in Sign Up !`, err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: ` Email and Password Required !` });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ msg: `You need to register !` });
    }
    const passwordMatched = await bcrypt.compare(password, userExists.password);
    if (!passwordMatched) {
      return res.status(400).json({ msg: `Invalid Credentials !` });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({
      msg: `User Logged in Successfully !`,
      token,
      user: {
        name: userExists.name,
        email: userExists.email,
        admin: userExists.admin,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: `Error in Login !`, err: err });
  }
};

exports.adminProtected = async (req,res) =>{
  try {
    res.status(200).json({admin:req.ok});
  } catch (err) {
    res.status(400).json({msg:'Error in adminProtected.',err});
  }
}

exports.userProtected = async (req,res) =>{
  try {
    res.status(200).json({user:true});
  } catch (err) {
    res.status(400).json({msg:'Error in adminProtected.',err});
  }
}