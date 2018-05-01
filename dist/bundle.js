(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const addToDefaultChannel = (newUser) => {
    console.log(newUser)
    const database = require('./databaseUpdate');
    const table = 'channel';
    const channelName = '-LBN5_skx51L7hJQp5R1';

    const channel = {
        table,
        channelName
    }

    const user = {
        id: newUser.uid,
        email: newUser.email,
        name: '',
        img: '',
    }
    database(channel, user)
}

module.exports = addToDefaultChannel;
},{"./databaseUpdate":16}],2:[function(require,module,exports){
const loadDatabase = require('./databaseLoad');
const loginUserModal = require('./loginScreen')

loadDatabase();
loginUserModal();




},{"./databaseLoad":14,"./loginScreen":22}],3:[function(require,module,exports){
// Factory for creating icon-based buttons
const buttonFactory = (classList, buttonText, eventListener) => {
    const button = document.createElement('button');
    button.addEventListener('click', eventListener)
    button.innerHTML = buttonText;
    button.classList.add(classList);
    return button;
};

module.exports = buttonFactory;

},{}],4:[function(require,module,exports){
// Factory for creating text-based buttons
const buttonFactory = (classList, buttonText, eventListener) => {
    const button = document.createElement('button');
    button.addEventListener('click', eventListener)
    button.textContent = buttonText;
    button.classList.add(classList);
    return button;
};

module.exports = buttonFactory;

},{}],5:[function(require,module,exports){
const changeChannel = (evt) => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const allChannels = document.querySelectorAll('.individual-channel');
    let clickedChannel = evt.target

    if (!clickedChannel.id) {
        clickedChannel = evt.path[1]
    }
    for (let i = 0; i < allChannels.length; i++) {
        if (allChannels[i].classList.contains('activeChannel')) {
            allChannels[i].classList.remove('activeChannel');
        }
    }
    clickedChannel.classList.add('activeChannel')
    setCurrentChannel(clickedChannel.id)
}

module.exports = changeChannel;
},{"./channelCheck":6}],6:[function(require,module,exports){
// Checking what channel the user is currently in
let currentChannel = null;

const setCurrentChannel = (user) => {
    currentChannel = user;
    console.log(currentChannel)
}

const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};
},{}],7:[function(require,module,exports){
// Clears fields after submission of a form/input
const clearInputs = (identifier) => {
    document.querySelector(`#${identifier}`).value = ''
}

module.exports = clearInputs;
},{}],8:[function(require,module,exports){
const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const dateCreated = dateGenerator();
    const users = {};
    const messages = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        dateCreated: date,
        users: users,
        messages: messages
    };
    clearInputs(name.id);
    clearInputs(purpose.id);
    databaseCreate(channel);
}

