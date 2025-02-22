document.addEventListener('DOMContentLoaded', function() {
    // Define helper functions first
    function formatResponse(text, action) {
        if (!text) return '<p style="color: red;">Empty response received</p>';

        if (action === 'codeReview') {
            // Split by sections (###) and process each
            return text.split(/(?=###)/).map(section => {
                if (section.includes('```')) {
                    // Handle sections with code blocks
                    return section.split('```').map((block, index) => {
                        if (index % 2 === 1) {
                            // Code block
                            const escapedCode = block
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;');
                            return `<div class="code-block"><pre><code>${escapedCode}</code></pre></div>`;
                        }
                        // Text block
                        return processTextBlock(block);
                    }).join('');
                }
                // Regular section without code
                return processTextBlock(section);
            }).join('');
        }

        // For non-code review responses
        return processTextBlock(text);
    }

    function processTextBlock(text) {
        return text
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                line = line
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                
                if (line.startsWith('###')) {
                    return `<h3>${line.replace('###', '').trim()}</h3>`;
                }
                return `<p>${line}</p>`;
            })
            .join('');
    }

    // Main execution starts here
    const params = new URLSearchParams(window.location.search);
    
    // Clear old responses first
    chrome.storage.local.get(null, function(data) {
        const currentTime = Date.now();
        Object.keys(data).forEach(key => {
            if (key.startsWith('response_') && key !== `response_${currentTime}`) {
                chrome.storage.local.remove(key);
            }
        });
        
        // Now get the latest response
        const key = Object.keys(data).find(k => k.startsWith('response_'));
        const responseData = data[key];
        
        if (responseData) {
            console.log("Retrieved response data:", responseData);
            const formattedResponse = formatResponse(responseData.text, responseData.action);
            const responseContainer = document.getElementById('response-content');
            responseContainer.innerHTML = formattedResponse;
            
            // Remove this response data after displaying
            chrome.storage.local.remove(key);
        } else {
            document.getElementById('response-content').innerHTML = 
                '<p style="color: red;">No response data found.</p>';
        }
    });

    // Add ask functionality
    const questionInput = document.getElementById('question-input');
    const askButton = document.getElementById('ask-button');
    const responseContainer = document.getElementById('response-content');
    askButton.addEventListener('click', async () => {
        const question = questionInput.value.trim();
        if (!question) return;

        // Disable input while processing
        questionInput.disabled = true;
        askButton.disabled = true;

        try {
            // Send message to background script
            const result = await chrome.runtime.sendMessage({
                action: 'askAnything',
                text: question
            });

            if (result.error) {
                throw new Error(result.error);
            }

            // Add the question and response to the content
            const questionHtml = `<div style="margin-top: 20px; font-weight: bold;">Q: ${question}</div>`;
            const responseHtml = processTextBlock(result.response);
            
            responseContainer.innerHTML += questionHtml + responseHtml;

            // Clear the input
            questionInput.value = '';
            
            // Scroll to the bottom
            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            responseContainer.innerHTML += `
                <p style="color: red; margin-top: 20px;">Error: ${error.message}</p>
            `;
        } finally {
            // Re-enable input
            questionInput.disabled = false;
            askButton.disabled = false;
        }
    });
    // Handle Enter key
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            askButton.click();
        }
    });
});