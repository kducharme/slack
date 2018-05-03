const newUserAddedToChannel = (user) => {
    const dateGenerator = require('./dateGenerator');
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
    const messageStructure = createNotification(date, newMessage)
    postArea.appendChild(messageStructure);
    addMessageToChannel(newMessage)
    addMessage(newMessage)
}

const createNotification = (date, message) => {
    const messageStructure = document.createElement('span');
    const body = document.createElement('span');
    body.classList.add('message__right')
    const title = notificationTitle(date, message.user.email);
    const avatar = notificationAvatar();
    messageStructure.classList.add('message')
    const text = document.createElement('p');

    text.classList.add('message__body', 'message__newUser');
    text.textContent = message.text;
    
    body.appendChild(title)
    body.appendChild(text)
    
    messageStructure.appendChild(avatar)
    messageStructure.appendChild(body);

    return messageStructure;
}

const notificationTitle = (date, user) => {
    const messageTitle = document.createElement('span');
    messageTitle.classList.add('message__title')
    const displayName = document.createElement('p')
    displayName.textContent = user;
    const postDate = document.createElement('p')
    postDate.textContent = date;
    displayName.classList.add('message__title--user');
    postDate.classList.add('message__title--date');
    messageTitle.appendChild(displayName)
    messageTitle.appendChild(postDate)
    
    return messageTitle;
}

const notificationAvatar = () => {
    const avatar = document.createElement('img');
    avatar.src = 'img/avatar.png'
    avatar.classList.add('messages__avatar')
    return avatar
}

module.exports = newUserAddedToChannel;