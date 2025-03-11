import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './LandingPage';
import { jwtDecode } from 'jwt-decode';
import GoalsSection from './GoalsSection';


function Home() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = jwtDecode(token); // Use jwtDecode here
      setUsername(decodedToken.username); // Extract username from decoded token
  
      axios
        .get('http://localhost:5000/api/protected-route', {
          headers: { Authorization: token },
        })
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch(() => {
          alert('Access denied. Please log in again.');
          navigate('/login');
        });
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-muted">Welcome, {username}</h5>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="text-center">
        <h2>{message || "Welcome to the Home Page"}</h2>
        <LandingPage />
        <GoalsSection/>
      </div>
      
    </div>
  );
}

export default Home;