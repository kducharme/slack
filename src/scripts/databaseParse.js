// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad');
    const printChannels = require('./printChannels');
    const channels = Object.keys(data);
    channels.forEach(channel => {
        let indivChannel = {
            name,
            purpose,
            messages,
            
        }
    })
    return allTasks;
}

module.exports = databaseParse;