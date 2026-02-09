import os
from flask import Flask, render_template, request, jsonify
from groq import Groq

app = Flask(__name__)

# --- CONFIGURATION ---
# Your Groq API Key
GROQ_API_KEY = "ENTER-YOUR-API-KEY"

client = Groq(api_key=GROQ_API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    code_content = data.get('code')
    auto_fix = data.get('autoFix')
    auto_explain = data.get('autoExplain')

    if not code_content:
        return jsonify({"error": "No code provided"}), 400

    # System instruction to force the specific behavior
    system_prompt = f"""
    You are an expert AI Code Reviewer. 
    
    USER PREFERENCES:
    - Auto Fix: {auto_fix}
    - Auto Explain: {auto_explain}

    INSTRUCTIONS:
    1. Analyze the user's code for errors.
    2. OUTPUT FORMAT: You must strictly separate the code and the explanation with the string "|||SPLIT|||".
    
    SECTION 1 (The Code):
    - If Auto Fix is TRUE: Provide the fully corrected, error-free code. If the code is already correct, return it exactly as is.
    - If Auto Fix is FALSE: Return the user's original code.
    - IMPORTANT: Do NOT wrap the code in markdown (like ```python ... ```). Just provide the raw code text.
    
    SECTION 2 (The Explanation):
    - If Auto Explain is FALSE: Leave this section empty.
    - If Auto Explain is TRUE:
        - If the code was CORRECT: Start with "The code you gave is absolutely correct." then explain it.
        - If the code was WRONG: Start with "The code provided contained errors." Explain why, then explain the fix.
    """

    user_prompt = f"""
    CODE TO ANALYZE:
    {code_content}
    """

    try:
        completion = client.chat.completions.create(
            # UPDATED: This uses the newest supported model
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1, 
            max_tokens=2048,
            top_p=1,
            stop=None,
            stream=False
        )

        text = completion.choices[0].message.content
        
        # Parse the custom separator
        if "|||SPLIT|||" in text:
            parts = text.split("|||SPLIT|||")
            fixed_code = parts[0].strip()
            explanation = parts[1].strip() if len(parts) > 1 else ""
        else:
            # Fallback if the AI forgets the separator
            fixed_code = text
            explanation = "Explanation unavailable (AI format error)."

        # Cleanup: remove markdown backticks if present
        if fixed_code.startswith("```"):
            lines = fixed_code.split('\n')
            # Remove first line if it starts with ```
            if lines[0].strip().startswith("```"):
                lines = lines[1:]
            # Remove last line if it's just ```
            if lines and lines[-1].strip() == "```":
                lines = lines[:-1]
            fixed_code = "\n".join(lines)

        return jsonify({
            "fixed_code": fixed_code.strip(),
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)