import axios from "axios";

// ================= API BASE =================
// 🔥 IMPORTANT: "/api" added because backend routes are mounted like:
// app.use("/api/auth"), /api/quiz, /api/user
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= AUTH TOKEN INTERCEPTOR =================
// Automatically attaches JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;