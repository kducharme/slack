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
// const channelDetails = require('./channelDetails').channelDetails;

loadDB();
loginUserModal();
// channelDetails();




},{"./databaseLoad":15,"./loginScreen":23}],3:[function(require,module,exports){
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
    console.log('hi')
    let messageBody = document.querySelector('#messages');
    console.log(messageBody.scrollHeight)
    messageBody.scrollTop = messageBody.scrollHeight;
}

window.onload = keepMessagesBottom();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9rZWVwTWVzc2FnZXNCb3R0b20uanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL21lc3NhZ2VGYWN0b3J5LmpzIiwic2NyaXB0cy9uZXdDaGFubmVsTW9kYWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhclN0cnVjdHVyZS5qcyIsInNjcmlwdHMvdXNlckNoZWNrLmpzIiwic2NyaXB0cy91c2VyQ3JlYXRlLmpzIiwic2NyaXB0cy91c2VyTG9naW4uanMiLCJzY3JpcHRzL3VzZXJMb2dvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWRkVG9EZWZhdWx0Q2hhbm5lbCA9IChuZXdVc2VyKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3VXNlcilcbiAgICBjb25zdCBkYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VVcGRhdGUnKTtcbiAgICBjb25zdCB0YWJsZSA9ICdjaGFubmVsJztcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9ICctTEJONV9za3g1MUw3aEpRcDVSMSc7XG5cbiAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICB0YWJsZSxcbiAgICAgICAgY2hhbm5lbE5hbWVcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0ge1xuICAgICAgICBpZDogbmV3VXNlci51aWQsXG4gICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaW1nOiAnJyxcbiAgICB9XG4gICAgZGF0YWJhc2UoY2hhbm5lbCwgdXNlcilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRUb0RlZmF1bHRDaGFubmVsOyIsImNvbnN0IGxvYWREQiA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSByZXF1aXJlKCcuL2xvZ2luU2NyZWVuJyk7XG4vLyBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlscztcblxubG9hZERCKCk7XG5sb2dpblVzZXJNb2RhbCgpO1xuLy8gY2hhbm5lbERldGFpbHMoKTtcblxuXG5cbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGljb24tYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHRleHQtYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiLy8gQWxsb3dzIHVzZXIgdG8gY2hhbmdlIGNoYW5uZWwgYW5kIGFkZHMgc3R5bGluZyBvbiB0aGUgc2lkZSBiYXJcbmNvbnN0IGNoYW5nZUNoYW5uZWwgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3Qgc2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLnNldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWxEZXRhaWxzID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzTGVmdDtcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcbiAgICBjb25zdCBjbGVhckNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2xlYXJDaGFubmVsO1xuICAgIGNvbnN0IGFsbENoYW5uZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluZGl2aWR1YWwtY2hhbm5lbCcpO1xuICAgIGxldCBjbGlja2VkQ2hhbm5lbCA9IGV2dC50YXJnZXRcblxuICAgIGlmICghY2xpY2tlZENoYW5uZWwuaWQpIHtcbiAgICAgICAgY2xpY2tlZENoYW5uZWwgPSBldnQucGF0aFsxXVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNoYW5uZWwnKSkge1xuICAgICAgICAgICAgYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQ2hhbm5lbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyTWVzc2FnZXMoKTtcbiAgICBjbGlja2VkQ2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbiAgICBjbGVhckNoYW5uZWwoKTtcbiAgICBzZXRDdXJyZW50Q2hhbm5lbChjbGlja2VkQ2hhbm5lbClcbiAgICBsb2FkTWVzc2FnZXMoY2xpY2tlZENoYW5uZWwuaWQpXG59XG5cbi8vIFdoZW4gdXNlciBjaGFuZ2VzIGNoYW5uZWxzLCB0aGlzIGNsZWFycyB0aGUgbWVzc2FnZXMgZnJvbSB0aGUgb2xkIGNoYW5uZWxcbmNvbnN0IGNsZWFyTWVzc2FnZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJpbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI21lc3NhZ2VzJyk7XG4gICAgcHJpbnRBcmVhLmZvckVhY2gobSA9PiB7XG4gICAgICAgIHdoaWxlIChtLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG0ucmVtb3ZlQ2hpbGQobS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbmdlQ2hhbm5lbDsiLCIvLyBDaGVja2luZyB3aGF0IGNoYW5uZWwgdGhlIHVzZXIgaXMgY3VycmVudGx5IGluXG5sZXQgY3VycmVudENoYW5uZWwgPSBudWxsO1xuXG4vLyBPbiBjaGFubmVsIGNoYW5nZSwgdGhpcyBzZXRzIHRoZSBjaGFubmVsIHRoYXQgdGhlIHVzZXIgaXMgaW5cbmNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gKGNoYW5uZWwpID0+IHtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlscztcbiAgICBjdXJyZW50Q2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgY2hhbm5lbERldGFpbHMoKTtcbn1cblxuLy8gQ2FsbGVkIHRvIGdldCB0aGUgY3VycmVudCBjaGFubmVsIHRoYXQgdGhlIHVzZXIgaXMgaW5cbmNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBjdXJyZW50Q2hhbm5lbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3VycmVudENoYW5uZWwsXG4gICAgc2V0Q3VycmVudENoYW5uZWxcbn07IiwiY29uc3QgY2hhbm5lbERldGFpbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJpbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMnKVxuICAgIGNvbnN0IGxlZnRBcmVhID0gY2hhbm5lbERldGFpbHNMZWZ0KCk7XG4gICAgY29uc3QgcmlnaHRBcmVhID0gY2hhbm5lbERldGFpbHNSaWdodCgpO1xuXG4gICAgcHJpbnRBcmVhLmFwcGVuZENoaWxkKGxlZnRBcmVhKTtcbiAgICAvLyBwcmludEFyZWEuYXBwZW5kQ2hpbGQocmlnaHRBcmVhKTtcblxufVxuXG5jb25zdCBjbGVhckNoYW5uZWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNvcHRpb25zTGVmdCcpO1xuICAgIGNoYW5uZWwuZm9yRWFjaChjID0+IHtcbiAgICAgICAgd2hpbGUgKGMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgYy5yZW1vdmVDaGlsZChjLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuY29uc3QgY2hhbm5lbERldGFpbHNMZWZ0ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuXG4gICAgY29uc3QgbGVmdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGVmdEFyZWEuY2hpbGRMaXN0ID0gJ29wdGlvbnNfX2xlZnQnXG4gICAgbGVmdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ29wdGlvbnNMZWZ0JylcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY2hhbm5lbE5hbWUuY2xhc3NMaXN0ID0gJ29wdGlvbnNfX2NoYW5uZWwnXG4gICAgY2hhbm5lbE5hbWUuaW5uZXJIVE1MID0gYCMke2NoYW5uZWwuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudH1gO1xuICAgIGxlZnRBcmVhLmFwcGVuZENoaWxkKGNoYW5uZWxOYW1lKTtcblxuICAgIGNvbnN0IGNoYW5uZWxQdXJwb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNoYW5uZWxQdXJwb3NlLnRleHRDb250ZW50ID0gY2hhbm5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHVycG9zZScpXG4gICAgY2hhbm5lbFB1cnBvc2UuY2xhc3NMaXN0ID0gJ29wdGlvbnNfX3B1cnBvc2UnO1xuICAgIGxlZnRBcmVhLmFwcGVuZENoaWxkKGNoYW5uZWxQdXJwb3NlKTtcblxuICAgIHJldHVybiBsZWZ0QXJlYTtcbn1cblxuY29uc3QgY2hhbm5lbERldGFpbHNSaWdodCA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbCA9IGdldEN1cnJlbnRDaGFubmVsKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYW5uZWxEZXRhaWxzLFxuICAgIGNoYW5uZWxEZXRhaWxzTGVmdCxcbiAgICBjbGVhckNoYW5uZWxcbn07IiwiLy8gQ2xlYXJzIGZpZWxkcyBhZnRlciBzdWJtaXNzaW9uIG9mIGEgZm9ybS9pbnB1dFxuY29uc3QgY2xlYXJJbnB1dHMgPSAoaWRlbnRpZmllcikgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkZW50aWZpZXJ9YCkudmFsdWUgPSAnJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFySW5wdXRzOyIsImNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGxvYWREYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWVJbnB1dCcpO1xuICAgIGNvbnN0IHB1cnBvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHVycG9zZUlucHV0Jyk7XG4gICAgY29uc3QgZGF0ZUNyZWF0ZWQgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgdXNlcnMgPSB7fTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IHt9O1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgbmFtZTogbmFtZS52YWx1ZSxcbiAgICAgICAgcHVycG9zZTogcHVycG9zZS52YWx1ZSxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IGRhdGVDcmVhdGVkLFxuICAgICAgICB1c2VyczogdXNlcnMsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgIH07XG4gICAgY2xlYXJJbnB1dHMobmFtZS5pZCk7XG4gICAgY2xlYXJJbnB1dHMocHVycG9zZS5pZCk7XG4gICAgZGF0YWJhc2VDcmVhdGUoY2hhbm5lbCk7XG4gICAgcmVzZXRTaWRlYmFyKCk7XG4gICAgbG9hZERhdGFiYXNlKCk7XG4gICAgY2xvc2VDcmVhdGVOZXdNb2RhbCgpO1xufVxuXG4vLyBIaWRlcyBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5uZWxNb2RhbCcpO1xuICAgIGNoYW5uZWxNb2RhbC5jbGFzc0xpc3QgPSAnaGlkZSc7XG59XG5cbi8vIEFmdGVyIHVzZXIgY3JlYXRlcyBuZXcgY2hhbm5lbCwgdGhpcyByZXNldHMgdGhlIGNoYW5uZWwgc2lkZWJhciB0byBzaG93IHJlY2VudGx5IGFkZGVkIGNoYW5uZWxcbmNvbnN0IHJlc2V0U2lkZWJhciA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICBjb25zb2xlLmxvZyhzaWRlYmFyKVxuICAgIHNpZGViYXIuaW5uZXJIVE1MID0gJydcbiAgICAvLyBpZiAoc2lkZWJhci5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgc2lkZS5mb3JFYWNoKGMgPT4ge1xuICAgIC8vICAgICAgICAgd2hpbGUgKGMuZmlyc3RDaGlsZCkge1xuICAgIC8vICAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZU5ld0NoYW5uZWwsXG4gICAgY2xvc2VDcmVhdGVOZXdNb2RhbFxufTsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCJjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gKG1lc3NhZ2UpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHttZXNzYWdlLmNoYW5uZWx9L21lc3NhZ2VzLy5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgYWRkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9tZXNzYWdlcy8uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZE1lc3NhZ2VUb0NoYW5uZWwsXG4gICAgYWRkTWVzc2FnZVxufTsiLCIvLyBjcmVhdGVzIGEgbmV3IGNoYW5uZWwgaW4gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gKGNoYW5uZWwpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbicsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjaGFubmVsKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VDcmVhdGU7XG5cblxuIiwiLy8gc2FtZSBhcyBjaGFubmVsIGJ1dCBtZXNzYWdlIHRpZXIiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZGVsZXRlVGFza0luREIgPSAoa2V5KSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7a2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoa2V5KSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiY29uc3QgbG9hZERhdGFiYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlUGFyc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlUGFyc2UnKS5kYXRhYmFzZVBhcnNlO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uP3ByaW50PXByZXR0eScsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgZGF0YWJhc2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGxvYWRNZXNzYWdlcyA9IChjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykubWVzc2FnZVBhcnNlO1xuICAgIGNvbnN0IGNoYW5nZUNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5nZUNoYW5uZWwnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHtjaGFubmVsfS9tZXNzYWdlcy5qc29uP3ByaW50PXByZXR0eWAsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgbWVzc2FnZVBhcnNlKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbG9hZERhdGFiYXNlLFxuICAgIGxvYWRNZXNzYWdlc1xufSIsIi8vIFBhcnNlcyB0aGUgZGF0YSBsb2FkZWQgZnJvbSBmaXJlYmFzZVxuY29uc3QgZGF0YWJhc2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBjaGFubmVscyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBbXTtcbiAgICBjaGFubmVscy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBpbmRpdkNoYW5uZWwgPSB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBuYW1lOiBkYXRhW2tleV0ubmFtZSxcbiAgICAgICAgICAgIHB1cnBvc2U6IGRhdGFba2V5XS5wdXJwb3NlLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtrZXldLmRhdGUsXG4gICAgICAgICAgICBtZXNzYWdlczogZGF0YVtrZXldLm1lc3NhZ2VzLFxuICAgICAgICAgICAgdXNlcnM6IGRhdGFba2V5XS51c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGFsbERhdGEucHVzaChpbmRpdkNoYW5uZWwpXG4gICAgfSlcbiAgICBzaWRlYmFyQ2hhbm5lbHMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxuLy8gUGFyc2VzIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gREIgdG8gcHJlcGFyZSBmb3IgcG9zdGluZ1xuY29uc3QgbWVzc2FnZVBhcnNlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZUxvYWQgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IHBvc3RTYXZlZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9wb3N0U2F2ZWRNZXNzYWdlcycpXG4gICAgY29uc3QgYWxsTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZNZXNzYWdlID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdXNlcjogZGF0YVtrZXldLnVzZXIsXG4gICAgICAgICAgICBkYXRlOiBkYXRhW2tleV0uZGF0ZSxcbiAgICAgICAgICAgIHRleHQ6IGRhdGFba2V5XS5tZXNzYWdlLFxuICAgICAgICAgICAgbWVkaWE6IGRhdGFba2V5XS5tZWRpYVxuICAgICAgICB9XG4gICAgICAgIGFsbERhdGEucHVzaChpbmRpdk1lc3NhZ2UpXG4gICAgfSlcbiAgICBwb3N0U2F2ZWRNZXNzYWdlcyhhbGxEYXRhKVxuICAgIHJldHVybiBhbGxEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkYXRhYmFzZVBhcnNlLFxuICAgIG1lc3NhZ2VQYXJzZVxufTsiLCJjb25zdCB1cGRhdGVEYXRhYmFzZUNoYW5uZWwgPSAoY2hhbm5lbCwgdXNlcikgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vJHtjaGFubmVsLnRhYmxlfS8ke2NoYW5uZWwuY2hhbm5lbE5hbWV9L3VzZXJzLyR7dXNlci5pZH0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZURhdGFiYXNlQ2hhbm5lbDsiLCIvLyBHZW5lcmF0ZXMgdG9kYXkncyBkYXRlIGluIGV4IGZvcm1hdDogT2N0LCA3LCAxOTg5XG5jb25zdCBkYXRlR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhOYW1lc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bW9udGh9ICR7ZGF5fSwgJHt5ZWFyfWA7XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZUdlbmVyYXRvcjsiLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpbnB1dCBmaWVsZHNcbmNvbnN0IGlucHV0RmFjdG9yeSA9ICh0eXBlLCBpZGVudGlmaWVyLCBjbGFzc0xpc3QsIHBsYWNlaG9sZGVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZGVudGlmaWVyKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdClcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIFxuICAgIHJldHVybiBpbnB1dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRGYWN0b3J5O1xuIiwiLy8gR2VuZXJhdGVzIGxhYmVscyBmb3IgaW5wdXRzXG5jb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IChsYWJlbFRleHQpID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdpbnB1dF9fbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcblxuICAgIHJldHVybiBsYWJlbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dExhYmVsRmFjdG9yeTsiLCJjb25zdCBrZWVwTWVzc2FnZXNCb3R0b20gPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2hpJylcbiAgICBsZXQgbWVzc2FnZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZXMnKTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQm9keS5zY3JvbGxIZWlnaHQpXG4gICAgbWVzc2FnZUJvZHkuc2Nyb2xsVG9wID0gbWVzc2FnZUJvZHkuc2Nyb2xsSGVpZ2h0O1xufVxuXG53aW5kb3cub25sb2FkID0ga2VlcE1lc3NhZ2VzQm90dG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ga2VlcE1lc3NhZ2VzQm90dG9tOyIsIi8vIFRPRE86IGhhdmUgdGhlIGRlZmF1bHQgY2hhbm5lbCBiZSB0aGUgbGFzdCBhY3RpdmUgY2hhbm5lbFxuLy8gQ3VycmVudGx5IGxvYWRzIHRoZSB3YXRlcmNvb2xlciBjaGFubmVsIGJ5IGRlZmF1bHRcbmNvbnN0IGxvYWREZWZhdWx0Q2hhbm5lbCA9ICgpID0+IHtcbiAgICBjb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuc2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHNMZWZ0ID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzTGVmdDtcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcblxuICAgIGNvbnN0IGZpcnN0Q2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19jaGFubmVscy0tbGlzdCcpLmNoaWxkTm9kZXNbMF1cbiAgICBmaXJzdENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgc2V0Q3VycmVudENoYW5uZWwoZmlyc3RDaGFubmVsKVxuICAgIGxvYWRNZXNzYWdlcyhmaXJzdENoYW5uZWwuaWQpXG5cbn1cblxuLy8gRGVsYXkgdG8gbG9hZCBkZWZhdWx0IGNoYW5uZWxcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgbG9hZERlZmF1bHRDaGFubmVsKCk7XG4gICAgfSwgNTAwKTtcbiB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWREZWZhdWx0Q2hhbm5lbDtcbiIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIGxvZ2luIHBhZ2VcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9naW5Nb2RhbCcpXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdsb2dpbicpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobG9naW5Nb2RhbENvbnRlbnQoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyTW9kYWw7XG5cbmNvbnN0IGxvZ2luTW9kYWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBsb2dpblVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dpbicpO1xuICAgIGNvbnN0IGNyZWF0ZVVzZXIgPSByZXF1aXJlKCcuL3VzZXJDcmVhdGUnKTtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGxvZ2luTW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgZGlzcGxheU5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRGlzcGxheU5hbWUnLCAnbG9naW5fX2lucHV0JywgJ0Z1bGwgbmFtZScpO1xuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckVtYWlsJywgJ2xvZ2luX19pbnB1dCcsICd5b3VAZXhhbXBsZS5jb20nKTtcbiAgICBjb25zdCBwYXNzSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3Bhc3N3b3JkJywgJ3VzZXJQYXNzJywgJ2xvZ2luX19pbnB1dCcsICdwYXNzd29yZCcpO1xuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdzaWdudXBfX2J1dHRvbicsJ0NyZWF0ZSBhY2NvdW50JywgY3JlYXRlVXNlcilcblxuICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxvZ2luQnV0dG9uLnRleHRDb250ZW50ID0gJ09yLCBzaWduIGluIHRvIGV4aXN0aW5nIGFjY291bnQnXG4gICAgbG9naW5CdXR0b24uY2xhc3NMaXN0LmFkZCgnbG9naW5fX2J1dHRvbicpO1xuICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9naW5Vc2VyKTtcblxuICAgIC8vIE5lZWRzIHJlZmFjdG9yaW5nIC0gcmVhbGx5IHJlcGV0aXRpdmVcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX19jb250ZW50Jyk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGVtYWlsSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocGFzc0lucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHNpZ25VcEJ1dHRvbik7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuY29uc3QgbG9naW5Nb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdTaWduIGluIHRvIHNsYWNrJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdHZXQgc3RhcnRlZCBjb2xsYWJyb2F0aW5nIHdpdGggeW91ciB0ZWFtbWF0ZXMuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufVxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbWVzc2FnZXNcbmNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gKG0sIHVzZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19yaWdodCcpXG4gICAgY29uc3QgdGl0bGUgPSBtZXNzYWdlVGl0bGUodXNlcik7XG4gICAgY29uc3QgYXZhdGFyID0gbWVzc2FnZUF2YXRhcigpO1xuICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZScpXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX2JvZHknKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gbTtcbiAgICBcbiAgICBib2R5LmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGV4dClcbiAgICBcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKGF2YXRhcilcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG5cbi8vIFRPRE86IHN3YXAgZW1haWwgdy8gZGlzcGxheU5hbWVcbmNvbnN0IG1lc3NhZ2VUaXRsZSA9ICh1KSA9PiB7XG4gICAgY29uc3QgZGF0ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZGF0ZUdlbmVyYXRvcicpO1xuICAgIGNvbnN0IGQgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgbWVzc2FnZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1lc3NhZ2VUaXRsZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZScpXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBkaXNwbGF5TmFtZS50ZXh0Q29udGVudCA9IHUuZW1haWw7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkO1xuICAgIGRpc3BsYXlOYW1lLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS11c2VyJyk7XG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZS0tZGF0ZScpO1xuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZSlcbiAgICBtZXNzYWdlVGl0bGUuYXBwZW5kQ2hpbGQoZGF0ZSlcbiAgICBcbiAgICByZXR1cm4gbWVzc2FnZVRpdGxlO1xufVxuXG5jb25zdCBtZXNzYWdlQXZhdGFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGF2YXRhci5zcmMgPSAnaW1nL2F2YXRhci5wbmcnXG4gICAgYXZhdGFyLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VzX19hdmF0YXInKVxuICAgIHJldHVybiBhdmF0YXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlRmFjdG9yeTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCdjaGFubmVsTW9kYWwnKVxuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ld0NoYW5uZWxNb2RhbDtcblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jcmVhdGVOZXdDaGFubmVsO1xuICAgIGNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jbG9zZUNyZWF0ZU5ld01vZGFsO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudCcpXG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBtb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnTmFtZScpO1xuICAgIGNvbnN0IHB1cnBvc2VMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdQdXJwb3NlJyk7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAnbmFtZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgJ2UuZy4gbWFya2V0aW5nJyk7XG4gICAgY29uc3QgcHVycG9zZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3B1cnBvc2VJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuXG4gICAgY29uc3QgbW9kYWxBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1hY3Rpb25zJylcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY2FuY2VsJywnQ2FuY2VsJywgY2xvc2VDcmVhdGVOZXdNb2RhbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY3JlYXRlJywnQ3JlYXRlIGNoYW5uZWwnLCBjcmVhdGVOZXdDaGFubmVsKVxuXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKVxuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG1vZGFsQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuLy8gdGl0bGUgY29udGVudCBmb3IgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsIi8vIEFsbG93cyB1c2VyIHRvIGNyZWF0ZSBhbmQgcG9zdCBhIG5ldyBtZXNzYWdlXG5jb25zdCBwb3N0TWVzc2FnZSA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJylcbiAgICBjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gcmVxdWlyZSgnLi9kYXRhYmFzZUFkZE1lc3NhZ2UnKS5hZGRNZXNzYWdlVG9DaGFubmVsO1xuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2U7XG4gICAgY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gcmVxdWlyZSgnLi9rZWVwTWVzc2FnZXNCb3R0b20nKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS52YWx1ZVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgdXNlciA9IGdldEN1cnJlbnRVc2VyKClcbiAgICBjb25zdCB1c2VySUQgPSB1c2VyLnVpZDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KG1lc3NhZ2UsIHVzZXIpXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcblxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGNsZWFySW5wdXRzKCd3cml0ZU1lc3NhZ2UnKVxuXG4gICAgY29uc3QgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgY2hhbm5lbDogY2hhbm5lbC5pZCxcbiAgICAgICAgdXNlcixcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgbWVkaWFcbiAgICB9XG4gICAgYWRkTWVzc2FnZVRvQ2hhbm5lbChuZXdNZXNzYWdlKVxuICAgIGFkZE1lc3NhZ2UobmV3TWVzc2FnZSlcbiAgICBrZWVwTWVzc2FnZXNCb3R0b20oKTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXIgd2FpdGluZyBmb3IgdXNlciB0byBoaXQgJ2VudGVyJyBiZWZvcmUgcG9zdGluZyBuZXcgbWVzc2FnZVxuY29uc3Qgc3VibWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSAxMykge1xuICAgICAgICBwb3N0TWVzc2FnZSgpO1xuICAgIH1cbn0pOyIsIi8vIEFwcGVuZHMgbmV3IG1lc3NhZ2UgdG8gI21lc3NhZ2UgZGl2IGluIERPTVxuY29uc3QgcG9zdE1lc3NhZ2UgPSAoYWxsTWVzc2FnZXMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlRmFjdG9yeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUZhY3RvcnknKVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgY29uc3QgbSA9IG1lc3NhZ2UudGV4dDtcbiAgICAgICAgY29uc3QgdSA9IG1lc3NhZ2UudXNlcjtcbiAgICAgICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KG0sIHUpXG4gICAgICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zdE1lc3NhZ2U7IiwiLy8gQ3JlYXRlcyBjaGFubmVscyBjb21wb25lbnQgZm9yIHNpZGViYXJcbmNvbnN0IHNpZGViYXJDaGFubmVscyA9IChhbGxEYXRhKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBjaGFubmVsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBzaWRlYmFyU3RydWN0dXJlID0gcmVxdWlyZSgnLi9zaWRlYmFyU3RydWN0dXJlJyk7XG4gICAgY29uc3QgY2hhbmdlQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbmdlQ2hhbm5lbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGNoYW5uZWxzSGVhZGVyKCk7XG5cblxuICAgIGFsbERhdGEuZm9yRWFjaChjID0+IHtcbiAgICAgICAgY29uc3QgY2hhbm5lbFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY2hhbm5lbFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgYy5rZXkpXG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXB1cnBvc2UnLCBjLnB1cnBvc2UpO1xuICAgICAgICBjaGFubmVsUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlQ2hhbm5lbClcbiAgICAgICAgY2hhbm5lbFJvdy5jbGFzc0xpc3QgPSAnaW5kaXZpZHVhbC1jaGFubmVsJ1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGhhc2guc3JjID0gJ2ltZy9oYXNoLnBuZydcblxuICAgICAgICBjb25zdCBjaGFubmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGNoYW5uZWwudGV4dENvbnRlbnQgPSBjLm5hbWU7XG5cbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChoYXNoKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChjaGFubmVsKTtcbiAgICAgICAgY2hhbm5lbExpc3QuYXBwZW5kQ2hpbGQoY2hhbm5lbFJvdyk7XG4gICAgfSlcbiAgICBjaGFubmVsTGlzdC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWxpc3QnO1xuXG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2hhbm5lbExpc3QpO1xuXG4gICAgc2lkZWJhclN0cnVjdHVyZShjaGFubmVsQ29tcG9uZW50KVxufVxuXG5cbmNvbnN0IGNoYW5uZWxzSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnkgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlJY29uJyk7XG4gICAgY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gcmVxdWlyZSgnLi9uZXdDaGFubmVsTW9kYWwnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0taGVhZGVyJ1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcbiAgICBjb25zdCBjcmVhdGVDaGFubmVsID0gYnV0dG9uRmFjdG9yeSgnc2lkZWJhcl9fY2hhbm5lbHMtLW5ldycsICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGFkZC1jaGFubmVsXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9pPicsIG5ld0NoYW5uZWxNb2RhbClcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckNoYW5uZWxzOyIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIHNpZGViYXJcbmNvbnN0IGNyZWF0ZVNpZGViYXIgPSAoY2hhbm5lbENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgbG9nb3V0VXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ291dCcpO1xuICAgIGNvbnN0IGxvZ091dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxvZ091dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvZ291dFVzZXIpO1xuICAgIGxvZ091dC50ZXh0Q29udGVudCA9ICdMb2cgb3V0J1xuICAgIGxvZ091dC5jbGFzc0xpc3QuYWRkKCdsb2dvdXRfX2J1dHRvbicpXG5cbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGNoYW5uZWxDb21wb25lbnQpO1xuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQobG9nT3V0KTtcblxufSBcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaWRlYmFyOyIsIi8vIENoZWNraW5nIHdoZXRoZXIgb3Igbm90IHVzZXIgaXMgbG9nZ2VkIGluXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG5jb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoZmlyZWJhc2VVc2VyID0+IHtcbiAgICBpZiAoZmlyZWJhc2VVc2VyKSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gZmlyZWJhc2VVc2VyO1xuICAgICAgICBjb25zdCBsb2dpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luTW9kYWwnKTtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59KVxuXG5jb25zdCBnZXRDdXJyZW50VXNlciA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbmNvbnN0IHNldEN1cnJlbnRVc2VyID0gKHVzZXIpID0+IHtcbiAgICBjdXJyZW50VXNlciA9IHVzZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRVc2VyLFxuICAgIHNldEN1cnJlbnRVc2VyXG59OyIsIi8vIExldHMgdXNlciBjcmVhdGUgbmV3IGFjY291bnRcbmNvbnN0IGNyZWF0ZVVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVG9EZWZhdWx0Q2hhbm5lbCA9IHJlcXVpcmUoJy4vYWRkVG9DaGFubmVsJylcbiAgICBjb25zdCBzZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuc2V0Q3VycmVudFVzZXJcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRW1haWwnKS52YWx1ZTtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRGlzcGxheU5hbWUnKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJQYXNzJykudmFsdWU7XG4gICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcblxuICAgIGNsZWFySW5wdXRzKCd1c2VyRW1haWwnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyUGFzcycpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJEaXNwbGF5TmFtZScpXG5cbiAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgc2V0Q3VycmVudFVzZXIodXNlcilcbiAgICAgICAgYWRkVG9EZWZhdWx0Q2hhbm5lbCh1c2VyKVxuICAgIH0pXG4gICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVc2VyOyIsIi8vIExvZ3MgdXNlciBpbnRvIHByb2R1Y3RcbmNvbnN0IGxvZ2luVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRW1haWwnKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJQYXNzJykudmFsdWU7XG4gICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcblxuICAgIGNsZWFySW5wdXRzKCd1c2VyRW1haWwnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyUGFzcycpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJEaXNwbGF5TmFtZScpXG5cbiAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcyk7XG4gICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpXG5cbn1cblxuIFxubW9kdWxlLmV4cG9ydHMgPSBsb2dpblVzZXI7IiwiLy8gTG9ncyBvdXQgdXNlclxuY29uc3QgbG9nb3V0VXNlciA9ICgpID0+IHtcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dFVzZXI7Il19
