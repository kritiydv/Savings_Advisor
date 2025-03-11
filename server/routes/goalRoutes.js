const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/goals
router.post('/', authMiddleware, async (req, res) => {
  console.log('Received request with payload:', req.body);
  try {
    const { name, targetDate, targetAmount, ageAtGoal, currentSavings, adjustedTargetAmount, monthlySavings, monthsToGoal } = req.body;

    const newGoal = new Goal({
      name,
      targetDate,
      targetAmount,
      ageAtGoal,
      currentSavings,
      adjustedTargetAmount,
      monthlySavings,
      monthsToGoal,
      userId: req.user.id
    });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error('Error saving goal:', error);
    res.status(500).json({ error: 'Failed to save goal' });
  }
});

// GET /api/goals
router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

module.exports = router;