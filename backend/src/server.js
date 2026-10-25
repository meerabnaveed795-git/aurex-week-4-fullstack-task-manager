
require("dotenv").config({ quiet: true });

console.log("MONGODB_URI exists:", Boolean(process.env.MONGODB_URI));
console.log("JWT_SECRET exists:", Boolean(process.env.JWT_SECRET));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Task API is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
