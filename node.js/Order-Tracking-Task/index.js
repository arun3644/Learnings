const http = require('http');
const { routing } = require('./routing');
const { connectDB } = require('./db');  // Import DB connection
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // 🟢 Connect to MongoDB Atlas before starting the server
    await connectDB();

    const server = http.createServer(routing);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
