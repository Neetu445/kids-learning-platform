import { motion } from "framer-motion";

export default function Learn({ topic, onNext }) {

  const content = {
    DSA: [
      " Array = collection of elements stored in order",
      " Each element has an index starting from 0",
      " Direct access using index (fast retrieval)",
      " Used in lists, scores, and structured data",
      " Base of advanced data structures like stacks & queues"
    ],

    Coding: [
      " Coding = giving instructions to computer",
      " Programs are built using logic + syntax",
      " Loops repeat tasks automatically",
      " Conditions help decisions (if/else)",
      " Every app/game is created using code"
    ],

    AI: [
      " AI = machines that learn from data",
      " Finds patterns and makes predictions",
      " Example: YouTube recommendations",
      " Used in face recognition & chatbots",
      " Improves automatically with more data"
    ]
  };

  const steps = content[topic] || ["Loading knowledge..."];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{topic} Level 🧠</h1>

      <p style={styles.subtitle}>Complete all steps to unlock Quiz 🚀</p>

      {/* GAME LEVEL CARDS */}
      <div style={styles.grid}>
        {steps.map((text, i) => (
          <motion.div
            key={i}
            style={styles.card}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={styles.badge}>Level {i + 1}</div>
            <div>{text}</div>
          </motion.div>
        ))}
      </div>

      {/* START QUIZ BUTTON */}
      <motion.button
        style={styles.button}
        onClick={onNext}
        whileHover={{
          scale: 1.08,
          boxShadow: "0px 0px 20px rgba(79,70,229,0.6)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0px 0px 10px rgba(79,70,229,0.3)",
            "0px 0px 20px rgba(79,70,229,0.6)",
            "0px 0px 10px rgba(79,70,229,0.3)"
          ]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Start Quiz 
      </motion.button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: "center",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
    minHeight: "100vh",
    color: "white"
  },
  title: {
    fontSize: 28,
    marginBottom: 5
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 20
  },
  grid: {
    display: "grid",
    gap: 15,
    justifyContent: "center"
  },
  card: {
    width: 320,
    padding: 15,
    borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    textAlign: "left",
    cursor: "pointer"
  },
  badge: {
    display: "inline-block",
    padding: "3px 8px",
    fontSize: 12,
    borderRadius: 6,
    background: "#4f46e5",
    marginBottom: 8
  },
  button: {
    marginTop: 30,
    padding: "12px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    cursor: "pointer"
  }
};