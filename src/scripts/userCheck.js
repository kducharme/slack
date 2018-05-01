// Constantly running to check whether or not user is logged in
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    }
    else {
        console.log('User does not exist');
    }
})