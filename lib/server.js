const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/job_board", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = mongoose.model("User", {
  email: String,
  password: String,
});

// Job model
const Job = mongoose.model("Job", {
  title: String,
  description: String,
  requirements: String,
  salary: String,
  location: String,
});

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Routes
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.json({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
  res.json({ token });
});

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post("/api/jobs", auth, async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

app.put("/api/jobs/:id", auth, async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
});

app.delete("/api/jobs/:id", auth, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
