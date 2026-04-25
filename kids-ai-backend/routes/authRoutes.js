const express = require("express");
const router = express.Router();

const User = require("../models/User");
console.log("USER MODEL CHECK:", User); // ✅ ADD HERE
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name is too short" });
    }

    const emailNorm = String(email).toLowerCase().trim();
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(emailNorm)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // CHECK EXISTING
    const exists = await User.findOne({ email: emailNorm });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASH
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: emailNorm,
      password: hashed
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailNorm = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: emailNorm });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      xp: user.xp,
      level: user.level,
      message: "Login success"
    });

  } catch (err) {
  console.log("LOGIN ERROR FULL:", err);   // 👈 terminal
  res.status(500).json({ message: err.message }); // 👈 frontend
}
});

module.exports = router;