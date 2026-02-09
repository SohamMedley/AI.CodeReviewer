
### 

```markdown
# AI.CodeReviewer ⚡

> **Drop your chaos. Get order.** > A next-gen, high-speed AI code fixing engine powered by Groq & Llama 3.3.

---

## 🚀 **Overview**

**AI.CodeReviewer** is a futuristic, no-login web tool designed for developers who need instant code correction. Forget traditional chat interfaces; this is a "Chenzi-style" command center. 

Simply drop your file or paste your broken code, toggle your preferences, and watch the AI reconstruct it in milliseconds.

## ✨ **Key Features**

* **⚡ Blazing Fast:** Powered by **Groq Llama 3.3** for instant results.
* **🎨 Chenzi UI:** A unique, dark-mode, neon-glassmorphism interface.
* **🛠️ Auto-Fix:** Automatically detects bugs and provides a 100% clean, ready-to-copy version.
* **🧠 Auto-Explain:** (Optional) Explains *why* the code was broken and *how* it was fixed.
* **📂 Drag & Drop:** Support for direct file uploads (.py, .js, .cpp, .java, etc.).
* **📋 One-Click Copy:** Instant copy button for the fixed code.
* **🌈 Syntax Highlighting:** Integrated Prism.js for beautiful code readability.

---

## 🛠️ **Tech Stack**

* **Backend:** Python (Flask)
* **AI Engine:** Groq API (Llama-3.3-70b-versatile)
* **Frontend:** HTML5, CSS3 (Custom "Chenzi" Design), JavaScript (Vanilla)
* **Styling:** Custom CSS Variables + Glassmorphism

---

## ⚙️ **Installation & Setup**

### **1. Prerequisites**
* Python 3.8 or higher installed.
* A free API Key from [Groq Console](https://console.groq.com).

### **2. Project Setup**
Open your terminal (PowerShell or Command Prompt) and navigate to the folder where you want to install.

```powershell
# Create project directory
mkdir AI.CodeReviewer
cd AI.CodeReviewer

```

### **3. Install Dependencies**

Create a `requirements.txt` file with the following content:

```text
flask
groq

```

Then run:

```powershell
# Create virtual environment (Optional but recommended)
python -m venv venv
.\venv\Scripts\Activate

# Install libraries
pip install -r requirements.txt

```

### **4. Configure API Key**

Open `app.py` and replace the placeholder with your actual Groq API Key:

```python
# In app.py
GROQ_API_KEY = "gsk_YOUR_KEY_HERE"

```

---

## 🚀 **How to Run**

1. **Start the Server:**
```powershell
python app.py

```


2. **Launch Interface:**
Open your browser and go to:
`http://127.0.0.1:5000`

---

## 📂 **Project Structure**

```text
AI.CodeReviewer/
│
├── app.py                # Flask Backend & Logic
├── requirements.txt      # Python Dependencies
├── README.md             # Documentation
│
├── templates/
│   └── index.html        # Main Interface Structure
│
└── static/
    ├── style.css         # The "Chenzi" Design System
    └── script.js         # Frontend Logic (API & Drag-n-Drop)

```

---

## 💡 **Usage Guide**

1. **Toggle Preferences:**
* **Auto-Fix (Default ON):** Returns corrected code.
* **Auto-Explain (Default OFF):** Adds a diagnostic log below the code explaining the errors.


2. **Input Code:** Paste text into the box OR drag & drop a code file.
3. **Execute:** Click **"EXECUTE SEQUENCE"**.
4. **Result:** Copy the fixed code immediately.

---

*Built with ❤️ from the Soham*

```

```
