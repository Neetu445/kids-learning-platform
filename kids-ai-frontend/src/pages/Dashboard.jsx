import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome {user.name}</h1>

        <div style={styles.box}>
          <p>Score: {user.score}</p>
          <p>Level: {user.level}</p>
        </div>

        <button style={styles.button}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
  },
  card: {
    width: 350,
    padding: 25,
    borderRadius: 15,
    background: "white",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  box: {
    margin: "20px 0",
    padding: 15,
    background: "#f3f4f6",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};