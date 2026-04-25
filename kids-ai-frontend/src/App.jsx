import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Topic from "./pages/Topic";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

export default function App() {
  const [step, setStep] = useState("register");
  const [topic, setTopic] = useState(null);
  const [user, setUser] = useState(null);

  // ⭐ ADD THIS (VERY IMPORTANT)
  const [score, setScore] = useState(0);

  if (step === "register") {
    return <Register onSuccess={() => setStep("login")} onSwitch={() => setStep("login")} />;
  }

  if (step === "login") {
    return (
      <Login
        setUser={setUser}
        onSuccess={() => setStep("topic")}
        onSwitch={() => setStep("register")}
      />
    );
  }

  if (step === "profile") {
    return <Profile user={user} onBack={() => setStep("topic")} />;
  }

  if (step === "topic") {
    return (
      <Topic
        setTopic={(t) => {
          setTopic(t);
          setStep("learn");
        }}
        setStep={setStep}
      />
    );
  }

  if (step === "learn") {
    return <Learn topic={topic} onNext={() => setStep("quiz")} />;
  }

  return (
    <Quiz
      topic={topic}
      setTopic={() => setStep("topic")}
      score={score}
      setScore={setScore}   // ⭐ FIX
      onComplete={() => setStep("topic")}
    />
  );
}