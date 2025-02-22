// Function to send requests to Ollama
async function queryOllama(prompt, model = "qwen2.5:0.5b") {
    try {
        console.log("Sending request to Ollama:", { prompt, model });

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: false,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Ollama Response:", data);

        // Ensure we're returning a clean response
        if (!data.response) {
            throw new Error("Empty response from Ollama");
        }

        return data.response;
    } catch (error) {
        console.error("Error communicating with Ollama:", error);
        throw error; // Let the caller handle the error
    }
}

// Handle messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async () => {
        try {
            if (!request.action || !request.text) {
                throw new Error("Invalid request format");
            }

            let prompt = "";
            switch (request.action) {
                case "codeReview":
                    prompt = `You are a code reviewer. Please review the following code and provide specific, actionable feedback. Focus on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance improvements
4. Security considerations
5. Design patterns and architecture

Provide your response in this format:
### Summary
[Brief overview of the code]

### Detailed Review
[Your detailed analysis with specific examples]

### Recommendations
[Specific, actionable improvements]

Code to review:
${request.text}`;
                    break;
                case "summarize":
                    prompt = `Summarize this text concisely:\n${request.text}`;
                    break;
                case "generatePost":
                    prompt = `Create a social media post based on this:\n${request.text}`;
                    break;
                case "askAnything":
                    prompt = request.text;
                    break;
                default:
                    throw new Error("Unknown action");
            }

            const response = await queryOllama(prompt);
            console.log("Sending response to popup:", response);
            sendResponse({ response, success: true });
        } catch (error) {
            console.error("Processing error:", error);
            sendResponse({ error: error.message, success: false });
        }
    })();

    return true;
});
