const newUserAddedToChannel = (user) => {
    const dateGenerator = require('./dateGenerator');
    const messageFactory = require('./messageFactory');
    const postArea = document.querySelector('.messages');
    const addMessageToChannel = require('./databaseAddMessage').addMessageToChannel;
    const addMessage = require('./databaseAddMessage').addMessage;
    const channel = 'watercooler';
    const text = `joined #${channel}`
    
    const date = dateGenerator();
    const media = '';

    const newMessage = {
        channel: '-LBN5_skx51L7hJQp5R1',
        user,
        date,
        text,
        media
    }
    const messageStructure = messageFactory(date, newMessage)
    postArea.appendChild(messageStructure);
    addMessageToChannel(newMessage)
    addMessage(newMessage)
}

module.exports = newUserAddedToChannel;