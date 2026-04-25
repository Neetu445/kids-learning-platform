import { motion } from "framer-motion";

export default function ProgressBar({ score }) {
  const progress = Math.min(score, 100);

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.bar}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      <p>XP: {score}</p>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    background: "#ddd",
    borderRadius: 10,
  },
  bar: {
    height: 10,
    background: "#4caf50",
    borderRadius: 10,
  },
};