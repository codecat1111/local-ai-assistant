# Local AI Assistant - Chrome Extension ✨🖥️🚀

## Why This is Powerful 💡🔒🚀

This AI-powered Chrome extension leverages a locally hosted model, eliminating API costs, reliance on external servers, and privacy concerns. Unlike cloud-based solutions, this approach ensures complete data security while offering seamless functionality.

Additionally, models such as DeepSeek, Mistral, and LLaMA can also be run locally, offering flexibility in choosing the best AI model for specific tasks. These models vary in size and capability, allowing users to optimize performance based on their hardware while still benefiting from a fully offline, privacy-focused AI assistant. You control the AI, ensuring reliability and performance without third-party interference. 🔐⚡🆓

## Setting Up Ollama 🛠️🔧

Before running the extension, follow these steps to configure Ollama properly:

1. **Install Ollama** from the official [Ollama website](https://ollama.ai/).
2. **Download the model** you want to use (default: 300M parameters for optimal performance on most laptops). You can find official instructions for downloading and installing models in the [Ollama documentation](https://github.com/ollama/ollama/blob/main/README.md#model-library).
3. **Configure Ollama to Accept Chrome Requests (One-time Setup):**
   - Open Windows PowerShell and execute:
     ```powershell
     ollama stop # Stops Ollama if running
     $env:OLLAMA_ORIGINS="chrome-extension://*"
     $env:OLLAMA_HOST="0.0.0.0"
     ```
4. **Start Ollama again** by running the following command in Windows PowerShell (For future use, you only need to run this command to start Ollama):
   ```powershell
   ollama serve
   ```
   This will launch the Ollama server and allow the Chrome extension to communicate with it. Ensure the server remains running to avoid `403 Forbidden` errors.
5. **Keep the server running** in PowerShell to prevent a `403 Forbidden` error.

## Installation 🛠️📥🔧

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-text-assistant.git
   cd ai-text-assistant
   ```
2. Ensure that Ollama is installed and operational.
3. Navigate to `chrome://extensions/` in Google Chrome.
4. Enable **Developer Mode** from the upper-right corner.
5. Click **Load unpacked** and specify the `ai-text-assistant` directory. ⚙️🌐✅
6. **Reload the extension and refresh the webpage** where you plan to use it.

## Usage 🖱️📑🚀

1. Select a segment of text within any active webpage.
2. Launch the extension from the Chrome toolbar.
3. Choose from one of the available analytical modes: Grammar Check, Code Review, Text Summarization, Social Media Post Generation, or General Text-Based Queries.
4. Examine the processed output within an inline popup or an independent browser window. 🔍📊📝

## System Architecture 🏗️🔍🛠️

This extension comprises multiple modular components:

- **background.js**: Orchestrates communication with the Ollama model and manages asynchronous task execution.
- **content.js**: Captures and transmits user-selected textual data from web pages.
- **popup.js**: Implements the interactive graphical user interface.
- **response.js**: Formats and displays the computational output returned by the AI model.
- **manifest.json**: Configures essential permissions, runtime behaviors, and metadata for Chrome extension deployment.
   <p align="center">
     <img src="https://github.com/codecat1111/local-ai-assistant/blob/main/assets/architecture_dig.png" width="50%" alt="A Use-Case Diagram showing how the system works">
   </p>
   <p align="center"><em>A Use-Case Diagram showing how the system works</em></p>

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

## Screenshots & Demo 🎥🖼️

[**YouTube Demo Link**](#)

Screenshots: 📸🖥️📝
1. Extension UI

 <p align="center">
     <img src="https://github.com/codecat1111/local-ai-assistant/blob/main/assets/Screenshot 2025-02-22 153934.png" width="90%" alt=">Extension UI">
   </p>
<p align="center"><em>Extension UI</em></p>

2. Commands to run to start allow communication between Ollama and Chrome (or any browser)
 <p align="center">
     <img src="https://github.com/codecat1111/local-ai-assistant/blob/main/assets/Screenshot 2025-02-22 154241.png" width="50%" alt="Commands to run to start allow communication between Ollama and Chrome (or any browser)">
   </p>
<p align="center"><em>Commands to run to start allow communication between Ollama and Chrome (or any browser)</em></p>
3. An Ask Anything Feature in use

 <p align="center">
     <img src="https://github.com/codecat1111/local-ai-assistant/blob/main/assets/Screenshot 2025-02-22 154639.png" width="90%" alt="An Ask Anything Feature in use">
   </p>
<p align="center"><em>An Ask Anything Feature in use</em></p>

4. Server Side Logs

 <p align="center">
     <img src="https://github.com/codecat1111/local-ai-assistant/blob/main/assets/Screenshot 2025-02-22 154735.png" width="50%" alt="Server Side Logs">
   </p>
<p align="center"><em>Server Side Logs</em></p>

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

