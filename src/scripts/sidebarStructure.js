// Creates the structure for the sidebar
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const logoutUser = require('./userLogout');

    // const logOut = document.createElement('button');
    // logOut.addEventListener('click', logoutUser);
    // logOut.textContent = 'Log out'
    // logOut.classList.add('logout__button')

    // sidebar.appendChild(header);
    sidebar.appendChild(channelComponent);
    // sidebar.appendChild(accountUsers);
    // sidebar.appendChild(logOut);
} 

module.exports = createSidebar;