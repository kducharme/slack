const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const dateCreated = dateGenerator();
    const users = {};
    const messages = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        dateCreated: date,
        users: users,
        messages: messages
    };
    clearInputs(name.id);
    clearInputs(purpose.id);
    databaseCreate(channel);
}

module.exports = createNewChannel;