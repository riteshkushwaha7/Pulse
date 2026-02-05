require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pulse-blush-zeta.vercel.app",
    ],
    credentials: true,
  })
);



// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
let authRoutes;
try {
  authRoutes = require('./routes/authRoutes');
  console.log("✅ authRoutes loaded successfully");
} catch (err) {
  console.error("🔥 AUTH ROUTE LOAD FAILED:", err);
}

let postRoutes;
try {
  postRoutes = require('./routes/postRoutes');
  console.log("✅ postRoutes loaded successfully");
} catch (err) {
  console.error("🔥 POST ROUTE LOAD FAILED:", err);
}

// Mount routers only if successfully loaded
if (authRoutes) app.use('/api/auth', authRoutes);
if (postRoutes) app.use('/api/posts', postRoutes);


// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handler
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
