const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs')
    const databaseCreate = require('./databaseCreate')
    const name = e.path[1].childNodes[0].value;
    const purpose = e.path[1].childNodes[1].value;

    const channel = {
        name,
        purpose
    }
    clearInputs(channelInput);
    databaseCreate(channel);
}

module.exports = createNewChannel;