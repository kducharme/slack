// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}