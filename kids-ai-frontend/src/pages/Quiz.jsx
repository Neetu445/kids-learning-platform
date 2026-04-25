import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";

export default function Quiz({ topic, setTopic, score, setScore }) {

  // ================= STATES =================
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);

  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [loading, setLoading] = useState(false);

  // ================= LOAD QUESTIONS =================
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);

      try {
        const res = await API.get(`/quiz/${topic}`);

        const qList = res.data?.questions || [];

        setQuestions(Array.isArray(qList) ? qList : []);
        setCurrent(0);
        setFinished(false);
        setSelected(null);
        setCorrectAnswer("");
        setCorrectCount(0);

      } catch (err) {
        console.log("Error loading questions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (topic) loadQuestions();
  }, [topic]);

  // ================= SAVE PROGRESS =================
  const saveProgress = async (xp = 10, isComplete = false) => {
    try {
      await API.post("/user/progress", {
        topic,
        xp,
        completed: isComplete,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ================= HANDLE ANSWER =================
  const handleAnswer = async (option) => {
    if (selected || finished) return;

    const q = questions[current];
    if (!q) return;

    setSelected(option);

    try {
      const res = await API.post("/quiz/submit", {
        questionId: q._id,
        answer: option,
      });

      // 🔥 FIX: safe response handling
      const data = res.data?.data ?? res.data;

      setCorrectAnswer(q.answer);

      if (data?.correct) {
        const points = data.points || 10;
        setScore((prev) => prev + points);
        setCorrectCount((prev) => prev + 1);

        saveProgress(points, false);
      }

      // ================= NEXT QUESTION FIX =================
      setTimeout(() => {
        setSelected(null);
        setCorrectAnswer("");

        setCurrent((prev) => {
          const next = prev + 1;

          if (next < questions.length) {
            return next;
          } else {
            setFinished(true);
            return prev;
          }
        });
      }, 700);

    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  // ================= RESET =================
  const resetQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setCorrectAnswer("");
    setFinished(false);
    setCorrectCount(0);
  };

  // ================= LOADING =================
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading questions...</h2>;
  }

  if (!questions.length) {
    return <h2 style={{ textAlign: "center" }}>No questions found</h2>;
  }

  const q = questions[current];
  if (!q) return null;

  // ================= RESULT SCREEN =================
  if (finished) {

    const passMark = Math.ceil(questions.length / 2);
    const isPass = correctCount >= passMark;

    return (
      <div style={styles.container}>

        <h1>
          {isPass ? "🎉 Level Completed!" : "❌ Level Failed"}
        </h1>

        <h2>XP Earned: {score}</h2>

        <p>
          Correct: {correctCount} / {questions.length}
        </p>

        <p>
          {isPass
            ? "Great job! Next level unlocked 🚀"
            : "Try again and improve 💪"}
        </p>

        <button style={styles.btn} onClick={resetQuiz}>
          🔁 Retry
        </button>

        {isPass && (
  <button
    style={{ ...styles.btn, marginLeft: 10 }}
    onClick={() => {
      resetQuiz();

      const lvl = Number(localStorage.getItem("level") || 1);
const newLevel = lvl + 1;

localStorage.setItem("level", newLevel);

// notify app
window.dispatchEvent(new Event("level-up"));

setTopic(null);

      setTopic(null);
    }}
  >
    🚀 Next Level
  </button>
)}
        <button
          style={{ ...styles.btn, marginTop: 10, background: "red" }}
          onClick={() => {
            resetQuiz();
            setTopic(null);
          }}
        >
          🚪 Quit
        </button>

      </div>
    );
  }

  // ================= QUIZ UI =================
  return (
    <div style={styles.container}>

      <div style={styles.topBar}>
        <button onClick={() => {
          resetQuiz();
          setTopic(null);
        }}>
          Quit
        </button>
      </div>

      <h2>{topic}</h2>
      <h3>{q.question}</h3>

      {(q.options || []).map((opt, i) => {
        let bg = "#eee";

        if (selected) {
          if (opt === correctAnswer) bg = "#4caf50";
          else if (opt === selected) bg = "#f44336";
        }

        return (
          <motion.button
            key={i}
            style={{ ...styles.option, background: bg }}
            onClick={() => handleAnswer(opt)}
            whileTap={{ scale: 0.95 }}
          >
            {opt}
          </motion.button>
        );
      })}

    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    textAlign: "center",
    padding: 30,
  },
  option: {
    display: "block",
    margin: "10px auto",
    padding: 12,
    width: 260,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  btn: {
    padding: 10,
    marginTop: 20,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
};