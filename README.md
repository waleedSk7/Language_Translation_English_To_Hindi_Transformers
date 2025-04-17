# English-Hindi Translation Model Evaluation

This project explores and evaluates various approaches to English-Hindi machine translation, including fine-tuning pre-trained models and comparing performance across different model architectures.

## Project Overview

The project consists of two main tasks:

1. **Fine-tuning a Translation Model**: Custom training of a MarianMT model (Helsinki-NLP/opus-mt-en-hi) for English to Hindi translation with optimization for M2 chip.
2. **Comparing Pre-trained Models**: Evaluation of three different pre-trained models for English to Hindi translation:
   - Helsinki-NLP/opus-mt-en-hi (MarianMT)
   - facebook/mbart-large-50 (mBART)
   - google/mt5-small (MT5)

## Dataset

This project uses the IITB English-Hindi Parallel Corpus, which contains a large collection of sentence pairs in English and Hindi. The dataset is loaded using the Hugging Face Datasets library from `cfilt/iitb-english-hindi`.

## Project Structure

```
Assignment - I/
│
├── Final_Report.docx                   # Final report document
├── Gen AI - Assignment 1.pdf           # Assignment instructions
├── README.md                           # This file
├── requirements.txt                    # Package dependencies
│
├── Local_Training_Scripts_ M2_Chip/    # Initial training script (not used for final models)
│   └── Gen_AI_ASSIGNMENT_Task_1.ipynb  # Notebook for training custom model
│
├── Output_files/                       # Evaluation results and visualizations
│   ├── all_models_metrics.csv          # Performance metrics for all models
│   ├── all_translations_results.csv    # Complete translation results
│   ├── bleu_distribution_*.png         # BLEU score distributions 
│   ├── comparison_*.png                # Comparative performance plots
│   ├── metrics_heatmap.png             # Heatmap of metrics across models
│   ├── model_all_metrics_comparison.png # Comparison across all metrics
│   └── model_comparison_samples.csv    # Sample translations for comparison
│
├── Results_and_plots/                  # Additional results documentation
│   ├── Task 1 Results and plots logged.docx  # Fine-tuning results
│   └── Task 2 results.xlsx             # Model comparison results
│
├── Runs/                               # Model checkpoints and artifacts
│   ├── model_keys.txt                  # Information about model keys
│   ├── fine_tuned_opus-mt-en-hi - 1/   # Model checkpoint from "to show 1.ipynb"
│   ├── fine_tuned_opus-mt-en-hi - 2/   # Model checkpoint from "to show 2.ipynb" 
│   └── fine_tuned_opus-mt-en-hi - 3/   # Model checkpoint from "to show 3.ipynb"
│
└── Scripts/                            # Evaluation scripts
    ├── Gen_AI_Assignment_Task2.ipynb   # Primary notebook for comparing models (Task 2)
    ├── to show 1.ipynb                 # Task 1 notebook with hyperparameter set 1
    ├── to show 2.ipynb                 # Same notebook with hyperparameter set 2
    └── to show 3.ipynb                 # Same notebook with hyperparameter set 3
```

## Notebooks Description

### Task 1: Fine-tuning Model

The Task 1 notebooks are identical in code structure but use different hyperparameters:

- `to show 1.ipynb`, `to show 2.ipynb`, and `to show 3.ipynb`: These are the same notebook with different hyperparameter configurations, resulting in three different trained models stored in the `Runs/` directory. Each notebook includes:
  - Dataset loading and preprocessing
  - Model and tokenizer initialization with specific hyperparameters
  - Training loop optimized for performance
  - Evaluation metrics calculation (BLEU, ROUGE, METEOR)
  - Visualization of training progress
  - Example translations and analysis

The notebook in `Local_Training_Scripts_ M2_Chip/` contains an initial version of the training script that was not used for the final models.

### Task 2: Model Comparison

The model comparison notebook (`Gen_AI_Assignment_Task2.ipynb`) includes:

