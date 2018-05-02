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
    messageBody.scrollTop = 9999;
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

},{"./buttonFactoryText":4,"./inputFactory":19,"./userCreate":32,"./userLogin":33}],24:[function(require,module,exports){
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
},{"./channelCheck":6,"./clearInputs":8,"./databaseAddMessage":11,"./dateGenerator":18,"./keepMessagesBottom":21,"./messageFactory":24,"./userCheck":31}],27:[function(require,module,exports){
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
    postArea.scrollTop = 9999;
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
},{"./buttonFactoryIcon":3,"./changeChannel":5,"./newChannelModal":25,"./sidebarStructure":30}],29:[function(require,module,exports){
const sidebarHead = (user) => {
    const sidebar = document.querySelector('#sidebar');
    const header = document.createElement('span');
    header.classList = 'sidebar__header';

    const headerText = document.createElement('p');
    headerText.textContent = user.email;
    headerText.classList = 'sidebar__header--name'
    
    const headerDrop = document.createElement('span')
    headerDrop.classList = 'sidebar__header--icon'
    headerDrop.innerHTML = '<i class="material-icons drop">keyboard_arrow_down</i>'

    header.appendChild(headerText);
    header.appendChild(headerDrop);
    
    sidebar.insertBefore(header, sidebar.firstChild)
};

module.exports = sidebarHead;
},{}],30:[function(require,module,exports){
// Creates the structure for the sidebar
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const logoutUser = require('./userLogout');
    const logOut = document.createElement('button');

    logOut.addEventListener('click', logoutUser);
    logOut.textContent = 'Log out'
    logOut.classList.add('logout__button')

    // sidebar.appendChild(header);
    sidebar.appendChild(channelComponent);
    sidebar.appendChild(logOut);
} 

module.exports = createSidebar;
},{"./sidebarChannels":28,"./userLogout":34}],31:[function(require,module,exports){
// Checking whether or not user is logged in
let currentUser = null;

const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        currentUser = firebaseUser;
        const sidebarHead = require('./sidebarHead');
        const loginModal = document.querySelector('#loginModal');
        loginModal.classList.add('hide');
        sidebarHead(currentUser);
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
},{"./sidebarHead":29}],32:[function(require,module,exports){
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
},{"./addToChannel":1,"./clearInputs":8,"./userCheck":31}],33:[function(require,module,exports){
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
},{"./clearInputs":8}],34:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9rZWVwTWVzc2FnZXNCb3R0b20uanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL21lc3NhZ2VGYWN0b3J5LmpzIiwic2NyaXB0cy9uZXdDaGFubmVsTW9kYWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhckhlYWQuanMiLCJzY3JpcHRzL3NpZGViYXJTdHJ1Y3R1cmUuanMiLCJzY3JpcHRzL3VzZXJDaGVjay5qcyIsInNjcmlwdHMvdXNlckNyZWF0ZS5qcyIsInNjcmlwdHMvdXNlckxvZ2luLmpzIiwic2NyaXB0cy91c2VyTG9nb3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSAobmV3VXNlcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKG5ld1VzZXIpXG4gICAgY29uc3QgZGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlVXBkYXRlJyk7XG4gICAgY29uc3QgdGFibGUgPSAnY2hhbm5lbCc7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSAnLUxCTjVfc2t4NTFMN2hKUXA1UjEnO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgdGFibGUsXG4gICAgICAgIGNoYW5uZWxOYW1lXG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgaWQ6IG5ld1VzZXIudWlkLFxuICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGltZzogJycsXG4gICAgfVxuICAgIGRhdGFiYXNlKGNoYW5uZWwsIHVzZXIpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkVG9EZWZhdWx0Q2hhbm5lbDsiLCJjb25zdCBsb2FkREIgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gcmVxdWlyZSgnLi9sb2dpblNjcmVlbicpO1xuLy8gY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHM7XG5cbmxvYWREQigpO1xubG9naW5Vc2VyTW9kYWwoKTtcbi8vIGNoYW5uZWxEZXRhaWxzKCk7XG5cblxuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEFsbG93cyB1c2VyIHRvIGNoYW5nZSBjaGFubmVsIGFuZCBhZGRzIHN0eWxpbmcgb24gdGhlIHNpZGUgYmFyXG5jb25zdCBjaGFuZ2VDaGFubmVsID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlsc0xlZnQ7XG4gICAgY29uc3QgbG9hZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkTWVzc2FnZXM7XG4gICAgY29uc3QgY2xlYXJDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNsZWFyQ2hhbm5lbDtcbiAgICBjb25zdCBhbGxDaGFubmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmRpdmlkdWFsLWNoYW5uZWwnKTtcbiAgICBsZXQgY2xpY2tlZENoYW5uZWwgPSBldnQudGFyZ2V0XG5cbiAgICBpZiAoIWNsaWNrZWRDaGFubmVsLmlkKSB7XG4gICAgICAgIGNsaWNrZWRDaGFubmVsID0gZXZ0LnBhdGhbMV1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDaGFubmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmVDaGFubmVsJykpIHtcbiAgICAgICAgICAgIGFsbENoYW5uZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZUNoYW5uZWwnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhck1lc3NhZ2VzKCk7XG4gICAgY2xpY2tlZENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgY2xlYXJDaGFubmVsKCk7XG4gICAgc2V0Q3VycmVudENoYW5uZWwoY2xpY2tlZENoYW5uZWwpXG4gICAgbG9hZE1lc3NhZ2VzKGNsaWNrZWRDaGFubmVsLmlkKVxufVxuXG4vLyBXaGVuIHVzZXIgY2hhbmdlcyBjaGFubmVscywgdGhpcyBjbGVhcnMgdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG9sZCBjaGFubmVsXG5jb25zdCBjbGVhck1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtZXNzYWdlcycpO1xuICAgIHByaW50QXJlYS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5nZUNoYW5uZWw7IiwiLy8gQ2hlY2tpbmcgd2hhdCBjaGFubmVsIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBpblxubGV0IGN1cnJlbnRDaGFubmVsID0gbnVsbDtcblxuLy8gT24gY2hhbm5lbCBjaGFuZ2UsIHRoaXMgc2V0cyB0aGUgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IChjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHM7XG4gICAgY3VycmVudENoYW5uZWwgPSBjaGFubmVsO1xuICAgIGNoYW5uZWxEZXRhaWxzKCk7XG59XG5cbi8vIENhbGxlZCB0byBnZXQgdGhlIGN1cnJlbnQgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudENoYW5uZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRDaGFubmVsLFxuICAgIHNldEN1cnJlbnRDaGFubmVsXG59OyIsImNvbnN0IGNoYW5uZWxEZXRhaWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zJylcbiAgICBjb25zdCBsZWZ0QXJlYSA9IGNoYW5uZWxEZXRhaWxzTGVmdCgpO1xuICAgIGNvbnN0IHJpZ2h0QXJlYSA9IGNoYW5uZWxEZXRhaWxzUmlnaHQoKTtcblxuICAgIHByaW50QXJlYS5hcHBlbmRDaGlsZChsZWZ0QXJlYSk7XG4gICAgLy8gcHJpbnRBcmVhLmFwcGVuZENoaWxkKHJpZ2h0QXJlYSk7XG5cbn1cblxuY29uc3QgY2xlYXJDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjb3B0aW9uc0xlZnQnKTtcbiAgICBjaGFubmVsLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHdoaWxlIChjLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzTGVmdCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5nZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcblxuICAgIGNvbnN0IGxlZnRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxlZnRBcmVhLmNoaWxkTGlzdCA9ICdvcHRpb25zX19sZWZ0J1xuICAgIGxlZnRBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdvcHRpb25zTGVmdCcpXG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNoYW5uZWxOYW1lLmNsYXNzTGlzdCA9ICdvcHRpb25zX19jaGFubmVsJ1xuICAgIGNoYW5uZWxOYW1lLmlubmVySFRNTCA9IGAjJHtjaGFubmVsLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnR9YDtcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsTmFtZSk7XG5cbiAgICBjb25zdCBjaGFubmVsUHVycG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjaGFubmVsUHVycG9zZS50ZXh0Q29udGVudCA9IGNoYW5uZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXB1cnBvc2UnKVxuICAgIGNoYW5uZWxQdXJwb3NlLmNsYXNzTGlzdCA9ICdvcHRpb25zX19wdXJwb3NlJztcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsUHVycG9zZSk7XG5cbiAgICByZXR1cm4gbGVmdEFyZWE7XG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzUmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjaGFubmVsRGV0YWlscyxcbiAgICBjaGFubmVsRGV0YWlsc0xlZnQsXG4gICAgY2xlYXJDaGFubmVsXG59OyIsIi8vIENsZWFycyBmaWVsZHMgYWZ0ZXIgc3VibWlzc2lvbiBvZiBhIGZvcm0vaW5wdXRcbmNvbnN0IGNsZWFySW5wdXRzID0gKGlkZW50aWZpZXIpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVudGlmaWVyfWApLnZhbHVlID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhcklucHV0czsiLCJjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKGUpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBsb2FkRGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lSW5wdXQnKTtcbiAgICBjb25zdCBwdXJwb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1cnBvc2VJbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVDcmVhdGVkID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIGNvbnN0IHVzZXJzID0ge307XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7fTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsdWUsXG4gICAgICAgIHB1cnBvc2U6IHB1cnBvc2UudmFsdWUsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBkYXRlQ3JlYXRlZCxcbiAgICAgICAgdXNlcnM6IHVzZXJzLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcbiAgICB9O1xuICAgIGNsZWFySW5wdXRzKG5hbWUuaWQpO1xuICAgIGNsZWFySW5wdXRzKHB1cnBvc2UuaWQpO1xuICAgIGRhdGFiYXNlQ3JlYXRlKGNoYW5uZWwpO1xuICAgIHJlc2V0U2lkZWJhcigpO1xuICAgIGxvYWREYXRhYmFzZSgpO1xuICAgIGNsb3NlQ3JlYXRlTmV3TW9kYWwoKTtcbn1cblxuLy8gSGlkZXMgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjbG9zZUNyZWF0ZU5ld01vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsTW9kYWwnKTtcbiAgICBjaGFubmVsTW9kYWwuY2xhc3NMaXN0ID0gJ2hpZGUnO1xufVxuXG4vLyBBZnRlciB1c2VyIGNyZWF0ZXMgbmV3IGNoYW5uZWwsIHRoaXMgcmVzZXRzIHRoZSBjaGFubmVsIHNpZGViYXIgdG8gc2hvdyByZWNlbnRseSBhZGRlZCBjaGFubmVsXG5jb25zdCByZXNldFNpZGViYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJyk7XG4gICAgY29uc29sZS5sb2coc2lkZWJhcilcbiAgICBzaWRlYmFyLmlubmVySFRNTCA9ICcnXG4gICAgLy8gaWYgKHNpZGViYXIuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIHNpZGUuZm9yRWFjaChjID0+IHtcbiAgICAvLyAgICAgICAgIHdoaWxlIChjLmZpcnN0Q2hpbGQpIHtcbiAgICAvLyAgICAgICAgICAgICBjLnJlbW92ZUNoaWxkKGMuZmlyc3RDaGlsZCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVOZXdDaGFubmVsLFxuICAgIGNsb3NlQ3JlYXRlTmV3TW9kYWxcbn07IiwiLy8gVXNlciBjYW4gd3JpdGUgYW5kIHBvc3QgYSB0ZXh0IG1lc3NhZ2UgdG8gdGhlIG1lc3NhZ2UgYXJlYVxuY29uc3QgY3JlYXRlTmV3UG9zdCA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld1Bvc3Q7IiwiY29uc3QgYWRkTWVzc2FnZVRvQ2hhbm5lbCA9IChtZXNzYWdlKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7bWVzc2FnZS5jaGFubmVsfS9tZXNzYWdlcy8uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGFkZE1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vbWVzc2FnZXMvLmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsLFxuICAgIGFkZE1lc3NhZ2Vcbn07IiwiLy8gY3JlYXRlcyBhIG5ldyBjaGFubmVsIGluIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykuZGF0YWJhc2VQYXJzZTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIGRhdGFiYXNlUGFyc2UoZGF0YSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBsb2FkTWVzc2FnZXMgPSAoY2hhbm5lbCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VQYXJzZScpLm1lc3NhZ2VQYXJzZTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7Y2hhbm5lbH0vbWVzc2FnZXMuanNvbj9wcmludD1wcmV0dHlgLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIG1lc3NhZ2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxvYWREYXRhYmFzZSxcbiAgICBsb2FkTWVzc2FnZXNcbn0iLCIvLyBQYXJzZXMgdGhlIGRhdGEgbG9hZGVkIGZyb20gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbmFtZTogZGF0YVtrZXldLm5hbWUsXG4gICAgICAgICAgICBwdXJwb3NlOiBkYXRhW2tleV0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFba2V5XS5tZXNzYWdlcyxcbiAgICAgICAgICAgIHVzZXJzOiBkYXRhW2tleV0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbi8vIFBhcnNlcyB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIERCIHRvIHByZXBhcmUgZm9yIHBvc3RpbmdcbmNvbnN0IG1lc3NhZ2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBwb3N0U2F2ZWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vcG9zdFNhdmVkTWVzc2FnZXMnKVxuICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGFsbE1lc3NhZ2VzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGluZGl2TWVzc2FnZSA9IHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHVzZXI6IGRhdGFba2V5XS51c2VyLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtrZXldLmRhdGUsXG4gICAgICAgICAgICB0ZXh0OiBkYXRhW2tleV0ubWVzc2FnZSxcbiAgICAgICAgICAgIG1lZGlhOiBkYXRhW2tleV0ubWVkaWFcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZNZXNzYWdlKVxuICAgIH0pXG4gICAgcG9zdFNhdmVkTWVzc2FnZXMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGF0YWJhc2VQYXJzZSxcbiAgICBtZXNzYWdlUGFyc2Vcbn07IiwiY29uc3QgdXBkYXRlRGF0YWJhc2VDaGFubmVsID0gKGNoYW5uZWwsIHVzZXIpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tLyR7Y2hhbm5lbC50YWJsZX0vJHtjaGFubmVsLmNoYW5uZWxOYW1lfS91c2Vycy8ke3VzZXIuaWR9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGVEYXRhYmFzZUNoYW5uZWw7IiwiLy8gR2VuZXJhdGVzIHRvZGF5J3MgZGF0ZSBpbiBleCBmb3JtYXQ6IE9jdCwgNywgMTk4OVxuY29uc3QgZGF0ZUdlbmVyYXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbdG9kYXkuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIHJldHVybiBkYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVHZW5lcmF0b3I7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdoaScpXG4gICAgbGV0IG1lc3NhZ2VCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2VzJyk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUJvZHkuc2Nyb2xsSGVpZ2h0KVxuICAgIG1lc3NhZ2VCb2R5LnNjcm9sbFRvcCA9IDk5OTk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2VlcE1lc3NhZ2VzQm90dG9tOyIsIi8vIFRPRE86IGhhdmUgdGhlIGRlZmF1bHQgY2hhbm5lbCBiZSB0aGUgbGFzdCBhY3RpdmUgY2hhbm5lbFxuLy8gQ3VycmVudGx5IGxvYWRzIHRoZSB3YXRlcmNvb2xlciBjaGFubmVsIGJ5IGRlZmF1bHRcbmNvbnN0IGxvYWREZWZhdWx0Q2hhbm5lbCA9ICgpID0+IHtcbiAgICBjb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuc2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHNMZWZ0ID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzTGVmdDtcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcblxuICAgIGNvbnN0IGZpcnN0Q2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19jaGFubmVscy0tbGlzdCcpLmNoaWxkTm9kZXNbMF1cbiAgICBmaXJzdENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgc2V0Q3VycmVudENoYW5uZWwoZmlyc3RDaGFubmVsKVxuICAgIGxvYWRNZXNzYWdlcyhmaXJzdENoYW5uZWwuaWQpXG5cbn1cblxuLy8gRGVsYXkgdG8gbG9hZCBkZWZhdWx0IGNoYW5uZWxcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgbG9hZERlZmF1bHRDaGFubmVsKCk7XG4gICAgfSwgNTAwKTtcbiB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWREZWZhdWx0Q2hhbm5lbDtcbiIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIGxvZ2luIHBhZ2VcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9naW5Nb2RhbCcpXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdsb2dpbicpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobG9naW5Nb2RhbENvbnRlbnQoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyTW9kYWw7XG5cbmNvbnN0IGxvZ2luTW9kYWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBsb2dpblVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dpbicpO1xuICAgIGNvbnN0IGNyZWF0ZVVzZXIgPSByZXF1aXJlKCcuL3VzZXJDcmVhdGUnKTtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGxvZ2luTW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgZGlzcGxheU5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRGlzcGxheU5hbWUnLCAnbG9naW5fX2lucHV0JywgJ0Z1bGwgbmFtZScpO1xuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckVtYWlsJywgJ2xvZ2luX19pbnB1dCcsICd5b3VAZXhhbXBsZS5jb20nKTtcbiAgICBjb25zdCBwYXNzSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3Bhc3N3b3JkJywgJ3VzZXJQYXNzJywgJ2xvZ2luX19pbnB1dCcsICdwYXNzd29yZCcpO1xuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdzaWdudXBfX2J1dHRvbicsJ0NyZWF0ZSBhY2NvdW50JywgY3JlYXRlVXNlcilcblxuICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxvZ2luQnV0dG9uLnRleHRDb250ZW50ID0gJ09yLCBzaWduIGluIHRvIGV4aXN0aW5nIGFjY291bnQnXG4gICAgbG9naW5CdXR0b24uY2xhc3NMaXN0LmFkZCgnbG9naW5fX2J1dHRvbicpO1xuICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9naW5Vc2VyKTtcblxuICAgIC8vIE5lZWRzIHJlZmFjdG9yaW5nIC0gcmVhbGx5IHJlcGV0aXRpdmVcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX19jb250ZW50Jyk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGVtYWlsSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocGFzc0lucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHNpZ25VcEJ1dHRvbik7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuY29uc3QgbG9naW5Nb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdTaWduIGluIHRvIHNsYWNrJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdHZXQgc3RhcnRlZCBjb2xsYWJyb2F0aW5nIHdpdGggeW91ciB0ZWFtbWF0ZXMuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufVxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbWVzc2FnZXNcbmNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gKG0sIHVzZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19yaWdodCcpXG4gICAgY29uc3QgdGl0bGUgPSBtZXNzYWdlVGl0bGUodXNlcik7XG4gICAgY29uc3QgYXZhdGFyID0gbWVzc2FnZUF2YXRhcigpO1xuICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZScpXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX2JvZHknKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gbTtcbiAgICBcbiAgICBib2R5LmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGV4dClcbiAgICBcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKGF2YXRhcilcbiAgICBtZXNzYWdlLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG5cbi8vIFRPRE86IHN3YXAgZW1haWwgdy8gZGlzcGxheU5hbWVcbmNvbnN0IG1lc3NhZ2VUaXRsZSA9ICh1KSA9PiB7XG4gICAgY29uc3QgZGF0ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZGF0ZUdlbmVyYXRvcicpO1xuICAgIGNvbnN0IGQgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgbWVzc2FnZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1lc3NhZ2VUaXRsZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZScpXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBkaXNwbGF5TmFtZS50ZXh0Q29udGVudCA9IHUuZW1haWw7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkO1xuICAgIGRpc3BsYXlOYW1lLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS11c2VyJyk7XG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZS0tZGF0ZScpO1xuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZSlcbiAgICBtZXNzYWdlVGl0bGUuYXBwZW5kQ2hpbGQoZGF0ZSlcbiAgICBcbiAgICByZXR1cm4gbWVzc2FnZVRpdGxlO1xufVxuXG5jb25zdCBtZXNzYWdlQXZhdGFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGF2YXRhci5zcmMgPSAnaW1nL2F2YXRhci5wbmcnXG4gICAgYXZhdGFyLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VzX19hdmF0YXInKVxuICAgIHJldHVybiBhdmF0YXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlRmFjdG9yeTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCdjaGFubmVsTW9kYWwnKVxuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ld0NoYW5uZWxNb2RhbDtcblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jcmVhdGVOZXdDaGFubmVsO1xuICAgIGNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jbG9zZUNyZWF0ZU5ld01vZGFsO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudCcpXG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBtb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnTmFtZScpO1xuICAgIGNvbnN0IHB1cnBvc2VMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdQdXJwb3NlJyk7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAnbmFtZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgJ2UuZy4gbWFya2V0aW5nJyk7XG4gICAgY29uc3QgcHVycG9zZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3B1cnBvc2VJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuXG4gICAgY29uc3QgbW9kYWxBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1hY3Rpb25zJylcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY2FuY2VsJywnQ2FuY2VsJywgY2xvc2VDcmVhdGVOZXdNb2RhbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY3JlYXRlJywnQ3JlYXRlIGNoYW5uZWwnLCBjcmVhdGVOZXdDaGFubmVsKVxuXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKVxuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG1vZGFsQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuLy8gdGl0bGUgY29udGVudCBmb3IgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsIi8vIEFsbG93cyB1c2VyIHRvIGNyZWF0ZSBhbmQgcG9zdCBhIG5ldyBtZXNzYWdlXG5jb25zdCBwb3N0TWVzc2FnZSA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJylcbiAgICBjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gcmVxdWlyZSgnLi9kYXRhYmFzZUFkZE1lc3NhZ2UnKS5hZGRNZXNzYWdlVG9DaGFubmVsO1xuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2U7XG4gICAgY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gcmVxdWlyZSgnLi9rZWVwTWVzc2FnZXNCb3R0b20nKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS52YWx1ZVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgdXNlciA9IGdldEN1cnJlbnRVc2VyKClcbiAgICBjb25zdCB1c2VySUQgPSB1c2VyLnVpZDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KG1lc3NhZ2UsIHVzZXIpXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcblxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGNsZWFySW5wdXRzKCd3cml0ZU1lc3NhZ2UnKVxuXG4gICAgY29uc3QgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgY2hhbm5lbDogY2hhbm5lbC5pZCxcbiAgICAgICAgdXNlcixcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgbWVkaWFcbiAgICB9XG4gICAgYWRkTWVzc2FnZVRvQ2hhbm5lbChuZXdNZXNzYWdlKVxuICAgIGFkZE1lc3NhZ2UobmV3TWVzc2FnZSlcbiAgICBrZWVwTWVzc2FnZXNCb3R0b20oKTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXIgd2FpdGluZyBmb3IgdXNlciB0byBoaXQgJ2VudGVyJyBiZWZvcmUgcG9zdGluZyBuZXcgbWVzc2FnZVxuY29uc3Qgc3VibWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSAxMykge1xuICAgICAgICBwb3N0TWVzc2FnZSgpO1xuICAgIH1cbn0pOyIsIi8vIEFwcGVuZHMgbmV3IG1lc3NhZ2UgdG8gI21lc3NhZ2UgZGl2IGluIERPTVxuY29uc3QgcG9zdE1lc3NhZ2UgPSAoYWxsTWVzc2FnZXMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlRmFjdG9yeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUZhY3RvcnknKVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgY29uc3QgbSA9IG1lc3NhZ2UudGV4dDtcbiAgICAgICAgY29uc3QgdSA9IG1lc3NhZ2UudXNlcjtcbiAgICAgICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KG0sIHUpXG4gICAgICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIH0pXG4gICAgcG9zdEFyZWEuc2Nyb2xsVG9wID0gOTk5OTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3N0TWVzc2FnZTsiLCIvLyBDcmVhdGVzIGNoYW5uZWxzIGNvbXBvbmVudCBmb3Igc2lkZWJhclxuY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCBjaGFubmVsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGNoYW5uZWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJTdHJ1Y3R1cmUgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgY29uc3QgaGVhZGVyID0gY2hhbm5lbHNIZWFkZXIoKTtcblxuXG4gICAgYWxsRGF0YS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb25zdCBjaGFubmVsUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjaGFubmVsUm93LnNldEF0dHJpYnV0ZSgnaWQnLCBjLmtleSlcbiAgICAgICAgY2hhbm5lbFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHVycG9zZScsIGMucHVycG9zZSk7XG4gICAgICAgIGNoYW5uZWxSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGFuZ2VDaGFubmVsKVxuICAgICAgICBjaGFubmVsUm93LmNsYXNzTGlzdCA9ICdpbmRpdmlkdWFsLWNoYW5uZWwnXG4gICAgICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaGFzaC5zcmMgPSAnaW1nL2hhc2gucG5nJ1xuXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgY2hhbm5lbC50ZXh0Q29udGVudCA9IGMubmFtZTtcblxuICAgICAgICBjaGFubmVsUm93LmFwcGVuZENoaWxkKGhhc2gpO1xuICAgICAgICBjaGFubmVsUm93LmFwcGVuZENoaWxkKGNoYW5uZWwpO1xuICAgICAgICBjaGFubmVsTGlzdC5hcHBlbmRDaGlsZChjaGFubmVsUm93KTtcbiAgICB9KVxuICAgIGNoYW5uZWxMaXN0LmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0tbGlzdCc7XG5cbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChjaGFubmVsTGlzdCk7XG5cbiAgICBzaWRlYmFyU3RydWN0dXJlKGNoYW5uZWxDb21wb25lbnQpXG59XG5cbmNvbnN0IGNoYW5uZWxzSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnkgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlJY29uJyk7XG4gICAgY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gcmVxdWlyZSgnLi9uZXdDaGFubmVsTW9kYWwnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0taGVhZGVyJ1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcbiAgICBjb25zdCBjcmVhdGVDaGFubmVsID0gYnV0dG9uRmFjdG9yeSgnc2lkZWJhcl9fY2hhbm5lbHMtLW5ldycsICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGFkZC1jaGFubmVsXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9pPicsIG5ld0NoYW5uZWxNb2RhbClcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckNoYW5uZWxzOyIsImNvbnN0IHNpZGViYXJIZWFkID0gKHVzZXIpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19oZWFkZXInO1xuXG4gICAgY29uc3QgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBoZWFkZXJUZXh0LnRleHRDb250ZW50ID0gdXNlci5lbWFpbDtcbiAgICBoZWFkZXJUZXh0LmNsYXNzTGlzdCA9ICdzaWRlYmFyX19oZWFkZXItLW5hbWUnXG4gICAgXG4gICAgY29uc3QgaGVhZGVyRHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhlYWRlckRyb3AuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2hlYWRlci0taWNvbidcbiAgICBoZWFkZXJEcm9wLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGRyb3BcIj5rZXlib2FyZF9hcnJvd19kb3duPC9pPidcblxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyRHJvcCk7XG4gICAgXG4gICAgc2lkZWJhci5pbnNlcnRCZWZvcmUoaGVhZGVyLCBzaWRlYmFyLmZpcnN0Q2hpbGQpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJIZWFkOyIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIHNpZGViYXJcbmNvbnN0IGNyZWF0ZVNpZGViYXIgPSAoY2hhbm5lbENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgbG9nb3V0VXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ291dCcpO1xuICAgIGNvbnN0IGxvZ091dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9nb3V0VXNlcik7XG4gICAgbG9nT3V0LnRleHRDb250ZW50ID0gJ0xvZyBvdXQnXG4gICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoJ2xvZ291dF9fYnV0dG9uJylcblxuICAgIC8vIHNpZGViYXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGNoYW5uZWxDb21wb25lbnQpO1xuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQobG9nT3V0KTtcbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2lkZWJhcjsiLCIvLyBDaGVja2luZyB3aGV0aGVyIG9yIG5vdCB1c2VyIGlzIGxvZ2dlZCBpblxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGZpcmViYXNlVXNlciA9PiB7XG4gICAgaWYgKGZpcmViYXNlVXNlcikge1xuICAgICAgICBjdXJyZW50VXNlciA9IGZpcmViYXNlVXNlcjtcbiAgICAgICAgY29uc3Qgc2lkZWJhckhlYWQgPSByZXF1aXJlKCcuL3NpZGViYXJIZWFkJyk7XG4gICAgICAgIGNvbnN0IGxvZ2luTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Nb2RhbCcpO1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgc2lkZWJhckhlYWQoY3VycmVudFVzZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSlcblxuY29uc3QgZ2V0Q3VycmVudFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG5jb25zdCBzZXRDdXJyZW50VXNlciA9ICh1c2VyKSA9PiB7XG4gICAgY3VycmVudFVzZXIgPSB1c2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDdXJyZW50VXNlcixcbiAgICBzZXRDdXJyZW50VXNlclxufTsiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSByZXF1aXJlKCcuL2FkZFRvQ2hhbm5lbCcpXG4gICAgY29uc3Qgc2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLnNldEN1cnJlbnRVc2VyXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckRpc3BsYXlOYW1lJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpXG4gICAgICAgIGFkZFRvRGVmYXVsdENoYW5uZWwodXNlcilcbiAgICB9KVxuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVXNlcjsiLCIvLyBMb2dzIHVzZXIgaW50byBwcm9kdWN0XG5jb25zdCBsb2dpblVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpO1xuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbiBcbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyOyIsIi8vIExvZ3Mgb3V0IHVzZXJcbmNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXRVc2VyOyJdfQ==
