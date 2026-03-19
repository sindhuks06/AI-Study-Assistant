import json
import re

def safe_json_parse(text):
    try:
        return json.loads(text)
    except:
        # Extract JSON block
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                pass

        return {
            "summary": "",
            "nodes": [],
            "edges": [],
            "quiz": []
        }