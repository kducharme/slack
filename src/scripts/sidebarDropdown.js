const sidebarDropdownStructure = () => {
    const body = document.querySelector('body');
    const background = document.createElement('span');
    background.setAttribute('id', 'dropdownBackground')
    background.classList.add('sidebar__dropdown--background', 'hide');
    background.addEventListener('click', closeSidebarDropdown)
    const structure = document.createElement('span');
    structure.setAttribute('id', 'accountOptions');
    structure.classList.add('sidebar__dropdown', 'hide');
    structure.textContent = 'hey hey hey'
    body.appendChild(background)
    body.appendChild(structure)
}

const showSidebarDropdown = (evt) => {
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    modal.classList.remove('hide');
    background.classList.remove('hide');
}

const closeSidebarDropdown = (evt) => {
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    modal.classList.add('hide');
    background.classList.add('hide');
}


sidebarDropdownStructure();
module.exports = {
    sidebarDropdownStructure,
    showSidebarDropdown
};