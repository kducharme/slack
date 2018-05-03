
const realtimeAddMessages = (channel) => {
    let databaseRef = firebase.database().ref().child('channel').child(channel).child('messages');

    databaseRef.on('value', snap => {
        const messages = snap.val();
        const keyArray = Object.keys(messages)
        const allMessages = [];
        keyArray.forEach(key => {
            let indivMessage = {
                key,
                user: messages[key].user,
                date: messages[key].date,
                text: messages[key].message,
                media: messages[key].media
            }
            allMessages.push(indivMessage)
        })
        const newMessage = allMessages.pop()
        verifyUser(newMessage);
    })
}

const verifyUser = (newMessage) => {
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const userThatPostedMessage = newMessage.user.uid;
    const currentUser = getCurrentUser().uid;
    
    if (userThatPostedMessage !== currentUser) {
        postNewUserMessage(newMessage)
    }
    else {
        console.log('same user')
    }
}

const postNewUserMessage = (newMessage) => {
    const postArea = document.querySelector('.messages');
    const postDate = newMessage.date;
    const messageFactory = require('./messageFactory')
    const messageStructure = messageFactory(postDate, newMessage)
    postArea.appendChild(messageStructure);

    console.log('success')
}

module.exports = realtimeAddMessages;