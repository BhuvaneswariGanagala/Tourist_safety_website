const jwt = require("jsonwebtoken");

// Fixed users list
const allowedUsers = [
  { verificationId: "admin1", password: "pass123" },
  { verificationId: "admin2", password: "secret456" },
  { verificationId: "tourismDept", password: "safety@999" },
];

const login = async (req, res) => {
  try {
    const { verificationId, password } = req.body;

    const user = allowedUsers.find(
      (u) => u.verificationId === verificationId && u.password === password
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { verificationId: user.verificationId },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { verificationId: user.verificationId },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };
