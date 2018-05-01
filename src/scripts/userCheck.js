// Checking whether or not user is logged in

let userID = null;

const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser.uid)
        userID = firebaseUser.uid; // check this
        const loginModal = document.querySelector('#loginModal');
        loginModal.classList.add('hide');
    }
    else {
        loginModal.classList.remove('hide');
        console.log('User does not exist');
    }
})

const getUserID = () => {
    return userID;
}

const setUserID = (id) => {
    userID = id;
}

module.exports = {
    getUserID,
    setUserID
};