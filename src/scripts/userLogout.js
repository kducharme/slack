// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;