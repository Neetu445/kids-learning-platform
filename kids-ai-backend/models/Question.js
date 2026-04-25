const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
    // examples: arrays, recursion, dp, graphs
  },

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  answer: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },

  explanation: {
    type: String
  }
});

module.exports = mongoose.model("Question", questionSchema);