// Checking what channel the user is currently in
let currentChannel = null;

const setCurrentChannel = (channel) => {
    const channelDetails = require('./channelDetails').channelDetails;
    currentChannel = channel;
    channelDetails();
}

const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};