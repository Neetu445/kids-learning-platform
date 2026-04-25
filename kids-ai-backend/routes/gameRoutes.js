const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// START GAME
router.post("/start", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    message: "Game started",
    user: {
      name: user.name,
      score: user.score,
      level: user.level
    }
  });
});

// GET QUESTIONS BY TOPIC
router.get("/questions/:topic", auth, async (req, res) => {
  const questions = await Question.find({
    topic: req.params.topic
  });

  res.json({
    questions
  });
});

// SUBMIT ANSWER (FINAL VERSION)
router.post("/submit", auth, async (req, res) => {
  const { questionId, answer } = req.body;

  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  let correct = false;
  let points = 0;

  if (question.answer === answer) {
    correct = true;

    points = question.difficulty === "hard" ? 20 : 10;

    const user = await User.findById(req.user.id);

    user.score += points;

    if (user.score >= user.level * 50) {
      user.level += 1;
    }

    await user.save();
  }

  res.json({
    correct,
    points
  });
});

module.exports = router;