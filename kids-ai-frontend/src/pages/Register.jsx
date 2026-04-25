import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/api";

export default function Register({ onSuccess, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ✅ FIXED: handleChange added
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED: correct form usage
  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email.toLowerCase(),
        password: form.password,
      });

      alert("Registered successfully");

      onSuccess(); // go to login

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <h2>Register</h2>

      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />

      <br />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        value={form.password}
        placeholder="Password"
        onChange={handleChange}
      />

      <br />

      <motion.button
        onClick={handleRegister}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginTop: 10 }}
      >
        Create Account
      </motion.button>

      <p
        onClick={onSwitch}
        style={{ cursor: "pointer", marginTop: 10 }}
      >
        Already have account? Login
      </p>
    </motion.div>
  );
}