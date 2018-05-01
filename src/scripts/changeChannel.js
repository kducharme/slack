const changeChannel = (evt) => {
    const channels = document.querySelectorAll('.individual-channel');
    const channelKey = evt.path[1].id;
    const channelStructure = event.path[1]
    channelStructure.classList.add('activeChannel')
}

module.exports = changeChannel;