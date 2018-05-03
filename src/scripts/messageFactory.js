// Factory for creating messages
const messageFactory = (date, message) => {
    const messageStructure = document.createElement('span');
    const body = document.createElement('span');
    body.classList.add('message__right')
    const title = messageTitle(date, message.user.email);
    const avatar = messageAvatar();
    messageStructure.classList.add('message')
    const text = document.createElement('p');

    console.log(message)
    text.classList.add('message__body');
    text.textContent = message.text;
    
    body.appendChild(title)
    body.appendChild(text)
    
    messageStructure.appendChild(avatar)
    messageStructure.appendChild(body);

    return messageStructure;
}

// TODO: swap email w/ displayName
// TODO: date needs to display for date posted if message already exists
const messageTitle = (date, user) => {
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

const messageAvatar = () => {
    const avatar = document.createElement('img');
    avatar.src = 'img/avatar.png'
    avatar.classList.add('messages__avatar')
    return avatar
}

module.exports = messageFactory;