const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");

const questions = [
  // ================= DSA =================
  {
    topic: "DSA",
    question: "What is an array?",
    options: ["Data structure", "Loop", "Function", "Object"],
    answer: "Data structure",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "Index of first element in array?",
    options: ["0", "1", "-1", "Depends"],
    answer: "0",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "Time complexity of array access?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "What is stack?",
    options: ["LIFO", "FIFO", "Tree", "Graph"],
    answer: "LIFO",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "What is queue?",
    options: ["FIFO", "LIFO", "Tree", "Graph"],
    answer: "FIFO",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "What is recursion?",
    options: ["Function calling itself", "Loop", "Array", "Class"],
    answer: "Function calling itself",
    difficulty: "medium"
  },
  {
    topic: "DSA",
    question: "Base case in recursion?",
    options: ["Stopping condition", "Loop", "Variable", "Function"],
    answer: "Stopping condition",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "Binary search complexity?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n^2)"],
    answer: "O(log n)",
    difficulty: "medium"
  },
  {
    topic: "DSA",
    question: "Which DS uses FIFO?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: "Queue",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "Which DS uses LIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Stack",
    difficulty: "easy"
  },
  {
    topic: "DSA",
    question: "Linked list stores data in?",
    options: ["Nodes", "Arrays", "Stacks", "Queues"],
    answer: "Nodes",
    difficulty: "medium"
  },
  {
    topic: "DSA",
    question: "Worst case search in array?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    answer: "O(n)",
    difficulty: "medium"
  },

  // ================= CODING =================
  {
    topic: "Coding",
    question: "What is let in JavaScript?",
    options: ["Block scoped", "Global", "Constant", "Loop"],
    answer: "Block scoped",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Strict equality operator?",
    options: ["==", "===", "=", "!="],
    answer: "===",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Declare constant?",
    options: ["let", "var", "const", "define"],
    answer: "const",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Convert JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "parse()", "toJSON()"],
    answer: "JSON.parse()",
    difficulty: "medium"
  },
  {
    topic: "Coding",
    question: "Loop runs at least once?",
    options: ["for", "while", "do-while", "foreach"],
    answer: "do-while",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "What is function?",
    options: ["Reusable code", "Variable", "Loop", "Object"],
    answer: "Reusable code",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Single-line comment?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: "//",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Which is NOT primitive?",
    options: ["Object", "Number", "String", "Boolean"],
    answer: "Object",
    difficulty: "medium"
  },
  {
    topic: "Coding",
    question: "Which method adds element?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: "push()",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "Which removes last element?",
    options: ["pop()", "push()", "shift()", "map()"],
    answer: "pop()",
    difficulty: "easy"
  },
  {
    topic: "Coding",
    question: "What is DOM?",
    options: ["Document Object Model", "Data Object Model", "Design Model", "None"],
    answer: "Document Object Model",
    difficulty: "medium"
  },
  {
    topic: "Coding",
    question: "Which keyword defines function?",
    options: ["function", "def", "func", "method"],
    answer: "function",
    difficulty: "easy"
  },

  // ================= AI =================
  {
    topic: "AI",
    question: "AI stands for?",
    options: ["Artificial Intelligence", "Auto Input", "Advanced Internet", "None"],
    answer: "Artificial Intelligence",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "Machine learning?",
    options: ["Learning from data", "Coding", "Database", "OS"],
    answer: "Learning from data",
    difficulty: "medium"
  },
  {
    topic: "AI",
    question: "Popular AI language?",
    options: ["Python", "HTML", "CSS", "SQL"],
    answer: "Python",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "Neural network?",
    options: ["Brain-like model", "Database", "Code", "OS"],
    answer: "Brain-like model",
    difficulty: "medium"
  },
  {
    topic: "AI",
    question: "AI application?",
    options: ["Chatbot", "Mouse", "Keyboard", "Monitor"],
    answer: "Chatbot",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "Training means?",
    options: ["Learning from data", "Coding", "Testing", "Installing"],
    answer: "Learning from data",
    difficulty: "medium"
  },
  {
    topic: "AI",
    question: "Data in AI?",
    options: ["Information", "Code", "Hardware", "Software"],
    answer: "Information",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "AI used in?",
    options: ["Self-driving cars", "Paper", "Pen", "Books"],
    answer: "Self-driving cars",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "Model in AI?",
    options: ["Trained system", "Code file", "Database", "App"],
    answer: "Trained system",
    difficulty: "medium"
  },
  {
    topic: "AI",
    question: "Which is ML type?",
    options: ["Supervised", "Compiled", "Linked", "Stored"],
    answer: "Supervised",
    difficulty: "medium"
  },
  {
    topic: "AI",
    question: "AI goal?",
    options: ["Mimic human intelligence", "Store data", "Compile code", "None"],
    answer: "Mimic human intelligence",
    difficulty: "easy"
  },
  {
    topic: "AI",
    question: "Which is NOT AI?",
    options: ["Calculator", "Chatbot", "Recommendation", "Voice assistant"],
    answer: "Calculator",
    difficulty: "easy"
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log("Seed data inserted successfully");

    process.exit();
  } catch (err) {
    console.log("Seed error:", err.message);
    process.exit(1);
  }
}

seedDB();