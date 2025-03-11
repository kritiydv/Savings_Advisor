require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const goalsRoutes= require('./routes/goalRoutes')
const authMiddleware = require('./middleware/authMiddleware'); // Import authMiddleware


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalsRoutes);

// Protected route
app.get('/api/protected-route', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route, authenticated user!', username: req.user.username });
});




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
