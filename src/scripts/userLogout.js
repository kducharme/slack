// Logs out user
const logoutUser = () => {
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    body.removeChild(modal)
    body.removeChild(background);
    firebase.auth().signOut();
}

module.exports = logoutUser;