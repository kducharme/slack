const channelDetails = () => {
    const printArea = document.querySelector('.options')
    const leftArea = channelDetailsLeft();
    const rightArea = channelDetailsRight();

    printArea.appendChild(leftArea);
    // printArea.appendChild(rightArea);
    
}

const channelDetailsLeft = () => {
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const channel = getCurrentChannel();

    const leftArea = document.createElement('span');
    const channelName = document.createElement('h2');
    channelName.textContent = channel.childNodes[1].textContent;
    leftArea.appendChild(channelName);

    return leftArea;
}

const channelDetailsRight = () => {
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const channel = getCurrentChannel();
}

module.exports = {
    channelDetails,
    channelDetailsLeft
};