// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = (req, res) => {
  res.json({ messege: `Get goals` });
};

// @desc    get goals
// @route   POST /api/goals
// @access  private
const setGoal = (req, res) => {
  if (!req.body.text) {
    res.statusCode = 400;
    throw new Error("Input in text feild");
  }
  res.json({ messege: `Set goals` });
};

// @desc    update goal
// @route   GET /api/goals/:id
// @access  private
const updateGoal = (req, res) => {
  res.json({ messege: `update goals ${req.params.id}` });
};

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = (req, res) => {
  res.json({ messege: `delete goals ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
