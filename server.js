const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mini_universe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  points: { type: Number, default: 0 },
  universe: { type: Array, default: [] },
});

const User = mongoose.model('User', userSchema);

// Signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ message: 'User created', user });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) res.json({ message: 'Login success', user });
  else res.status(400).json({ message: 'Invalid credentials' });
});

// Save universe
app.post('/save', async (req, res) => {
  const { userId, universe, points } = req.body;
  const user = await User.findById(userId);
  user.universe = universe;
  user.points = points;
  await user.save();
  res.json({ message: 'Universe saved' });
});

// Load universe
app.get('/load/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user);
});

app.listen(5000, () => console.log('Server running on port 5000'));
