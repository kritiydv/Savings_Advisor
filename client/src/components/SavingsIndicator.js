import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavingsIndicator = ({ name, age, currentSavings, salary }) => {
  // Average savings based on age in India (hypothetical values for demonstration)
  const averageSavingsByAge = [
    { ageRange: "Under 25", averageSavings: 8515 },
    { ageRange: "26-35", averageSavings: 13465 },
    { ageRange: "36-45", averageSavings: 15522 },
    { ageRange: "46-55", averageSavings: 20444 },
    { ageRange: "56-65", averageSavings: 21196 },
    { ageRange: "Over 65", averageSavings: 17011 },
  ];

  // Determine the suggested savings for the given age range
  const ageRangeData = averageSavingsByAge.find((range) => {
    if (age < 25) return range.ageRange === "Under 25";
    if (age >= 26 && age <= 35) return range.ageRange === "26-35";
    if (age >= 36 && age <= 45) return range.ageRange === "36-45";
    if (age >= 46 && age <= 55) return range.ageRange === "46-55";
    if (age >= 56 && age <= 65) return range.ageRange === "56-65";
    return range.ageRange === "Over 65";
  });

  const suggestedSavings = ageRangeData ? ageRangeData.averageSavings : 0;

  // Data for the bar chart
  const data = [
    { name: "Average Savings", savings: suggestedSavings },
    { name: `${name}'s Savings`, savings: currentSavings },
  ];

  // Determine bar color based on comparison
  const barColor = currentSavings >= suggestedSavings ? "#28a745" : "#dc3545"; // Green if user is doing well, red otherwise

  // 50-30-20 Rule Calculations
  const needs = salary * 0.5;
  const wants = salary * 0.3;
  const recommendedSavings = salary * 0.2;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4 mb-4">
        <h3 className="text-center mb-4">Savings Indicator</h3>

        {/* Display Name and Age */}
        <div className="user-info mb-3">
          <p><strong>Name:</strong> {name || "N/A"}</p>
          <p><strong>Age:</strong> {age || "N/A"}</p>
          <p><strong>Monthly Salary:</strong> ₹{salary.toLocaleString()}</p>
          <p><strong>Your Current Savings:</strong> ₹{currentSavings.toLocaleString()}</p>
        </div>

        {/* Display Comparison Chart */}
        <div className="chart-container my-4">
          <h4 className="text-center">Comparison to Average Savings in India (for your age group)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="savings" fill={barColor}>
                <LabelList dataKey="savings" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Show the suggested savings and comparison */}
        <div className="savings-summary mb-3">
          <p>For your age group ({ageRangeData.ageRange}), the average savings in India is approximately <strong>₹{suggestedSavings.toLocaleString()}</strong>.</p>
          <p className={currentSavings >= suggestedSavings ? "text-success" : "text-danger"}>
            {currentSavings >= suggestedSavings 
              ? "You're doing well compared to the average!" 
              : "Consider increasing your savings to reach or exceed the average."}
          </p>
        </div>

        {/* Savings Advice Section Based on 50-30-20 Rule */}
        <div className="savings-advice">
          <h3 className="text-center">Savings Advice (50-30-20 Rule)</h3>
          <p><strong>Recommended Spending:</strong></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Needs (50%):</strong> ₹{needs.toLocaleString()}</li>
            <li className="list-group-item"><strong>Wants (30%):</strong> ₹{wants.toLocaleString()}</li>
            <li className="list-group-item"><strong>Savings (20%):</strong> ₹{recommendedSavings.toLocaleString()}</li>
          </ul>
          <p className="mt-3">
            Based on the 50-30-20 rule, we recommend setting aside 20% of your salary 
            (₹{recommendedSavings.toLocaleString()}) for savings. This helps you 
            build a safety net and plan for future goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsIndicator;
