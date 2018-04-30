const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    sidebar.appendChild(channelComponent);
}

module.exports = createSidebar;
