const connectDB = require('./database/connect');
const express = require('express');
const authRoutes = require('./routes/auth'); // Import auth routes
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

(async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    await connectDB(mongoUri);
    console.log("Connected to MongoDB");

    // Optional: Add a delay to ensure connection is fully established
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
})();

app.use('/api/auth', authRoutes); // Register auth routes

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ...existing code...
