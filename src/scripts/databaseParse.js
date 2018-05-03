// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad').loadDatabase;
    const sidebarChannels = require('./sidebarChannels');
    const channels = Object.keys(data);
    const allData = [];
    channels.forEach(key => {
        let indivChannel = {
            key,
            name: data[key].name,
            purpose: data[key].purpose,
            date: data[key].date,
            messages: data[key].messages,
            users: data[key].users
        }
        allData.push(indivChannel)
    })
    sidebarChannels(allData)
    return allData;
}

// Parses the data received from DB to prepare for posting
const messageParse = (data) => {
    const databaseLoad = require('./databaseLoad').loadDatabase;
    const sidebarChannels = require('./sidebarChannels');
    const postSavedMessages = require('./postSavedMessages')
    const allMessages = Object.keys(data);
    const allData = [];
    allMessages.forEach(key => {
        let indivMessage = {
            key,
            user: data[key].user,
            date: data[key].date,
            text: data[key].message,
            media: data[key].media
        }
        allData.push(indivMessage)
    })
    postSavedMessages(allData)
    return allData;
}

module.exports = {
    databaseParse,
    messageParse
};