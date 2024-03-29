const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //Getting token from header
      token = req.headers.authorization.split(" ")[1];
      //decoding token recieved
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      //getting user from db
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authorized");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
