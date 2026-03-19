import React, { useState } from "react";
import GraphView from "./GraphView";
import { motion } from "framer-motion";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("summary");
  const [darkMode, setDarkMode] = useState(false);

  const analyze = async () => {
    if (!text) return;

    setLoading(true);
    setData(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const result = await res.json();
      setData(result);
    } catch {
      alert("Error fetching data");
    }

    setLoading(false);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(data.summary);
    alert("Copied!");
  };

  const downloadQuiz = () => {
    const quizText = data.quiz.map((q, i) =>
      `Q${i + 1}. ${q.question}
${q.options.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`).join("\n")}
Answer: ${q.answer}\n`
    ).join("\n");

    const blob = new Blob([quizText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz.txt";
    a.click();
  };

  const theme = darkMode ? dark : light;

  return (
    <div style={{ ...container, background: theme.bg, color: theme.text }}>
      <h1 style={title}>🧠 NeuroNotes AI</h1>

      {/* DARK MODE TOGGLE */}
      <button onClick={() => setDarkMode(!darkMode)} style={toggle}>
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* INPUT */}
      <div style={{ ...card, background: theme.card }}>
        <textarea
          rows="6"
          style={textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your notes..."
        />
        <button style={button} onClick={analyze}>
          Analyze ✨
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>⚡ Thinking...</p>}

      {data && !loading && (
        <>
          {/* TABS */}
          <div style={tabs}>
            {["summary", "graph", "quiz"].map((t) => (
              <button
                key={t}
                style={{
                  ...tabBtn,
                  background: tab === t ? "#14b8a6" : "transparent",
                  color: tab === t ? "white" : theme.text
                }}
                onClick={() => setTab(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {tab === "summary" && (
              <div style={{ ...card, background: theme.card }}>
                <h2>📘 Summary</h2>
                <p>{data.summary}</p>
                <button style={smallBtn} onClick={copySummary}>
                  Copy
                </button>
              </div>
            )}

            {tab === "graph" && (
              <div style={{ ...card, background: theme.card }}>
                <h2>🧠 Graph</h2>
                <GraphView graph={{ nodes: data.nodes, edges: data.edges }} />
              </div>
            )}

            {tab === "quiz" && (
              <div style={{ ...card, background: theme.card }}>
                <h2>❓ Quiz</h2>
                {data.quiz.map((q, i) => (
                  <div key={i} style={quizBlock}>
                    <p><b>Q{i + 1}. {q.question}</b></p>
                    {q.options.map((opt, j) => (
                      <p key={j}>
                        {String.fromCharCode(65 + j)}. {opt}
                      </p>
                    ))}
                    <p style={{ color: "#14b8a6" }}>
                      <b>Answer:</b> {q.answer}
                    </p>
                  </div>
                ))}
                <button style={smallBtn} onClick={downloadQuiz}>
                  Download
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}

/* 🎨 THEMES */

const light = {
  bg: "linear-gradient(135deg, #e0f7fa, #f1f5f9)",
  text: "#111",
  card: "white"
};

const dark = {
  bg: "#0f172a",
  text: "#f1f5f9",
  card: "#1e293b"
};

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  padding: "30px",
  fontFamily: "Segoe UI"
};

const title = { textAlign: "center" };

const card = {
  padding: "20px",
  margin: "20px auto",
  maxWidth: "800px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
};

const textarea = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px"
};

const button = {
  padding: "10px 20px",
  background: "#14b8a6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const smallBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  background: "#0ea5e9",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const toggle = {
  position: "absolute",
  right: "20px",
  top: "20px",
  padding: "6px 12px"
};

const tabs = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const tabBtn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const quizBlock = {
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "8px",
  background: "rgba(0,0,0,0.05)"
};

export default App;