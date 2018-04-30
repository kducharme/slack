// Creates the structure for the new channel modal
const createNewChannel = () => {
    const modal = document.createElement('span');
    const modalContent = createChannelContent();
    const body = document.querySelector('body');
    modal.classList.add('createChannel')
    body.appendChild(modal);
}

module.exports = createNewChannel;

// Hides create new channel modal
const hideCreateNewChannel = () => {
    console.log('hi')
}

// Creates the content for the create new channel modal
const createChannelContent = () => {
    const contentStructure = document.createElement('span');
    const inputFactory = require('./inputFactory');
    const buttonFactoryText = require('./buttonFactoryText');
    const databaseCreate = require('./databaseCreate');

    const nameInput = inputFactory('text', 'createChannel__input', 'e.g. marketing');
    const purposeInput = inputFactory('text', 'createChannel__input', `Enter channel purpose..`);
    const cancelButton = buttonFactoryText('createChannel__button','Cancel', hideCreateNewChannel)
    const createButton = buttonFactoryText('createChannel__button','Create channel', databaseCreate)
    contentStructure.appendChild(nameInput);
    contentStructure.appendChild(purposeInput);

    return contentStructure;
}