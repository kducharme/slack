const sidebarHead = (user) => {
    const sidebar = document.querySelector('#sidebar');
    const header = document.createElement('span');
    header.classList = 'sidebar__header';

    const headerText = document.createElement('p');
    headerText.textContent = user.email;
    headerText.classList = 'sidebar__header--name'
    
    const headerDrop = document.createElement('span')
    headerDrop.classList = 'sidebar__header--icon'
    headerDrop.innerHTML = '<i class="material-icons drop">keyboard_arrow_down</i>'

    header.appendChild(headerText);
    header.appendChild(headerDrop);
    
    sidebar.insertBefore(header, sidebar.firstChild)
};

module.exports = sidebarHead;