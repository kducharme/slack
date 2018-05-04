const dropdownContent = () => {
    const content = document.createElement('span');
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const user = document.createElement('h2');
    console.log(getCurrentUser().email)
    user.textContent = getCurrentUser().email;
    user.classList = 'sidebar__dropdown--user';
    const options = ['Profile & account', 'Preferences', 'Sign out']
    const optionList = document.createElement('span');
    optionList.classList.add('sidebar__dropdown--optionList')
    options.forEach(o => {
        const option = document.createElement('p');
        option.textContent = o;
        option.classList = 'sidebar__dropdown--option'
        console.log(o)
        if (o === 'Sign out') {
            console.log('woo')
            const logoutUser = require('./userLogout')
            option.addEventListener('click', logoutUser);
        }
        optionList.appendChild(option);
    })
    content.appendChild(user);
    content.appendChild(optionList);
    return content;
}

const sidebarDropdown = (evt) => {
    const body = document.querySelector('body');
    const background = document.createElement('span');

    background.setAttribute('id', 'dropdownBackground')
    background.classList.add('sidebar__dropdown--background');
    background.addEventListener('click', closeSidebarDropdown);

    const dropdown = document.createElement('span');
    dropdown.setAttribute('id', 'accountOptions');
    dropdown.classList.add('sidebar__dropdown');

    const content = dropdownContent();

    body.appendChild(background)
    dropdown.appendChild(content);
    body.appendChild(dropdown)
}

const closeSidebarDropdown = (evt) => {
    console.log('close')
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    body.removeChild(modal)
    body.removeChild(background);
}

module.exports = sidebarDropdown;