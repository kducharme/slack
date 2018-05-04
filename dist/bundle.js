(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const addToDefaultChannel = (newUser) => {
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




},{"./databaseLoad":15,"./loginScreen":24}],3:[function(require,module,exports){
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
},{"./realtimeAddMessages":31}],12:[function(require,module,exports){
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
    const sidebarUsers = require('./sidebarChannels');
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
},{"./databaseLoad":15,"./postSavedMessages":30,"./sidebarChannels":32}],17:[function(require,module,exports){
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
const directMessageUser = () => {
    console.log(`oh hey there. this feature isn't ready yet`)
}

module.exports = directMessageUser;
},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
// Generates labels for inputs
const inputLabelFactory = (labelText) => {
    const label = document.createElement('p');
    label.classList.add('input__label');
    label.textContent = labelText;

    return label;
}

module.exports = inputLabelFactory;
},{}],22:[function(require,module,exports){
const keepMessagesBottom = () => {
    let messageBody = document.querySelector('#messages');
    messageBody.scrollTop = 9999;
}

module.exports = keepMessagesBottom;
},{}],23:[function(require,module,exports){
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

},{"./channelCheck":6,"./channelDetails":7,"./databaseLoad":15}],24:[function(require,module,exports){
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

},{"./buttonFactoryText":4,"./inputFactory":20,"./userCreate":38,"./userLogin":39}],25:[function(require,module,exports){
const mediaUploader = () => {
    let reader = new FileReader();
    let file = document.querySelector('input[type=file]').files[0];

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

const uploadButton = document.querySelector('#uploadFile').addEventListener('click', mediaUploader);
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
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
},{"./buttonFactoryText":4,"./createNewChannel":9,"./databaseCreate":12,"./inputFactory":20,"./inputLabelFactory":21}],28:[function(require,module,exports){
const newUserAddedToChannel = (user) => {
    const dateGenerator = require('./dateGenerator');
    const postArea = document.querySelector('.messages');
    const addMessageToChannel = require('./databaseAddMessage').addMessageToChannel;
    const messageFactory = require('./messageFactory')
    const addMessage = require('./databaseAddMessage').addMessage;
    const channel = 'watercooler';
    const text = `joined #${channel}`
    
    const date = dateGenerator();
    const media = '';

    const newMessage = {
        channel: '-LBN5_skx51L7hJQp5R1',
        user,
        date,
        text,
        media
    }
    const messageStructure = messageFactory(date, newMessage)
    postArea.appendChild(messageStructure);
    addMessageToChannel(newMessage)
    addMessage(newMessage)
}

module.exports = newUserAddedToChannel;
},{"./databaseAddMessage":11,"./dateGenerator":18,"./messageFactory":26}],29:[function(require,module,exports){
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
},{"./channelCheck":6,"./clearInputs":8,"./databaseAddMessage":11,"./dateGenerator":18,"./keepMessagesBottom":22,"./messageFactory":26,"./userCheck":37}],30:[function(require,module,exports){
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
},{"./messageFactory":26}],31:[function(require,module,exports){
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
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const userThatPostedMessage = newMessage.user;
    const currentUser = getCurrentUser().uid;
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
},{"./channelCheck":6,"./userCheck":37}],32:[function(require,module,exports){
// Creates channels component for sidebar
const sidebarChannels = (allData) => {
    const channelComponent = document.createElement('span');
    const channelList = document.createElement('span');
    const sidebarUsers = require('./sidebarUsers');
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
    sidebarUsers(allData)
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
},{"./buttonFactoryIcon":3,"./changeChannel":5,"./newChannelModal":27,"./sidebarStructure":35,"./sidebarUsers":36}],33:[function(require,module,exports){
const dropdownContent = () => {
    const content = document.createElement('span');
    const getCurrentUser = require('./userCheck').getCurrentUser;
    const user = document.createElement('h2');
    user.textContent = getCurrentUser().email;
    user.classList = 'sidebar__dropdown--user';
    const options = ['Profile & account', 'Preferences', 'Sign out']
    const optionList = document.createElement('span');
    optionList.classList.add('sidebar__dropdown--optionList')
    options.forEach(o => {
        const option = document.createElement('p');
        option.textContent = o;
        option.classList = 'sidebar__dropdown--option'
        if (o === 'Sign out') {
            const logoutUser = require('./userLogout')
            option.addEventListener('click', logoutUser);
        }
        optionList.appendChild(option);
    })
    content.appendChild(user);
    content.appendChild(optionList);
    return content;
}

const sidebarDropdown = (evt) => {
    const body = document.querySelector('body');
    const background = document.createElement('span');

    background.setAttribute('id', 'dropdownBackground')
    background.classList.add('sidebar__dropdown--background');
    background.addEventListener('click', closeSidebarDropdown);

    const dropdown = document.createElement('span');
    dropdown.setAttribute('id', 'accountOptions');
    dropdown.classList.add('sidebar__dropdown');

    const content = dropdownContent();

    body.appendChild(background)
    dropdown.appendChild(content);
    body.appendChild(dropdown)
}

const closeSidebarDropdown = (evt) => {
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    body.removeChild(modal)
    body.removeChild(background);
}

module.exports = sidebarDropdown;
},{"./userCheck":37,"./userLogout":40}],34:[function(require,module,exports){
const sidebarHead = (user) => {
    const sidebarDropdown = require('./sidebarDropdown');
    const userLogout = require('./userLogout')
    const sidebar = document.querySelector('#sidebar');
    const header = document.createElement('span');
    header.classList = 'sidebar__header';
    header.setAttribute('id', 'sidebarHeader')
    header.addEventListener('click', sidebarDropdown);
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

module.exports = sidebarHead;
},{"./sidebarDropdown":33,"./userLogout":40}],35:[function(require,module,exports){
// Creates the structure for the sidebar
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const logoutUser = require('./userLogout');
    // sidebar.appendChild(header);
    sidebar.appendChild(channelComponent);
    // sidebar.appendChild(accountUsers);
} 

module.exports = createSidebar;
},{"./sidebarChannels":32,"./userLogout":40}],36:[function(require,module,exports){
const sidebarUserComponent = (allData) => {
    const userComponent = document.createElement('span');
    const userList = document.createElement('span');
    const sidebarStructure = require('./sidebarStructure');
    const changeChannel = require('./changeChannel');
    const directMessageUser = require('./directMessageUser');
    const printArea = document.querySelector('#sidebar')
    const header = usersHeader();
    const watercooler = allData[0].users
    let users = []

    for(let key in watercooler) {
        users.push(watercooler[key]);
    }

    users.forEach(u => {
        const userRow = document.createElement('span');
        userRow.setAttribute('id', u.id)
        userRow.addEventListener('click', directMessageUser)
        userRow.classList = 'individual-user'
        const status = document.createElement('img');
        status.src = 'img/online.png'

        const user = document.createElement('a')
        user.textContent = u.email;

        userRow.appendChild(status);
        userRow.appendChild(user);
        userList.appendChild(userRow);
    })
    userList.classList = 'sidebar__users--list';

    userComponent.appendChild(header);
    userComponent.appendChild(userList);
    printArea.appendChild(userComponent)
}

const usersHeader = () => {
    const header = document.createElement('span');
    header.classList = 'sidebar__channels--header'
    const title = document.createElement('h2');
    title.textContent = 'Direct Messages'
    header.appendChild(title);

    return header;
}

module.exports = sidebarUserComponent;
},{"./changeChannel":5,"./directMessageUser":19,"./sidebarStructure":35}],37:[function(require,module,exports){
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
},{"./sidebarHead":34}],38:[function(require,module,exports){
// Lets user create new account
const createUser = () => {
    const addToDefaultChannel = require('./addToChannel')
    const setCurrentUser = require('./userCheck').setCurrentUser
    const clearInputs = require('./clearInputs');
    const newUserAddedToChannel = require('./newUserAddedToChannel');
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
        newUserAddedToChannel(user);
    })
    promise.catch(e => console.log(e.message))

}

module.exports = createUser;
},{"./addToChannel":1,"./clearInputs":8,"./newUserAddedToChannel":28,"./userCheck":37}],39:[function(require,module,exports){
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
},{"./clearInputs":8}],40:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    body.removeChild(modal)
    body.removeChild(background);
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9kaXJlY3RNZXNzYWdlVXNlci5qcyIsInNjcmlwdHMvaW5wdXRGYWN0b3J5LmpzIiwic2NyaXB0cy9pbnB1dExhYmVsRmFjdG9yeS5qcyIsInNjcmlwdHMva2VlcE1lc3NhZ2VzQm90dG9tLmpzIiwic2NyaXB0cy9sb2FkRGVmYXVsdENoYW5uZWwuanMiLCJzY3JpcHRzL2xvZ2luU2NyZWVuLmpzIiwic2NyaXB0cy9tZWRpYVVwbG9hZGVyLmpzIiwic2NyaXB0cy9tZXNzYWdlRmFjdG9yeS5qcyIsInNjcmlwdHMvbmV3Q2hhbm5lbE1vZGFsLmpzIiwic2NyaXB0cy9uZXdVc2VyQWRkZWRUb0NoYW5uZWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3JlYWx0aW1lQWRkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhckRyb3Bkb3duLmpzIiwic2NyaXB0cy9zaWRlYmFySGVhZC5qcyIsInNjcmlwdHMvc2lkZWJhclN0cnVjdHVyZS5qcyIsInNjcmlwdHMvc2lkZWJhclVzZXJzLmpzIiwic2NyaXB0cy91c2VyQ2hlY2suanMiLCJzY3JpcHRzL3VzZXJDcmVhdGUuanMiLCJzY3JpcHRzL3VzZXJMb2dpbi5qcyIsInNjcmlwdHMvdXNlckxvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSAobmV3VXNlcikgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVVwZGF0ZScpO1xuICAgIGNvbnN0IHRhYmxlID0gJ2NoYW5uZWwnO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gJy1MQk41X3NreDUxTDdoSlFwNVIxJztcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIHRhYmxlLFxuICAgICAgICBjaGFubmVsTmFtZVxuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgIGlkOiBuZXdVc2VyLnVpZCxcbiAgICAgICAgZW1haWw6IG5ld1VzZXIuZW1haWwsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpbWc6ICcnLFxuICAgIH1cbiAgICBkYXRhYmFzZShjaGFubmVsLCB1c2VyKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFRvRGVmYXVsdENoYW5uZWw7IiwiY29uc3QgbG9hZERCID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG5jb25zdCBsb2dpblVzZXJNb2RhbCA9IHJlcXVpcmUoJy4vbG9naW5TY3JlZW4nKTtcbi8vIGNvbnN0IGNoYW5uZWxEZXRhaWxzID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzO1xuXG5sb2FkREIoKTtcbmxvZ2luVXNlck1vZGFsKCk7XG4vLyBjaGFubmVsRGV0YWlscygpO1xuXG5cblxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaWNvbi1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgdGV4dC1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBBbGxvd3MgdXNlciB0byBjaGFuZ2UgY2hhbm5lbCBhbmQgYWRkcyBzdHlsaW5nIG9uIHRoZSBzaWRlIGJhclxuY29uc3QgY2hhbmdlQ2hhbm5lbCA9IChldnQpID0+IHtcbiAgICBjb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuc2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHNMZWZ0O1xuICAgIGNvbnN0IGxvYWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZE1lc3NhZ2VzO1xuICAgIGNvbnN0IGNsZWFyQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jbGVhckNoYW5uZWw7XG4gICAgY29uc3QgYWxsQ2hhbm5lbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kaXZpZHVhbC1jaGFubmVsJyk7XG4gICAgbGV0IGNsaWNrZWRDaGFubmVsID0gZXZ0LnRhcmdldFxuXG4gICAgaWYgKCFjbGlja2VkQ2hhbm5lbC5pZCkge1xuICAgICAgICBjbGlja2VkQ2hhbm5lbCA9IGV2dC5wYXRoWzFdXG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ2hhbm5lbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbENoYW5uZWxzW2ldLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlQ2hhbm5lbCcpKSB7XG4gICAgICAgICAgICBhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVDaGFubmVsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJNZXNzYWdlcygpO1xuICAgIGNsaWNrZWRDaGFubmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNoYW5uZWwnKVxuICAgIGNsZWFyQ2hhbm5lbCgpO1xuICAgIHNldEN1cnJlbnRDaGFubmVsKGNsaWNrZWRDaGFubmVsKVxuICAgIGxvYWRNZXNzYWdlcyhjbGlja2VkQ2hhbm5lbC5pZClcbn1cblxuLy8gV2hlbiB1c2VyIGNoYW5nZXMgY2hhbm5lbHMsIHRoaXMgY2xlYXJzIHRoZSBtZXNzYWdlcyBmcm9tIHRoZSBvbGQgY2hhbm5lbFxuY29uc3QgY2xlYXJNZXNzYWdlcyA9ICgpID0+IHtcbiAgICBjb25zdCBwcmludEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWVzc2FnZXMnKTtcbiAgICBwcmludEFyZWEuZm9yRWFjaChtID0+IHtcbiAgICAgICAgd2hpbGUgKG0uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbS5yZW1vdmVDaGlsZChtLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGFuZ2VDaGFubmVsOyIsIi8vIENoZWNraW5nIHdoYXQgY2hhbm5lbCB0aGUgdXNlciBpcyBjdXJyZW50bHkgaW5cbmxldCBjdXJyZW50Q2hhbm5lbCA9IG51bGw7XG5cbi8vIE9uIGNoYW5uZWwgY2hhbmdlLCB0aGlzIHNldHMgdGhlIGNoYW5uZWwgdGhhdCB0aGUgdXNlciBpcyBpblxuY29uc3Qgc2V0Q3VycmVudENoYW5uZWwgPSAoY2hhbm5lbCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxEZXRhaWxzID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNoYW5uZWxEZXRhaWxzO1xuICAgIGN1cnJlbnRDaGFubmVsID0gY2hhbm5lbDtcbiAgICBjaGFubmVsRGV0YWlscygpO1xufVxuXG4vLyBDYWxsZWQgdG8gZ2V0IHRoZSBjdXJyZW50IGNoYW5uZWwgdGhhdCB0aGUgdXNlciBpcyBpblxuY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRDaGFubmVsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDdXJyZW50Q2hhbm5lbCxcbiAgICBzZXRDdXJyZW50Q2hhbm5lbFxufTsiLCJjb25zdCBjaGFubmVsRGV0YWlscyA9ICgpID0+IHtcbiAgICBjb25zdCBwcmludEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9ucycpXG4gICAgY29uc3QgbGVmdEFyZWEgPSBjaGFubmVsRGV0YWlsc0xlZnQoKTtcbiAgICBjb25zdCByaWdodEFyZWEgPSBjaGFubmVsRGV0YWlsc1JpZ2h0KCk7XG5cbiAgICBwcmludEFyZWEuYXBwZW5kQ2hpbGQobGVmdEFyZWEpO1xuICAgIC8vIHByaW50QXJlYS5hcHBlbmRDaGlsZChyaWdodEFyZWEpO1xuXG59XG5cbmNvbnN0IGNsZWFyQ2hhbm5lbCA9ICgpID0+IHtcbiAgICBjb25zdCBjaGFubmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI29wdGlvbnNMZWZ0Jyk7XG4gICAgY2hhbm5lbC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICB3aGlsZSAoYy5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBjLnJlbW92ZUNoaWxkKGMuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5jb25zdCBjaGFubmVsRGV0YWlsc0xlZnQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbCA9IGdldEN1cnJlbnRDaGFubmVsKCk7XG5cbiAgICBjb25zdCBsZWZ0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZWZ0QXJlYS5jaGlsZExpc3QgPSAnb3B0aW9uc19fbGVmdCdcbiAgICBsZWZ0QXJlYS5zZXRBdHRyaWJ1dGUoJ2lkJywnb3B0aW9uc0xlZnQnKVxuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBjaGFubmVsTmFtZS5jbGFzc0xpc3QgPSAnb3B0aW9uc19fY2hhbm5lbCdcbiAgICBjaGFubmVsTmFtZS5pbm5lckhUTUwgPSBgIyR7Y2hhbm5lbC5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50fWA7XG4gICAgbGVmdEFyZWEuYXBwZW5kQ2hpbGQoY2hhbm5lbE5hbWUpO1xuXG4gICAgY29uc3QgY2hhbm5lbFB1cnBvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY2hhbm5lbFB1cnBvc2UudGV4dENvbnRlbnQgPSBjaGFubmVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wdXJwb3NlJylcbiAgICBjaGFubmVsUHVycG9zZS5jbGFzc0xpc3QgPSAnb3B0aW9uc19fcHVycG9zZSc7XG4gICAgbGVmdEFyZWEuYXBwZW5kQ2hpbGQoY2hhbm5lbFB1cnBvc2UpO1xuXG4gICAgcmV0dXJuIGxlZnRBcmVhO1xufVxuXG5jb25zdCBjaGFubmVsRGV0YWlsc1JpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5nZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hhbm5lbERldGFpbHMsXG4gICAgY2hhbm5lbERldGFpbHNMZWZ0LFxuICAgIGNsZWFyQ2hhbm5lbFxufTsiLCIvLyBDbGVhcnMgZmllbGRzIGFmdGVyIHN1Ym1pc3Npb24gb2YgYSBmb3JtL2lucHV0XG5jb25zdCBjbGVhcklucHV0cyA9IChpZGVudGlmaWVyKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWRlbnRpZmllcn1gKS52YWx1ZSA9ICcnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xlYXJJbnB1dHM7IiwiY29uc3QgY3JlYXRlTmV3Q2hhbm5lbCA9IChlKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZGF0YWJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL2RhdGFiYXNlQ3JlYXRlJyk7XG4gICAgY29uc3QgbG9hZERhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3QgZGF0ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZGF0ZUdlbmVyYXRvcicpO1xuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZUlucHV0Jyk7XG4gICAgY29uc3QgcHVycG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwdXJwb3NlSW5wdXQnKTtcbiAgICBjb25zdCBkYXRlQ3JlYXRlZCA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBjb25zdCB1c2VycyA9IHt9O1xuICAgIGNvbnN0IG1lc3NhZ2VzID0ge307XG5cbiAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICBuYW1lOiBuYW1lLnZhbHVlLFxuICAgICAgICBwdXJwb3NlOiBwdXJwb3NlLnZhbHVlLFxuICAgICAgICBkYXRlQ3JlYXRlZDogZGF0ZUNyZWF0ZWQsXG4gICAgICAgIHVzZXJzOiB1c2VycyxcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXG4gICAgfTtcbiAgICBjbGVhcklucHV0cyhuYW1lLmlkKTtcbiAgICBjbGVhcklucHV0cyhwdXJwb3NlLmlkKTtcbiAgICBkYXRhYmFzZUNyZWF0ZShjaGFubmVsKTtcbiAgICByZXNldFNpZGViYXIoKTtcbiAgICBsb2FkRGF0YWJhc2UoKTtcbiAgICBjbG9zZUNyZWF0ZU5ld01vZGFsKCk7XG59XG5cbi8vIEhpZGVzIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY2xvc2VDcmVhdGVOZXdNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBjaGFubmVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbm5lbE1vZGFsJyk7XG4gICAgY2hhbm5lbE1vZGFsLmNsYXNzTGlzdCA9ICdoaWRlJztcbn1cblxuLy8gQWZ0ZXIgdXNlciBjcmVhdGVzIG5ldyBjaGFubmVsLCB0aGlzIHJlc2V0cyB0aGUgY2hhbm5lbCBzaWRlYmFyIHRvIHNob3cgcmVjZW50bHkgYWRkZWQgY2hhbm5lbFxuY29uc3QgcmVzZXRTaWRlYmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhcicpO1xuICAgIHNpZGViYXIuaW5uZXJIVE1MID0gJydcbiAgICAvLyBpZiAoc2lkZWJhci5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgc2lkZS5mb3JFYWNoKGMgPT4ge1xuICAgIC8vICAgICAgICAgd2hpbGUgKGMuZmlyc3RDaGlsZCkge1xuICAgIC8vICAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZU5ld0NoYW5uZWwsXG4gICAgY2xvc2VDcmVhdGVOZXdNb2RhbFxufTsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCJjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gKG1lc3NhZ2UpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHttZXNzYWdlLmNoYW5uZWx9L21lc3NhZ2VzLy5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgYWRkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgcmVhbHRpbWVBZGRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vcmVhbHRpbWVBZGRNZXNzYWdlcycpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vbWVzc2FnZXMvLmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsLFxuICAgIGFkZE1lc3NhZ2Vcbn07IiwiLy8gY3JlYXRlcyBhIG5ldyBjaGFubmVsIGluIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykuZGF0YWJhc2VQYXJzZTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIGRhdGFiYXNlUGFyc2UoZGF0YSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBsb2FkTWVzc2FnZXMgPSAoY2hhbm5lbCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VQYXJzZScpLm1lc3NhZ2VQYXJzZTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7Y2hhbm5lbH0vbWVzc2FnZXMuanNvbj9wcmludD1wcmV0dHlgLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIG1lc3NhZ2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxvYWREYXRhYmFzZSxcbiAgICBsb2FkTWVzc2FnZXNcbn0iLCIvLyBQYXJzZXMgdGhlIGRhdGEgbG9hZGVkIGZyb20gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3Qgc2lkZWJhclVzZXJzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBjaGFubmVscyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBbXTtcbiAgICBjaGFubmVscy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBpbmRpdkNoYW5uZWwgPSB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBuYW1lOiBkYXRhW2tleV0ubmFtZSxcbiAgICAgICAgICAgIHB1cnBvc2U6IGRhdGFba2V5XS5wdXJwb3NlLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtrZXldLmRhdGUsXG4gICAgICAgICAgICBtZXNzYWdlczogZGF0YVtrZXldLm1lc3NhZ2VzLFxuICAgICAgICAgICAgdXNlcnM6IGRhdGFba2V5XS51c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGFsbERhdGEucHVzaChpbmRpdkNoYW5uZWwpXG4gICAgfSlcbiAgICBzaWRlYmFyQ2hhbm5lbHMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxuLy8gUGFyc2VzIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gREIgdG8gcHJlcGFyZSBmb3IgcG9zdGluZ1xuY29uc3QgbWVzc2FnZVBhcnNlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZUxvYWQgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IHBvc3RTYXZlZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9wb3N0U2F2ZWRNZXNzYWdlcycpXG4gICAgY29uc3QgYWxsTWVzc2FnZXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZNZXNzYWdlID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdXNlcjogZGF0YVtrZXldLnVzZXIsXG4gICAgICAgICAgICBkYXRlOiBkYXRhW2tleV0uZGF0ZSxcbiAgICAgICAgICAgIHRleHQ6IGRhdGFba2V5XS50ZXh0LFxuICAgICAgICAgICAgbWVkaWE6IGRhdGFba2V5XS5tZWRpYVxuICAgICAgICB9XG4gICAgICAgIGFsbERhdGEucHVzaChpbmRpdk1lc3NhZ2UpXG4gICAgfSlcbiAgICBwb3N0U2F2ZWRNZXNzYWdlcyhhbGxEYXRhKVxuICAgIHJldHVybiBhbGxEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkYXRhYmFzZVBhcnNlLFxuICAgIG1lc3NhZ2VQYXJzZVxufTsiLCJjb25zdCB1cGRhdGVEYXRhYmFzZUNoYW5uZWwgPSAoY2hhbm5lbCwgdXNlcikgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vJHtjaGFubmVsLnRhYmxlfS8ke2NoYW5uZWwuY2hhbm5lbE5hbWV9L3VzZXJzLyR7dXNlci5pZH0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZURhdGFiYXNlQ2hhbm5lbDsiLCIvLyBHZW5lcmF0ZXMgdG9kYXkncyBkYXRlIGluIGV4IGZvcm1hdDogT2N0LCA3LCAxOTg5XG5jb25zdCBkYXRlR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhOYW1lc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bW9udGh9ICR7ZGF5fSwgJHt5ZWFyfWA7XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZUdlbmVyYXRvcjsiLCJjb25zdCBkaXJlY3RNZXNzYWdlVXNlciA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgb2ggaGV5IHRoZXJlLiB0aGlzIGZlYXR1cmUgaXNuJ3QgcmVhZHkgeWV0YClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3RNZXNzYWdlVXNlcjsiLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpbnB1dCBmaWVsZHNcbmNvbnN0IGlucHV0RmFjdG9yeSA9ICh0eXBlLCBpZGVudGlmaWVyLCBjbGFzc0xpc3QsIHBsYWNlaG9sZGVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZGVudGlmaWVyKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdClcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIFxuICAgIHJldHVybiBpbnB1dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRGYWN0b3J5O1xuIiwiLy8gR2VuZXJhdGVzIGxhYmVscyBmb3IgaW5wdXRzXG5jb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IChsYWJlbFRleHQpID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdpbnB1dF9fbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcblxuICAgIHJldHVybiBsYWJlbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dExhYmVsRmFjdG9yeTsiLCJjb25zdCBrZWVwTWVzc2FnZXNCb3R0b20gPSAoKSA9PiB7XG4gICAgbGV0IG1lc3NhZ2VCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2VzJyk7XG4gICAgbWVzc2FnZUJvZHkuc2Nyb2xsVG9wID0gOTk5OTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZWVwTWVzc2FnZXNCb3R0b207IiwiLy8gVE9ETzogaGF2ZSB0aGUgZGVmYXVsdCBjaGFubmVsIGJlIHRoZSBsYXN0IGFjdGl2ZSBjaGFubmVsXG4vLyBDdXJyZW50bHkgbG9hZHMgdGhlIHdhdGVyY29vbGVyIGNoYW5uZWwgYnkgZGVmYXVsdFxuY29uc3QgbG9hZERlZmF1bHRDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlsc0xlZnQgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHNMZWZ0O1xuICAgIGNvbnN0IGxvYWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZE1lc3NhZ2VzO1xuXG4gICAgY29uc3QgZmlyc3RDaGFubmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX2NoYW5uZWxzLS1saXN0JykuY2hpbGROb2Rlc1swXVxuICAgIGZpcnN0Q2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbiAgICBzZXRDdXJyZW50Q2hhbm5lbChmaXJzdENoYW5uZWwpXG4gICAgbG9hZE1lc3NhZ2VzKGZpcnN0Q2hhbm5lbC5pZClcblxufVxuXG4vLyBEZWxheSB0byBsb2FkIGRlZmF1bHQgY2hhbm5lbFxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBsb2FkRGVmYXVsdENoYW5uZWwoKTtcbiAgICB9LCA1MDApO1xuIH07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZERlZmF1bHRDaGFubmVsO1xuIiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbG9naW4gcGFnZVxuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdpZCcsICdsb2dpbk1vZGFsJylcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2xvZ2luJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChsb2dpbk1vZGFsQ29udGVudCgpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dpblVzZXJNb2RhbDtcblxuY29uc3QgbG9naW5Nb2RhbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGxvZ2luVXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ2luJyk7XG4gICAgY29uc3QgY3JlYXRlVXNlciA9IHJlcXVpcmUoJy4vdXNlckNyZWF0ZScpO1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbG9naW5Nb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBkaXNwbGF5TmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJEaXNwbGF5TmFtZScsICdsb2dpbl9faW5wdXQnLCAnRnVsbCBuYW1lJyk7XG4gICAgY29uc3QgZW1haWxJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRW1haWwnLCAnbG9naW5fX2lucHV0JywgJ3lvdUBleGFtcGxlLmNvbScpO1xuICAgIGNvbnN0IHBhc3NJbnB1dCA9IGlucHV0RmFjdG9yeSgncGFzc3dvcmQnLCAndXNlclBhc3MnLCAnbG9naW5fX2lucHV0JywgJ3Bhc3N3b3JkJyk7XG4gICAgY29uc3Qgc2lnblVwQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ3NpZ251cF9fYnV0dG9uJywnQ3JlYXRlIGFjY291bnQnLCBjcmVhdGVVc2VyKVxuXG4gICAgY29uc3QgbG9naW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbG9naW5CdXR0b24udGV4dENvbnRlbnQgPSAnT3IsIHNpZ24gaW4gdG8gZXhpc3RpbmcgYWNjb3VudCdcbiAgICBsb2dpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fYnV0dG9uJyk7XG4gICAgbG9naW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dpblVzZXIpO1xuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX2NvbnRlbnQnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZW1haWxJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwYXNzSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoc2lnblVwQnV0dG9uKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBsb2dpbk1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1NpZ24gaW4gdG8gc2xhY2snO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0dldCBzdGFydGVkIGNvbGxhYm9yYXRpbmcgd2l0aCB5b3VyIHRlYW1tYXRlcy4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59XG4iLCJjb25zdCBtZWRpYVVwbG9hZGVyID0gKCkgPT4ge1xuICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1maWxlXScpLmZpbGVzWzBdO1xuXG4gICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJldmlldy5zcmMgPSByZWFkZXIucmVzdWx0O1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGlmIChmaWxlKSB7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbn1cblxuY29uc3QgdXBsb2FkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZEZpbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1lZGlhVXBsb2FkZXIpOyIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG1lc3NhZ2VzXG5jb25zdCBtZXNzYWdlRmFjdG9yeSA9IChkYXRlLCBtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fcmlnaHQnKVxuICAgIGNvbnN0IHRpdGxlID0gbWVzc2FnZVRpdGxlKGRhdGUsIG1lc3NhZ2UudXNlci5lbWFpbCk7XG4gICAgY29uc3QgYXZhdGFyID0gbWVzc2FnZUF2YXRhcigpO1xuICAgIG1lc3NhZ2VTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZScpXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fYm9keScpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBtZXNzYWdlLnRleHQ7XG4gICAgXG4gICAgYm9keS5hcHBlbmRDaGlsZCh0aXRsZSlcbiAgICBib2R5LmFwcGVuZENoaWxkKHRleHQpXG4gICAgXG4gICAgbWVzc2FnZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChhdmF0YXIpXG4gICAgbWVzc2FnZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChib2R5KTtcblxuICAgIHJldHVybiBtZXNzYWdlU3RydWN0dXJlO1xufVxuXG4vLyBUT0RPOiBzd2FwIGVtYWlsIHcvIGRpc3BsYXlOYW1lXG4vLyBUT0RPOiBkYXRlIG5lZWRzIHRvIGRpc3BsYXkgZm9yIGRhdGUgcG9zdGVkIGlmIG1lc3NhZ2UgYWxyZWFkeSBleGlzdHNcbmNvbnN0IG1lc3NhZ2VUaXRsZSA9IChkYXRlLCB1c2VyKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1lc3NhZ2VUaXRsZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZScpXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBkaXNwbGF5TmFtZS50ZXh0Q29udGVudCA9IHVzZXI7XG4gICAgY29uc3QgcG9zdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBwb3N0RGF0ZS50ZXh0Q29udGVudCA9IGRhdGU7XG4gICAgZGlzcGxheU5hbWUuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fdGl0bGUtLXVzZXInKTtcbiAgICBwb3N0RGF0ZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZS0tZGF0ZScpO1xuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChkaXNwbGF5TmFtZSlcbiAgICBtZXNzYWdlVGl0bGUuYXBwZW5kQ2hpbGQocG9zdERhdGUpXG4gICAgXG4gICAgcmV0dXJuIG1lc3NhZ2VUaXRsZTtcbn1cblxuY29uc3QgbWVzc2FnZUF2YXRhciA9ICgpID0+IHtcbiAgICBjb25zdCBhdmF0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBhdmF0YXIuc3JjID0gJ2ltZy9hdmF0YXIucG5nJ1xuICAgIGF2YXRhci5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlc19fYXZhdGFyJylcbiAgICByZXR1cm4gYXZhdGFyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVzc2FnZUZhY3Rvcnk7IiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2lkJywnY2hhbm5lbE1vZGFsJylcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBjcmVhdGVDaGFubmVsQ29udGVudCgpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbCcpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXdDaGFubmVsTW9kYWw7XG5cbi8vIENyZWF0ZXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGNyZWF0ZUNoYW5uZWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRMYWJlbEZhY3RvcnknKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gcmVxdWlyZSgnLi9jcmVhdGVOZXdDaGFubmVsJykuY3JlYXRlTmV3Q2hhbm5lbDtcbiAgICBjb25zdCBjbG9zZUNyZWF0ZU5ld01vZGFsID0gcmVxdWlyZSgnLi9jcmVhdGVOZXdDaGFubmVsJykuY2xvc2VDcmVhdGVOZXdNb2RhbDtcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQnKVxuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgbmFtZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ05hbWUnKTtcbiAgICBjb25zdCBwdXJwb3NlTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnUHVycG9zZScpO1xuXG4gICAgY29uc3QgbmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ25hbWVJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsICdlLmcuIG1hcmtldGluZycpO1xuICAgIGNvbnN0IHB1cnBvc2VJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdwdXJwb3NlSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCBgRW50ZXIgY2hhbm5lbCBwdXJwb3NlLi5gKTtcblxuICAgIGNvbnN0IG1vZGFsQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbEFjdGlvbnMuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tYWN0aW9ucycpXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNhbmNlbCcsJ0NhbmNlbCcsIGNsb3NlQ3JlYXRlTmV3TW9kYWwpXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNyZWF0ZScsJ0NyZWF0ZSBjaGFubmVsJywgY3JlYXRlTmV3Q2hhbm5lbClcblxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNyZWF0ZUJ1dHRvbilcblxuICAgIC8vIE5lZWRzIHJlZmFjdG9yaW5nIC0gcmVhbGx5IHJlcGV0aXRpdmVcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChtb2RhbEFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRTdHJ1Y3R1cmU7XG59XG5cbi8vIHRpdGxlIGNvbnRlbnQgZm9yIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbW9kYWxUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQ3JlYXRlIG5ldyBjaGFubmVsJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdDaGFubmVscyBhcmUgd2hlcmUgeW91ciBtZW1iZXJzIGNvbW11bmljYXRlLiBUaGV54oCZcmUgYmVzdCB3aGVuIG9yZ2FuaXplZCBhcm91bmQgYSB0b3BpYyDigJQgI2xlYWRzLCBmb3IgZXhhbXBsZS4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX3RpdGxlJyk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0aXRsZVN0cnVjdHVyZTtcbn0iLCJjb25zdCBuZXdVc2VyQWRkZWRUb0NoYW5uZWwgPSAodXNlcikgPT4ge1xuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKTtcbiAgICBjb25zdCBwb3N0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgIGNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2VUb0NoYW5uZWw7XG4gICAgY29uc3QgbWVzc2FnZUZhY3RvcnkgPSByZXF1aXJlKCcuL21lc3NhZ2VGYWN0b3J5JylcbiAgICBjb25zdCBhZGRNZXNzYWdlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUFkZE1lc3NhZ2UnKS5hZGRNZXNzYWdlO1xuICAgIGNvbnN0IGNoYW5uZWwgPSAnd2F0ZXJjb29sZXInO1xuICAgIGNvbnN0IHRleHQgPSBgam9pbmVkICMke2NoYW5uZWx9YFxuICAgIFxuICAgIGNvbnN0IGRhdGUgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgbWVkaWEgPSAnJztcblxuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSB7XG4gICAgICAgIGNoYW5uZWw6ICctTEJONV9za3g1MUw3aEpRcDVSMScsXG4gICAgICAgIHVzZXIsXG4gICAgICAgIGRhdGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIG1lZGlhXG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VTdHJ1Y3R1cmUgPSBtZXNzYWdlRmFjdG9yeShkYXRlLCBuZXdNZXNzYWdlKVxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGFkZE1lc3NhZ2VUb0NoYW5uZWwobmV3TWVzc2FnZSlcbiAgICBhZGRNZXNzYWdlKG5ld01lc3NhZ2UpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3VXNlckFkZGVkVG9DaGFubmVsOyIsIi8vIEFsbG93cyB1c2VyIHRvIGNyZWF0ZSBhbmQgcG9zdCBhIG5ldyBtZXNzYWdlXG5jb25zdCBwb3N0TWVzc2FnZSA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJylcbiAgICBjb25zdCBhZGRNZXNzYWdlVG9DaGFubmVsID0gcmVxdWlyZSgnLi9kYXRhYmFzZUFkZE1lc3NhZ2UnKS5hZGRNZXNzYWdlVG9DaGFubmVsO1xuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2U7XG4gICAgY29uc3Qga2VlcE1lc3NhZ2VzQm90dG9tID0gcmVxdWlyZSgnLi9rZWVwTWVzc2FnZXNCb3R0b20nKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS52YWx1ZVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgdXNlciA9IGdldEN1cnJlbnRVc2VyKClcbiAgICBjb25zdCB1c2VySUQgPSB1c2VyLnVpZDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBcbiAgICBjb25zdCBuZXdNZXNzYWdlID0ge1xuICAgICAgICBjaGFubmVsOiBjaGFubmVsLmlkLFxuICAgICAgICB1c2VyLFxuICAgICAgICBkYXRlLFxuICAgICAgICB0ZXh0LFxuICAgICAgICBtZWRpYVxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gbWVzc2FnZUZhY3RvcnkoZGF0ZSwgbmV3TWVzc2FnZSlcblxuICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIGNsZWFySW5wdXRzKCd3cml0ZU1lc3NhZ2UnKVxuXG4gICAgYWRkTWVzc2FnZVRvQ2hhbm5lbChuZXdNZXNzYWdlKVxuICAgIGFkZE1lc3NhZ2UobmV3TWVzc2FnZSlcbiAgICBrZWVwTWVzc2FnZXNCb3R0b20oKTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXIgd2FpdGluZyBmb3IgdXNlciB0byBoaXQgJ2VudGVyJyBiZWZvcmUgcG9zdGluZyBuZXcgbWVzc2FnZVxuY29uc3Qgc3VibWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSAxMykge1xuICAgICAgICBwb3N0TWVzc2FnZSgpO1xuICAgIH1cbn0pOyIsIi8vIEFwcGVuZHMgbmV3IG1lc3NhZ2UgdG8gI21lc3NhZ2UgZGl2IGluIERPTVxuY29uc3QgcG9zdE1lc3NhZ2UgPSAoYWxsTWVzc2FnZXMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlRmFjdG9yeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUZhY3RvcnknKVxuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgYWxsTWVzc2FnZXMuZm9yRWFjaChtZXNzID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG1lc3MuZGF0ZTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3M7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VTdHJ1Y3R1cmUgPSBtZXNzYWdlRmFjdG9yeShkYXRlLCBtZXNzYWdlKVxuICAgICAgICBwb3N0QXJlYS5hcHBlbmRDaGlsZChtZXNzYWdlU3RydWN0dXJlKTtcbiAgICB9KVxuICAgIHBvc3RBcmVhLnNjcm9sbFRvcCA9IDk5OTk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zdE1lc3NhZ2U7IiwiLy8gTk9UIFdPUktJTkcgLS0gTkVFRCBUTyBGSVhcblxuLy8gTGlzdGVuaW5nIGZvciB1cGRhdGVzIGluIHRoZSBkYXRhYmFzZSB0byBwb3N0IHRvIERPTSBmb3IgYWxsIHVzZXJzXG5jb25zdCByZWFsdGltZUFkZE1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIGxldCBkYXRhYmFzZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBjaGFubmVsL2ApO1xuICAgIGRhdGFiYXNlUmVmLm9uKCd2YWx1ZScsIHNuYXAgPT4ge1xuICAgICAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IHNuYXAudmFsKCk7XG4gICAgICAgIGNvbnN0IGtleUFycmF5ID0gT2JqZWN0LmtleXMobWVzc2FnZXMpXG4gICAgICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBtZXNzYWdlcy5jaGFubmVsLm1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzID0gW107XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRpdk1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHVzZXI6IG1lc3NhZ2VzW2tleV0udXNlcixcbiAgICAgICAgICAgICAgICBkYXRlOiBtZXNzYWdlc1trZXldLmRhdGUsXG4gICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZXNba2V5XS50ZXh0LFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZXNzYWdlc1trZXldLm1lZGlhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxNZXNzYWdlcy5wdXNoKGluZGl2TWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICAgICAgdmVyaWZ5VXNlcihuZXdNZXNzYWdlKVxuICAgICAgICBwb3N0TmV3VXNlck1lc3NhZ2UoY2hhbm5lbCwgbmV3TWVzc2FnZSk7XG4gICAgfSlcbn1cblxuY29uc3QgdmVyaWZ5VXNlciA9IChuZXdNZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgZ2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLmdldEN1cnJlbnRVc2VyO1xuICAgIGNvbnN0IHVzZXJUaGF0UG9zdGVkTWVzc2FnZSA9IG5ld01lc3NhZ2UudXNlcjtcbiAgICBjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyKCkudWlkO1xuICAgIGlmICh1c2VyVGhhdFBvc3RlZE1lc3NhZ2UgIT09IGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIC8vIHBvc3ROZXdVc2VyTWVzc2FnZShuZXdNZXNzYWdlKVxuICAgICAgICBjb25zb2xlLmxvZygnc2FtZSB1c2VyJylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzYW1lIHVzZXInKVxuICAgIH1cbn1cblxuLy8gY29uc3QgcG9zdE5ld1VzZXJNZXNzYWdlID0gKGNoYW5uZWwpID0+IHtcbi8vICAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWRNZXNzYWdlcztcbi8vICAgICBjb25zdCBwcmludEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWVzc2FnZXMnKTtcbi8vICAgICBwcmludEFyZWEuZm9yRWFjaChtID0+IHtcbi8vICAgICAgICAgd2hpbGUgKG0uZmlyc3RDaGlsZCkge1xuLy8gICAgICAgICAgICAgbS5yZW1vdmVDaGlsZChtLmZpcnN0Q2hpbGQpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgICBsb2FkTWVzc2FnZXMoY2hhbm5lbCk7XG4vLyB9XG5cbi8vIG1vZHVsZS5leHBvcnRzID0gcmVhbHRpbWVBZGRNZXNzYWdlczsiLCIvLyBDcmVhdGVzIGNoYW5uZWxzIGNvbXBvbmVudCBmb3Igc2lkZWJhclxuY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCBjaGFubmVsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGNoYW5uZWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJVc2VycyA9IHJlcXVpcmUoJy4vc2lkZWJhclVzZXJzJyk7XG4gICAgY29uc3Qgc2lkZWJhclN0cnVjdHVyZSA9IHJlcXVpcmUoJy4vc2lkZWJhclN0cnVjdHVyZScpO1xuICAgIGNvbnN0IGNoYW5nZUNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5nZUNoYW5uZWwnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBjaGFubmVsc0hlYWRlcigpO1xuXG5cbiAgICBhbGxEYXRhLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdpZCcsIGMua2V5KVxuICAgICAgICBjaGFubmVsUm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wdXJwb3NlJywgYy5wdXJwb3NlKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZUNoYW5uZWwpXG4gICAgICAgIGNoYW5uZWxSb3cuY2xhc3NMaXN0ID0gJ2luZGl2aWR1YWwtY2hhbm5lbCdcbiAgICAgICAgY29uc3QgaGFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBoYXNoLnNyYyA9ICdpbWcvaGFzaC5wbmcnXG5cbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBjaGFubmVsLnRleHRDb250ZW50ID0gYy5uYW1lO1xuXG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoaGFzaCk7XG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoY2hhbm5lbCk7XG4gICAgICAgIGNoYW5uZWxMaXN0LmFwcGVuZENoaWxkKGNoYW5uZWxSb3cpO1xuICAgIH0pXG4gICAgY2hhbm5lbExpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1saXN0JztcblxuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGNoYW5uZWxMaXN0KTtcblxuICAgIHNpZGViYXJTdHJ1Y3R1cmUoY2hhbm5lbENvbXBvbmVudClcbiAgICBzaWRlYmFyVXNlcnMoYWxsRGF0YSlcbn1cblxuY29uc3QgY2hhbm5lbHNIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeSA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeUljb24nKTtcbiAgICBjb25zdCBuZXdDaGFubmVsTW9kYWwgPSByZXF1aXJlKCcuL25ld0NoYW5uZWxNb2RhbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzJ1xuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgbmV3Q2hhbm5lbE1vZGFsKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyQ2hhbm5lbHM7IiwiY29uc3QgZHJvcGRvd25Db250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgZ2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLmdldEN1cnJlbnRVc2VyO1xuICAgIGNvbnN0IHVzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHVzZXIudGV4dENvbnRlbnQgPSBnZXRDdXJyZW50VXNlcigpLmVtYWlsO1xuICAgIHVzZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2Ryb3Bkb3duLS11c2VyJztcbiAgICBjb25zdCBvcHRpb25zID0gWydQcm9maWxlICYgYWNjb3VudCcsICdQcmVmZXJlbmNlcycsICdTaWduIG91dCddXG4gICAgY29uc3Qgb3B0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBvcHRpb25MaXN0LmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX2Ryb3Bkb3duLS1vcHRpb25MaXN0JylcbiAgICBvcHRpb25zLmZvckVhY2gobyA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gbztcbiAgICAgICAgb3B0aW9uLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19kcm9wZG93bi0tb3B0aW9uJ1xuICAgICAgICBpZiAobyA9PT0gJ1NpZ24gb3V0Jykge1xuICAgICAgICAgICAgY29uc3QgbG9nb3V0VXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ291dCcpXG4gICAgICAgICAgICBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dvdXRVc2VyKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25MaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSlcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKHVzZXIpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmNvbnN0IHNpZGViYXJEcm9wZG93biA9IChldnQpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnaWQnLCAnZHJvcGRvd25CYWNrZ3JvdW5kJylcbiAgICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX2Ryb3Bkb3duLS1iYWNrZ3JvdW5kJyk7XG4gICAgYmFja2dyb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlU2lkZWJhckRyb3Bkb3duKTtcblxuICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRyb3Bkb3duLnNldEF0dHJpYnV0ZSgnaWQnLCAnYWNjb3VudE9wdGlvbnMnKTtcbiAgICBkcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX19kcm9wZG93bicpO1xuXG4gICAgY29uc3QgY29udGVudCA9IGRyb3Bkb3duQ29udGVudCgpO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKVxuICAgIGRyb3Bkb3duLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZHJvcGRvd24pXG59XG5cbmNvbnN0IGNsb3NlU2lkZWJhckRyb3Bkb3duID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjY291bnRPcHRpb25zJyk7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wZG93bkJhY2tncm91bmQnKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQobW9kYWwpXG4gICAgYm9keS5yZW1vdmVDaGlsZChiYWNrZ3JvdW5kKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyRHJvcGRvd247IiwiY29uc3Qgc2lkZWJhckhlYWQgPSAodXNlcikgPT4ge1xuICAgIGNvbnN0IHNpZGViYXJEcm9wZG93biA9IHJlcXVpcmUoJy4vc2lkZWJhckRyb3Bkb3duJyk7XG4gICAgY29uc3QgdXNlckxvZ291dCA9IHJlcXVpcmUoJy4vdXNlckxvZ291dCcpXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyJztcbiAgICBoZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaWRlYmFyRHJvcGRvd24pO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBoZWFkZXJDb250ZW50KHVzZXIpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICBzaWRlYmFyLmluc2VydEJlZm9yZShoZWFkZXIsIHNpZGViYXIuZmlyc3RDaGlsZClcbn07XG5cbmNvbnN0IGhlYWRlckNvbnRlbnQgPSAodXNlcikgPT4ge1xuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyQ29udGVudC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyLS1jb250ZW50J1xuICAgIGhlYWRlckNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGhlYWRlclRleHQudGV4dENvbnRlbnQgPSB1c2VyLmVtYWlsO1xuICAgIGhlYWRlclRleHQuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2hlYWRlci0tbmFtZSdcbiAgICBoZWFkZXJUZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCAnc2lkZWJhckhlYWRlcicpXG4gICAgY29uc3QgaGVhZGVyRHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhlYWRlckRyb3AuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2hlYWRlci0taWNvbidcbiAgICBoZWFkZXJEcm9wLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2lkZWJhckhlYWRlcicpXG4gICAgaGVhZGVyRHJvcC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBkcm9wXCIgaWQ9XCJzaWRlYmFySGVhZGVyXCI+a2V5Ym9hcmRfYXJyb3dfZG93bjwvaT4nXG4gICAgaGVhZGVyQ29udGVudC5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXJDb250ZW50LmFwcGVuZENoaWxkKGhlYWRlckRyb3ApO1xuXG4gICAgcmV0dXJuIGhlYWRlckNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckhlYWQ7IiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgc2lkZWJhclxuY29uc3QgY3JlYXRlU2lkZWJhciA9IChjaGFubmVsQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBsb2dvdXRVc2VyID0gcmVxdWlyZSgnLi91c2VyTG9nb3V0Jyk7XG4gICAgLy8gc2lkZWJhci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoY2hhbm5lbENvbXBvbmVudCk7XG4gICAgLy8gc2lkZWJhci5hcHBlbmRDaGlsZChhY2NvdW50VXNlcnMpO1xufSBcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaWRlYmFyOyIsImNvbnN0IHNpZGViYXJVc2VyQ29tcG9uZW50ID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCB1c2VyQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHVzZXJMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJTdHJ1Y3R1cmUgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgY29uc3QgZGlyZWN0TWVzc2FnZVVzZXIgPSByZXF1aXJlKCcuL2RpcmVjdE1lc3NhZ2VVc2VyJyk7XG4gICAgY29uc3QgcHJpbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKVxuICAgIGNvbnN0IGhlYWRlciA9IHVzZXJzSGVhZGVyKCk7XG4gICAgY29uc3Qgd2F0ZXJjb29sZXIgPSBhbGxEYXRhWzBdLnVzZXJzXG4gICAgbGV0IHVzZXJzID0gW11cblxuICAgIGZvcihsZXQga2V5IGluIHdhdGVyY29vbGVyKSB7XG4gICAgICAgIHVzZXJzLnB1c2god2F0ZXJjb29sZXJba2V5XSk7XG4gICAgfVxuXG4gICAgdXNlcnMuZm9yRWFjaCh1ID0+IHtcbiAgICAgICAgY29uc3QgdXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdXNlclJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgdS5pZClcbiAgICAgICAgdXNlclJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpcmVjdE1lc3NhZ2VVc2VyKVxuICAgICAgICB1c2VyUm93LmNsYXNzTGlzdCA9ICdpbmRpdmlkdWFsLXVzZXInXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBzdGF0dXMuc3JjID0gJ2ltZy9vbmxpbmUucG5nJ1xuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgdXNlci50ZXh0Q29udGVudCA9IHUuZW1haWw7XG5cbiAgICAgICAgdXNlclJvdy5hcHBlbmRDaGlsZChzdGF0dXMpO1xuICAgICAgICB1c2VyUm93LmFwcGVuZENoaWxkKHVzZXIpO1xuICAgICAgICB1c2VyTGlzdC5hcHBlbmRDaGlsZCh1c2VyUm93KTtcbiAgICB9KVxuICAgIHVzZXJMaXN0LmNsYXNzTGlzdCA9ICdzaWRlYmFyX191c2Vycy0tbGlzdCc7XG5cbiAgICB1c2VyQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgdXNlckNvbXBvbmVudC5hcHBlbmRDaGlsZCh1c2VyTGlzdCk7XG4gICAgcHJpbnRBcmVhLmFwcGVuZENoaWxkKHVzZXJDb21wb25lbnQpXG59XG5cbmNvbnN0IHVzZXJzSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0RpcmVjdCBNZXNzYWdlcydcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyVXNlckNvbXBvbmVudDsiLCIvLyBDaGVja2luZyB3aGV0aGVyIG9yIG5vdCB1c2VyIGlzIGxvZ2dlZCBpblxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGZpcmViYXNlVXNlciA9PiB7XG4gICAgaWYgKGZpcmViYXNlVXNlcikge1xuICAgICAgICBjdXJyZW50VXNlciA9IGZpcmViYXNlVXNlcjtcbiAgICAgICAgY29uc3Qgc2lkZWJhckhlYWQgPSByZXF1aXJlKCcuL3NpZGViYXJIZWFkJyk7XG4gICAgICAgIGNvbnN0IGxvZ2luTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Nb2RhbCcpO1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgc2lkZWJhckhlYWQoY3VycmVudFVzZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSlcblxuY29uc3QgZ2V0Q3VycmVudFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG5jb25zdCBzZXRDdXJyZW50VXNlciA9ICh1c2VyKSA9PiB7XG4gICAgY3VycmVudFVzZXIgPSB1c2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDdXJyZW50VXNlcixcbiAgICBzZXRDdXJyZW50VXNlclxufTsiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGVmYXVsdENoYW5uZWwgPSByZXF1aXJlKCcuL2FkZFRvQ2hhbm5lbCcpXG4gICAgY29uc3Qgc2V0Q3VycmVudFVzZXIgPSByZXF1aXJlKCcuL3VzZXJDaGVjaycpLnNldEN1cnJlbnRVc2VyXG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgbmV3VXNlckFkZGVkVG9DaGFubmVsID0gcmVxdWlyZSgnLi9uZXdVc2VyQWRkZWRUb0NoYW5uZWwnKTtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRW1haWwnKS52YWx1ZTtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRGlzcGxheU5hbWUnKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJQYXNzJykudmFsdWU7XG4gICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcblxuICAgIGNsZWFySW5wdXRzKCd1c2VyRW1haWwnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyUGFzcycpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJEaXNwbGF5TmFtZScpXG5cbiAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgc2V0Q3VycmVudFVzZXIodXNlcilcbiAgICAgICAgYWRkVG9EZWZhdWx0Q2hhbm5lbCh1c2VyKVxuICAgICAgICBuZXdVc2VyQWRkZWRUb0NoYW5uZWwodXNlcik7XG4gICAgfSlcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVVzZXI7IiwiLy8gTG9ncyB1c2VyIGludG8gcHJvZHVjdFxuY29uc3QgbG9naW5Vc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKTtcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG4gXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlcjsiLCIvLyBMb2dzIG91dCB1c2VyXG5jb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjY291bnRPcHRpb25zJyk7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wZG93bkJhY2tncm91bmQnKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQobW9kYWwpXG4gICAgYm9keS5yZW1vdmVDaGlsZChiYWNrZ3JvdW5kKTtcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dFVzZXI7Il19
