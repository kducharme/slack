// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const channelDetailsLeft = require('./channelDetails').channelDetailsLeft;

    const firstChannel = document.querySelector('.sidebar__channels--list').childNodes[0]
    firstChannel.classList.add('activeChannel')
    setCurrentChannel(firstChannel)
}

window.onload = function(){
    setTimeout(function(){
        loadDefaultChannel();
    }, 100);
 };

module.exports = loadDefaultChannel;
