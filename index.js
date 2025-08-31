const connectDB = require('./database/connect');
// ...existing code...

(async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    await connectDB(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
})();

// ...existing code...
