import { useEffect, useRef, useState } from "react";

export default function Profile({ user, onBack }) {

  // ================= STATES =================
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [photo, setPhoto] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const xp = user?.xp || 0;
  const level = Math.floor(xp / 50) + 1;
  const progress = (xp % 50) * 2;

  // ================= LOAD =================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));

    if (saved) {
      setName(saved.name || "");
      setAge(saved.age || "");
      setAbout(saved.about || "");
      setAvatar(saved.avatar || "");
      setPhoto(saved.photo || null);
    }
  }, []);

  // ================= AVATARS =================
  const avatars = [
    "https://i.imgur.com/6VBx3io.png",
    "https://i.imgur.com/8Km9tLL.png",
    "https://i.imgur.com/4L4hZfW.png",
    "https://i.imgur.com/0y8Ftya.png",
  ];

  // ================= FILE UPLOAD =================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // ================= CAMERA =================
  const startCamera = async () => {
    setCameraOpen(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setPhoto(image);

    video.srcObject.getTracks().forEach((t) => t.stop());
    setCameraOpen(false);
  };

  // ================= REMOVE PHOTO =================
  const removePhoto = () => {
    setPhoto(null);
  };

  // ================= SAVE =================
  const saveProfile = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify({ name, age, about, avatar, photo })
    );

    alert("Profile Saved ");
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    alert("Logged out ");

    window.location.reload();
  };

  // ================= UI =================
  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>👤
        <h2 style={{ color: "#0f172a", fontWeight: "800" }}>
  My Profile
</h2>
          <button style={styles.backBtn} onClick={onBack}>⬅ Back</button>
        </div>

        {/* PROFILE PHOTO SECTION */}
        <div style={styles.section}>

          <img
            src={photo || avatar || avatars[0]}
            alt="profile"
            style={styles.img}
          />

          <div style={styles.btnRow}>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button onClick={startCamera} style={styles.btn}>
               Camera
            </button>

            <button onClick={removePhoto} style={styles.dangerBtn}>
               Remove
            </button>
          </div>
        </div>

        {/* EDIT SECTION */}
        <div style={styles.section}>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={styles.input}
          />

          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            style={styles.input}
          />

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About you..."
            style={styles.textarea}
          />

        </div>

        {/* AVATAR SECTION */}
        <div style={styles.section}>
          <h3 style={{ color: "#0f172a", fontWeight: "700" }}>
  Choose Avatar
</h3>

          <div style={styles.avatarRow}>
            {avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt="avatar"
                onClick={() => setAvatar(a)}
                style={{
                  ...styles.avatar,
                  border: avatar === a ? "3px solid #4f46e5" : "2px solid transparent"
                }}
              />
            ))}
          </div>
        </div>

        {/* XP SECTION */}
        <div style={styles.section}>
          <h3 style={{ color: "#0f172a", fontWeight: "700" }}>
  Progress
</h3>

          <p>Level {level}</p>

          <div style={styles.bar}>
            <div style={{ ...styles.fill, width: `${progress}%` }} />
          </div>

          <p>{xp} XP</p>
        </div>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button onClick={saveProfile} style={styles.saveBtn}>
            💾 Save
          </button>

          <button onClick={logout} style={styles.logoutBtn}>
            🚪 Logout
          </button>
        </div>

        {/* CAMERA */}
        {cameraOpen && (
          <div style={styles.cameraBox}>
            <video ref={videoRef} autoPlay style={styles.video} />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <button onClick={capturePhoto} style={styles.btn}>
              📸 Capture
            </button>

            <button onClick={() => setCameraOpen(false)} style={styles.dangerBtn}>
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {

  page: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    background: "#eef2ff",
    minHeight: "100vh",
  },

card: {
  width: 420,
  padding: 20,
  borderRadius: 20,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  color: "#f8fafc", 
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
},

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section: {
    marginTop: 15,
    padding: 15,
    background: "#f9fafb",
    borderRadius: 12,
  },

  img: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    border: "3px solid #4f46e5",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    height: 80,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  btn: {
    padding: 8,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  dangerBtn: {
    padding: 8,
    background: "red",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  avatarRow: {
    display: "flex",
    gap: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    cursor: "pointer",
  },

 bar: {
  height: 12,
  background: "rgba(255,255,255,0.15)",
  borderRadius: 10,
  overflow: "hidden",
},

  fill: {
  height: "100%",
  background: "linear-gradient(90deg,#6366f1,#22c55e)",
  transition: "0.5s",
},

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },

  saveBtn: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
  },

  logoutBtn: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: 8,
  },

  cameraBox: {
    marginTop: 15,
  },

  video: {
    width: "100%",
    borderRadius: 10,
  },

  backBtn: {
    padding: 6,
    border: "none",
    background: "#111827",
    color: "white",
    borderRadius: 8,
  }
};