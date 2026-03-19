

# 🧠 AI Study Assistant (Knowledge Graph + Quiz Generator)

An AI-powered study tool that transforms raw notes into structured learning content — including summaries, knowledge graphs, and quizzes.

---

## 🚀 Features

* ✍️ **Note Analysis**

  * Input raw notes or concepts
  * AI processes and structures the content

* 📄 **Smart Summary**

  * Generates clear, concise, and structured summaries

* 🧩 **Knowledge Graph**

  * Visualizes relationships between concepts
  * Interactive graph with nodes and connections

* 🧠 **Quiz Generator**

  * Auto-generates multiple-choice questions (MCQs)
  * Includes options (A, B, C, D) and correct answers

* ⚡ **Fast AI Inference**

  * Powered by Groq API (low latency LLMs)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Force Graph (for visualization)
* Framer Motion (animations)

### Backend

* FastAPI (Python)
* Groq API (LLM inference)
* Python-dotenv (environment management)

---

## 📁 Project Structure

```
AI-Study-Assistant/
│
├── backend/
│   ├── main.py
│   ├── llm.py
│   ├── prompts.py
│   ├── utils.py
│   └── .env (not included)
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---



## 🧪 How It Works

1. User enters notes in the UI
2. Frontend sends data → FastAPI backend
3. Backend calls LLM (Groq)
4. AI returns:

   * Summary
   * Graph structure (nodes + edges)
   * Quiz questions
5. Frontend renders results dynamically

---

## 📊 Example Output

* Summary of input notes
* Interactive knowledge graph
* 5–10 MCQs with answers



---

## 💼 Use Case

* Students revising subjects
* Quick concept understanding
* Exam preparation
* Knowledge visualization




