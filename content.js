// Listen for messages from the popup

async function sendMessageToContentScript(action) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (!tab || !tab.id) {
      console.error("No active tab found.");
      return;
    }
  
    chrome.tabs.sendMessage(tab.id, { action: action }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn("Content script is not active. Try refreshing the page.");
      } else {
        console.log("Response from content.js:", response);
      }
    });
  }
  


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    const selectedText = window.getSelection().toString().trim();
    sendResponse({ selectedText: selectedText });
  }
  return true;
});