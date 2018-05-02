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
},{"./databaseUpdate":17}],2:[function(require,module,exports){
const loadDB = require('./databaseLoad').loadDatabase;
const loginUserModal = require('./loginScreen');
const keepMessagesBottom = require('./keepMessagesBottom');
// const channelDetails = require('./channelDetails').channelDetails;

loadDB();
loginUserModal();
keepMessagesBottom();
// channelDetails();




},{"./databaseLoad":15,"./keepMessagesBottom":21,"./loginScreen":23}],3:[function(require,module,exports){
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
// Allows user to change channel and adds styling on the side bar
const changeChannel = (evt) => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const channelDetails = require('./channelDetails').channelDetailsLeft;
    const loadMessages = require('./databaseLoad').loadMessages;
    const clearChannel = require('./channelDetails').clearChannel;
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
    clearMessages();
    clickedChannel.classList.add('activeChannel')
    clearChannel();
    setCurrentChannel(clickedChannel)
    loadMessages(clickedChannel.id)
}

// When user changes channels, this clears the messages from the old channel
const clearMessages = () => {
    const printArea = document.querySelectorAll('#messages');
    printArea.forEach(m => {
        while (m.firstChild) {
            m.removeChild(m.firstChild);
        }
    })
}

module.exports = changeChannel;
},{"./channelCheck":6,"./channelDetails":7,"./databaseLoad":15}],6:[function(require,module,exports){
// Checking what channel the user is currently in
let currentChannel = null;

// On channel change, this sets the channel that the user is in
const setCurrentChannel = (channel) => {
    const channelDetails = require('./channelDetails').channelDetails;
    currentChannel = channel;
    channelDetails();
}

// Called to get the current channel that the user is in
const getCurrentChannel = () => {
    return currentChannel;
}

module.exports = {
    getCurrentChannel,
    setCurrentChannel
};
},{"./channelDetails":7}],7:[function(require,module,exports){
const channelDetails = () => {
    const printArea = document.querySelector('.options')
    const leftArea = channelDetailsLeft();
    const rightArea = channelDetailsRight();

    printArea.appendChild(leftArea);
    // printArea.appendChild(rightArea);

}

const clearChannel = () => {
    const channel = document.querySelectorAll('#optionsLeft');
    channel.forEach(c => {
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
    })
}

const channelDetailsLeft = () => {

    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const channel = getCurrentChannel();

    const leftArea = document.createElement('span');
    leftArea.childList = 'options__left'
    leftArea.setAttribute('id','optionsLeft')
    const channelName = document.createElement('h2');
    channelName.classList = 'options__channel'
    channelName.innerHTML = `#${channel.childNodes[1].textContent}`;
    leftArea.appendChild(channelName);

    const channelPurpose = document.createElement('p');
    channelPurpose.textContent = channel.getAttribute('data-purpose')
    channelPurpose.classList = 'options__purpose';
    leftArea.appendChild(channelPurpose);

    return leftArea;
}

const channelDetailsRight = () => {
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const channel = getCurrentChannel();
}

module.exports = {
    channelDetails,
    channelDetailsLeft,
    clearChannel
};
},{"./channelCheck":6}],8:[function(require,module,exports){
// Clears fields after submission of a form/input
const clearInputs = (identifier) => {
    document.querySelector(`#${identifier}`).value = ''
}

module.exports = clearInputs;
},{}],9:[function(require,module,exports){
const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const loadDatabase = require('./databaseLoad').loadDatabase;
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const dateCreated = dateGenerator();
    const users = {};
    const messages = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        dateCreated: dateCreated,
        users: users,
        messages: messages
    };
    clearInputs(name.id);
    clearInputs(purpose.id);
    databaseCreate(channel);
    resetSidebar();
    loadDatabase();
    closeCreateNewModal();
}

// Hides create new channel modal
const closeCreateNewModal = () => {
    const channelModal = document.querySelector('#channelModal');
    channelModal.classList = 'hide';
}

// After user creates new channel, this resets the channel sidebar to show recently added channel
const resetSidebar = () => {
    const sidebar = document.querySelector('#sidebar');
    console.log(sidebar)
    sidebar.innerHTML = ''
    // if (sidebar.childNodes.length > 0) {
    //     side.forEach(c => {
    //         while (c.firstChild) {
    //             c.removeChild(c.firstChild);
    //         }
    //     })
    // }
}

