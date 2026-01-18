fetch('https://inclusionbot.onrender.com/health')
  .then(res => console.log('Backend healthy'))
  .catch(() => console.warn('Backend not reachable'));

// API Configuration - Pointing to Render backend
const API_URL = 'https://inclusionbot.onrender.com/chat';

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Session management
let sessionId = localStorage.getItem('chatSessionId') || null;

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, true);
    userInput.value = '';
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    try {
        const requestBody = { message: message };
        if (sessionId) {
            requestBody.session_id = sessionId;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addMessage(data.response);

        // Store session ID
        if (data.session_id) {
            sessionId = data.session_id;
            localStorage.setItem('chatSessionId', sessionId);
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('⚠️ Server is temporarily unavailable. Please try again in a moment.');
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = 'Send';
    }
}

// Send on button click
sendButton.addEventListener('click', sendMessage);

// Send on Enter key
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// Info button handlers
function showInfo(type) {
    let message = '';
    switch(type) {
        case 'lawyers':
            message = 'I can help you connect with a lawyer for consultation. Would you like to proceed with a lawyer consultation?';
            break;
        case 'rights':
            message = 'I can provide information about gender equality rights. What specific rights would you like to know about?';
            break;
    }
    if (message) {
        userInput.value = message;
        sendMessage();
    }
}

