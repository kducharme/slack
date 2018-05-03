const sidebarUserComponent = (allData) => {
    const userComponent = document.createElement('span');
    const userList = document.createElement('span');
    const sidebarStructure = require('./sidebarStructure');
    const changeChannel = require('./changeChannel');
    const directMessageUser = require('./directMessageUser');
    const printArea = document.querySelector('#sidebar')
    const header = usersHeader();
    const watercooler = allData[0].users
    let users = []

    for(let key in watercooler) {
        users.push(watercooler[key]);
    }

    users.forEach(u => {
        const userRow = document.createElement('span');
        userRow.setAttribute('id', u.id)
        userRow.addEventListener('click', directMessageUser)
        userRow.classList = 'individual-user'
        const status = document.createElement('img');
        status.src = 'img/online.png'

        const user = document.createElement('a')
        user.textContent = u.email;

        userRow.appendChild(status);
        userRow.appendChild(user);
        userList.appendChild(userRow);
    })
    userList.classList = 'sidebar__users--list';

    userComponent.appendChild(header);
    userComponent.appendChild(userList);
    printArea.appendChild(userComponent)
}

const usersHeader = () => {
    const header = document.createElement('span');
    header.classList = 'sidebar__channels--header'
    const title = document.createElement('h2');
    title.textContent = 'Direct Messages'
    header.appendChild(title);

    return header;
}

module.exports = sidebarUserComponent;