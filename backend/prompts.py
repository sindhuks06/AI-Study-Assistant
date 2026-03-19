def full_analysis_prompt(text):
    return f"""
You are an AI study assistant.

Analyze the text and return ONLY valid JSON.

STRICT RULES:
- No explanation outside JSON
- Always return valid JSON

FORMAT:

{{
  "summary": "Write a detailed 4-6 sentence explanation covering key concepts clearly",

  "nodes": ["at least 6-10 important concepts"],

  "edges": [
    {{"from": "concept1", "to": "concept2", "relation": "relationship"}}
  ],

  "quiz": [
    {{
      "question": "conceptual question",
      "options": ["A", "B", "C", "D"],
      "answer": "correct answer"
    }}
  ]
}}

REQUIREMENTS:
- Summary must be detailed and informative (not one line)
- Extract at least 6–10 key concepts
- Create meaningful relationships between them
- Generate 5 quiz questions
- Questions should test understanding, not just memorization

Text:
{text}
"""