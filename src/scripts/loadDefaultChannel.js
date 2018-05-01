// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const firstChannel = document.querySelectorAll('.individual-channel')[0]
    firstChannel.classList.add('activeChannel')
}

module.exports = loadDefaultChannel;

window.addEventListener('load', loadDefaultChannel);