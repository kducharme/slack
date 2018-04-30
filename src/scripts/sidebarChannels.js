// Creates channels component for sidebar
const sidebarChannels = () => {
    const buttonFactory = require('./buttonFactoryIcon');
    const createNewChannel = require('./createNewChannel');
    const sectionTitle = document.createElement('span');
    sectionTitle.classList = 'sidebar__channels--header'

    const title = document.createElement('h2');
    title.textContent = 'Channels'

    const createChannel = buttonFactory('sidebar__channels--new', '<i class="material-icons add-channel">add_circle_outline</i>', createNewChannel)

    sectionTitle.appendChild(title);
    sectionTitle.appendChild(createChannel);

    return sectionTitle
}

module.exports = sidebarChannels;