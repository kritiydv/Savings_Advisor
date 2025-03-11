const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  targetDate: {
    type: Date,
    required: true
  },
  targetAmount: {
    type: Number,
    required: true
  },
  ageAtGoal: {
    type: Number,
    required: true
  },
  currentSavings: {
    type: Number,
    required: true
  },
  adjustedTargetAmount: {
    type: Number,
    required: true
  },
  monthlySavings: {
    type: Number,
    required: true
  },
  monthsToGoal: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Goal', GoalSchema);