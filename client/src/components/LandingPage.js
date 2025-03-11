import React, { useState, useEffect } from 'react';
import SavingsIndicator from './SavingsIndicator';

function LandingPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [hasLiabilities, setHasLiabilities] = useState('No'); // Dropdown for liabilities
  const [emiAmount, setEmiAmount] = useState(''); // EMI input field
  const [savingsAfterEmi, setSavingsAfterEmi] = useState(0);

  // Fetch username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setName(storedUsername); // Set the name field as the logged-in username
    }
  }, []);

  // Calculate savings after EMI deduction
  const calculateSavingsAfterEmi = () => {
    setSavingsAfterEmi(currentSavings - emiAmount);
  };

  // Handle age input validation
  const handleAgeChange = (value) => {
    const ageValue = parseInt(value) || 0;
    if (ageValue < 16 || ageValue > 100) {
      alert('Age must be between 16 and 100.');
      setAge(ageValue < 16 ? 16 : 100);
    } else {
      setAge(ageValue);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Savings Advisor</h1>

      <div className="row justify-content-center">
        {/* Form Section */}
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            {/* Name Input (Read-Only) */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                readOnly // Make the field read-only
                placeholder="Name will be auto-filled"
              />
            </div>

            {/* Age Input */}
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => handleAgeChange(e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            {/* Salary Input */}
            <div className="mb-3">
              <label className="form-label">Monthly Salary</label>
              <input
                type="number"
                className="form-control"
                value={salary}
                onChange={(e) => setSalary(parseFloat(e.target.value) || '')}
                placeholder="Enter your monthly salary"
              />
            </div>

            {/* Current Savings Input */}
            <div className="mb-3">
              <label className="form-label">Current Monthly Savings </label>
              <input
                type="number"
                className="form-control"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || '')}
                placeholder="Enter your current savings"
              />
            </div>

            {/* Liabilities Dropdown */}
            <div className="mb-3">
              <label className="form-label">Do you have any monthly outstanding liabilities?</label>
              <select
                className="form-select"
                value={hasLiabilities}
                onChange={(e) => setHasLiabilities(e.target.value)}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* EMI Input (Conditional) */}
            {hasLiabilities === 'Yes' && (
              <div className="mb-3">
                <label className="form-label">Enter Your EMI Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={emiAmount}
                  onChange={(e) => {
                    setEmiAmount(parseFloat(e.target.value) || '');
                    calculateSavingsAfterEmi();
                  }}
                  placeholder="Enter your EMI amount"
                />
              </div>
            )}
          </div>
        </div>

        {/* Savings Indicator Section */}
        <div className="col-md-6 col-lg-6">
          <div className="card p-4 shadow-sm">
            <SavingsIndicator
              name={name}
              age={age}
              currentSavings={hasLiabilities === 'Yes' ? savingsAfterEmi : currentSavings}
              salary={salary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
