const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

exports.auth = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization || req.headers.Authorization,
      process.env.JWT_SECRET
    );
    if (!decode) {
      return res.status(400).json({ msg: `Error in JWT !` });
    }
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({ msg: `No User found !` });
    }
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (err) {
    res.status(400).json({ msg: `Error in auth !`, err });
  }
};

exports.admin = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.user.email });
    if (!userExists) {
      return res.status(400).json({ msg: `No User found !` });
    }
    if (userExists.admin !== true) {
      return res.status(400).json({ msg: `User is not Admin !` });
    }
    req.ok = true;
    next();
  } catch (err) {
    return res.status(400).json({ msg: `Error in admin !`, err });
  }
};
