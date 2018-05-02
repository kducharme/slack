// Checking what channel the user is currently in
let currentChannel = null;

const setCurrentChannel = (channel) => {
    currentChannel = channel;
}

const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};