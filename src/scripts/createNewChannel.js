const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs')
    const databaseCreate = require('./databaseCreate')
    const dateGenerator = require('./dateGenerator')
    const name = e.path[2].childNodes[2].value;
    const purpose = e.path[2].childNodes[4].value;
    const date = dateGenerator();
    const users = [];
    const messages = [];

    const channel = {
        name,
        purpose,
        date,
        users,
        messages
    };
    clearInputs(channelInput);
    databaseCreate(channel);
}

module.exports = createNewChannel;