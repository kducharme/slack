const postMessage = () => {
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const messageFactory = require('./messageFactory')
    const message = document.querySelector('#writeMessage').value
    const postArea = document.querySelector('.messages');
    const user = getCurrentUser()
    const channel = getCurrentChannel();

    const messageStructure = messageFactory(message, user, Date)

    postArea.appendChild(messageStructure);

}

const submitMessage = document.querySelector('#writeMessage').addEventListener('keypress', e => {
    let key = e.which || e.keyCode;
    if (key === 13) {
        postMessage();
    }
});






// const activeWriteArea = (evt) => {
//     const write = document.querySelector('#writeMessage');
//     const upload = document.querySelector('#uploadFile');

//     write.classList.add('write__active');
//     upload.classList.add('write__active');
// }

// const inactiveWriteArea = () => {
//     const write = document.querySelector('#writeMessage');
//     const upload = document.querySelector('#uploadFile');
//     write.classList.remove('write__active');
//     upload.classList.remove('write__active');
// }

// const activeWrite = document.querySelector('.write').addEventListener('click', activeWriteArea);

// const inactiveWrite = document.querySelector('body').addEventListener('click', inactiveWriteArea);