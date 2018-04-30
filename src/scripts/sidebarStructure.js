const createSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const sectionTitle = sidebarChannels();
    sidebar.appendChild(sectionTitle);
}

module.exports = createSidebar;