module.exports = createNewChannel;
},{"./clearInputs":7,"./databaseCreate":11,"./dateGenerator":17}],9:[function(require,module,exports){
// User can write and post a text message to the message area
const createNewPost = () => {
    const input = document.querySelector('#writeMessage');

}

module.exports = createNewPost;
},{}],10:[function(require,module,exports){
const addMessageToChannel = (message) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/channel/${message.channel}/messages/.json`,
        type: "POST",
        data: JSON.stringify(message),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

const addMessage = (message) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/messages/.json`,
        type: "POST",
        data: JSON.stringify(message),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

module.exports = {
    addMessageToChannel,
    addMessage
};
},{}],11:[function(require,module,exports){
/*
NEEDS:
- Multi tiers for channel and messages

*/

const databaseCreate = (channel) => {
    $.ajax({
        url: 'https://slack-kd.firebaseio.com/channel.json',
        type: "POST",
        data: JSON.stringify(channel),
        success: function () {
            console.log("success");
        },
        error: function (error) {
            console.log("error: " + error)
        }
    });
}

module.exports = databaseCreate;



},{}],12:[function(require,module,exports){
// same as channel but message tier
},{}],13:[function(require,module,exports){
/*
NEEDS:
- Multi tiers for channel and messages
*/

const deleteTaskInDB = (key) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/channel/${key}.json`,
        type: "DELETE",
        data: JSON.stringify(key),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}
},{}],14:[function(require,module,exports){
const loadDatabase = () => {
    const databaseParse = require('./databaseParse');
    $.ajax({
        url: 'https://slack-kd.firebaseio.com/channel.json?print=pretty',
        type: "GET",
        success: function (data) {
             databaseParse(data)
        },
        error: function (error) {
            console.table(error)
        }
    });
}

module.exports = loadDatabase;
},{"./databaseParse":15}],15:[function(require,module,exports){
// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad');
    const sidebarChannels = require('./sidebarChannels');
    const channels = Object.keys(data);
    const allData = [];
    channels.forEach(key => {
        let indivChannel = {
            key,
            name: data[key].name,
            purpose: data[key].purpose,
            date: data[key].date,
            messages: data[key].messages,
            users: data[key].users
        }
        allData.push(indivChannel)
    })
    sidebarChannels(allData)
    return allData;
}

module.exports = databaseParse;
},{"./databaseLoad":14,"./sidebarChannels":26}],16:[function(require,module,exports){
const updateDatabaseChannel = (channel, user) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/${channel.table}/${channel.channelName}/users/${user.id}.json`,
        type: "PATCH",
        data: JSON.stringify(user),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

module.exports = updateDatabaseChannel;
},{}],17:[function(require,module,exports){
// Generates today's date in ex format: Oct, 7, 1989
const dateGenerator = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const today = new Date();
    const day = today.getDate();
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const date = `${month} ${day}, ${year}`;
    return date;
}

module.exports = dateGenerator;
},{}],18:[function(require,module,exports){
const getCurrentUser = () => {
    const auth = firebase.auth();
    return new Promise((resolve, reject) => {
       const getUser = auth.onAuthStateChanged(user => {
          resolve(user);
       }, reject);
    });
  }


module.exports = getCurrentUser;
},{}],19:[function(require,module,exports){
// Factory for creating input fields
const inputFactory = (type, identifier, classList, placeholder) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', identifier);
    input.classList.add(classList)
    input.placeholder = placeholder;
    
    return input;
};

module.exports = inputFactory;

},{}],20:[function(require,module,exports){
// Generates labels for inputs
const inputLabelFactory = (labelText) => {
    const label = document.createElement('p');
    label.classList.add('input__label');
    label.textContent = labelText;

    return label;
}

module.exports = inputLabelFactory;
},{}],21:[function(require,module,exports){
// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const firstChannel = document.querySelectorAll('.individual-channel')[0]
    console.log
    firstChannel.classList.add('activeChannel')
    setCurrentChannel(firstChannel.id)
}

module.exports = loadDefaultChannel;


// BUG: Need to refactor this - sometimes does not work
window.addEventListener('load', loadDefaultChannel);
},{"./channelCheck":6}],22:[function(require,module,exports){
// Creates the structure for the login page
const loginUserModal = () => {
    const modal = document.createElement('span');
    modal.setAttribute('id', 'loginModal')
    const body = document.querySelector('body');
    modal.classList.add('login')
    modal.appendChild(loginModalContent());
    body.appendChild(modal);
}

module.exports = loginUserModal;

const loginModalContent = () => {
    const contentStructure = document.createElement('span');
    const inputFactory = require('./inputFactory');
    const buttonFactoryText = require('./buttonFactoryText');
    const loginUser = require('./userLogin');
    const createUser = require('./userCreate');
    const titleStructure = loginModalTitle();

    const displayNameInput = inputFactory('text', 'userDisplayName', 'login__input', 'Full name');
    const emailInput = inputFactory('text', 'userEmail', 'login__input', 'you@example.com');
    const passInput = inputFactory('password', 'userPass', 'login__input', 'password');
    const loginButton = buttonFactoryText('login__button','Sign in', loginUser)

    const signUpButton = document.createElement('p');
    signUpButton.textContent = 'Or, create a new account'
    signUpButton.classList.add('signup__button');
    signUpButton.addEventListener('click', createUser);

    // Needs refactoring - really repetitive
    contentStructure.classList.add('login__content');
    contentStructure.appendChild(titleStructure);
    contentStructure.appendChild(displayNameInput);
    contentStructure.appendChild(emailInput);
    contentStructure.appendChild(passInput);
    contentStructure.appendChild(loginButton);
    contentStructure.appendChild(signUpButton);

    return contentStructure;
}

const loginModalTitle = () => {
    const titleStructure = document.createElement('span');
    const title = document.createElement('h1');
    const description = document.createElement('p');
    title.textContent = 'Sign in to slack';
    description.textContent = 'Get started collabroating with your teammates.';
    titleStructure.classList.add('login__title');
    titleStructure.appendChild(title);
    titleStructure.appendChild(description);

    return titleStructure;
}

},{"./buttonFactoryText":4,"./inputFactory":19,"./userCreate":29,"./userLogin":30}],23:[function(require,module,exports){
// Factory for creating messages
const messageFactory = (m, user) => {
    const message = document.createElement('span');
    message.classList.add('message')
    const title = messageTitle(user);
    message.appendChild(title);
    const text = document.createElement('p');
    text.classList.add('message__body');
    text.textContent = m;
    message.appendChild(text);

    return message;
}

// TODO: swap email w/ displayName
const messageTitle = (u) => {
    const dateGenerator = require('./dateGenerator');
    const d = dateGenerator();
    const messageTitle = document.createElement('span');
    messageTitle.classList.add('message__title')
    const displayName = document.createElement('p')
    displayName.textContent = u.email;
    const date = document.createElement('p')
    date.textContent = d;
    displayName.classList.add('message__title--user');
    date.classList.add('message__title--date');
    messageTitle.appendChild(displayName)
    messageTitle.appendChild(date)
    
    return messageTitle;
}

module.exports = messageFactory;
},{"./dateGenerator":17}],24:[function(require,module,exports){
// Creates the structure for the new channel modal
const newChannelModal = () => {
    const modal = document.createElement('span');
    const modalContent = createChannelContent();
    const body = document.querySelector('body');
    modal.classList.add('createChannel')
    modal.appendChild(modalContent);
    body.appendChild(modal);
}

module.exports = newChannelModal;

// Hides create new channel modal
const hideCreateNewChannel = () => {
    // console.log('hi')
}

// Creates the content for the create new channel modal
const createChannelContent = () => {
    const contentStructure = document.createElement('span');
    const inputFactory = require('./inputFactory');
    const buttonFactoryText = require('./buttonFactoryText');
    const inputLabelFactory = require('./inputLabelFactory');
    const databaseCreate = require('./databaseCreate');
    const createNewChannel = require('./createNewChannel');
    contentStructure.classList.add('createChannel__content')
    const titleStructure = modalTitle();

    const nameLabel = inputLabelFactory('Name');
    const purposeLabel = inputLabelFactory('Purpose');

    const nameInput = inputFactory('text', 'nameInput', 'createChannel__content--input', 'e.g. marketing');
    const purposeInput = inputFactory('text', 'purposeInput', 'createChannel__content--input', `Enter channel purpose..`);

    const modalActions = document.createElement('span');
    modalActions.classList.add('createChannel__content--actions')
    const cancelButton = buttonFactoryText('createChannel__content--cancel','Cancel', hideCreateNewChannel)
    const createButton = buttonFactoryText('createChannel__content--create','Create channel', createNewChannel)

    modalActions.appendChild(cancelButton)
    modalActions.appendChild(createButton)

    // Needs refactoring - really repetitive
    contentStructure.appendChild(titleStructure);
    contentStructure.appendChild(nameLabel);
    contentStructure.appendChild(nameInput);
    contentStructure.appendChild(purposeLabel);
    contentStructure.appendChild(purposeInput);
    contentStructure.appendChild(modalActions);

    return contentStructure;
}

const modalTitle = () => {
    const titleStructure = document.createElement('span');
    const title = document.createElement('h1');
    const description = document.createElement('p');
    title.textContent = 'Create new channel';
    description.textContent = 'Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.';
    titleStructure.classList.add('createChannel__title');
    titleStructure.appendChild(title);
    titleStructure.appendChild(description);

    return titleStructure;
}
},{"./buttonFactoryText":4,"./createNewChannel":8,"./databaseCreate":11,"./inputFactory":19,"./inputLabelFactory":20}],25:[function(require,module,exports){
const postMessage = () => {
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const messageFactory = require('./messageFactory')
    const clearInputs = require('./clearInputs')
    const addMessageToChannel = require('./databaseAddMessage').addMessageToChannel;
    const addMessage = require('./databaseAddMessage').addMessage;
    const dateGenerator = require('./dateGenerator');
    const message = document.querySelector('#writeMessage').value
    const postArea = document.querySelector('.messages');
    const user = getCurrentUser()
    const userID = user.uid;
    const channel = getCurrentChannel();
    const media = '';

    const messageStructure = messageFactory(message, user)
    const date = dateGenerator();

    postArea.appendChild(messageStructure);
    clearInputs('writeMessage')

    const newMessage = {
        channel,
        user: userID,
        date,
        message,
        media
    }
    addMessageToChannel(newMessage)
    addMessage(newMessage)
}

const submitMessage = document.querySelector('#writeMessage').addEventListener('keypress', e => {
    let key = e.which || e.keyCode;
    if (key === 13) {
        postMessage();
    }
});






// const activeWriteArea = (evt) => {
//     const write = document.querySelector('#writeMessage');
//     const upload = document.querySelector('#uploadFile');

//     write.classList.add('write__active');
//     upload.classList.add('write__active');
// }

// const inactiveWriteArea = () => {
//     const write = document.querySelector('#writeMessage');
//     const upload = document.querySelector('#uploadFile');
//     write.classList.remove('write__active');
//     upload.classList.remove('write__active');
// }

// const activeWrite = document.querySelector('.write').addEventListener('click', activeWriteArea);

// const inactiveWrite = document.querySelector('body').addEventListener('click', inactiveWriteArea);
},{"./channelCheck":6,"./clearInputs":7,"./databaseAddMessage":10,"./dateGenerator":17,"./messageFactory":23,"./userCheck":28}],26:[function(require,module,exports){
// Creates channels component for sidebar
const sidebarChannels = (allData) => {
    const channelComponent = document.createElement('span');
    const channelList = document.createElement('span');
    const sidebarStructure = require('./sidebarStructure');
    const changeChannel = require('./changeChannel');
    const header = channelsHeader();
    
    allData.forEach(c => {
        const channelRow = document.createElement('span');
        channelRow.setAttribute('id', c.key)
        channelRow.addEventListener('click', changeChannel)
        channelRow.classList = 'individual-channel'
        const hash = document.createElement('img');
        hash.src = 'img/hash.png'

        const channel = document.createElement('a')
        channel.textContent = c.name;

        channelRow.appendChild(hash);
        channelRow.appendChild(channel);
        channelList.appendChild(channelRow);
    })
    channelList.classList = 'sidebar__channels--list';
    
    channelComponent.appendChild(header);
    channelComponent.appendChild(channelList);

    sidebarStructure(channelComponent)
}

module.exports = sidebarChannels;

const channelsHeader = () => {
    const buttonFactory = require('./buttonFactoryIcon');
    const newChannelModal = require('./newChannelModal');

    const header = document.createElement('span');
    header.classList = 'sidebar__channels--header'
    const title = document.createElement('h2');
    title.textContent = 'Channels'
    const createChannel = buttonFactory('sidebar__channels--new', '<i class="material-icons add-channel">add_circle_outline</i>', newChannelModal)
    header.appendChild(title);
    header.appendChild(createChannel);

    return header;
}
},{"./buttonFactoryIcon":3,"./changeChannel":5,"./newChannelModal":24,"./sidebarStructure":27}],27:[function(require,module,exports){
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const logoutUser = require('./userLogout');
    const logOut = document.createElement('button');
    logOut.addEventListener('click', logoutUser);
    logOut.textContent = 'Log out'
    logOut.classList.add('logout__button')

    sidebar.appendChild(channelComponent);
    sidebar.appendChild(logOut);
} 

module.exports = createSidebar;

},{"./sidebarChannels":26,"./userLogout":31}],28:[function(require,module,exports){
// Checking whether or not user is logged in
let currentUser = null;

const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser.uid)
        currentUser = firebaseUser;
        const loginModal = document.querySelector('#loginModal');
        loginModal.classList.add('hide');
    }
    else {
        loginModal.classList.remove('hide');
        console.log('User does not exist');
    }
})

