// Checking what channel the user is currently in
let currentChannel = null;

const setCurrentChannel = (user) => {
    currentChannel = user;
    console.log(currentChannel)
}

const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};