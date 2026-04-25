import { motion } from "framer-motion";

export default function LevelBar({ score }) {
  const level = Math.floor(score / 50) + 1;
  const progress = (score % 50) * 2; // 50 XP → 100%

  return (
    <div style={styles.container}>
      <h3>Level {level}</h3>

      <div style={styles.barContainer}>
        <motion.div
          style={styles.bar}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p>{score} XP</p>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px auto",
    width: "80%",
    textAlign: "center",
  },
  barContainer: {
    height: 10,
    background: "#ddd",
    borderRadius: 10,
  },
  bar: {
    height: 10,
    background: "#4caf50",
    borderRadius: 10,
  },
};