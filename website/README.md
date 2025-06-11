# English to Hindi Translator Web Application

This web application showcases the fine-tuned MarianMT model for translating English text to Hindi.

## Features

- Modern, responsive UI
- Real-time translation from English to Hindi
- Text-to-speech functionality for Hindi output
- Copy to clipboard functionality
- Clear and intuitive design

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Model**: Fine-tuned MarianMT model (Helsinki-NLP/opus-mt-en-hi)

## Setup

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the application:
   ```
   python app.py
   ```

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## Deployment

For Windows users, you can simply run the included batch file:
```
run.bat
```

## Model Information

This application uses a fine-tuned version of the Helsinki-NLP/opus-mt-en-hi (MarianMT) model, which was trained on the IITB English-Hindi Parallel Corpus. The model was fine-tuned with specific hyperparameters to optimize translation quality.

## Evaluation Metrics

The model was evaluated using:
- BLEU (Bilingual Evaluation Understudy)
- ROUGE (Recall-Oriented Understudy for Gisting Evaluation)
- METEOR (Metric for Evaluation of Translation with Explicit ORdering)
