const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// SAVE PROGRESS ROUTE
router.post("/progress", auth, async (req, res) => {
  try {
    const { topic, xp, completed } = req.body;

    const user = await User.findById(req.user.id);

    user.xp = (user.xp || 0) + (xp || 10);
    user.level = Math.floor(user.xp / 50) + 1;

    if (completed) {
      user.progress = user.progress || [];

      const exists = user.progress.find(p => p.topic === topic);

      if (exists) {
        exists.completed = true;
      } else {
        user.progress.push({ topic, completed: true });
      }
    }

    await user.save();

    res.json({
      xp: user.xp,
      level: user.level
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;