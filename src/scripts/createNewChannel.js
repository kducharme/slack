const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const date = dateGenerator();
    const users = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        date: date,
        users: users
    };
    clearInputs(name.id);
    clearInputs(purpose.id);
    databaseCreate(channel);
}

module.exports = createNewChannel;