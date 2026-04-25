const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  userId: String,

  topic: String, // arrays, loops, etc
  level: Number,

  score: { type: Number, default: 0 },

  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Game", gameSchema);