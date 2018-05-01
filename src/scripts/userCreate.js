// Lets user create new account
const createUser = () => {
    const clearInputs = require('./clearInputs');
    const email = document.querySelector('#userEmail').value;
    const displayName = document.querySelector('#userDisplayName').value;
    const pass = document.querySelector('#userPass').value;
    const auth = firebase.auth();

    clearInputs('userEmail')
    clearInputs('userPass')
    clearInputs('userDisplayName')

    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))

    addToWatercooler()
}

module.exports = createUser;