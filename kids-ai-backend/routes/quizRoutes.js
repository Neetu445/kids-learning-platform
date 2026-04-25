const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// ================= GET QUESTIONS =================
router.get("/:topic", async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topic });

    return res.json({
      questions,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


// ================= SUBMIT ANSWER =================
router.post("/submit", auth, async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    const question = await Question.findById(questionId);
    const user = await User.findById(req.user.id);

    if (!question || !user) {
      return res.status(404).json({
        success: false,
        message: "Not found"
      });
    }

    let correct = false;
    let points = 0;

    // check answer
    if (question.answer === answer) {
      correct = true;
      points = question.difficulty === "hard" ? 20 : 10;

      user.xp = (user.xp || 0) + points;
    }

    // level system
    user.level = Math.floor((user.xp || 0) / 50) + 1;

    await user.save();

    return res.json({
      success: true,
      data: {
        correct,
        points,
        xp: user.xp,
        level: user.level
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;