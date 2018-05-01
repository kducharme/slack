// Constantly running to check whether or not user is logged in
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const loginModal = document.querySelector('#loginModal');
        loginModal.classList.add('hide');
    }
    else {
        loginModal.classList.remove('hide');
        console.log('User does not exist');
    }
})