module.exports = {
    createNewChannel,
    closeCreateNewModal
};
},{"./clearInputs":8,"./databaseCreate":12,"./databaseLoad":15,"./dateGenerator":18}],10:[function(require,module,exports){
// User can write and post a text message to the message area
const createNewPost = () => {
    const input = document.querySelector('#writeMessage');

}

module.exports = createNewPost;
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
// creates a new channel in firebase
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



},{}],13:[function(require,module,exports){
// same as channel but message tier
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
const loadDatabase = () => {
    const databaseParse = require('./databaseParse').databaseParse;
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

const loadMessages = (channel) => {
    const messageParse = require('./databaseParse').messageParse;
    const changeChannel = require('./changeChannel');
    $.ajax({
        url: `https://slack-kd.firebaseio.com/channel/${channel}/messages.json?print=pretty`,
        type: "GET",
        success: function (data) {
             messageParse(data)
        },
        error: function (error) {
            console.table(error)
        }
    });
}

module.exports = {
    loadDatabase,
    loadMessages
}
},{"./changeChannel":5,"./databaseParse":16}],16:[function(require,module,exports){
// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad').loadDatabase;
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

// Parses the data received from DB to prepare for posting
const messageParse = (data) => {
    const databaseLoad = require('./databaseLoad').loadDatabase;
    const sidebarChannels = require('./sidebarChannels');
    const postSavedMessages = require('./postSavedMessages')
    const allMessages = Object.keys(data);
    const allData = [];
    allMessages.forEach(key => {
        let indivMessage = {
            key,
            user: data[key].user,
            date: data[key].date,
            text: data[key].message,
            media: data[key].media
        }
        allData.push(indivMessage)
    })
    postSavedMessages(allData)
    return allData;
}

module.exports = {
    databaseParse,
    messageParse
};
},{"./databaseLoad":15,"./postSavedMessages":27,"./sidebarChannels":28}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
const keepMessagesBottom = () => {
    let messageBody = document.querySelector('#messages');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

module.exports = keepMessagesBottom;
},{}],22:[function(require,module,exports){
// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const setCurrentChannel = require('./channelCheck').setCurrentChannel;
    const channelDetailsLeft = require('./channelDetails').channelDetailsLeft;
    const loadMessages = require('./databaseLoad').loadMessages;

    const firstChannel = document.querySelector('.sidebar__channels--list').childNodes[0]
    firstChannel.classList.add('activeChannel')
    setCurrentChannel(firstChannel)
    loadMessages(firstChannel.id)

}

// Delay to load default channel
window.onload = function(){
    setTimeout(function(){
        loadDefaultChannel();
    }, 500);
 };

module.exports = loadDefaultChannel;

},{"./channelCheck":6,"./channelDetails":7,"./databaseLoad":15}],23:[function(require,module,exports){
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
    const signUpButton = buttonFactoryText('signup__button','Create account', createUser)

    const loginButton = document.createElement('p');
    loginButton.textContent = 'Or, sign in to existing account'
    loginButton.classList.add('login__button');
    loginButton.addEventListener('click', loginUser);

    // Needs refactoring - really repetitive
    contentStructure.classList.add('login__content');
    contentStructure.appendChild(titleStructure);
    contentStructure.appendChild(displayNameInput);
    contentStructure.appendChild(emailInput);
    contentStructure.appendChild(passInput);
    contentStructure.appendChild(signUpButton);
    contentStructure.appendChild(loginButton);

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

},{"./buttonFactoryText":4,"./inputFactory":19,"./userCreate":31,"./userLogin":32}],24:[function(require,module,exports){
// Factory for creating messages
const messageFactory = (m, user) => {
    const message = document.createElement('span');
    const body = document.createElement('span');
    body.classList.add('message__right')
    const title = messageTitle(user);
    const avatar = messageAvatar();
    message.classList.add('message')
    const text = document.createElement('p');
    text.classList.add('message__body');
    text.textContent = m;
    
    body.appendChild(title)
    body.appendChild(text)
    
    message.appendChild(avatar)
    message.appendChild(body);

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

const messageAvatar = () => {
    const avatar = document.createElement('img');
    avatar.src = 'img/avatar.png'
    avatar.classList.add('messages__avatar')
    return avatar
}

module.exports = messageFactory;
},{"./dateGenerator":18}],25:[function(require,module,exports){
// Creates the structure for the new channel modal
const newChannelModal = () => {
    const modal = document.createElement('span');
    modal.setAttribute('id','channelModal')
    const modalContent = createChannelContent();
    const body = document.querySelector('body');
    modal.classList.add('createChannel')
    modal.appendChild(modalContent);
    body.appendChild(modal);
}

module.exports = newChannelModal;

// Creates the content for the create new channel modal
const createChannelContent = () => {
    const contentStructure = document.createElement('span');
    const inputFactory = require('./inputFactory');
    const buttonFactoryText = require('./buttonFactoryText');
    const inputLabelFactory = require('./inputLabelFactory');
    const databaseCreate = require('./databaseCreate');
    const createNewChannel = require('./createNewChannel').createNewChannel;
    const closeCreateNewModal = require('./createNewChannel').closeCreateNewModal;
    contentStructure.classList.add('createChannel__content')
    const titleStructure = modalTitle();

    const nameLabel = inputLabelFactory('Name');
    const purposeLabel = inputLabelFactory('Purpose');

    const nameInput = inputFactory('text', 'nameInput', 'createChannel__content--input', 'e.g. marketing');
    const purposeInput = inputFactory('text', 'purposeInput', 'createChannel__content--input', `Enter channel purpose..`);

    const modalActions = document.createElement('span');
    modalActions.classList.add('createChannel__content--actions')
    const cancelButton = buttonFactoryText('createChannel__content--cancel','Cancel', closeCreateNewModal)
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

// title content for create new channel modal
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
},{"./buttonFactoryText":4,"./createNewChannel":9,"./databaseCreate":12,"./inputFactory":19,"./inputLabelFactory":20}],26:[function(require,module,exports){
// Allows user to create and post a new message
const postMessage = () => {
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const getCurrentChannel = require('./channelCheck').getCurrentChannel;
    const messageFactory = require('./messageFactory')
    const clearInputs = require('./clearInputs')
    const addMessageToChannel = require('./databaseAddMessage').addMessageToChannel;
    const addMessage = require('./databaseAddMessage').addMessage;
    const keepMessagesBottom = require('./keepMessagesBottom');
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
        channel: channel.id,
        user,
        date,
        message,
        media
    }
    addMessageToChannel(newMessage)
    addMessage(newMessage)
    keepMessagesBottom();
}

// Event listener waiting for user to hit 'enter' before posting new message
const submitMessage = document.querySelector('#writeMessage').addEventListener('keypress', e => {
    let key = e.which || e.keyCode;
    if (key === 13) {
        postMessage();
    }
});
},{"./channelCheck":6,"./clearInputs":8,"./databaseAddMessage":11,"./dateGenerator":18,"./keepMessagesBottom":21,"./messageFactory":24,"./userCheck":30}],27:[function(require,module,exports){
// Appends new message to #message div in DOM
const postMessage = (allMessages) => {
    const messageFactory = require('./messageFactory')
    const postArea = document.querySelector('.messages');
    allMessages.forEach(message => {
        const m = message.text;
        const u = message.user;
        console.log(u)
        const messageStructure = messageFactory(m, u)
        postArea.appendChild(messageStructure);
    })
}

module.exports = postMessage;
},{"./messageFactory":24}],28:[function(require,module,exports){
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
        channelRow.setAttribute('data-purpose', c.purpose);
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

module.exports = sidebarChannels;
},{"./buttonFactoryIcon":3,"./changeChannel":5,"./newChannelModal":25,"./sidebarStructure":29}],29:[function(require,module,exports){
// Creates the structure for the sidebar
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
},{"./sidebarChannels":28,"./userLogout":33}],30:[function(require,module,exports){
// Checking whether or not user is logged in
let currentUser = null;

const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
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
},{}],31:[function(require,module,exports){
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
},{"./addToChannel":1,"./clearInputs":8,"./userCheck":30}],32:[function(require,module,exports){
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
},{"./clearInputs":8}],33:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9rZWVwTWVzc2FnZXNCb3R0b20uanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL21lc3NhZ2VGYWN0b3J5LmpzIiwic2NyaXB0cy9uZXdDaGFubmVsTW9kYWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhclN0cnVjdHVyZS5qcyIsInNjcmlwdHMvdXNlckNoZWNrLmpzIiwic2NyaXB0cy91c2VyQ3JlYXRlLmpzIiwic2NyaXB0cy91c2VyTG9naW4uanMiLCJzY3JpcHRzL3VzZXJMb2dvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSAobmV3VXNlcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKG5ld1VzZXIpXG4gICAgY29uc3QgZGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlVXBkYXRlJyk7XG4gICAgY29uc3QgdGFibGUgPSAnY2hhbm5lbCc7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSAnLUxCTjVfc2t4NTFMN2hKUXA1UjEnO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgdGFibGUsXG4gICAgICAgIGNoYW5uZWxOYW1lXG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgaWQ6IG5ld1VzZXIudWlkLFxuICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGltZzogJycsXG4gICAgfVxuICAgIGRhdGFiYXNlKGNoYW5uZWwsIHVzZXIpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkVG9EZWZhdWx0Q2hhbm5lbDsiLCJjb25zdCBsb2FkREIgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gcmVxdWlyZSgnLi9sb2dpblNjcmVlbicpO1xuY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gcmVxdWlyZSgnLi9rZWVwTWVzc2FnZXNCb3R0b20nKTtcbi8vIGNvbnN0IGNoYW5uZWxEZXRhaWxzID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzO1xuXG5sb2FkREIoKTtcbmxvZ2luVXNlck1vZGFsKCk7XG5rZWVwTWVzc2FnZXNCb3R0b20oKTtcbi8vIGNoYW5uZWxEZXRhaWxzKCk7XG5cblxuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEFsbG93cyB1c2VyIHRvIGNoYW5nZSBjaGFubmVsIGFuZCBhZGRzIHN0eWxpbmcgb24gdGhlIHNpZGUgYmFyXG5jb25zdCBjaGFuZ2VDaGFubmVsID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlsc0xlZnQ7XG4gICAgY29uc3QgbG9hZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkTWVzc2FnZXM7XG4gICAgY29uc3QgY2xlYXJDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNsZWFyQ2hhbm5lbDtcbiAgICBjb25zdCBhbGxDaGFubmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmRpdmlkdWFsLWNoYW5uZWwnKTtcbiAgICBsZXQgY2xpY2tlZENoYW5uZWwgPSBldnQudGFyZ2V0XG5cbiAgICBpZiAoIWNsaWNrZWRDaGFubmVsLmlkKSB7XG4gICAgICAgIGNsaWNrZWRDaGFubmVsID0gZXZ0LnBhdGhbMV1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDaGFubmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmVDaGFubmVsJykpIHtcbiAgICAgICAgICAgIGFsbENoYW5uZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZUNoYW5uZWwnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhck1lc3NhZ2VzKCk7XG4gICAgY2xpY2tlZENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgY2xlYXJDaGFubmVsKCk7XG4gICAgc2V0Q3VycmVudENoYW5uZWwoY2xpY2tlZENoYW5uZWwpXG4gICAgbG9hZE1lc3NhZ2VzKGNsaWNrZWRDaGFubmVsLmlkKVxufVxuXG4vLyBXaGVuIHVzZXIgY2hhbmdlcyBjaGFubmVscywgdGhpcyBjbGVhcnMgdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG9sZCBjaGFubmVsXG5jb25zdCBjbGVhck1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtZXNzYWdlcycpO1xuICAgIHByaW50QXJlYS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5nZUNoYW5uZWw7IiwiLy8gQ2hlY2tpbmcgd2hhdCBjaGFubmVsIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBpblxubGV0IGN1cnJlbnRDaGFubmVsID0gbnVsbDtcblxuLy8gT24gY2hhbm5lbCBjaGFuZ2UsIHRoaXMgc2V0cyB0aGUgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IChjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHM7XG4gICAgY3VycmVudENoYW5uZWwgPSBjaGFubmVsO1xuICAgIGNoYW5uZWxEZXRhaWxzKCk7XG59XG5cbi8vIENhbGxlZCB0byBnZXQgdGhlIGN1cnJlbnQgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudENoYW5uZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRDaGFubmVsLFxuICAgIHNldEN1cnJlbnRDaGFubmVsXG59OyIsImNvbnN0IGNoYW5uZWxEZXRhaWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zJylcbiAgICBjb25zdCBsZWZ0QXJlYSA9IGNoYW5uZWxEZXRhaWxzTGVmdCgpO1xuICAgIGNvbnN0IHJpZ2h0QXJlYSA9IGNoYW5uZWxEZXRhaWxzUmlnaHQoKTtcblxuICAgIHByaW50QXJlYS5hcHBlbmRDaGlsZChsZWZ0QXJlYSk7XG4gICAgLy8gcHJpbnRBcmVhLmFwcGVuZENoaWxkKHJpZ2h0QXJlYSk7XG5cbn1cblxuY29uc3QgY2xlYXJDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjb3B0aW9uc0xlZnQnKTtcbiAgICBjaGFubmVsLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHdoaWxlIChjLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzTGVmdCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5nZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcblxuICAgIGNvbnN0IGxlZnRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxlZnRBcmVhLmNoaWxkTGlzdCA9ICdvcHRpb25zX19sZWZ0J1xuICAgIGxlZnRBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdvcHRpb25zTGVmdCcpXG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNoYW5uZWxOYW1lLmNsYXNzTGlzdCA9ICdvcHRpb25zX19jaGFubmVsJ1xuICAgIGNoYW5uZWxOYW1lLmlubmVySFRNTCA9IGAjJHtjaGFubmVsLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnR9YDtcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsTmFtZSk7XG5cbiAgICBjb25zdCBjaGFubmVsUHVycG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjaGFubmVsUHVycG9zZS50ZXh0Q29udGVudCA9IGNoYW5uZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXB1cnBvc2UnKVxuICAgIGNoYW5uZWxQdXJwb3NlLmNsYXNzTGlzdCA9ICdvcHRpb25zX19wdXJwb3NlJztcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsUHVycG9zZSk7XG5cbiAgICByZXR1cm4gbGVmdEFyZWE7XG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzUmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjaGFubmVsRGV0YWlscyxcbiAgICBjaGFubmVsRGV0YWlsc0xlZnQsXG4gICAgY2xlYXJDaGFubmVsXG59OyIsIi8vIENsZWFycyBmaWVsZHMgYWZ0ZXIgc3VibWlzc2lvbiBvZiBhIGZvcm0vaW5wdXRcbmNvbnN0IGNsZWFySW5wdXRzID0gKGlkZW50aWZpZXIpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVudGlmaWVyfWApLnZhbHVlID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhcklucHV0czsiLCJjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKGUpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBsb2FkRGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lSW5wdXQnKTtcbiAgICBjb25zdCBwdXJwb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1cnBvc2VJbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVDcmVhdGVkID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIGNvbnN0IHVzZXJzID0ge307XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7fTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsdWUsXG4gICAgICAgIHB1cnBvc2U6IHB1cnBvc2UudmFsdWUsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBkYXRlQ3JlYXRlZCxcbiAgICAgICAgdXNlcnM6IHVzZXJzLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcbiAgICB9O1xuICAgIGNsZWFySW5wdXRzKG5hbWUuaWQpO1xuICAgIGNsZWFySW5wdXRzKHB1cnBvc2UuaWQpO1xuICAgIGRhdGFiYXNlQ3JlYXRlKGNoYW5uZWwpO1xuICAgIHJlc2V0U2lkZWJhcigpO1xuICAgIGxvYWREYXRhYmFzZSgpO1xuICAgIGNsb3NlQ3JlYXRlTmV3TW9kYWwoKTtcbn1cblxuLy8gSGlkZXMgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjbG9zZUNyZWF0ZU5ld01vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsTW9kYWwnKTtcbiAgICBjaGFubmVsTW9kYWwuY2xhc3NMaXN0ID0gJ2hpZGUnO1xufVxuXG4vLyBBZnRlciB1c2VyIGNyZWF0ZXMgbmV3IGNoYW5uZWwsIHRoaXMgcmVzZXRzIHRoZSBjaGFubmVsIHNpZGViYXIgdG8gc2hvdyByZWNlbnRseSBhZGRlZCBjaGFubmVsXG5jb25zdCByZXNldFNpZGViYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJyk7XG4gICAgY29uc29sZS5sb2coc2lkZWJhcilcbiAgICBzaWRlYmFyLmlubmVySFRNTCA9ICcnXG4gICAgLy8gaWYgKHNpZGViYXIuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIHNpZGUuZm9yRWFjaChjID0+IHtcbiAgICAvLyAgICAgICAgIHdoaWxlIChjLmZpcnN0Q2hpbGQpIHtcbiAgICAvLyAgICAgICAgICAgICBjLnJlbW92ZUNoaWxkKGMuZmlyc3RDaGlsZCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVOZXdDaGFubmVsLFxuICAgIGNsb3NlQ3JlYXRlTmV3TW9kYWxcbn07IiwiLy8gVXNlciBjYW4gd3JpdGUgYW5kIHBvc3QgYSB0ZXh0IG1lc3NhZ2UgdG8gdGhlIG1lc3NhZ2UgYXJlYVxuY29uc3QgY3JlYXRlTmV3UG9zdCA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld1Bvc3Q7IiwiY29uc3QgYWRkTWVzc2FnZVRvQ2hhbm5lbCA9IChtZXNzYWdlKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7bWVzc2FnZS5jaGFubmVsfS9tZXNzYWdlcy8uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGFkZE1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vbWVzc2FnZXMvLmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsLFxuICAgIGFkZE1lc3NhZ2Vcbn07IiwiLy8gY3JlYXRlcyBhIG5ldyBjaGFubmVsIGluIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykuZGF0YWJhc2VQYXJzZTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIGRhdGFiYXNlUGFyc2UoZGF0YSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBsb2FkTWVzc2FnZXMgPSAoY2hhbm5lbCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VQYXJzZScpLm1lc3NhZ2VQYXJzZTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7Y2hhbm5lbH0vbWVzc2FnZXMuanNvbj9wcmludD1wcmV0dHlgLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIG1lc3NhZ2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxvYWREYXRhYmFzZSxcbiAgICBsb2FkTWVzc2FnZXNcbn0iLCIvLyBQYXJzZXMgdGhlIGRhdGEgbG9hZGVkIGZyb20gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbmFtZTogZGF0YVtrZXldLm5hbWUsXG4gICAgICAgICAgICBwdXJwb3NlOiBkYXRhW2tleV0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFba2V5XS5tZXNzYWdlcyxcbiAgICAgICAgICAgIHVzZXJzOiBkYXRhW2tleV0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbi8vIFBhcnNlcyB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIERCIHRvIHByZXBhcmUgZm9yIHBvc3RpbmdcbmNvbnN0IG1lc3NhZ2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBwb3N0U2F2ZWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vcG9zdFNhdmVkTWVzc2FnZXMnKVxuICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGFsbE1lc3NhZ2VzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGluZGl2TWVzc2FnZSA9IHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHVzZXI6IGRhdGFba2V5XS51c2VyLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtrZXldLmRhdGUsXG4gICAgICAgICAgICB0ZXh0OiBkYXRhW2tleV0ubWVzc2FnZSxcbiAgICAgICAgICAgIG1lZGlhOiBkYXRhW2tleV0ubWVkaWFcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZNZXNzYWdlKVxuICAgIH0pXG4gICAgcG9zdFNhdmVkTWVzc2FnZXMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGF0YWJhc2VQYXJzZSxcbiAgICBtZXNzYWdlUGFyc2Vcbn07IiwiY29uc3QgdXBkYXRlRGF0YWJhc2VDaGFubmVsID0gKGNoYW5uZWwsIHVzZXIpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tLyR7Y2hhbm5lbC50YWJsZX0vJHtjaGFubmVsLmNoYW5uZWxOYW1lfS91c2Vycy8ke3VzZXIuaWR9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGVEYXRhYmFzZUNoYW5uZWw7IiwiLy8gR2VuZXJhdGVzIHRvZGF5J3MgZGF0ZSBpbiBleCBmb3JtYXQ6IE9jdCwgNywgMTk4OVxuY29uc3QgZGF0ZUdlbmVyYXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbdG9kYXkuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIHJldHVybiBkYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVHZW5lcmF0b3I7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gKCkgPT4ge1xuICAgIGxldCBtZXNzYWdlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlcycpO1xuICAgIG1lc3NhZ2VCb2R5LnNjcm9sbFRvcCA9IG1lc3NhZ2VCb2R5LnNjcm9sbEhlaWdodCAtIG1lc3NhZ2VCb2R5LmNsaWVudEhlaWdodDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZWVwTWVzc2FnZXNCb3R0b207IiwiLy8gVE9ETzogaGF2ZSB0aGUgZGVmYXVsdCBjaGFubmVsIGJlIHRoZSBsYXN0IGFjdGl2ZSBjaGFubmVsXG4vLyBDdXJyZW50bHkgbG9hZHMgdGhlIHdhdGVyY29vbGVyIGNoYW5uZWwgYnkgZGVmYXVsdFxuY29uc3QgbG9hZERlZmF1bHRDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlsc0xlZnQgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHNMZWZ0O1xuICAgIGNvbnN0IGxvYWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZE1lc3NhZ2VzO1xuXG4gICAgY29uc3QgZmlyc3RDaGFubmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX2NoYW5uZWxzLS1saXN0JykuY2hpbGROb2Rlc1swXVxuICAgIGZpcnN0Q2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbiAgICBzZXRDdXJyZW50Q2hhbm5lbChmaXJzdENoYW5uZWwpXG4gICAgbG9hZE1lc3NhZ2VzKGZpcnN0Q2hhbm5lbC5pZClcblxufVxuXG4vLyBEZWxheSB0byBsb2FkIGRlZmF1bHQgY2hhbm5lbFxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBsb2FkRGVmYXVsdENoYW5uZWwoKTtcbiAgICB9LCA1MDApO1xuIH07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZERlZmF1bHRDaGFubmVsO1xuIiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbG9naW4gcGFnZVxuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdpZCcsICdsb2dpbk1vZGFsJylcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2xvZ2luJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChsb2dpbk1vZGFsQ29udGVudCgpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dpblVzZXJNb2RhbDtcblxuY29uc3QgbG9naW5Nb2RhbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGxvZ2luVXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ2luJyk7XG4gICAgY29uc3QgY3JlYXRlVXNlciA9IHJlcXVpcmUoJy4vdXNlckNyZWF0ZScpO1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbG9naW5Nb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBkaXNwbGF5TmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJEaXNwbGF5TmFtZScsICdsb2dpbl9faW5wdXQnLCAnRnVsbCBuYW1lJyk7XG4gICAgY29uc3QgZW1haWxJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRW1haWwnLCAnbG9naW5fX2lucHV0JywgJ3lvdUBleGFtcGxlLmNvbScpO1xuICAgIGNvbnN0IHBhc3NJbnB1dCA9IGlucHV0RmFjdG9yeSgncGFzc3dvcmQnLCAndXNlclBhc3MnLCAnbG9naW5fX2lucHV0JywgJ3Bhc3N3b3JkJyk7XG4gICAgY29uc3Qgc2lnblVwQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ3NpZ251cF9fYnV0dG9uJywnQ3JlYXRlIGFjY291bnQnLCBjcmVhdGVVc2VyKVxuXG4gICAgY29uc3QgbG9naW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAnT3IsIHNpZ24gaW4gdG8gZXhpc3RpbmcgYWNjb3VudCdcbiAgICBsb2dpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fYnV0dG9uJyk7XG4gICAgbG9naW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dpblVzZXIpO1xuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX2NvbnRlbnQnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZW1haWxJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwYXNzSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoc2lnblVwQnV0dG9uKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBsb2dpbk1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1NpZ24gaW4gdG8gc2xhY2snO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0dldCBzdGFydGVkIGNvbGxhYnJvYXRpbmcgd2l0aCB5b3VyIHRlYW1tYXRlcy4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBtZXNzYWdlc1xuY29uc3QgbWVzc2FnZUZhY3RvcnkgPSAobSwgdXNlcikgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3JpZ2h0JylcbiAgICBjb25zdCB0aXRsZSA9IG1lc3NhZ2VUaXRsZSh1c2VyKTtcbiAgICBjb25zdCBhdmF0YXIgPSBtZXNzYWdlQXZhdGFyKCk7XG4gICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fYm9keScpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtO1xuICAgIFxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGl0bGUpXG4gICAgYm9keS5hcHBlbmRDaGlsZCh0ZXh0KVxuICAgIFxuICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQoYXZhdGFyKVxuICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQoYm9keSk7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLy8gVE9ETzogc3dhcCBlbWFpbCB3LyBkaXNwbGF5TmFtZVxuY29uc3QgbWVzc2FnZVRpdGxlID0gKHUpID0+IHtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgZCA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBjb25zdCBtZXNzYWdlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbWVzc2FnZVRpdGxlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlJylcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRpc3BsYXlOYW1lLnRleHRDb250ZW50ID0gdS5lbWFpbDtcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGQ7XG4gICAgZGlzcGxheU5hbWUuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fdGl0bGUtLXVzZXInKTtcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS1kYXRlJyk7XG4gICAgbWVzc2FnZVRpdGxlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lKVxuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChkYXRlKVxuICAgIFxuICAgIHJldHVybiBtZXNzYWdlVGl0bGU7XG59XG5cbmNvbnN0IG1lc3NhZ2VBdmF0YXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYXZhdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgYXZhdGFyLnNyYyA9ICdpbWcvYXZhdGFyLnBuZydcbiAgICBhdmF0YXIuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZXNfX2F2YXRhcicpXG4gICAgcmV0dXJuIGF2YXRhclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lc3NhZ2VGYWN0b3J5OyIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBuZXdDaGFubmVsTW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdpZCcsJ2NoYW5uZWxNb2RhbCcpXG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gY3JlYXRlQ2hhbm5lbENvbnRlbnQoKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWwnKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3Q2hhbm5lbE1vZGFsO1xuXG4vLyBDcmVhdGVzIHRoZSBjb250ZW50IGZvciB0aGUgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjcmVhdGVDaGFubmVsQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50U3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGlucHV0RmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRGYWN0b3J5Jyk7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeVRleHQgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlUZXh0Jyk7XG4gICAgY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0TGFiZWxGYWN0b3J5Jyk7XG4gICAgY29uc3QgZGF0YWJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL2RhdGFiYXNlQ3JlYXRlJyk7XG4gICAgY29uc3QgY3JlYXRlTmV3Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY3JlYXRlTmV3Q2hhbm5lbCcpLmNyZWF0ZU5ld0NoYW5uZWw7XG4gICAgY29uc3QgY2xvc2VDcmVhdGVOZXdNb2RhbCA9IHJlcXVpcmUoJy4vY3JlYXRlTmV3Q2hhbm5lbCcpLmNsb3NlQ3JlYXRlTmV3TW9kYWw7XG4gICAgY29udGVudFN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50JylcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IG1vZGFsVGl0bGUoKTtcblxuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdOYW1lJyk7XG4gICAgY29uc3QgcHVycG9zZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ1B1cnBvc2UnKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICduYW1lSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCAnZS5nLiBtYXJrZXRpbmcnKTtcbiAgICBjb25zdCBwdXJwb3NlSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAncHVycG9zZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgYEVudGVyIGNoYW5uZWwgcHVycG9zZS4uYCk7XG5cbiAgICBjb25zdCBtb2RhbEFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbW9kYWxBY3Rpb25zLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWFjdGlvbnMnKVxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jYW5jZWwnLCdDYW5jZWwnLCBjbG9zZUNyZWF0ZU5ld01vZGFsKVxuICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jcmVhdGUnLCdDcmVhdGUgY2hhbm5lbCcsIGNyZWF0ZU5ld0NoYW5uZWwpXG5cbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKVxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24pXG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobW9kYWxBY3Rpb25zKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG4vLyB0aXRsZSBjb250ZW50IGZvciBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IG1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NyZWF0ZSBuZXcgY2hhbm5lbCc7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnQ2hhbm5lbHMgYXJlIHdoZXJlIHlvdXIgbWVtYmVycyBjb21tdW5pY2F0ZS4gVGhleeKAmXJlIGJlc3Qgd2hlbiBvcmdhbml6ZWQgYXJvdW5kIGEgdG9waWMg4oCUICNsZWFkcywgZm9yIGV4YW1wbGUuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59IiwiLy8gQWxsb3dzIHVzZXIgdG8gY3JlYXRlIGFuZCBwb3N0IGEgbmV3IG1lc3NhZ2VcbmNvbnN0IHBvc3RNZXNzYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGdldEN1cnJlbnRVc2VyID0gcmVxdWlyZSgnLi91c2VyQ2hlY2snKS5nZXRDdXJyZW50VXNlcjtcbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgbWVzc2FnZUZhY3RvcnkgPSByZXF1aXJlKCcuL21lc3NhZ2VGYWN0b3J5JylcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKVxuICAgIGNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2VUb0NoYW5uZWw7XG4gICAgY29uc3QgYWRkTWVzc2FnZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VBZGRNZXNzYWdlJykuYWRkTWVzc2FnZTtcbiAgICBjb25zdCBrZWVwTWVzc2FnZXNCb3R0b20gPSByZXF1aXJlKCcuL2tlZXBNZXNzYWdlc0JvdHRvbScpO1xuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKTtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpLnZhbHVlXG4gICAgY29uc3QgcG9zdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICBjb25zdCB1c2VyID0gZ2V0Q3VycmVudFVzZXIoKVxuICAgIGNvbnN0IHVzZXJJRCA9IHVzZXIudWlkO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuICAgIGNvbnN0IG1lZGlhID0gJyc7XG5cbiAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gbWVzc2FnZUZhY3RvcnkobWVzc2FnZSwgdXNlcilcbiAgICBjb25zdCBkYXRlID0gZGF0ZUdlbmVyYXRvcigpO1xuXG4gICAgcG9zdEFyZWEuYXBwZW5kQ2hpbGQobWVzc2FnZVN0cnVjdHVyZSk7XG4gICAgY2xlYXJJbnB1dHMoJ3dyaXRlTWVzc2FnZScpXG5cbiAgICBjb25zdCBuZXdNZXNzYWdlID0ge1xuICAgICAgICBjaGFubmVsOiBjaGFubmVsLmlkLFxuICAgICAgICB1c2VyLFxuICAgICAgICBkYXRlLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBtZWRpYVxuICAgIH1cbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsKG5ld01lc3NhZ2UpXG4gICAgYWRkTWVzc2FnZShuZXdNZXNzYWdlKVxuICAgIGtlZXBNZXNzYWdlc0JvdHRvbSgpO1xufVxuXG4vLyBFdmVudCBsaXN0ZW5lciB3YWl0aW5nIGZvciB1c2VyIHRvIGhpdCAnZW50ZXInIGJlZm9yZSBwb3N0aW5nIG5ldyBtZXNzYWdlXG5jb25zdCBzdWJtaXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZSA9PiB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IDEzKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKCk7XG4gICAgfVxufSk7IiwiLy8gQXBwZW5kcyBuZXcgbWVzc2FnZSB0byAjbWVzc2FnZSBkaXYgaW4gRE9NXG5jb25zdCBwb3N0TWVzc2FnZSA9IChhbGxNZXNzYWdlcykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgcG9zdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICBhbGxNZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICBjb25zdCBtID0gbWVzc2FnZS50ZXh0O1xuICAgICAgICBjb25zdCB1ID0gbWVzc2FnZS51c2VyO1xuICAgICAgICBjb25zb2xlLmxvZyh1KVxuICAgICAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gbWVzc2FnZUZhY3RvcnkobSwgdSlcbiAgICAgICAgcG9zdEFyZWEuYXBwZW5kQ2hpbGQobWVzc2FnZVN0cnVjdHVyZSk7XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3N0TWVzc2FnZTsiLCIvLyBDcmVhdGVzIGNoYW5uZWxzIGNvbXBvbmVudCBmb3Igc2lkZWJhclxuY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCBjaGFubmVsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGNoYW5uZWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJTdHJ1Y3R1cmUgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgY29uc3QgaGVhZGVyID0gY2hhbm5lbHNIZWFkZXIoKTtcblxuXG4gICAgYWxsRGF0YS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb25zdCBjaGFubmVsUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjaGFubmVsUm93LnNldEF0dHJpYnV0ZSgnaWQnLCBjLmtleSlcbiAgICAgICAgY2hhbm5lbFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHVycG9zZScsIGMucHVycG9zZSk7XG4gICAgICAgIGNoYW5uZWxSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGFuZ2VDaGFubmVsKVxuICAgICAgICBjaGFubmVsUm93LmNsYXNzTGlzdCA9ICdpbmRpdmlkdWFsLWNoYW5uZWwnXG4gICAgICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaGFzaC5zcmMgPSAnaW1nL2hhc2gucG5nJ1xuXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgY2hhbm5lbC50ZXh0Q29udGVudCA9IGMubmFtZTtcblxuICAgICAgICBjaGFubmVsUm93LmFwcGVuZENoaWxkKGhhc2gpO1xuICAgICAgICBjaGFubmVsUm93LmFwcGVuZENoaWxkKGNoYW5uZWwpO1xuICAgICAgICBjaGFubmVsTGlzdC5hcHBlbmRDaGlsZChjaGFubmVsUm93KTtcbiAgICB9KVxuICAgIGNoYW5uZWxMaXN0LmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0tbGlzdCc7XG5cbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChjaGFubmVsTGlzdCk7XG5cbiAgICBzaWRlYmFyU3RydWN0dXJlKGNoYW5uZWxDb21wb25lbnQpXG59XG5cblxuY29uc3QgY2hhbm5lbHNIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeSA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeUljb24nKTtcbiAgICBjb25zdCBuZXdDaGFubmVsTW9kYWwgPSByZXF1aXJlKCcuL25ld0NoYW5uZWxNb2RhbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzJ1xuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgbmV3Q2hhbm5lbE1vZGFsKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyQ2hhbm5lbHM7IiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgc2lkZWJhclxuY29uc3QgY3JlYXRlU2lkZWJhciA9IChjaGFubmVsQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBsb2dvdXRVc2VyID0gcmVxdWlyZSgnLi91c2VyTG9nb3V0Jyk7XG4gICAgY29uc3QgbG9nT3V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9nb3V0VXNlcik7XG4gICAgbG9nT3V0LnRleHRDb250ZW50ID0gJ0xvZyBvdXQnXG4gICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoJ2xvZ291dF9fYnV0dG9uJylcblxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoY2hhbm5lbENvbXBvbmVudCk7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChsb2dPdXQpO1xuXG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7IiwiLy8gQ2hlY2tpbmcgd2hldGhlciBvciBub3QgdXNlciBpcyBsb2dnZWQgaW5cbmxldCBjdXJyZW50VXNlciA9IG51bGw7XG5cbmNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChmaXJlYmFzZVVzZXIgPT4ge1xuICAgIGlmIChmaXJlYmFzZVVzZXIpIHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBmaXJlYmFzZVVzZXI7XG4gICAgICAgIGNvbnN0IGxvZ2luTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Nb2RhbCcpO1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ2luTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBjb25zb2xlLmxvZygnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbn0pXG5cbmNvbnN0IGdldEN1cnJlbnRVc2VyID0gKCkgPT4ge1xuICAgIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuY29uc3Qgc2V0Q3VycmVudFVzZXIgPSAodXNlcikgPT4ge1xuICAgIGN1cnJlbnRVc2VyID0gdXNlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3VycmVudFVzZXIsXG4gICAgc2V0Q3VycmVudFVzZXJcbn07IiwiLy8gTGV0cyB1c2VyIGNyZWF0ZSBuZXcgYWNjb3VudFxuY29uc3QgY3JlYXRlVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRUb0RlZmF1bHRDaGFubmVsID0gcmVxdWlyZSgnLi9hZGRUb0NoYW5uZWwnKVxuICAgIGNvbnN0IHNldEN1cnJlbnRVc2VyID0gcmVxdWlyZSgnLi91c2VyQ2hlY2snKS5zZXRDdXJyZW50VXNlclxuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJEaXNwbGF5TmFtZScpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcykudGhlbigodXNlcikgPT4ge1xuICAgICAgICBzZXRDdXJyZW50VXNlcih1c2VyKVxuICAgICAgICBhZGRUb0RlZmF1bHRDaGFubmVsKHVzZXIpXG4gICAgfSlcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVVzZXI7IiwiLy8gTG9ncyB1c2VyIGludG8gcHJvZHVjdFxuY29uc3QgbG9naW5Vc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKTtcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG4gXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlcjsiLCIvLyBMb2dzIG91dCB1c2VyXG5jb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0VXNlcjsiXX0=
