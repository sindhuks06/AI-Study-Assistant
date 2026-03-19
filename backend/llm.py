import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_llm(prompt):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # ✅ NEW WORKING MODEL
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        return response.choices[0].message.content

    except Exception as e:
        print("LLM ERROR:", str(e))
        return "{}"