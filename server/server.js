// ============================================
// server.js - Entry Point
// ============================================
// This is where the app starts. It:
//   1. Loads environment variables
//   2. Connects to MongoDB
//   3. Starts the Express server
// ============================================

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server directory or root
dotenv.config({ path: path.join(__dirname, ".env"), quiet: true });
dotenv.config({ quiet: true });

// Import our configured Express app
import app from "./src/app.js";

// Import the database connection function
import connectDB from "./src/config/db.config.js";

// Get the port from .env or default to 5000 (Render provides PORT dynamically)
const PORT = process.env.PORT || 5000;

// ---- Start the Server ----

const startServer = async () => {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Start listening for HTTP requests (bind to 0.0.0.0 for cloud hosting)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 PrepPilot Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Local URL: http://localhost:${PORT}\n`);
    });
  } catch (error) {
    // If anything fails, log the error and exit
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Call the function to start everything
startServer();

