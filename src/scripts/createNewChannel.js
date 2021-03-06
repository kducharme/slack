const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const loadDatabase = require('./databaseLoad').loadDatabase;
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const dateCreated = dateGenerator();
    const users = {};
    const messages = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        dateCreated: dateCreated,
        users: users,
        messages: messages
    };
    databaseCreate(channel);
    resetSidebar();
    loadDatabase();
    closeCreateNewModal();
}

// Hides create new channel modal
const closeCreateNewModal = () => {
    const channelModal = document.querySelector('#channelModal');
    channelModal.classList = 'hide';
}

// After user creates new channel, this resets the channel sidebar to show recently added channel
const resetSidebar = () => {
    const channelList = document.querySelector('#channelList');
    const userList = document.querySelector('#userList');
    channelList.innerHTML = '';
    userList.innerHTML = '';
    // if (sidebar.childNodes.length > 0) {
    //     for (let i = 0; i < sidebar.childNodes.length; i++){
    //         while (i.firstChild) {
    //             i.removeChild(i.firstChild);
    //         }
    //     }
    // }
}

module.exports = {
    createNewChannel,
    closeCreateNewModal
};