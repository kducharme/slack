const sidebarHead = (user) => {
    const sidebar = document.querySelector('#sidebar');
    const header = document.createElement('span');
    header.classList = 'sidebar__header';
    header.setAttribute('id', 'sidebarHeader')
    header.addEventListener('click', showSidebarDropdown);
    const content = headerContent(user);
    header.appendChild(content);
    sidebar.insertBefore(header, sidebar.firstChild)
};

const headerContent = (user) => {
    const headerContent = document.createElement('span');
    headerContent.classList = 'sidebar__header--content'
    headerContent.setAttribute('id', 'sidebarHeader')
    const headerText = document.createElement('p');
    headerText.textContent = user.email;
    headerText.classList = 'sidebar__header--name'
    headerText.setAttribute('id', 'sidebarHeader')
    const headerDrop = document.createElement('span')
    headerDrop.classList = 'sidebar__header--icon'
    headerDrop.setAttribute('id', 'sidebarHeader')
    headerDrop.innerHTML = '<i class="material-icons drop" id="sidebarHeader">keyboard_arrow_down</i>'
    headerContent.appendChild(headerText);
    headerContent.appendChild(headerDrop);

    return headerContent;
}

const showSidebarDropdown = () => {
    const body = document.querySelector('body')
    const structure = document.createElement('span');
    structure.setAttribute('id', 'accountOptions');
    structure.classList = 'sidebar__dropdown';
    structure.classList.remove('hide')
    structure.textContent = 'hey hey hey'
    body.appendChild(structure)
}

window.addEventListener('click', function (e) {
    let header = document.querySelector('#sidebarHeader')
    const modal = document.querySelector('#accountOptions')
})


module.exports = sidebarHead;