// Factory for creating messages
const messageFactory = (m, user) => {
    const message = document.createElement('span');
    message.classList.add('message')
    const title = messageTitle(user);
    message.appendChild(title);
    const text = document.createElement('p');
    text.classList.add('message__body');
    text.textContent = m;
    message.appendChild(text);

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

module.exports = messageFactory;