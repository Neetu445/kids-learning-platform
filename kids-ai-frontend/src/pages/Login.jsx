import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/api";

export default function Login({ setUser, onSwitch, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ update user state
      setUser(res.data.token);

      alert("Login successful");

      // ✅ VERY IMPORTANT → move to next screen
      onSuccess();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Kids AI Learning</h1>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          style={styles.button}
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <p
          style={{ cursor: "pointer", color: "blue", marginTop: 10 }}
          onClick={onSwitch}
        >
          Create new account
        </p>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    width: 320,
    padding: 25,
    borderRadius: 15,
    background: "white",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};