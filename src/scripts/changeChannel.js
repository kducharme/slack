const changeChannel = (evt) => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const channelDetails = require('./channelDetails').channelDetailsLeft;
    const clearChannel = require('./channelDetails').clearChannel;
    const allChannels = document.querySelectorAll('.individual-channel');
    let clickedChannel = evt.target

    if (!clickedChannel.id) {
        clickedChannel = evt.path[1]
    }
    for (let i = 0; i < allChannels.length; i++) {
        if (allChannels[i].classList.contains('activeChannel')) {
            allChannels[i].classList.remove('activeChannel');
        }
    }
    clickedChannel.classList.add('activeChannel')
    clearChannel();
    setCurrentChannel(clickedChannel)
}

module.exports = changeChannel;