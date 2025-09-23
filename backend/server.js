require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(express.json());

// Allow multiple origins (dev + prod)
const allowedOrigins = [
  "http://localhost:5173",                     // local dev
  "https://tourist-safety-website.vercel.app"  // production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (e.g., Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // return the request origin here
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
