const asyncHandler = require("express-async-handler");
const Goals = require("../model/goalModel");
const User = require("../model/userModel");

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find({ user: req.user._id });
  res.json(goals);
});

// @desc    get goals
// @route   POST /api/goals
// @access  private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Input in text feild");
  }

  const goal = await Goals.create({
    text: req.body.text,
    user: req.user._id,
  });
  res.json(goal);
});

// @desc    update goal
// @route   GET /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please input the text feild");
  } else if (!goal) {
    res.status(400);
    throw new Error("Goal doesen't Exist");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // Make sure the loggined user matches the goal user
  if (req.user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //Updating goal
  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal doesent Exist");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // Make sure the loggined user matches the goal user
  if (req.user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //Deleting Goal
  await Goals.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
