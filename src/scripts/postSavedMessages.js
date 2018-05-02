// Appends new message to #message div in DOM
const postMessage = (allMessages) => {
    const messageFactory = require('./messageFactory')
    const postArea = document.querySelector('.messages');
    allMessages.forEach(message => {
        const m = message.text;
        const u = message.user;
        const messageStructure = messageFactory(m, u)
        postArea.appendChild(messageStructure);
    })
}

module.exports = postMessage;