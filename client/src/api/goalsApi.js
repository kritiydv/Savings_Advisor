const express = require('express');
const Goal = require('./models/Goal');
const router = express.Router();

// Add a new goal
router.post('/api/goals', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all goals
router.get('/api/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
