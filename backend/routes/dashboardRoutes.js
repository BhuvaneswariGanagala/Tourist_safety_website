const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Example protected API
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the dashboard 🚀",
    userId: req.user.id,
  });
});

module.exports = router;
