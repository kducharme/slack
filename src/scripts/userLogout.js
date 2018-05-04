// Logs out user
const logoutUser = () => {
    const sidebar = document.querySelector('#sidebar')
    const sidebarHeader = document.querySelector('#sidebarHeader')

    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    sidebar.removeChild(sidebarHeader);
    body.removeChild(modal)
    body.removeChild(background);
    firebase.auth().signOut();
}

module.exports = logoutUser;