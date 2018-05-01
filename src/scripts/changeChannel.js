const changeChannel = (evt) => {
    const allChannels = document.querySelectorAll('.individual-channel');
    const activeChannel = evt.path[0]

    for (let i = 0; i < allChannels.length; i++) {
        if (allChannels[i].classList.contains('activeChannel')) {
            allChannels[i].classList.remove('activeChannel');
        }
    }
    activeChannel.classList.add('activeChannel');

}

module.exports = changeChannel;