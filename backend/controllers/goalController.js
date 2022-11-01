// @desc    Get goals
// @route   GET /api/goals 
// @access  Private
const getGoals = (req, res) => {
  res.status(200).json({message:'Get goals'})
}

// @desc    Set goals
// @route   POST /api/goals 
// @access  Private
const setGoal = (req, res) => {
  res.status(200).json({message: 'Set goals'})
}

// @desc    Update goals
// @route   UPDATE /api/goal/:id 
// @access  Private
const updateGoal = (req, res) => {
  res.status(200).json({message: `update goal: ${req.params.id}`})
}

// @desc    Delete goals
// @route   DELETE /api/goal/:id
// @access  Private
const deleteGoal = (req, res) => {
  res.status(200).json({message: `delete goal: ${req.params.id}`})
}

// @exports 
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}