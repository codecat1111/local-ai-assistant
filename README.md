# Local AI Assistant - Chrome Extension ✨🖥️🚀

## Overview 🎯📜💡

The AI Text Assistant is a sophisticated Chrome extension designed to facilitate real-time textual analysis and transformation by leveraging a locally hosted Ollama model. The extension encompasses a diverse set of functionalities, including grammatical analysis, source code evaluation, text abstraction, social media content generation, and open-ended semantic queries. 🤖📊✍️

## Features

- **Grammatical Analysis**: Conducts a comprehensive syntactic and semantic evaluation to identify and rectify linguistic inconsistencies.
- **Code Evaluation**: Provides a rigorous critique of source code, emphasizing best practices, security vulnerabilities, and architectural enhancements.
- **Text Abstraction**: Synthesizes input textual data into concise, high-information-density summaries.
- **Social Media Content Generation**: Constructs compelling, contextually appropriate content for digital engagement.
- **General Semantic Querying**: Facilitates the processing of natural language queries for knowledge extraction and transformation.

## Installation 🛠️📥🔧

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-text-assistant.git
   cd ai-text-assistant
   ```
2. Ensure that [Ollama](https://ollama.ai/) is installed and operational on your local system.
3. Navigate to `chrome://extensions/` in Google Chrome.
4. Enable **Developer Mode** from the upper-right corner.
5. Click **Load unpacked** and specify the `ai-text-assistant` directory. ⚙️🌐✅

## Usage 🖱️📑🚀

1. Select a segment of text within any active webpage.
2. Launch the extension from the Chrome toolbar.
3. Choose from one of the available analytical modes: Grammatical Analysis, Code Evaluation, Text Abstraction, Social Media Content Generation, or General Semantic Querying.
4. Examine the processed output within an inline popup or an independent browser window. 🔍📊📝

## System Architecture 🏗️🔍🛠️

This extension comprises multiple modular components:

- **background.js**: Orchestrates communication with the Ollama model and manages asynchronous task execution.
- **content.js**: Captures and transmits user-selected textual data from web pages.
- **popup.js**: Implements the interactive graphical user interface.
- **response.js**: Formats and displays the computational output returned by the AI model.
- **manifest.json**: Configures essential permissions, runtime behaviors, and metadata for Chrome extension deployment.

## API Reference 📡📜📌

### `queryOllama(prompt, model)`

Facilitates communication with the locally hosted Ollama API for text analysis and transformation. 🤖🔍📊

```javascript
async function queryOllama(prompt, model = "qwen2.5:0.5b")
```

- **Parameters:**
  - `prompt` (string): The textual input to be processed by the model.
  - `model` (string, optional): The computational model variant to be utilized (default: `qwen2.5:0.5b`).
- **Returns:** A structured response containing AI-generated textual output. 📬📝🔬

## Contribution Guidelines ✍️🔄🤝

1. Fork the repository to your personal GitHub account.
2. Create a dedicated feature branch for modifications:
   ```bash
   git checkout -b feature-name
   ```
3. Commit the changes and push to your forked repository:
   ```bash
   git commit -m "Implemented feature enhancements"
   git push origin feature-name
   ```
4. Submit a pull request for review and integration. 🏗️📢✅

## Licensing 📜⚖️🔓

This software is distributed under the MIT License. 🏆📄🛡️

---

For inquiries, feature requests, or to report issues, please utilize the GitHub issue tracking system or contribute via pull requests. 💬📢📩
