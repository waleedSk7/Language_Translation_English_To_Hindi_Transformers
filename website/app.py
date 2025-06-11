import os
import torch
from flask import Flask, render_template, request, jsonify
from transformers import MarianMTModel, MarianTokenizer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Path to the fine-tuned model
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                         "Runs", "fine_tuned_opus-mt-en-hi - 1", "fine_tuned_opus-mt-en-hi")

# Fallback to the base model if the fine-tuned model doesn't exist (for deployment)
FALLBACK_MODEL = 'Helsinki-NLP/opus-mt-en-hi'

# Load the model and tokenizer
@app.route('/')
def load_model():
    global model, tokenizer
    try:
        # Check if model is already loaded
        if 'model' not in globals():
            # Try to load the fine-tuned model first
            try:
                print("Attempting to load fine-tuned model from:", MODEL_PATH)
                tokenizer = MarianTokenizer.from_pretrained(MODEL_PATH)
                model = MarianMTModel.from_pretrained(MODEL_PATH, from_tf=False, local_files_only=True)
                print("Fine-tuned model loaded successfully!")
            except Exception as model_error:
                print(f"Could not load fine-tuned model: {str(model_error)}")
                print(f"Falling back to base model: {FALLBACK_MODEL}")
                tokenizer = MarianTokenizer.from_pretrained(FALLBACK_MODEL)
                model = MarianMTModel.from_pretrained(FALLBACK_MODEL)
                print("Base model loaded successfully!")
        return render_template('index.html')
    except Exception as e:
        return render_template('error.html', error=str(e))

@app.route('/translate', methods=['POST'])
def translate():
    try:
        # Get the input text from the request
        data = request.get_json()
        input_text = data.get('text', '')
        
        if not input_text.strip():
            return jsonify({"error": "Please enter some text to translate"})
        
        # Tokenize the input text
        inputs = tokenizer(input_text, return_tensors="pt", padding=True)
        
        # Generate the translation
        with torch.no_grad():
            translated = model.generate(**inputs)
        
        # Decode the translated text
        translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)
        
        return jsonify({
            "input": input_text,
            "translated": translated_text
        })
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    # Get port from environment variable for hosting platforms or use default 5000
    port = int(os.environ.get('PORT', 10000))
    print(f"Starting server on port {port}")
    app.run(host='0.0.0.0', port=port)
