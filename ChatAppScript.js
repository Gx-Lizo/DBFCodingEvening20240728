let username = '';
let users = ['Deon', 'Fikile', 'Tshamala'];
let messages = [];

// Function to handle joining the chat
function joinChat() {
    username = document.getElementById('username').value;
    if (username) {
        sessionStorage.setItem('username', username);  // Save username to session storage
        document.querySelector('.user-section').style.display = 'none';
        document.querySelector('.chat-section').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Welcome to the Chat App, ${username}!`;
        addUser(username);
        console.log(`User ${username} joined the chat.`);
    } else {
        console.log('Username is required to join the chat.');
    }
}

// Function to add a new user to the user list
function addUser(user) {
    if (!users.includes(user)) {
        users.push(user);
        console.log(`Added new user: ${user}`);
    }
    updateUsersList();
}

// Function to update the list of users
function updateUsersList() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('div');
        const onlineIcon = document.createElement('div');
        onlineIcon.className = 'online-icon';
        userElement.appendChild(onlineIcon);
        userElement.appendChild(document.createTextNode(user));
        usersList.appendChild(userElement);
    });
    console.log('Updated users list:', users);
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput').value;
    if (messageInput) {
        const message = {
            user: username,
            text: messageInput,
            timestamp: new Date().toLocaleTimeString()
        };
        
        messages.push(message);
        updateChatMessages();
        document.getElementById('messageInput').value = '';
        saveMessagesToLocal();
        console.log('Sent message:', message);
        
        setTimeout(dummyReply, 1000);
    } else {
        console.log('Message input is empty.');
    }
}

// Function to update chat messages in the chat area
function updateChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        
        if (message.user === username) {
            messageElement.className = 'message user-message';
        } else {
            messageElement.className = 'message dummy-reply';
        }
        
        messageElement.innerHTML = `<strong>${message.user}</strong> [${message.timestamp}]: ${message.text}`;
        chatMessages.appendChild(messageElement);
    });
    console.log('Updated chat messages:', messages);
}

// Function to save messages to local storage
function saveMessagesToLocal() {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    console.log('Saved messages to local storage.');
}

// Function to load messages from local storage
function loadMessagesFromLocal() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        updateChatMessages();
        console.log('Loaded messages from local storage.');
    }
}

// Function to simulate a dummy reply
function dummyReply() {
    let dummyUser = users[Math.floor(Math.random() * users.length)];
    
    while (dummyUser === username) {
        dummyUser = users[Math.floor(Math.random() * users.length)];
    }

    const dummyMessage = {
        user: dummyUser,
        text: "This is a reply because you sent a message.",
        timestamp: new Date().toLocaleTimeString()
    };
    
    messages.push(dummyMessage);
    updateChatMessages();
    saveMessagesToLocal();
    console.log('This is a reply because you sent a message:', dummyMessage);
}

// Initialize on page load
window.onload = function() {
    // Load username from session storage
    username = sessionStorage.getItem('username');
    if (username) {
        document.querySelector('.user-section').style.display = 'none';
        document.querySelector('.chat-section').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Welcome to the Chat App, ${username}!`;
        addUser(username);
    } else {
        document.querySelector('.user-section').style.display = 'block';
        document.querySelector('.chat-section').style.display = 'none';
    }
    loadMessagesFromLocal();
    updateUsersList();
    console.log('Page loaded.');
}

// Clear session and data on page unload
window.onbeforeunload = function() {
    // Clear local storage if there is no active session
    if (!sessionStorage.getItem('username')) {
        localStorage.removeItem('chatMessages');
    }
}