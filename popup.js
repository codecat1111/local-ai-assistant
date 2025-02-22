document.addEventListener('DOMContentLoaded', function() {
    const buttons = {
      grammarCheck: document.getElementById('grammarCheck'),
      codeReview: document.getElementById('codeReview'),
      summarize: document.getElementById('summarize'),
      generatePost: document.getElementById('generatePost'),
      askAnything: document.getElementById('askAnything')
    };
    const resultDiv = document.getElementById('result');

    function formatResponse(text, action) {
        if (action === 'codeReview') {
            return text.split('```').map((block, index) => {
                if (index % 2 === 1) {
                    return `<div class="code-block">${block}</div>`;
                }
                return `<p>${block}</p>`;
            }).join('');
        }
        return text.split('\n').map(line => `<p>${line}</p>`).join('');
    }

    function showLoading() {
        resultDiv.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        resultDiv.style.display = 'block';
        Object.values(buttons).forEach(button => button.disabled = true);
    }

    function showResult(text, action) {
        const popupWidth = 800;
        const popupHeight = 600;
        const left = (screen.width - popupWidth) / 2;
        const top = (screen.height - popupHeight) / 2;
    
        // Create popup with the response URL
        const responseUrl = chrome.runtime.getURL('response.html');
        chrome.windows.create({
            url: responseUrl,
            type: 'popup',
            width: popupWidth,
            height: popupHeight,
            left: left,
            top: top
        }, (window) => {
            // Store the response data with a unique key
            const storageKey = `response_${Date.now()}`;
            chrome.storage.local.set({
                [storageKey]: {
                    text: text,
                    action: action
                }
            });
        });
    
        // Re-enable buttons in the popup
        Object.values(buttons).forEach(button => button.disabled = false);
    }

    function showError(message) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
        resultDiv.style.display = 'block';
        Object.values(buttons).forEach(button => button.disabled = false);
    }

    async function processText(action) {
        const tab = await getCurrentTab();
        
        if (!tab || !tab.id) {
            showError("No active tab found.");
            return;
        }

        showLoading();

        chrome.tabs.sendMessage(tab.id, { action: 'getSelectedText' }, async (response) => {
            if (chrome.runtime.lastError) {
                showError("Content script not loaded. Try refreshing the page.");
                return;
            }

            if (response && response.selectedText) {
                try {
                    const result = await chrome.runtime.sendMessage({
                        action: action,
                        text: response.selectedText
                    });

                    if (result.error) {
                        showError(result.error);
                    } else {
                        showResult(result.response, action);
                    }
                } catch (error) {
                    showError(error.message);
                }
            } else {
                showError('Please select some text first.');
            }
        });
    }
  
    async function getCurrentTab() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab;
    }
  
    buttons.grammarCheck.addEventListener('click', () => processText('grammarCheck'));
    buttons.codeReview.addEventListener('click', () => processText('codeReview'));
    buttons.summarize.addEventListener('click', () => processText('summarize'));
    buttons.generatePost.addEventListener('click', () => processText('generatePost'));
    buttons.askAnything.addEventListener('click', () => processText('askAnything'));
  });
  