const getCurrentUser = () => {
    return currentUser;
}

const setCurrentUser = (user) => {
    currentUser = user;
}

module.exports = {
    getCurrentUser,
    setCurrentUser
};
},{}],29:[function(require,module,exports){
// Lets user create new account
const createUser = () => {
    const addToDefaultChannel = require('./addToChannel')
    const setCurrentUser = require('./userCheck').setCurrentUser
    const clearInputs = require('./clearInputs');
    const email = document.querySelector('#userEmail').value;
    const displayName = document.querySelector('#userDisplayName').value;
    const pass = document.querySelector('#userPass').value;
    const auth = firebase.auth();

    clearInputs('userEmail')
    clearInputs('userPass')
    clearInputs('userDisplayName')

    const promise = auth.createUserWithEmailAndPassword(email, pass).then((user) => {
        setCurrentUser(user)
        addToDefaultChannel(user)
    })
    promise.catch(e => console.log(e.message))

}

module.exports = createUser;
},{"./addToChannel":1,"./clearInputs":7,"./userCheck":28}],30:[function(require,module,exports){
// Logs user into product
const loginUser = () => {
    const clearInputs = require('./clearInputs');
    const email = document.querySelector('#userEmail').value;
    const pass = document.querySelector('#userPass').value;
    const auth = firebase.auth();

    clearInputs('userEmail')
    clearInputs('userPass')
    clearInputs('userDisplayName')

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))

}

 
module.exports = loginUser;
},{"./clearInputs":7}],31:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2xlYXJJbnB1dHMuanMiLCJzY3JpcHRzL2NyZWF0ZU5ld0NoYW5uZWwuanMiLCJzY3JpcHRzL2NyZWF0ZU5ld1Bvc3QuanMiLCJzY3JpcHRzL2RhdGFiYXNlQWRkTWVzc2FnZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VDcmVhdGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlTWVzc2FnZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VEZWxldGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlTG9hZC5qcyIsInNjcmlwdHMvZGF0YWJhc2VQYXJzZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VVcGRhdGUuanMiLCJzY3JpcHRzL2RhdGVHZW5lcmF0b3IuanMiLCJzY3JpcHRzL2dldEN1cnJlbnRVc2VyLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9sb2FkRGVmYXVsdENoYW5uZWwuanMiLCJzY3JpcHRzL2xvZ2luU2NyZWVuLmpzIiwic2NyaXB0cy9tZXNzYWdlRmFjdG9yeS5qcyIsInNjcmlwdHMvbmV3Q2hhbm5lbE1vZGFsLmpzIiwic2NyaXB0cy9wb3N0TWVzc2FnZS5qcyIsInNjcmlwdHMvc2lkZWJhckNoYW5uZWxzLmpzIiwic2NyaXB0cy9zaWRlYmFyU3RydWN0dXJlLmpzIiwic2NyaXB0cy91c2VyQ2hlY2suanMiLCJzY3JpcHRzL3VzZXJDcmVhdGUuanMiLCJzY3JpcHRzL3VzZXJMb2dpbi5qcyIsInNjcmlwdHMvdXNlckxvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhZGRUb0RlZmF1bHRDaGFubmVsID0gKG5ld1VzZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhuZXdVc2VyKVxuICAgIGNvbnN0IGRhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVVwZGF0ZScpO1xuICAgIGNvbnN0IHRhYmxlID0gJ2NoYW5uZWwnO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gJy1MQk41X3NreDUxTDdoSlFwNVIxJztcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIHRhYmxlLFxuICAgICAgICBjaGFubmVsTmFtZVxuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgIGlkOiBuZXdVc2VyLnVpZCxcbiAgICAgICAgZW1haWw6IG5ld1VzZXIuZW1haWwsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpbWc6ICcnLFxuICAgIH1cbiAgICBkYXRhYmFzZShjaGFubmVsLCB1c2VyKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFRvRGVmYXVsdENoYW5uZWw7IiwiY29uc3QgbG9hZERhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKTtcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gcmVxdWlyZSgnLi9sb2dpblNjcmVlbicpXG5cbmxvYWREYXRhYmFzZSgpO1xubG9naW5Vc2VyTW9kYWwoKTtcblxuXG5cbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGljb24tYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHRleHQtYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiY29uc3QgY2hhbmdlQ2hhbm5lbCA9IChldnQpID0+IHtcbiAgICBjb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuc2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgYWxsQ2hhbm5lbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kaXZpZHVhbC1jaGFubmVsJyk7XG4gICAgbGV0IGNsaWNrZWRDaGFubmVsID0gZXZ0LnRhcmdldFxuXG4gICAgaWYgKCFjbGlja2VkQ2hhbm5lbC5pZCkge1xuICAgICAgICBjbGlja2VkQ2hhbm5lbCA9IGV2dC5wYXRoWzFdXG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ2hhbm5lbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbENoYW5uZWxzW2ldLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlQ2hhbm5lbCcpKSB7XG4gICAgICAgICAgICBhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVDaGFubmVsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xpY2tlZENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgc2V0Q3VycmVudENoYW5uZWwoY2xpY2tlZENoYW5uZWwuaWQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbmdlQ2hhbm5lbDsiLCIvLyBDaGVja2luZyB3aGF0IGNoYW5uZWwgdGhlIHVzZXIgaXMgY3VycmVudGx5IGluXG5sZXQgY3VycmVudENoYW5uZWwgPSBudWxsO1xuXG5jb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9ICh1c2VyKSA9PiB7XG4gICAgY3VycmVudENoYW5uZWwgPSB1c2VyO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRDaGFubmVsKVxufVxuXG5jb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudENoYW5uZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRDaGFubmVsLFxuICAgIHNldEN1cnJlbnRDaGFubmVsXG59OyIsIi8vIENsZWFycyBmaWVsZHMgYWZ0ZXIgc3VibWlzc2lvbiBvZiBhIGZvcm0vaW5wdXRcbmNvbnN0IGNsZWFySW5wdXRzID0gKGlkZW50aWZpZXIpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVudGlmaWVyfWApLnZhbHVlID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhcklucHV0czsiLCJjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKGUpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lSW5wdXQnKTtcbiAgICBjb25zdCBwdXJwb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1cnBvc2VJbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVDcmVhdGVkID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIGNvbnN0IHVzZXJzID0ge307XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7fTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsdWUsXG4gICAgICAgIHB1cnBvc2U6IHB1cnBvc2UudmFsdWUsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBkYXRlLFxuICAgICAgICB1c2VyczogdXNlcnMsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgIH07XG4gICAgY2xlYXJJbnB1dHMobmFtZS5pZCk7XG4gICAgY2xlYXJJbnB1dHMocHVycG9zZS5pZCk7XG4gICAgZGF0YWJhc2VDcmVhdGUoY2hhbm5lbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3Q2hhbm5lbDsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCJjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gKG1lc3NhZ2UpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHttZXNzYWdlLmNoYW5uZWx9L21lc3NhZ2VzLy5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgYWRkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9tZXNzYWdlcy8uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZE1lc3NhZ2VUb0NoYW5uZWwsXG4gICAgYWRkTWVzc2FnZVxufTsiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuXG4qL1xuXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24/cHJpbnQ9cHJldHR5JyxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICBkYXRhYmFzZVBhcnNlKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRGF0YWJhc2U7IiwiLy8gUGFyc2VzIHRoZSBkYXRhIGxvYWRlZCBmcm9tIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZVBhcnNlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZUxvYWQgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbmFtZTogZGF0YVtrZXldLm5hbWUsXG4gICAgICAgICAgICBwdXJwb3NlOiBkYXRhW2tleV0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFba2V5XS5tZXNzYWdlcyxcbiAgICAgICAgICAgIHVzZXJzOiBkYXRhW2tleV0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VQYXJzZTsiLCJjb25zdCB1cGRhdGVEYXRhYmFzZUNoYW5uZWwgPSAoY2hhbm5lbCwgdXNlcikgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vJHtjaGFubmVsLnRhYmxlfS8ke2NoYW5uZWwuY2hhbm5lbE5hbWV9L3VzZXJzLyR7dXNlci5pZH0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZURhdGFiYXNlQ2hhbm5lbDsiLCIvLyBHZW5lcmF0ZXMgdG9kYXkncyBkYXRlIGluIGV4IGZvcm1hdDogT2N0LCA3LCAxOTg5XG5jb25zdCBkYXRlR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhOYW1lc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bW9udGh9ICR7ZGF5fSwgJHt5ZWFyfWA7XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZUdlbmVyYXRvcjsiLCJjb25zdCBnZXRDdXJyZW50VXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgY29uc3QgZ2V0VXNlciA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXIgPT4ge1xuICAgICAgICAgIHJlc29sdmUodXNlcik7XG4gICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q3VycmVudFVzZXI7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiLy8gVE9ETzogaGF2ZSB0aGUgZGVmYXVsdCBjaGFubmVsIGJlIHRoZSBsYXN0IGFjdGl2ZSBjaGFubmVsXG4vLyBDdXJyZW50bHkgbG9hZHMgdGhlIHdhdGVyY29vbGVyIGNoYW5uZWwgYnkgZGVmYXVsdFxuY29uc3QgbG9hZERlZmF1bHRDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBmaXJzdENoYW5uZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kaXZpZHVhbC1jaGFubmVsJylbMF1cbiAgICBjb25zb2xlLmxvZ1xuICAgIGZpcnN0Q2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbiAgICBzZXRDdXJyZW50Q2hhbm5lbChmaXJzdENoYW5uZWwuaWQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZERlZmF1bHRDaGFubmVsO1xuXG5cbi8vIEJVRzogTmVlZCB0byByZWZhY3RvciB0aGlzIC0gc29tZXRpbWVzIGRvZXMgbm90IHdvcmtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZERlZmF1bHRDaGFubmVsKTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBsb2dpbiBwYWdlXG5jb25zdCBsb2dpblVzZXJNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2xvZ2luTW9kYWwnKVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbG9naW4nKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGxvZ2luTW9kYWxDb250ZW50KCkpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlck1vZGFsO1xuXG5jb25zdCBsb2dpbk1vZGFsQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50U3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGlucHV0RmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRGYWN0b3J5Jyk7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeVRleHQgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlUZXh0Jyk7XG4gICAgY29uc3QgbG9naW5Vc2VyID0gcmVxdWlyZSgnLi91c2VyTG9naW4nKTtcbiAgICBjb25zdCBjcmVhdGVVc2VyID0gcmVxdWlyZSgnLi91c2VyQ3JlYXRlJyk7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBsb2dpbk1vZGFsVGl0bGUoKTtcblxuICAgIGNvbnN0IGRpc3BsYXlOYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckRpc3BsYXlOYW1lJywgJ2xvZ2luX19pbnB1dCcsICdGdWxsIG5hbWUnKTtcbiAgICBjb25zdCBlbWFpbElucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJFbWFpbCcsICdsb2dpbl9faW5wdXQnLCAneW91QGV4YW1wbGUuY29tJyk7XG4gICAgY29uc3QgcGFzc0lucHV0ID0gaW5wdXRGYWN0b3J5KCdwYXNzd29yZCcsICd1c2VyUGFzcycsICdsb2dpbl9faW5wdXQnLCAncGFzc3dvcmQnKTtcbiAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdsb2dpbl9fYnV0dG9uJywnU2lnbiBpbicsIGxvZ2luVXNlcilcblxuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBzaWduVXBCdXR0b24udGV4dENvbnRlbnQgPSAnT3IsIGNyZWF0ZSBhIG5ldyBhY2NvdW50J1xuICAgIHNpZ25VcEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzaWdudXBfX2J1dHRvbicpO1xuICAgIHNpZ25VcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVVzZXIpO1xuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX2NvbnRlbnQnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZW1haWxJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwYXNzSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoc2lnblVwQnV0dG9uKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBsb2dpbk1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1NpZ24gaW4gdG8gc2xhY2snO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0dldCBzdGFydGVkIGNvbGxhYnJvYXRpbmcgd2l0aCB5b3VyIHRlYW1tYXRlcy4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBtZXNzYWdlc1xuY29uc3QgbWVzc2FnZUZhY3RvcnkgPSAobSwgdXNlcikgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJylcbiAgICBjb25zdCB0aXRsZSA9IG1lc3NhZ2VUaXRsZSh1c2VyKTtcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fYm9keScpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtO1xuICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLy8gVE9ETzogc3dhcCBlbWFpbCB3LyBkaXNwbGF5TmFtZVxuY29uc3QgbWVzc2FnZVRpdGxlID0gKHUpID0+IHtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgZCA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBjb25zdCBtZXNzYWdlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbWVzc2FnZVRpdGxlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlJylcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRpc3BsYXlOYW1lLnRleHRDb250ZW50ID0gdS5lbWFpbDtcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGQ7XG4gICAgZGlzcGxheU5hbWUuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fdGl0bGUtLXVzZXInKTtcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS1kYXRlJyk7XG4gICAgbWVzc2FnZVRpdGxlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lKVxuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChkYXRlKVxuICAgIFxuICAgIHJldHVybiBtZXNzYWdlVGl0bGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVzc2FnZUZhY3Rvcnk7IiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBjcmVhdGVDaGFubmVsQ29udGVudCgpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbCcpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXdDaGFubmVsTW9kYWw7XG5cbi8vIEhpZGVzIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgaGlkZUNyZWF0ZU5ld0NoYW5uZWwgPSAoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hpJylcbn1cblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQnKVxuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgbmFtZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ05hbWUnKTtcbiAgICBjb25zdCBwdXJwb3NlTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnUHVycG9zZScpO1xuXG4gICAgY29uc3QgbmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ25hbWVJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsICdlLmcuIG1hcmtldGluZycpO1xuICAgIGNvbnN0IHB1cnBvc2VJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdwdXJwb3NlSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCBgRW50ZXIgY2hhbm5lbCBwdXJwb3NlLi5gKTtcblxuICAgIGNvbnN0IG1vZGFsQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbEFjdGlvbnMuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tYWN0aW9ucycpXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNhbmNlbCcsJ0NhbmNlbCcsIGhpZGVDcmVhdGVOZXdDaGFubmVsKVxuICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jcmVhdGUnLCdDcmVhdGUgY2hhbm5lbCcsIGNyZWF0ZU5ld0NoYW5uZWwpXG5cbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKVxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24pXG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobW9kYWxBY3Rpb25zKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsImNvbnN0IHBvc3RNZXNzYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGdldEN1cnJlbnRVc2VyID0gcmVxdWlyZSgnLi91c2VyQ2hlY2snKS5nZXRDdXJyZW50VXNlcjtcbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgbWVzc2FnZUZhY3RvcnkgPSByZXF1aXJlKCcuL21lc3NhZ2VGYWN0b3J5JylcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKVxuICAgIGNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2VUb0NoYW5uZWw7XG4gICAgY29uc3QgYWRkTWVzc2FnZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VBZGRNZXNzYWdlJykuYWRkTWVzc2FnZTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS52YWx1ZVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgdXNlciA9IGdldEN1cnJlbnRVc2VyKClcbiAgICBjb25zdCB1c2VySUQgPSB1c2VyLnVpZDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KG1lc3NhZ2UsIHVzZXIpXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcblxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGNsZWFySW5wdXRzKCd3cml0ZU1lc3NhZ2UnKVxuXG4gICAgY29uc3QgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgdXNlcjogdXNlcklELFxuICAgICAgICBkYXRlLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBtZWRpYVxuICAgIH1cbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsKG5ld01lc3NhZ2UpXG4gICAgYWRkTWVzc2FnZShuZXdNZXNzYWdlKVxufVxuXG5jb25zdCBzdWJtaXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZSA9PiB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IDEzKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKCk7XG4gICAgfVxufSk7XG5cblxuXG5cblxuXG4vLyBjb25zdCBhY3RpdmVXcml0ZUFyZWEgPSAoZXZ0KSA9PiB7XG4vLyAgICAgY29uc3Qgd3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JpdGVNZXNzYWdlJyk7XG4vLyAgICAgY29uc3QgdXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZEZpbGUnKTtcblxuLy8gICAgIHdyaXRlLmNsYXNzTGlzdC5hZGQoJ3dyaXRlX19hY3RpdmUnKTtcbi8vICAgICB1cGxvYWQuY2xhc3NMaXN0LmFkZCgnd3JpdGVfX2FjdGl2ZScpO1xuLy8gfVxuXG4vLyBjb25zdCBpbmFjdGl2ZVdyaXRlQXJlYSA9ICgpID0+IHtcbi8vICAgICBjb25zdCB3cml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKTtcbi8vICAgICBjb25zdCB1cGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkRmlsZScpO1xuLy8gICAgIHdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dyaXRlX19hY3RpdmUnKTtcbi8vICAgICB1cGxvYWQuY2xhc3NMaXN0LnJlbW92ZSgnd3JpdGVfX2FjdGl2ZScpO1xuLy8gfVxuXG4vLyBjb25zdCBhY3RpdmVXcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cml0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlV3JpdGVBcmVhKTtcblxuLy8gY29uc3QgaW5hY3RpdmVXcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluYWN0aXZlV3JpdGVBcmVhKTsiLCIvLyBDcmVhdGVzIGNoYW5uZWxzIGNvbXBvbmVudCBmb3Igc2lkZWJhclxuY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCBjaGFubmVsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGNoYW5uZWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJTdHJ1Y3R1cmUgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgY29uc3QgaGVhZGVyID0gY2hhbm5lbHNIZWFkZXIoKTtcbiAgICBcbiAgICBhbGxEYXRhLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdpZCcsIGMua2V5KVxuICAgICAgICBjaGFubmVsUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlQ2hhbm5lbClcbiAgICAgICAgY2hhbm5lbFJvdy5jbGFzc0xpc3QgPSAnaW5kaXZpZHVhbC1jaGFubmVsJ1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGhhc2guc3JjID0gJ2ltZy9oYXNoLnBuZydcblxuICAgICAgICBjb25zdCBjaGFubmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGNoYW5uZWwudGV4dENvbnRlbnQgPSBjLm5hbWU7XG5cbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChoYXNoKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChjaGFubmVsKTtcbiAgICAgICAgY2hhbm5lbExpc3QuYXBwZW5kQ2hpbGQoY2hhbm5lbFJvdyk7XG4gICAgfSlcbiAgICBjaGFubmVsTGlzdC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWxpc3QnO1xuICAgIFxuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGNoYW5uZWxMaXN0KTtcblxuICAgIHNpZGViYXJTdHJ1Y3R1cmUoY2hhbm5lbENvbXBvbmVudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyQ2hhbm5lbHM7XG5cbmNvbnN0IGNoYW5uZWxzSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnkgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlJY29uJyk7XG4gICAgY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gcmVxdWlyZSgnLi9uZXdDaGFubmVsTW9kYWwnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzJ1xuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgbmV3Q2hhbm5lbE1vZGFsKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn0iLCJjb25zdCBjcmVhdGVTaWRlYmFyID0gKGNoYW5uZWxDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IGxvZ291dFVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dvdXQnKTtcbiAgICBjb25zdCBsb2dPdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsb2dPdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dvdXRVc2VyKTtcbiAgICBsb2dPdXQudGV4dENvbnRlbnQgPSAnTG9nIG91dCdcbiAgICBsb2dPdXQuY2xhc3NMaXN0LmFkZCgnbG9nb3V0X19idXR0b24nKVxuXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChjaGFubmVsQ29tcG9uZW50KTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGxvZ091dCk7XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7XG4iLCIvLyBDaGVja2luZyB3aGV0aGVyIG9yIG5vdCB1c2VyIGlzIGxvZ2dlZCBpblxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGZpcmViYXNlVXNlciA9PiB7XG4gICAgaWYgKGZpcmViYXNlVXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhmaXJlYmFzZVVzZXIudWlkKVxuICAgICAgICBjdXJyZW50VXNlciA9IGZpcmViYXNlVXNlcjtcbiAgICAgICAgY29uc3QgbG9naW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbk1vZGFsJyk7XG4gICAgICAgIGxvZ2luTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSlcblxuY29uc3QgZ2V0Q3VycmVudFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG5jb25zdCBzZXRDdXJyZW50VXNlciA9ICh1c2VyKSA9PiB7XG4gICAgY3VycmVudFVzZXIgPSB1c2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDdXJyZW50VXNlcixcbiAgICBzZXRDdXJyZW50VXNlclxufTsiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSByZXF1aXJlKCcuL2FkZFRvQ2hhbm5lbCcpXG4gICAgY29uc3Qgc2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLnNldEN1cnJlbnRVc2VyXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckRpc3BsYXlOYW1lJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpXG4gICAgICAgIGFkZFRvRGVmYXVsdENoYW5uZWwodXNlcilcbiAgICB9KVxuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVXNlcjsiLCIvLyBMb2dzIHVzZXIgaW50byBwcm9kdWN0XG5jb25zdCBsb2dpblVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpO1xuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbiBcbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyOyIsIi8vIExvZ3Mgb3V0IHVzZXJcbmNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXRVc2VyOyJdfQ==
