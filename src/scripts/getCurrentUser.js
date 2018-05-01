const getCurrentUser = () => {
    const auth = firebase.auth();
    return new Promise((resolve, reject) => {
       const getUser = auth.onAuthStateChanged(user => {
          resolve(user);
       }, reject);
    });
  }


module.exports = getCurrentUser;