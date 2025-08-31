const connectDB = require('./database/connect');
// ...existing code...

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
})();

// ...existing code...
