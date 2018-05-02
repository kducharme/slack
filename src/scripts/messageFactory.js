// Factory for creating messages
const messageFactory = (m, user) => {
    const message = document.createElement('span');
    const body = document.createElement('span');
    body.classList.add('message__right')
    const title = messageTitle(user);
    const avatar = messageAvatar();
    message.classList.add('message')
    const text = document.createElement('p');
    text.classList.add('message__body');
    text.textContent = m;
    
    body.appendChild(title)
    body.appendChild(text)
    
    message.appendChild(avatar)
    message.appendChild(body);

    return message;
}

// TODO: swap email w/ displayName
const messageTitle = (u) => {
    const dateGenerator = require('./dateGenerator');
    const d = dateGenerator();
    const messageTitle = document.createElement('span');
    messageTitle.classList.add('message__title')
    const displayName = document.createElement('p')
    displayName.textContent = u.email;
    const date = document.createElement('p')
    date.textContent = d;
    displayName.classList.add('message__title--user');
    date.classList.add('message__title--date');
    messageTitle.appendChild(displayName)
    messageTitle.appendChild(date)
    
    return messageTitle;
}

const messageAvatar = () => {
    const avatar = document.createElement('img');
    avatar.src = 'img/avatar.png'
    avatar.classList.add('messages__avatar')
    return avatar
}

module.exports = messageFactory;