// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad');
    const sidebarChannels = require('./sidebarChannels');
    const channels = Object.keys(data);
    const allData = [];
    channels.forEach(channel => {
        let indivChannel = {
            name: data[channel].name,
            purpose: data[channel].purpose,
            date: data[channel].date,
            messages: data[channel].messages,
            users: data[channel].users
        }
        allData.push(indivChannel)
    })
    sidebarChannels(allData)
    return allData;
}

module.exports = databaseParse;