- Loading and setup of three pre-trained models:
  - Helsinki-NLP/opus-mt-en-hi (MarianMT)
  - facebook/mbart-large-50 (mBART)
  - google/mt5-small (MT5)
- Consistent evaluation pipeline for fair comparison
- Multiple evaluation metrics implementation
- Statistical analysis of results
- Visualization of performance differences

## Key Features

### Task 1: Fine-tuning

- **Hyperparameter Experimentation**: Three different hyperparameter sets explored across the three notebooks
- **MPS (Metal Performance Shaders) Optimization**: Special handling for Apple Silicon chips
- **Robust Checkpointing**: Save and resume training with complete state
- **Signal Handler**: Emergency checkpoint saving on interruption
- **Memory Optimization**: Techniques for handling large datasets on limited RAM

The fine-tuning process includes:
1. Dataset loading and preprocessing
2. Model and tokenizer initialization with varied hyperparameters
3. Custom training loop optimized for M2 chip
4. Metrics calculation and visualization
5. Model evaluation on test data

### Task 2: Model Comparison

- **Model Loading & Configuration**: Setup of three different model architectures
- **Translation Implementation**: Model-specific translation functions
- **Metrics Calculation**: Comprehensive evaluation metrics
- **Statistical Analysis**: Comparative performance visualization
- **Sample Translation Analysis**: Qualitative assessment of model outputs

The comparison process includes:
1. Loading pre-trained models
2. Implementing model-specific translation functions
3. Evaluating models on test data
4. Computing and comparing performance metrics
5. Visualizing results and analyzing differences

## Evaluation Metrics

The following metrics are used to evaluate translation quality:

- **BLEU** (Bilingual Evaluation Understudy)
- **ROUGE-1/2/L** (Recall-Oriented Understudy for Gisting Evaluation)
- **METEOR** (Metric for Evaluation of Translation with Explicit ORdering)

## Results

The evaluation results are stored in the `Output_files/` directory, including comprehensive metrics for all models and visualizations that highlight performance differences. Key findings include:

- Performance comparison across different model architectures
- Analysis of translation quality using multiple metrics
- Sample translations for qualitative assessment

The `Results_and_plots/` directory contains detailed documentation of both tasks' outcomes.

## How to Run

### Prerequisites

- Python 3.7+
- Jupyter Notebook or JupyterLab environment

### Installing Dependencies

Install all required dependencies using the provided requirements.txt file:

```bash
pip install -r requirements.txt
```

For Apple Silicon (M1/M2) users, you might need to install PyTorch separately:

```bash
pip install torch torchvision torchaudio
```

### Task 1: Fine-tuning

To run the fine-tuning notebooks:

1. Open one of the three Task 1 notebooks in the `Scripts/` directory:
   - `to show 1.ipynb`: Uses hyperparameter set 1
   - `to show 2.ipynb`: Uses hyperparameter set 2
   - `to show 3.ipynb`: Uses hyperparameter set 3
2. Ensure all dependencies are installed
3. Run all cells to train the model and view the results
4. Each notebook produces a model stored in the corresponding folder in `Runs/`

Note: Each notebook is identical in structure but uses different hyperparameters, resulting in different model outputs.

### Task 2: Model Comparison

1. Open `Scripts/Gen_AI_Assignment_Task2.ipynb` in a Jupyter environment
2. Ensure all dependencies are installed
3. Run all cells to evaluate the models
4. Results will be saved as CSV files and visualizations in the `Output_files/` directory

## Notes

- The three Task 1 notebooks (`to show 1.ipynb`, `to show 2.ipynb`, `to show 3.ipynb`) are identical in code but differ in the hyperparameters used, resulting in the three different model checkpoints stored in the `Runs/` directory
- The notebook in `Local_Training_Scripts_ M2_Chip/` is an initial version and was not used for the final models
- The code includes special optimizations for Apple M2 chip, making it suitable for running on MacOS with Apple Silicon
- Checkpoint management allows for training to be paused and resumed
- The evaluation framework allows for fair comparison between different model architectures


