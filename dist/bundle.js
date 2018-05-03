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
    const realtimeAddMessages = require('./realtimeAddMessages');
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
},{"./realtimeAddMessages":28}],12:[function(require,module,exports){
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
            text: data[key].text,
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
},{"./databaseLoad":15,"./postSavedMessages":27,"./sidebarChannels":29}],17:[function(require,module,exports){
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
    description.textContent = 'Get started collaborating with your teammates.';
    titleStructure.classList.add('login__title');
    titleStructure.appendChild(title);
    titleStructure.appendChild(description);

    return titleStructure;
}

},{"./buttonFactoryText":4,"./inputFactory":19,"./userCreate":33,"./userLogin":34}],24:[function(require,module,exports){
// Factory for creating messages
const messageFactory = (date, message) => {
    const messageStructure = document.createElement('span');
    const body = document.createElement('span');
    body.classList.add('message__right')
    const title = messageTitle(date, message.user.email);
    const avatar = messageAvatar();
    messageStructure.classList.add('message')
    const text = document.createElement('p');

    text.classList.add('message__body');
    text.textContent = message.text;
    
    body.appendChild(title)
    body.appendChild(text)
    
    messageStructure.appendChild(avatar)
    messageStructure.appendChild(body);

    return messageStructure;
}

// TODO: swap email w/ displayName
// TODO: date needs to display for date posted if message already exists
const messageTitle = (date, user) => {
    const messageTitle = document.createElement('span');
    messageTitle.classList.add('message__title')
    const displayName = document.createElement('p')
    displayName.textContent = user;
    const postDate = document.createElement('p')
    postDate.textContent = date;
    displayName.classList.add('message__title--user');
    postDate.classList.add('message__title--date');
    messageTitle.appendChild(displayName)
    messageTitle.appendChild(postDate)
    
    return messageTitle;
}

const messageAvatar = () => {
    const avatar = document.createElement('img');
    avatar.src = 'img/avatar.png'
    avatar.classList.add('messages__avatar')
    return avatar
}

module.exports = messageFactory;
},{}],25:[function(require,module,exports){
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
    const text = document.querySelector('#writeMessage').value
    const postArea = document.querySelector('.messages');
    const user = getCurrentUser()
    const userID = user.uid;
    const channel = getCurrentChannel();
    const media = '';

    const date = dateGenerator();
    
    const newMessage = {
        channel: channel.id,
        user,
        date,
        text,
        media
    }
    const messageStructure = messageFactory(date, newMessage)

    postArea.appendChild(messageStructure);
    clearInputs('writeMessage')

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
},{"./channelCheck":6,"./clearInputs":8,"./databaseAddMessage":11,"./dateGenerator":18,"./keepMessagesBottom":21,"./messageFactory":24,"./userCheck":32}],27:[function(require,module,exports){
// Appends new message to #message div in DOM
const postMessage = (allMessages) => {
    const messageFactory = require('./messageFactory')
    const postArea = document.querySelector('.messages');
    allMessages.forEach(mess => {
        const date = mess.date;
        const message = mess;
        const messageStructure = messageFactory(date, message)
        postArea.appendChild(messageStructure);
    })
    postArea.scrollTop = 9999;
}

module.exports = postMessage;
},{"./messageFactory":24}],28:[function(require,module,exports){
// NOT WORKING -- NEED TO FIX

// Listening for updates in the database to post to DOM for all users
const realtimeAddMessages = () => {
    let databaseRef = firebase.database().ref(`channel/`);
    databaseRef.on('value', snap => {
        const getCurrentChannel = require('./channelCheck').getCurrentChannel;
        const channel = getCurrentChannel();
        const messages = snap.val();
        const keyArray = Object.keys(messages)
        const newMessage = messages.channel.messages
        const allMessages = [];
        keyArray.forEach(key => {
            let indivMessage = {
                key,
                user: messages[key].user,
                date: messages[key].date,
                text: messages[key].text,
                media: messages[key].media
            }
            allMessages.push(indivMessage)
        })
        verifyUser(newMessage)
        postNewUserMessage(channel, newMessage);
    })
}

const verifyUser = (newMessage) => {
    console.log(newMessage)
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const userThatPostedMessage = newMessage.user;
    const currentUser = getCurrentUser().uid;

    console.log(userThatPostedMessage, currentUser)

    if (userThatPostedMessage !== currentUser) {
        // postNewUserMessage(newMessage)
        console.log('same user')
    }
    else {
        console.log('same user')
    }
}

// const postNewUserMessage = (channel) => {
//     const loadMessages = require('./databaseLoad').loadMessages;
//     const printArea = document.querySelectorAll('#messages');
//     printArea.forEach(m => {
//         while (m.firstChild) {
//             m.removeChild(m.firstChild);
//         }
//     })
//     loadMessages(channel);
// }

// module.exports = realtimeAddMessages;
},{"./channelCheck":6,"./userCheck":32}],29:[function(require,module,exports){
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
},{"./buttonFactoryIcon":3,"./changeChannel":5,"./newChannelModal":25,"./sidebarStructure":31}],30:[function(require,module,exports){
const sidebarHead = (user) => {
    const sidebar = document.querySelector('#sidebar');
    const header = document.createElement('span');
    header.classList = 'sidebar__header';
    header.setAttribute('id', 'sidebarHeader')
    header.addEventListener('click', showSidebarDropdown);
    const content = headerContent(user);
    header.appendChild(content);
    sidebar.insertBefore(header, sidebar.firstChild)
};

const headerContent = (user) => {
    const headerContent = document.createElement('span');
    headerContent.classList = 'sidebar__header--content'
    headerContent.setAttribute('id', 'sidebarHeader')
    const headerText = document.createElement('p');
    headerText.textContent = user.email;
    headerText.classList = 'sidebar__header--name'
    headerText.setAttribute('id', 'sidebarHeader')
    const headerDrop = document.createElement('span')
    headerDrop.classList = 'sidebar__header--icon'
    headerDrop.setAttribute('id', 'sidebarHeader')
    headerDrop.innerHTML = '<i class="material-icons drop" id="sidebarHeader">keyboard_arrow_down</i>'
    headerContent.appendChild(headerText);
    headerContent.appendChild(headerDrop);

    return headerContent;
}

const showSidebarDropdown = () => {
    const body = document.querySelector('body')
    const structure = document.createElement('span');
    structure.setAttribute('id', 'accountOptions');
    structure.classList = 'sidebar__dropdown';
    structure.classList.remove('hide')
    structure.textContent = 'hey hey hey'
    body.appendChild(structure)
}

window.addEventListener('click', function (e) {
    let header = document.querySelector('#sidebarHeader')
    const modal = document.querySelector('#accountOptions')

    // if (modal) {
    //     modal.classList.add('hide');
    //     console.log('no')
    // }
})


module.exports = sidebarHead;
},{}],31:[function(require,module,exports){
// Creates the structure for the sidebar
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const logoutUser = require('./userLogout');
    // const logOut = document.createElement('button');

    // logOut.addEventListener('click', logoutUser);
    // logOut.textContent = 'Log out'
    // logOut.classList.add('logout__button')

    // sidebar.appendChild(header);
    sidebar.appendChild(channelComponent);
    // sidebar.appendChild(logOut);
} 

module.exports = createSidebar;
},{"./sidebarChannels":29,"./userLogout":35}],32:[function(require,module,exports){
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
},{"./sidebarHead":30}],33:[function(require,module,exports){
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
},{"./addToChannel":1,"./clearInputs":8,"./userCheck":32}],34:[function(require,module,exports){
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
},{"./clearInputs":8}],35:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9rZWVwTWVzc2FnZXNCb3R0b20uanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL21lc3NhZ2VGYWN0b3J5LmpzIiwic2NyaXB0cy9uZXdDaGFubmVsTW9kYWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3JlYWx0aW1lQWRkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhckhlYWQuanMiLCJzY3JpcHRzL3NpZGViYXJTdHJ1Y3R1cmUuanMiLCJzY3JpcHRzL3VzZXJDaGVjay5qcyIsInNjcmlwdHMvdXNlckNyZWF0ZS5qcyIsInNjcmlwdHMvdXNlckxvZ2luLmpzIiwic2NyaXB0cy91c2VyTG9nb3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWRkVG9EZWZhdWx0Q2hhbm5lbCA9IChuZXdVc2VyKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3VXNlcilcbiAgICBjb25zdCBkYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VVcGRhdGUnKTtcbiAgICBjb25zdCB0YWJsZSA9ICdjaGFubmVsJztcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9ICctTEJONV9za3g1MUw3aEpRcDVSMSc7XG5cbiAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICB0YWJsZSxcbiAgICAgICAgY2hhbm5lbE5hbWVcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0ge1xuICAgICAgICBpZDogbmV3VXNlci51aWQsXG4gICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaW1nOiAnJyxcbiAgICB9XG4gICAgZGF0YWJhc2UoY2hhbm5lbCwgdXNlcilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRUb0RlZmF1bHRDaGFubmVsOyIsImNvbnN0IGxvYWREQiA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSByZXF1aXJlKCcuL2xvZ2luU2NyZWVuJyk7XG4vLyBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlscztcblxubG9hZERCKCk7XG5sb2dpblVzZXJNb2RhbCgpO1xuLy8gY2hhbm5lbERldGFpbHMoKTtcblxuXG5cbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGljb24tYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHRleHQtYmFzZWQgYnV0dG9uc1xuY29uc3QgYnV0dG9uRmFjdG9yeSA9IChjbGFzc0xpc3QsIGJ1dHRvblRleHQsIGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKVxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiLy8gQWxsb3dzIHVzZXIgdG8gY2hhbmdlIGNoYW5uZWwgYW5kIGFkZHMgc3R5bGluZyBvbiB0aGUgc2lkZSBiYXJcbmNvbnN0IGNoYW5nZUNoYW5uZWwgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3Qgc2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLnNldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWxEZXRhaWxzID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzTGVmdDtcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcbiAgICBjb25zdCBjbGVhckNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2xlYXJDaGFubmVsO1xuICAgIGNvbnN0IGFsbENoYW5uZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluZGl2aWR1YWwtY2hhbm5lbCcpO1xuICAgIGxldCBjbGlja2VkQ2hhbm5lbCA9IGV2dC50YXJnZXRcblxuICAgIGlmICghY2xpY2tlZENoYW5uZWwuaWQpIHtcbiAgICAgICAgY2xpY2tlZENoYW5uZWwgPSBldnQucGF0aFsxXVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNoYW5uZWwnKSkge1xuICAgICAgICAgICAgYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQ2hhbm5lbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyTWVzc2FnZXMoKTtcbiAgICBjbGlja2VkQ2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbiAgICBjbGVhckNoYW5uZWwoKTtcbiAgICBzZXRDdXJyZW50Q2hhbm5lbChjbGlja2VkQ2hhbm5lbClcbiAgICBsb2FkTWVzc2FnZXMoY2xpY2tlZENoYW5uZWwuaWQpXG59XG5cbi8vIFdoZW4gdXNlciBjaGFuZ2VzIGNoYW5uZWxzLCB0aGlzIGNsZWFycyB0aGUgbWVzc2FnZXMgZnJvbSB0aGUgb2xkIGNoYW5uZWxcbmNvbnN0IGNsZWFyTWVzc2FnZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJpbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI21lc3NhZ2VzJyk7XG4gICAgcHJpbnRBcmVhLmZvckVhY2gobSA9PiB7XG4gICAgICAgIHdoaWxlIChtLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG0ucmVtb3ZlQ2hpbGQobS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbmdlQ2hhbm5lbDsiLCIvLyBDaGVja2luZyB3aGF0IGNoYW5uZWwgdGhlIHVzZXIgaXMgY3VycmVudGx5IGluXG5sZXQgY3VycmVudENoYW5uZWwgPSBudWxsO1xuXG4vLyBPbiBjaGFubmVsIGNoYW5nZSwgdGhpcyBzZXRzIHRoZSBjaGFubmVsIHRoYXQgdGhlIHVzZXIgaXMgaW5cbmNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gKGNoYW5uZWwpID0+IHtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlscztcbiAgICBjdXJyZW50Q2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgY2hhbm5lbERldGFpbHMoKTtcbn1cblxuLy8gQ2FsbGVkIHRvIGdldCB0aGUgY3VycmVudCBjaGFubmVsIHRoYXQgdGhlIHVzZXIgaXMgaW5cbmNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBjdXJyZW50Q2hhbm5lbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3VycmVudENoYW5uZWwsXG4gICAgc2V0Q3VycmVudENoYW5uZWxcbn07IiwiY29uc3QgY2hhbm5lbERldGFpbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJpbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMnKVxuICAgIGNvbnN0IGxlZnRBcmVhID0gY2hhbm5lbERldGFpbHNMZWZ0KCk7XG4gICAgY29uc3QgcmlnaHRBcmVhID0gY2hhbm5lbERldGFpbHNSaWdodCgpO1xuXG4gICAgcHJpbnRBcmVhLmFwcGVuZENoaWxkKGxlZnRBcmVhKTtcbiAgICAvLyBwcmludEFyZWEuYXBwZW5kQ2hpbGQocmlnaHRBcmVhKTtcblxufVxuXG5jb25zdCBjbGVhckNoYW5uZWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNvcHRpb25zTGVmdCcpO1xuICAgIGNoYW5uZWwuZm9yRWFjaChjID0+IHtcbiAgICAgICAgd2hpbGUgKGMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgYy5yZW1vdmVDaGlsZChjLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuY29uc3QgY2hhbm5lbERldGFpbHNMZWZ0ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuXG4gICAgY29uc3QgbGVmdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGVmdEFyZWEuY2hpbGRMaXN0ID0gJ29wdGlvbnNfX2xlZnQnXG4gICAgbGVmdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ29wdGlvbnNMZWZ0JylcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY2hhbm5lbE5hbWUuY2xhc3NMaXN0ID0gJ29wdGlvbnNfX2NoYW5uZWwnXG4gICAgY2hhbm5lbE5hbWUuaW5uZXJIVE1MID0gYCMke2NoYW5uZWwuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudH1gO1xuICAgIGxlZnRBcmVhLmFwcGVuZENoaWxkKGNoYW5uZWxOYW1lKTtcblxuICAgIGNvbnN0IGNoYW5uZWxQdXJwb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNoYW5uZWxQdXJwb3NlLnRleHRDb250ZW50ID0gY2hhbm5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHVycG9zZScpXG4gICAgY2hhbm5lbFB1cnBvc2UuY2xhc3NMaXN0ID0gJ29wdGlvbnNfX3B1cnBvc2UnO1xuICAgIGxlZnRBcmVhLmFwcGVuZENoaWxkKGNoYW5uZWxQdXJwb3NlKTtcblxuICAgIHJldHVybiBsZWZ0QXJlYTtcbn1cblxuY29uc3QgY2hhbm5lbERldGFpbHNSaWdodCA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbCA9IGdldEN1cnJlbnRDaGFubmVsKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYW5uZWxEZXRhaWxzLFxuICAgIGNoYW5uZWxEZXRhaWxzTGVmdCxcbiAgICBjbGVhckNoYW5uZWxcbn07IiwiLy8gQ2xlYXJzIGZpZWxkcyBhZnRlciBzdWJtaXNzaW9uIG9mIGEgZm9ybS9pbnB1dFxuY29uc3QgY2xlYXJJbnB1dHMgPSAoaWRlbnRpZmllcikgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkZW50aWZpZXJ9YCkudmFsdWUgPSAnJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFySW5wdXRzOyIsImNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGxvYWREYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWVJbnB1dCcpO1xuICAgIGNvbnN0IHB1cnBvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHVycG9zZUlucHV0Jyk7XG4gICAgY29uc3QgZGF0ZUNyZWF0ZWQgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgdXNlcnMgPSB7fTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IHt9O1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgbmFtZTogbmFtZS52YWx1ZSxcbiAgICAgICAgcHVycG9zZTogcHVycG9zZS52YWx1ZSxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IGRhdGVDcmVhdGVkLFxuICAgICAgICB1c2VyczogdXNlcnMsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgIH07XG4gICAgY2xlYXJJbnB1dHMobmFtZS5pZCk7XG4gICAgY2xlYXJJbnB1dHMocHVycG9zZS5pZCk7XG4gICAgZGF0YWJhc2VDcmVhdGUoY2hhbm5lbCk7XG4gICAgcmVzZXRTaWRlYmFyKCk7XG4gICAgbG9hZERhdGFiYXNlKCk7XG4gICAgY2xvc2VDcmVhdGVOZXdNb2RhbCgpO1xufVxuXG4vLyBIaWRlcyBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5uZWxNb2RhbCcpO1xuICAgIGNoYW5uZWxNb2RhbC5jbGFzc0xpc3QgPSAnaGlkZSc7XG59XG5cbi8vIEFmdGVyIHVzZXIgY3JlYXRlcyBuZXcgY2hhbm5lbCwgdGhpcyByZXNldHMgdGhlIGNoYW5uZWwgc2lkZWJhciB0byBzaG93IHJlY2VudGx5IGFkZGVkIGNoYW5uZWxcbmNvbnN0IHJlc2V0U2lkZWJhciA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICBjb25zb2xlLmxvZyhzaWRlYmFyKVxuICAgIHNpZGViYXIuaW5uZXJIVE1MID0gJydcbiAgICAvLyBpZiAoc2lkZWJhci5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgc2lkZS5mb3JFYWNoKGMgPT4ge1xuICAgIC8vICAgICAgICAgd2hpbGUgKGMuZmlyc3RDaGlsZCkge1xuICAgIC8vICAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZU5ld0NoYW5uZWwsXG4gICAgY2xvc2VDcmVhdGVOZXdNb2RhbFxufTsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCJjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gKG1lc3NhZ2UpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHttZXNzYWdlLmNoYW5uZWx9L21lc3NhZ2VzLy5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgYWRkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgcmVhbHRpbWVBZGRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vcmVhbHRpbWVBZGRNZXNzYWdlcycpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vbWVzc2FnZXMvLmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsLFxuICAgIGFkZE1lc3NhZ2Vcbn07IiwiLy8gY3JlYXRlcyBhIG5ldyBjaGFubmVsIGluIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykuZGF0YWJhc2VQYXJzZTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIGRhdGFiYXNlUGFyc2UoZGF0YSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBsb2FkTWVzc2FnZXMgPSAoY2hhbm5lbCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VQYXJzZScpLm1lc3NhZ2VQYXJzZTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7Y2hhbm5lbH0vbWVzc2FnZXMuanNvbj9wcmludD1wcmV0dHlgLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIG1lc3NhZ2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxvYWREYXRhYmFzZSxcbiAgICBsb2FkTWVzc2FnZXNcbn0iLCIvLyBQYXJzZXMgdGhlIGRhdGEgbG9hZGVkIGZyb20gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbmFtZTogZGF0YVtrZXldLm5hbWUsXG4gICAgICAgICAgICBwdXJwb3NlOiBkYXRhW2tleV0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFba2V5XS5tZXNzYWdlcyxcbiAgICAgICAgICAgIHVzZXJzOiBkYXRhW2tleV0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbi8vIFBhcnNlcyB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIERCIHRvIHByZXBhcmUgZm9yIHBvc3RpbmdcbmNvbnN0IG1lc3NhZ2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBwb3N0U2F2ZWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vcG9zdFNhdmVkTWVzc2FnZXMnKVxuICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGFsbE1lc3NhZ2VzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGluZGl2TWVzc2FnZSA9IHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHVzZXI6IGRhdGFba2V5XS51c2VyLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtrZXldLmRhdGUsXG4gICAgICAgICAgICB0ZXh0OiBkYXRhW2tleV0udGV4dCxcbiAgICAgICAgICAgIG1lZGlhOiBkYXRhW2tleV0ubWVkaWFcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZNZXNzYWdlKVxuICAgIH0pXG4gICAgcG9zdFNhdmVkTWVzc2FnZXMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGF0YWJhc2VQYXJzZSxcbiAgICBtZXNzYWdlUGFyc2Vcbn07IiwiY29uc3QgdXBkYXRlRGF0YWJhc2VDaGFubmVsID0gKGNoYW5uZWwsIHVzZXIpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tLyR7Y2hhbm5lbC50YWJsZX0vJHtjaGFubmVsLmNoYW5uZWxOYW1lfS91c2Vycy8ke3VzZXIuaWR9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGVEYXRhYmFzZUNoYW5uZWw7IiwiLy8gR2VuZXJhdGVzIHRvZGF5J3MgZGF0ZSBpbiBleCBmb3JtYXQ6IE9jdCwgNywgMTk4OVxuY29uc3QgZGF0ZUdlbmVyYXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbdG9kYXkuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIHJldHVybiBkYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVHZW5lcmF0b3I7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gKCkgPT4ge1xuICAgIGxldCBtZXNzYWdlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlcycpO1xuICAgIG1lc3NhZ2VCb2R5LnNjcm9sbFRvcCA9IDk5OTk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2VlcE1lc3NhZ2VzQm90dG9tOyIsIi8vIFRPRE86IGhhdmUgdGhlIGRlZmF1bHQgY2hhbm5lbCBiZSB0aGUgbGFzdCBhY3RpdmUgY2hhbm5lbFxuLy8gQ3VycmVudGx5IGxvYWRzIHRoZSB3YXRlcmNvb2xlciBjaGFubmVsIGJ5IGRlZmF1bHRcbmNvbnN0IGxvYWREZWZhdWx0Q2hhbm5lbCA9ICgpID0+IHtcbiAgICBjb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuc2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHNMZWZ0ID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzTGVmdDtcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcblxuICAgIGNvbnN0IGZpcnN0Q2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19jaGFubmVscy0tbGlzdCcpLmNoaWxkTm9kZXNbMF1cbiAgICBmaXJzdENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgc2V0Q3VycmVudENoYW5uZWwoZmlyc3RDaGFubmVsKVxuICAgIGxvYWRNZXNzYWdlcyhmaXJzdENoYW5uZWwuaWQpXG5cbn1cblxuLy8gRGVsYXkgdG8gbG9hZCBkZWZhdWx0IGNoYW5uZWxcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgbG9hZERlZmF1bHRDaGFubmVsKCk7XG4gICAgfSwgNTAwKTtcbiB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWREZWZhdWx0Q2hhbm5lbDtcbiIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIGxvZ2luIHBhZ2VcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9naW5Nb2RhbCcpXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdsb2dpbicpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobG9naW5Nb2RhbENvbnRlbnQoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyTW9kYWw7XG5cbmNvbnN0IGxvZ2luTW9kYWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBsb2dpblVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dpbicpO1xuICAgIGNvbnN0IGNyZWF0ZVVzZXIgPSByZXF1aXJlKCcuL3VzZXJDcmVhdGUnKTtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGxvZ2luTW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgZGlzcGxheU5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRGlzcGxheU5hbWUnLCAnbG9naW5fX2lucHV0JywgJ0Z1bGwgbmFtZScpO1xuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckVtYWlsJywgJ2xvZ2luX19pbnB1dCcsICd5b3VAZXhhbXBsZS5jb20nKTtcbiAgICBjb25zdCBwYXNzSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3Bhc3N3b3JkJywgJ3VzZXJQYXNzJywgJ2xvZ2luX19pbnB1dCcsICdwYXNzd29yZCcpO1xuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdzaWdudXBfX2J1dHRvbicsJ0NyZWF0ZSBhY2NvdW50JywgY3JlYXRlVXNlcilcblxuICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxvZ2luQnV0dG9uLnRleHRDb250ZW50ID0gJ09yLCBzaWduIGluIHRvIGV4aXN0aW5nIGFjY291bnQnXG4gICAgbG9naW5CdXR0b24uY2xhc3NMaXN0LmFkZCgnbG9naW5fX2J1dHRvbicpO1xuICAgIGxvZ2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9naW5Vc2VyKTtcblxuICAgIC8vIE5lZWRzIHJlZmFjdG9yaW5nIC0gcmVhbGx5IHJlcGV0aXRpdmVcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX19jb250ZW50Jyk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGVtYWlsSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocGFzc0lucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHNpZ25VcEJ1dHRvbik7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuY29uc3QgbG9naW5Nb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdTaWduIGluIHRvIHNsYWNrJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdHZXQgc3RhcnRlZCBjb2xsYWJvcmF0aW5nIHdpdGggeW91ciB0ZWFtbWF0ZXMuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufVxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbWVzc2FnZXNcbmNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gKGRhdGUsIG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19yaWdodCcpXG4gICAgY29uc3QgdGl0bGUgPSBtZXNzYWdlVGl0bGUoZGF0ZSwgbWVzc2FnZS51c2VyLmVtYWlsKTtcbiAgICBjb25zdCBhdmF0YXIgPSBtZXNzYWdlQXZhdGFyKCk7XG4gICAgbWVzc2FnZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgdGV4dC5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19ib2R5Jyk7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2UudGV4dDtcbiAgICBcbiAgICBib2R5LmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGV4dClcbiAgICBcbiAgICBtZXNzYWdlU3RydWN0dXJlLmFwcGVuZENoaWxkKGF2YXRhcilcbiAgICBtZXNzYWdlU3RydWN0dXJlLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgcmV0dXJuIG1lc3NhZ2VTdHJ1Y3R1cmU7XG59XG5cbi8vIFRPRE86IHN3YXAgZW1haWwgdy8gZGlzcGxheU5hbWVcbi8vIFRPRE86IGRhdGUgbmVlZHMgdG8gZGlzcGxheSBmb3IgZGF0ZSBwb3N0ZWQgaWYgbWVzc2FnZSBhbHJlYWR5IGV4aXN0c1xuY29uc3QgbWVzc2FnZVRpdGxlID0gKGRhdGUsIHVzZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbWVzc2FnZVRpdGxlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlJylcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRpc3BsYXlOYW1lLnRleHRDb250ZW50ID0gdXNlcjtcbiAgICBjb25zdCBwb3N0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHBvc3REYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICBkaXNwbGF5TmFtZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZS0tdXNlcicpO1xuICAgIHBvc3REYXRlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS1kYXRlJyk7XG4gICAgbWVzc2FnZVRpdGxlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lKVxuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChwb3N0RGF0ZSlcbiAgICBcbiAgICByZXR1cm4gbWVzc2FnZVRpdGxlO1xufVxuXG5jb25zdCBtZXNzYWdlQXZhdGFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGF2YXRhci5zcmMgPSAnaW1nL2F2YXRhci5wbmcnXG4gICAgYXZhdGFyLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VzX19hdmF0YXInKVxuICAgIHJldHVybiBhdmF0YXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlRmFjdG9yeTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCdjaGFubmVsTW9kYWwnKVxuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ld0NoYW5uZWxNb2RhbDtcblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jcmVhdGVOZXdDaGFubmVsO1xuICAgIGNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jbG9zZUNyZWF0ZU5ld01vZGFsO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudCcpXG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBtb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnTmFtZScpO1xuICAgIGNvbnN0IHB1cnBvc2VMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdQdXJwb3NlJyk7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAnbmFtZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgJ2UuZy4gbWFya2V0aW5nJyk7XG4gICAgY29uc3QgcHVycG9zZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3B1cnBvc2VJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuXG4gICAgY29uc3QgbW9kYWxBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1hY3Rpb25zJylcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY2FuY2VsJywnQ2FuY2VsJywgY2xvc2VDcmVhdGVOZXdNb2RhbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY3JlYXRlJywnQ3JlYXRlIGNoYW5uZWwnLCBjcmVhdGVOZXdDaGFubmVsKVxuXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKVxuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG1vZGFsQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuLy8gdGl0bGUgY29udGVudCBmb3IgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsIi8vIEFsbG93cyB1c2VyIHRvIGNyZWF0ZSBhbmQgcG9zdCBhIG5ldyBtZXNzYWdlXG5jb25zdCBwb3N0TWVzc2FnZSA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJylcbiAgICBjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gcmVxdWlyZSgnLi9kYXRhYmFzZUFkZE1lc3NhZ2UnKS5hZGRNZXNzYWdlVG9DaGFubmVsO1xuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2U7XG4gICAgY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gcmVxdWlyZSgnLi9rZWVwTWVzc2FnZXNCb3R0b20nKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS52YWx1ZVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgdXNlciA9IGdldEN1cnJlbnRVc2VyKClcbiAgICBjb25zdCB1c2VySUQgPSB1c2VyLnVpZDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBcbiAgICBjb25zdCBuZXdNZXNzYWdlID0ge1xuICAgICAgICBjaGFubmVsOiBjaGFubmVsLmlkLFxuICAgICAgICB1c2VyLFxuICAgICAgICBkYXRlLFxuICAgICAgICB0ZXh0LFxuICAgICAgICBtZWRpYVxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gbWVzc2FnZUZhY3RvcnkoZGF0ZSwgbmV3TWVzc2FnZSlcblxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGNsZWFySW5wdXRzKCd3cml0ZU1lc3NhZ2UnKVxuXG4gICAgYWRkTWVzc2FnZVRvQ2hhbm5lbChuZXdNZXNzYWdlKVxuICAgIGFkZE1lc3NhZ2UobmV3TWVzc2FnZSlcbiAgICBrZWVwTWVzc2FnZXNCb3R0b20oKTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXIgd2FpdGluZyBmb3IgdXNlciB0byBoaXQgJ2VudGVyJyBiZWZvcmUgcG9zdGluZyBuZXcgbWVzc2FnZVxuY29uc3Qgc3VibWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSAxMykge1xuICAgICAgICBwb3N0TWVzc2FnZSgpO1xuICAgIH1cbn0pOyIsIi8vIEFwcGVuZHMgbmV3IG1lc3NhZ2UgdG8gI21lc3NhZ2UgZGl2IGluIERPTVxuY29uc3QgcG9zdE1lc3NhZ2UgPSAoYWxsTWVzc2FnZXMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlRmFjdG9yeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUZhY3RvcnknKVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChtZXNzID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG1lc3MuZGF0ZTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3M7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VTdHJ1Y3R1cmUgPSBtZXNzYWdlRmFjdG9yeShkYXRlLCBtZXNzYWdlKVxuICAgICAgICBwb3N0QXJlYS5hcHBlbmRDaGlsZChtZXNzYWdlU3RydWN0dXJlKTtcbiAgICB9KVxuICAgIHBvc3RBcmVhLnNjcm9sbFRvcCA9IDk5OTk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zdE1lc3NhZ2U7IiwiLy8gTk9UIFdPUktJTkcgLS0gTkVFRCBUTyBGSVhcblxuLy8gTGlzdGVuaW5nIGZvciB1cGRhdGVzIGluIHRoZSBkYXRhYmFzZSB0byBwb3N0IHRvIERPTSBmb3IgYWxsIHVzZXJzXG5jb25zdCByZWFsdGltZUFkZE1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIGxldCBkYXRhYmFzZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBjaGFubmVsL2ApO1xuICAgIGRhdGFiYXNlUmVmLm9uKCd2YWx1ZScsIHNuYXAgPT4ge1xuICAgICAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IHNuYXAudmFsKCk7XG4gICAgICAgIGNvbnN0IGtleUFycmF5ID0gT2JqZWN0LmtleXMobWVzc2FnZXMpXG4gICAgICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBtZXNzYWdlcy5jaGFubmVsLm1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gW107XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRpdk1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHVzZXI6IG1lc3NhZ2VzW2tleV0udXNlcixcbiAgICAgICAgICAgICAgICBkYXRlOiBtZXNzYWdlc1trZXldLmRhdGUsXG4gICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZXNba2V5XS50ZXh0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZXNzYWdlc1trZXldLm1lZGlhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxNZXNzYWdlcy5wdXNoKGluZGl2TWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICAgICAgdmVyaWZ5VXNlcihuZXdNZXNzYWdlKVxuICAgICAgICBwb3N0TmV3VXNlck1lc3NhZ2UoY2hhbm5lbCwgbmV3TWVzc2FnZSk7XG4gICAgfSlcbn1cblxuY29uc3QgdmVyaWZ5VXNlciA9IChuZXdNZXNzYWdlKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3TWVzc2FnZSlcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgdXNlclRoYXRQb3N0ZWRNZXNzYWdlID0gbmV3TWVzc2FnZS51c2VyO1xuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKS51aWQ7XG5cbiAgICBjb25zb2xlLmxvZyh1c2VyVGhhdFBvc3RlZE1lc3NhZ2UsIGN1cnJlbnRVc2VyKVxuXG4gICAgaWYgKHVzZXJUaGF0UG9zdGVkTWVzc2FnZSAhPT0gY3VycmVudFVzZXIpIHtcbiAgICAgICAgLy8gcG9zdE5ld1VzZXJNZXNzYWdlKG5ld01lc3NhZ2UpXG4gICAgICAgIGNvbnNvbGUubG9nKCdzYW1lIHVzZXInKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NhbWUgdXNlcicpXG4gICAgfVxufVxuXG4vLyBjb25zdCBwb3N0TmV3VXNlck1lc3NhZ2UgPSAoY2hhbm5lbCkgPT4ge1xuLy8gICAgIGNvbnN0IGxvYWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZE1lc3NhZ2VzO1xuLy8gICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtZXNzYWdlcycpO1xuLy8gICAgIHByaW50QXJlYS5mb3JFYWNoKG0gPT4ge1xuLy8gICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKSB7XG4vLyAgICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9KVxuLy8gICAgIGxvYWRNZXNzYWdlcyhjaGFubmVsKTtcbi8vIH1cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSByZWFsdGltZUFkZE1lc3NhZ2VzOyIsIi8vIENyZWF0ZXMgY2hhbm5lbHMgY29tcG9uZW50IGZvciBzaWRlYmFyXG5jb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSAoYWxsRGF0YSkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgY2hhbm5lbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgc2lkZWJhclN0cnVjdHVyZSA9IHJlcXVpcmUoJy4vc2lkZWJhclN0cnVjdHVyZScpO1xuICAgIGNvbnN0IGNoYW5nZUNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5nZUNoYW5uZWwnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBjaGFubmVsc0hlYWRlcigpO1xuXG5cbiAgICBhbGxEYXRhLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdpZCcsIGMua2V5KVxuICAgICAgICBjaGFubmVsUm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wdXJwb3NlJywgYy5wdXJwb3NlKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZUNoYW5uZWwpXG4gICAgICAgIGNoYW5uZWxSb3cuY2xhc3NMaXN0ID0gJ2luZGl2aWR1YWwtY2hhbm5lbCdcbiAgICAgICAgY29uc3QgaGFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBoYXNoLnNyYyA9ICdpbWcvaGFzaC5wbmcnXG5cbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBjaGFubmVsLnRleHRDb250ZW50ID0gYy5uYW1lO1xuXG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoaGFzaCk7XG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoY2hhbm5lbCk7XG4gICAgICAgIGNoYW5uZWxMaXN0LmFwcGVuZENoaWxkKGNoYW5uZWxSb3cpO1xuICAgIH0pXG4gICAgY2hhbm5lbExpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1saXN0JztcblxuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGNoYW5uZWxMaXN0KTtcblxuICAgIHNpZGViYXJTdHJ1Y3R1cmUoY2hhbm5lbENvbXBvbmVudClcbn1cblxuY29uc3QgY2hhbm5lbHNIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeSA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeUljb24nKTtcbiAgICBjb25zdCBuZXdDaGFubmVsTW9kYWwgPSByZXF1aXJlKCcuL25ld0NoYW5uZWxNb2RhbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzJ1xuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgbmV3Q2hhbm5lbE1vZGFsKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyQ2hhbm5lbHM7IiwiY29uc3Qgc2lkZWJhckhlYWQgPSAodXNlcikgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhcicpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2hlYWRlcic7XG4gICAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2lkZWJhckhlYWRlcicpXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1NpZGViYXJEcm9wZG93bik7XG4gICAgY29uc3QgY29udGVudCA9IGhlYWRlckNvbnRlbnQodXNlcik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIHNpZGViYXIuaW5zZXJ0QmVmb3JlKGhlYWRlciwgc2lkZWJhci5maXJzdENoaWxkKVxufTtcblxuY29uc3QgaGVhZGVyQ29udGVudCA9ICh1c2VyKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXJDb250ZW50LmNsYXNzTGlzdCA9ICdzaWRlYmFyX19oZWFkZXItLWNvbnRlbnQnXG4gICAgaGVhZGVyQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NpZGViYXJIZWFkZXInKVxuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaGVhZGVyVGV4dC50ZXh0Q29udGVudCA9IHVzZXIuZW1haWw7XG4gICAgaGVhZGVyVGV4dC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyLS1uYW1lJ1xuICAgIGhlYWRlclRleHQuc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBjb25zdCBoZWFkZXJEcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGVhZGVyRHJvcC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyLS1pY29uJ1xuICAgIGhlYWRlckRyb3Auc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBoZWFkZXJEcm9wLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGRyb3BcIiBpZD1cInNpZGViYXJIZWFkZXJcIj5rZXlib2FyZF9hcnJvd19kb3duPC9pPidcbiAgICBoZWFkZXJDb250ZW50LmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIGhlYWRlckNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRHJvcCk7XG5cbiAgICByZXR1cm4gaGVhZGVyQ29udGVudDtcbn1cblxuY29uc3Qgc2hvd1NpZGViYXJEcm9wZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgY29uc3Qgc3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHN0cnVjdHVyZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjY291bnRPcHRpb25zJyk7XG4gICAgc3RydWN0dXJlLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19kcm9wZG93bic7XG4gICAgc3RydWN0dXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgIHN0cnVjdHVyZS50ZXh0Q29udGVudCA9ICdoZXkgaGV5IGhleSdcbiAgICBib2R5LmFwcGVuZENoaWxkKHN0cnVjdHVyZSlcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXJIZWFkZXInKVxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjY291bnRPcHRpb25zJylcblxuICAgIC8vIGlmIChtb2RhbCkge1xuICAgIC8vICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdubycpXG4gICAgLy8gfVxufSlcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJIZWFkOyIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIHNpZGViYXJcbmNvbnN0IGNyZWF0ZVNpZGViYXIgPSAoY2hhbm5lbENvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgbG9nb3V0VXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ291dCcpO1xuICAgIC8vIGNvbnN0IGxvZ091dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgLy8gbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9nb3V0VXNlcik7XG4gICAgLy8gbG9nT3V0LnRleHRDb250ZW50ID0gJ0xvZyBvdXQnXG4gICAgLy8gbG9nT3V0LmNsYXNzTGlzdC5hZGQoJ2xvZ291dF9fYnV0dG9uJylcblxuICAgIC8vIHNpZGViYXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGNoYW5uZWxDb21wb25lbnQpO1xuICAgIC8vIHNpZGViYXIuYXBwZW5kQ2hpbGQobG9nT3V0KTtcbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2lkZWJhcjsiLCIvLyBDaGVja2luZyB3aGV0aGVyIG9yIG5vdCB1c2VyIGlzIGxvZ2dlZCBpblxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGZpcmViYXNlVXNlciA9PiB7XG4gICAgaWYgKGZpcmViYXNlVXNlcikge1xuICAgICAgICBjdXJyZW50VXNlciA9IGZpcmViYXNlVXNlcjtcbiAgICAgICAgY29uc3Qgc2lkZWJhckhlYWQgPSByZXF1aXJlKCcuL3NpZGViYXJIZWFkJyk7XG4gICAgICAgIGNvbnN0IGxvZ2luTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Nb2RhbCcpO1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgc2lkZWJhckhlYWQoY3VycmVudFVzZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSlcblxuY29uc3QgZ2V0Q3VycmVudFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG5jb25zdCBzZXRDdXJyZW50VXNlciA9ICh1c2VyKSA9PiB7XG4gICAgY3VycmVudFVzZXIgPSB1c2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDdXJyZW50VXNlcixcbiAgICBzZXRDdXJyZW50VXNlclxufTsiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSByZXF1aXJlKCcuL2FkZFRvQ2hhbm5lbCcpXG4gICAgY29uc3Qgc2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLnNldEN1cnJlbnRVc2VyXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckRpc3BsYXlOYW1lJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpXG4gICAgICAgIGFkZFRvRGVmYXVsdENoYW5uZWwodXNlcilcbiAgICB9KVxuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVXNlcjsiLCIvLyBMb2dzIHVzZXIgaW50byBwcm9kdWN0XG5jb25zdCBsb2dpblVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpO1xuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbiBcbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyOyIsIi8vIExvZ3Mgb3V0IHVzZXJcbmNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXRVc2VyOyJdfQ==
