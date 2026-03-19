from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env")   # 🔥 FORCE load

print("LOADED KEY:", os.getenv("GROQ_API_KEY"))  # debug

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from llm import ask_llm
from prompts import full_analysis_prompt
from utils import safe_json_parse


app = FastAPI()

# ✅ Enable CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "NeuroNotes AI running 🚀"}


@app.post("/analyze")
def analyze(data: dict):
    try:
        text = data.get("text", "")

        # 🔥 Call LLM
        raw_response = ask_llm(full_analysis_prompt(text))
        print("RAW LLM OUTPUT:\n", raw_response)

        # 🔥 Parse JSON safely
        parsed = safe_json_parse(raw_response)

        # 🔥 Convert nodes to graph format
        nodes = [{"id": n, "name": n} for n in parsed.get("nodes", [])]

        # 🔥 Convert edges to graph format
        edges = [
            {
                "source": e.get("from"),
                "target": e.get("to"),
                "label": e.get("relation", "")
            }
            for e in parsed.get("edges", [])
            if e.get("from") and e.get("to")
        ]

        return {
            "summary": parsed.get("summary", ""),
            "nodes": nodes,
            "edges": edges,
            "quiz": parsed.get("quiz", [])
        }

    except Exception as e:
        print("ERROR IN /analyze:", str(e))

        # ✅ Safe fallback (prevents crash)
        return {
            "summary": "Error generating response",
            "nodes": [],
            "edges": [],
            "quiz": []
        }