// Listening for updates in the database to post to DOM for all users
const realtimeAddMessages = () => {
    let databaseRef = firebase.database().ref(`channel/`);
    databaseRef.on('value', snap => {
        const getCurrentChannel = require('./channelCheck').getCurrentChannel;
        const channel = getCurrentChannel();
        const messages = snap.val();
        const keyArray = Object.keys(messages)
        const newMessage = messages.channel.messages
        const allMessages = [];
        keyArray.forEach(key => {
            let indivMessage = {
                key,
                user: messages[key].user,
                date: messages[key].date,
                text: messages[key].text,
                media: messages[key].media
            }
            allMessages.push(indivMessage)
        })
        verifyUser(newMessage)
        postNewUserMessage(channel, newMessage);
    })
}

const verifyUser = (newMessage) => {
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const userThatPostedMessage = newMessage.user;
    const currentUser = getCurrentUser().uid;
    if (userThatPostedMessage !== currentUser) {
        // postNewUserMessage(newMessage)
        console.log('same user')
    }
    else {
        console.log('same user')
    }
}

// const postNewUserMessage = (channel) => {
//     const loadMessages = require('./databaseLoad').loadMessages;
//     const printArea = document.querySelectorAll('#messages');
//     printArea.forEach(m => {
//         while (m.firstChild) {
//             m.removeChild(m.firstChild);
//         }
//     })
//     loadMessages(channel);
// }

// module.exports = realtimeAddMessages;