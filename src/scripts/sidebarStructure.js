const createSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const sectionTitle = sidebarChannels();

    console.log(sectionTitle)

    sidebar.appendChild(sectionTitle);
}

module.exports = createSidebar;
