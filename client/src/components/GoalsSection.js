import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const GoalsSection = () => {
  const [goalInput, setGoalInput] = useState({
    name: '',
    targetDate: '',
    targetAmount: '',
    ageAtGoal: '',
    currentSavings: ''
  });
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:5000/api/goals', {
          headers: {
            Authorization: token
          }
        });
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalInput({
      ...goalInput,
      [name]: value
    });
  };

  const calculateMonthlySavings = (targetAmount, currentSavings, targetDate) => {
    const currentYear = new Date().getFullYear();
    const targetYear = new Date(targetDate).getFullYear();
    const yearsToGoal = targetYear - currentYear;

    if (yearsToGoal <= 0) return null;

    const inflationRate = 3; // Assuming a fixed inflation rate of 3%
    const adjustedTargetAmount = targetAmount * Math.pow(1 + inflationRate / 100, yearsToGoal);

    const remainingAmount = adjustedTargetAmount - currentSavings;
    const monthsToGoal = yearsToGoal * 12;

    if (remainingAmount <= 0) return null;

    const monthlySavings = remainingAmount / monthsToGoal;
    return { adjustedTargetAmount, monthlySavings, monthsToGoal };
  };

  const addGoal = async (e) => {
    e.preventDefault();
    if (!goalInput.name || !goalInput.targetDate || !goalInput.targetAmount || !goalInput.currentSavings) {
      alert('Please fill in all fields');
      return;
    }

    const result = calculateMonthlySavings(
      parseFloat(goalInput.targetAmount),
      parseFloat(goalInput.currentSavings),
      goalInput.targetDate
    );

    if (!result) {
      alert('Invalid goal parameters. Please check your inputs.');
      return;
    }

    const { adjustedTargetAmount, monthlySavings, monthsToGoal } = result;

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      console.log('Sending request with payload:', {
        ...goalInput,
        adjustedTargetAmount: adjustedTargetAmount.toFixed(2),
        monthlySavings: monthlySavings.toFixed(2),
        monthsToGoal
      });
      const response = await axios.post('http://localhost:5000/api/goals', {
        ...goalInput,
        adjustedTargetAmount: adjustedTargetAmount.toFixed(2),
        monthlySavings: monthlySavings.toFixed(2),
        monthsToGoal
      }, {
        headers: {
          Authorization: token
        }
      });
      setGoals([...goals, response.data]);
      console.log('Goal saved:', response.data);
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4 mb-4">
        <h3 className="text-center">Add a New Goal</h3>
        <form onSubmit={addGoal}>
          <div className="row mb-3">
            <div className="col-6">
              <label><strong>Goal Name</strong></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={goalInput.name}
                onChange={handleInputChange}
                placeholder="e.g., Buy a House"
              />
            </div>
            <div className="col-6">
              <label><strong>Target Date</strong></label>
              <input
                type="date"
                className="form-control"
                name="targetDate"
                value={goalInput.targetDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <label><strong>Target Amount (₹)</strong></label>
              <input
                type="number"
                className="form-control"
                name="targetAmount"
                value={goalInput.targetAmount}
                onChange={handleInputChange}
                placeholder="e.g., 1000000"
              />
            </div>
            <div className="col-4">
              <label><strong>Age at Goal</strong></label>
              <input
                type="number"
                className="form-control"
                name="ageAtGoal"
                value={goalInput.ageAtGoal}
                onChange={handleInputChange}
                placeholder="e.g., 30"
              />
            </div>
            <div className="col-4">
              <label><strong>Current Savings (₹)</strong></label>
              <input
                type="number"
                className="form-control"
                name="currentSavings"
                value={goalInput.currentSavings}
                onChange={handleInputChange}
                placeholder="e.g., 200000"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Goal</button>
        </form>
        <hr />
        <h4 className="text-center">Your Goals List</h4>
        {goals.length === 0 ? (
          <p className="text-center text-muted">No goals added yet.</p>
        ) : (
          <ul className="list-group">
            {goals.map((goal, index) => (
              <li className="list-group-item" key={index}>
                <strong>{goal.name}</strong>
                <p>Target Date: {goal.targetDate}</p>
                <p>Target Amount (with Inflation): ₹{goal.adjustedTargetAmount}</p>
                <p>Monthly Savings Required: ₹{goal.monthlySavings}</p>
                <p>Months to Goal: {goal.monthsToGoal} months</p>
                <p>Current Savings: ₹{goal.currentSavings}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoalsSection;