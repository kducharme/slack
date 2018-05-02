// Checking what channel the user is currently in
let currentChannel = null;

// On channel change, this sets the channel that the user is in
const setCurrentChannel = (channel) => {
    const channelDetails = require('./channelDetails').channelDetails;
    currentChannel = channel;
    channelDetails();
}

// Called to get the current channel that the user is in
const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};