// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const firstChannel = document.querySelectorAll('.individual-channel')[0]
    console.log
    firstChannel.classList.add('activeChannel')
    setCurrentChannel(firstChannel.id)
}

module.exports = loadDefaultChannel;


// BUG: Need to refactor this - sometimes does not work
window.addEventListener('load', loadDefaultChannel);