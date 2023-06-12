const express = require("express");
const bcrypt = require("bcryptjs");
const jwb = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

// @desc    Register a user
// @route   POST /api/user
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  //Checking input data
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all feilds");
  }
  //Checking if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hasing Password
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(password, salt);
  //Adding user in database
  const user = await User.create({
    name,
    email,
    password: hassedPassword,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
  //Checking input data
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all feilds");
  }
  //Getting user and checking password
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user
// @route   GET /api/user/me
// @access  public
const getMe = asyncHandler(async (req, res) => {
  res.json({ messege: "Get User" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
