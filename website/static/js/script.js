document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const translateBtn = document.getElementById('translate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyInputBtn = document.getElementById('copy-input-btn');
    const copyOutputBtn = document.getElementById('copy-output-btn');
    const speakBtn = document.getElementById('speak-btn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const btnText = document.querySelector('.btn-text');

    // Function to handle translation
    async function translateText() {
        const text = inputText.value.trim();
        
        if (!text) {
            showNotification('Please enter some text to translate', 'error');
            return;
        }
        
        // Show loading state
        setLoading(true);
        
        try {
            const response = await fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text }),
            });
            
            const data = await response.json();
            
            if (data.error) {
                showNotification(data.error, 'error');
                outputText.textContent = '';
            } else {
                outputText.textContent = data.translated;
                showNotification('Translation completed!', 'success');
            }
        } catch (error) {
            showNotification('Failed to translate: ' + error.message, 'error');
            outputText.textContent = '';
        } finally {
            setLoading(false);
        }
    }
    
    // Function to set loading state
    function setLoading(isLoading) {
        if (isLoading) {
            loadingSpinner.classList.remove('hidden');
            btnText.textContent = 'Translating...';
            translateBtn.disabled = true;
        } else {
            loadingSpinner.classList.add('hidden');
            btnText.textContent = 'Translate';
            translateBtn.disabled = false;
        }
    }
    
    // Function to show notification
    function showNotification(message, type) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Append to body
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy text!', 'error');
        }
    }
    
    // Function to speak text
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.lang = 'hi-IN';
            window.speechSynthesis.speak(speech);
        } else {
            showNotification('Speech synthesis not supported in this browser!', 'error');
        }
    }
    
    // Event Listeners
    translateBtn.addEventListener('click', translateText);
    
    inputText.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            translateText();
        }
    });
    
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.textContent = '';
        inputText.focus();
    });
    
    copyInputBtn.addEventListener('click', function() {
        copyToClipboard(inputText.value);
    });
    
    copyOutputBtn.addEventListener('click', function() {
        copyToClipboard(outputText.textContent);
    });
    
    speakBtn.addEventListener('click', function() {
        const text = outputText.textContent.trim();
        if (text) {
            speakText(text);
        } else {
            showNotification('No text to speak!', 'error');
        }
    });
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slide-in 0.3s ease-out;
        }
        
        .notification.success {
            background-color: #10b981;
        }
        
        .notification.error {
            background-color: #ef4444;
        }
        
        .notification.fade-out {
            animation: fade-out 0.5s ease-out forwards;
        }
        
        @keyframes slide-in {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
