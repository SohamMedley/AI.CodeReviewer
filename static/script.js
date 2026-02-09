document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileUpload');
    const codeInput = document.getElementById('codeInput');
    const executeBtn = document.getElementById('executeBtn');
    const outputModule = document.getElementById('outputModule');
    const codeDisplay = document.getElementById('codeDisplay');
    const explainModule = document.getElementById('explainModule');
    const explainText = document.getElementById('explainText');
    const copyBtn = document.getElementById('copyBtn');

    // Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    dropZone.addEventListener('dragenter', () => dropZone.classList.add('dragover'));
    dropZone.addEventListener('dragover', () => dropZone.classList.add('dragover'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    
    dropZone.addEventListener('drop', (e) => {
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function() { handleFiles(this.files); });

    function handleFiles(files) {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => codeInput.value = e.target.result;
            reader.readAsText(files[0]);
        }
    }

    // Execute API Call
    executeBtn.addEventListener('click', async () => {
        const code = codeInput.value;
        const autoFix = document.getElementById('autoFix').checked;
        const autoExplain = document.getElementById('autoExplain').checked;

        if (!code.trim()) return alert("No input detected.");

        executeBtn.disabled = true;
        executeBtn.innerText = "PROCESSING...";

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, autoFix, autoExplain })
            });

            const result = await response.json();

            if (result.error) throw new Error(result.error);

            // Show Results
            outputModule.classList.remove('hidden');
            codeDisplay.textContent = result.fixed_code;
            
            // --- SAFETY CHECK FOR PRISM ---
            if (window.Prism) {
                Prism.highlightElement(codeDisplay);
            } else {
                console.warn("Prism is not loaded, skipping syntax highlighting.");
            }
            // ------------------------------

            if (autoExplain && result.explanation) {
                explainModule.classList.remove('hidden');
                explainText.textContent = result.explanation;
            } else {
                explainModule.classList.add('hidden');
            }

            if (window.innerWidth < 900) {
                outputModule.scrollIntoView({ behavior: 'smooth' });
            }

        } catch (err) {
            alert("API Error: " + err.message);
        } finally {
            executeBtn.disabled = false;
            executeBtn.innerText = "EXECUTE SEQUENCE";
        }
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "COPIED";
            copyBtn.style.background = "var(--accent)";
            copyBtn.style.color = "var(--bg-base)";
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = "";
                copyBtn.style.color = "";
            }, 1500);
        });
    });
});