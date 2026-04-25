import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";

export default function Topic({ setTopic, setStep })  {
  const [score, setScore] = useState(0);
  

  // 🔹 fetch user score
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setScore(res.data.user.score || 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  //  level logic
  const level = Number(localStorage.getItem("level") || 1);
  
  // 🔹 topics with lock system
  const topics = [
    { name: "DSA", unlock: 1 },
    { name: "Coding", unlock: 2 },
    { name: "AI", unlock: 3 }
  ];

  return (
    <div style={styles.container}>
      <h1>Choose Topic</h1>

      <h3>Score: {score}</h3>
      <h3>Level: {level}</h3>

      {topics.map((t, i) => {
        const isLocked = level < t.unlock;

        return (
          <motion.div
            key={i}
            style={{
              ...styles.card,
              opacity: isLocked ? 0.5 : 1,
              cursor: isLocked ? "not-allowed" : "pointer"
            }}
            whileHover={!isLocked ? { scale: 1.05 } : {}}
            onClick={() => {
              if (!isLocked) setTopic(t.name);
            }}
          >
            <h2>{t.name}</h2>

            {isLocked && (
              <p style={{ color: "red" }}>
                Unlock at Level {t.unlock}
              </p>
            )}
          </motion.div>
        );
      })}
          {/* PROFILE BUTTON */}
      <motion.button
       onClick={() => setStep("profile")} 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: 25,
          padding: "10px 15px",
          background: "#111827",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        👤 View Profile
      </motion.button>

    </div>

    
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: 30,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white"
  },
  card: {
    background: "white",
    color: "black",
    padding: 20,
    margin: "15px auto",
    width: 250,
    borderRadius: 12,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
  }
};