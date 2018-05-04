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
    const sidebar = document.querySelector('#sidebar')
    const sidebarHeader = document.querySelector('#sidebarHeader')

    const modal = document.querySelector('#accountOptions');
    const background = document.querySelector('#dropdownBackground');
    const body = document.querySelector('body');
    sidebar.removeChild(sidebarHeader);
    body.removeChild(modal)
    body.removeChild(background);
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkZFRvQ2hhbm5lbC5qcyIsInNjcmlwdHMvYXBwLmpzIiwic2NyaXB0cy9idXR0b25GYWN0b3J5SWNvbi5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeVRleHQuanMiLCJzY3JpcHRzL2NoYW5nZUNoYW5uZWwuanMiLCJzY3JpcHRzL2NoYW5uZWxDaGVjay5qcyIsInNjcmlwdHMvY2hhbm5lbERldGFpbHMuanMiLCJzY3JpcHRzL2NsZWFySW5wdXRzLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9jcmVhdGVOZXdQb3N0LmpzIiwic2NyaXB0cy9kYXRhYmFzZUFkZE1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZU1lc3NhZ2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9kaXJlY3RNZXNzYWdlVXNlci5qcyIsInNjcmlwdHMvaW5wdXRGYWN0b3J5LmpzIiwic2NyaXB0cy9pbnB1dExhYmVsRmFjdG9yeS5qcyIsInNjcmlwdHMva2VlcE1lc3NhZ2VzQm90dG9tLmpzIiwic2NyaXB0cy9sb2FkRGVmYXVsdENoYW5uZWwuanMiLCJzY3JpcHRzL2xvZ2luU2NyZWVuLmpzIiwic2NyaXB0cy9tZWRpYVVwbG9hZGVyLmpzIiwic2NyaXB0cy9tZXNzYWdlRmFjdG9yeS5qcyIsInNjcmlwdHMvbmV3Q2hhbm5lbE1vZGFsLmpzIiwic2NyaXB0cy9uZXdVc2VyQWRkZWRUb0NoYW5uZWwuanMiLCJzY3JpcHRzL3Bvc3ROZXdNZXNzYWdlcy5qcyIsInNjcmlwdHMvcG9zdFNhdmVkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3JlYWx0aW1lQWRkTWVzc2FnZXMuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhckRyb3Bkb3duLmpzIiwic2NyaXB0cy9zaWRlYmFySGVhZC5qcyIsInNjcmlwdHMvc2lkZWJhclN0cnVjdHVyZS5qcyIsInNjcmlwdHMvc2lkZWJhclVzZXJzLmpzIiwic2NyaXB0cy91c2VyQ2hlY2suanMiLCJzY3JpcHRzL3VzZXJDcmVhdGUuanMiLCJzY3JpcHRzL3VzZXJMb2dpbi5qcyIsInNjcmlwdHMvdXNlckxvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWRkVG9EZWZhdWx0Q2hhbm5lbCA9IChuZXdVc2VyKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlVXBkYXRlJyk7XG4gICAgY29uc3QgdGFibGUgPSAnY2hhbm5lbCc7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSAnLUxCTjVfc2t4NTFMN2hKUXA1UjEnO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgdGFibGUsXG4gICAgICAgIGNoYW5uZWxOYW1lXG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgaWQ6IG5ld1VzZXIudWlkLFxuICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGltZzogJycsXG4gICAgfVxuICAgIGRhdGFiYXNlKGNoYW5uZWwsIHVzZXIpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkVG9EZWZhdWx0Q2hhbm5lbDsiLCJjb25zdCBsb2FkREIgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gcmVxdWlyZSgnLi9sb2dpblNjcmVlbicpO1xuLy8gY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHM7XG5cbmxvYWREQigpO1xubG9naW5Vc2VyTW9kYWwoKTtcbi8vIGNoYW5uZWxEZXRhaWxzKCk7XG5cblxuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIEFsbG93cyB1c2VyIHRvIGNoYW5nZSBjaGFubmVsIGFuZCBhZGRzIHN0eWxpbmcgb24gdGhlIHNpZGUgYmFyXG5jb25zdCBjaGFuZ2VDaGFubmVsID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHNldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5zZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsRGV0YWlscyA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlsc0xlZnQ7XG4gICAgY29uc3QgbG9hZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkTWVzc2FnZXM7XG4gICAgY29uc3QgY2xlYXJDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsRGV0YWlscycpLmNsZWFyQ2hhbm5lbDtcbiAgICBjb25zdCBhbGxDaGFubmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmRpdmlkdWFsLWNoYW5uZWwnKTtcbiAgICBsZXQgY2xpY2tlZENoYW5uZWwgPSBldnQudGFyZ2V0XG5cbiAgICBpZiAoIWNsaWNrZWRDaGFubmVsLmlkKSB7XG4gICAgICAgIGNsaWNrZWRDaGFubmVsID0gZXZ0LnBhdGhbMV1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDaGFubmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmVDaGFubmVsJykpIHtcbiAgICAgICAgICAgIGFsbENoYW5uZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZUNoYW5uZWwnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhck1lc3NhZ2VzKCk7XG4gICAgY2xpY2tlZENoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpXG4gICAgY2xlYXJDaGFubmVsKCk7XG4gICAgc2V0Q3VycmVudENoYW5uZWwoY2xpY2tlZENoYW5uZWwpXG4gICAgbG9hZE1lc3NhZ2VzKGNsaWNrZWRDaGFubmVsLmlkKVxufVxuXG4vLyBXaGVuIHVzZXIgY2hhbmdlcyBjaGFubmVscywgdGhpcyBjbGVhcnMgdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG9sZCBjaGFubmVsXG5jb25zdCBjbGVhck1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtZXNzYWdlcycpO1xuICAgIHByaW50QXJlYS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5nZUNoYW5uZWw7IiwiLy8gQ2hlY2tpbmcgd2hhdCBjaGFubmVsIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBpblxubGV0IGN1cnJlbnRDaGFubmVsID0gbnVsbDtcblxuLy8gT24gY2hhbm5lbCBjaGFuZ2UsIHRoaXMgc2V0cyB0aGUgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBzZXRDdXJyZW50Q2hhbm5lbCA9IChjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbERldGFpbHMgPSByZXF1aXJlKCcuL2NoYW5uZWxEZXRhaWxzJykuY2hhbm5lbERldGFpbHM7XG4gICAgY3VycmVudENoYW5uZWwgPSBjaGFubmVsO1xuICAgIGNoYW5uZWxEZXRhaWxzKCk7XG59XG5cbi8vIENhbGxlZCB0byBnZXQgdGhlIGN1cnJlbnQgY2hhbm5lbCB0aGF0IHRoZSB1c2VyIGlzIGluXG5jb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudENoYW5uZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRDaGFubmVsLFxuICAgIHNldEN1cnJlbnRDaGFubmVsXG59OyIsImNvbnN0IGNoYW5uZWxEZXRhaWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zJylcbiAgICBjb25zdCBsZWZ0QXJlYSA9IGNoYW5uZWxEZXRhaWxzTGVmdCgpO1xuICAgIGNvbnN0IHJpZ2h0QXJlYSA9IGNoYW5uZWxEZXRhaWxzUmlnaHQoKTtcblxuICAgIHByaW50QXJlYS5hcHBlbmRDaGlsZChsZWZ0QXJlYSk7XG4gICAgLy8gcHJpbnRBcmVhLmFwcGVuZENoaWxkKHJpZ2h0QXJlYSk7XG5cbn1cblxuY29uc3QgY2xlYXJDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjb3B0aW9uc0xlZnQnKTtcbiAgICBjaGFubmVsLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHdoaWxlIChjLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGMucmVtb3ZlQ2hpbGQoYy5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzTGVmdCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5nZXRDdXJyZW50Q2hhbm5lbDtcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0Q3VycmVudENoYW5uZWwoKTtcblxuICAgIGNvbnN0IGxlZnRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxlZnRBcmVhLmNoaWxkTGlzdCA9ICdvcHRpb25zX19sZWZ0J1xuICAgIGxlZnRBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdvcHRpb25zTGVmdCcpXG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGNoYW5uZWxOYW1lLmNsYXNzTGlzdCA9ICdvcHRpb25zX19jaGFubmVsJ1xuICAgIGNoYW5uZWxOYW1lLmlubmVySFRNTCA9IGAjJHtjaGFubmVsLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnR9YDtcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsTmFtZSk7XG5cbiAgICBjb25zdCBjaGFubmVsUHVycG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjaGFubmVsUHVycG9zZS50ZXh0Q29udGVudCA9IGNoYW5uZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXB1cnBvc2UnKVxuICAgIGNoYW5uZWxQdXJwb3NlLmNsYXNzTGlzdCA9ICdvcHRpb25zX19wdXJwb3NlJztcbiAgICBsZWZ0QXJlYS5hcHBlbmRDaGlsZChjaGFubmVsUHVycG9zZSk7XG5cbiAgICByZXR1cm4gbGVmdEFyZWE7XG59XG5cbmNvbnN0IGNoYW5uZWxEZXRhaWxzUmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLmdldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjaGFubmVsRGV0YWlscyxcbiAgICBjaGFubmVsRGV0YWlsc0xlZnQsXG4gICAgY2xlYXJDaGFubmVsXG59OyIsIi8vIENsZWFycyBmaWVsZHMgYWZ0ZXIgc3VibWlzc2lvbiBvZiBhIGZvcm0vaW5wdXRcbmNvbnN0IGNsZWFySW5wdXRzID0gKGlkZW50aWZpZXIpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVudGlmaWVyfWApLnZhbHVlID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhcklucHV0czsiLCJjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKGUpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBsb2FkRGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpLmxvYWREYXRhYmFzZTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lSW5wdXQnKTtcbiAgICBjb25zdCBwdXJwb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1cnBvc2VJbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVDcmVhdGVkID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIGNvbnN0IHVzZXJzID0ge307XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7fTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsdWUsXG4gICAgICAgIHB1cnBvc2U6IHB1cnBvc2UudmFsdWUsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBkYXRlQ3JlYXRlZCxcbiAgICAgICAgdXNlcnM6IHVzZXJzLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcbiAgICB9O1xuICAgIGNsZWFySW5wdXRzKG5hbWUuaWQpO1xuICAgIGNsZWFySW5wdXRzKHB1cnBvc2UuaWQpO1xuICAgIGRhdGFiYXNlQ3JlYXRlKGNoYW5uZWwpO1xuICAgIHJlc2V0U2lkZWJhcigpO1xuICAgIGxvYWREYXRhYmFzZSgpO1xuICAgIGNsb3NlQ3JlYXRlTmV3TW9kYWwoKTtcbn1cblxuLy8gSGlkZXMgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjbG9zZUNyZWF0ZU5ld01vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsTW9kYWwnKTtcbiAgICBjaGFubmVsTW9kYWwuY2xhc3NMaXN0ID0gJ2hpZGUnO1xufVxuXG4vLyBBZnRlciB1c2VyIGNyZWF0ZXMgbmV3IGNoYW5uZWwsIHRoaXMgcmVzZXRzIHRoZSBjaGFubmVsIHNpZGViYXIgdG8gc2hvdyByZWNlbnRseSBhZGRlZCBjaGFubmVsXG5jb25zdCByZXNldFNpZGViYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJyk7XG4gICAgc2lkZWJhci5pbm5lckhUTUwgPSAnJ1xuICAgIC8vIGlmIChzaWRlYmFyLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgIC8vICAgICBzaWRlLmZvckVhY2goYyA9PiB7XG4gICAgLy8gICAgICAgICB3aGlsZSAoYy5maXJzdENoaWxkKSB7XG4gICAgLy8gICAgICAgICAgICAgYy5yZW1vdmVDaGlsZChjLmZpcnN0Q2hpbGQpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlTmV3Q2hhbm5lbCxcbiAgICBjbG9zZUNyZWF0ZU5ld01vZGFsXG59OyIsIi8vIFVzZXIgY2FuIHdyaXRlIGFuZCBwb3N0IGEgdGV4dCBtZXNzYWdlIHRvIHRoZSBtZXNzYWdlIGFyZWFcbmNvbnN0IGNyZWF0ZU5ld1Bvc3QgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JpdGVNZXNzYWdlJyk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVOZXdQb3N0OyIsImNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSAobWVzc2FnZSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke21lc3NhZ2UuY2hhbm5lbH0vbWVzc2FnZXMvLmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBhZGRNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCByZWFsdGltZUFkZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9yZWFsdGltZUFkZE1lc3NhZ2VzJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9tZXNzYWdlcy8uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZE1lc3NhZ2VUb0NoYW5uZWwsXG4gICAgYWRkTWVzc2FnZVxufTsiLCIvLyBjcmVhdGVzIGEgbmV3IGNoYW5uZWwgaW4gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gKGNoYW5uZWwpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbicsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjaGFubmVsKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VDcmVhdGU7XG5cblxuIiwiLy8gc2FtZSBhcyBjaGFubmVsIGJ1dCBtZXNzYWdlIHRpZXIiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZGVsZXRlVGFza0luREIgPSAoa2V5KSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7a2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoa2V5KSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiY29uc3QgbG9hZERhdGFiYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlUGFyc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlUGFyc2UnKS5kYXRhYmFzZVBhcnNlO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uP3ByaW50PXByZXR0eScsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgZGF0YWJhc2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGxvYWRNZXNzYWdlcyA9IChjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJykubWVzc2FnZVBhcnNlO1xuICAgIGNvbnN0IGNoYW5nZUNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5nZUNoYW5uZWwnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHtjaGFubmVsfS9tZXNzYWdlcy5qc29uP3ByaW50PXByZXR0eWAsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgbWVzc2FnZVBhcnNlKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbG9hZERhdGFiYXNlLFxuICAgIGxvYWRNZXNzYWdlc1xufSIsIi8vIFBhcnNlcyB0aGUgZGF0YSBsb2FkZWQgZnJvbSBmaXJlYmFzZVxuY29uc3QgZGF0YWJhc2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkRGF0YWJhc2U7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBzaWRlYmFyVXNlcnMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IGNoYW5uZWxzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGNoYW5uZWxzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGluZGl2Q2hhbm5lbCA9IHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5hbWU6IGRhdGFba2V5XS5uYW1lLFxuICAgICAgICAgICAgcHVycG9zZTogZGF0YVtrZXldLnB1cnBvc2UsXG4gICAgICAgICAgICBkYXRlOiBkYXRhW2tleV0uZGF0ZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBkYXRhW2tleV0ubWVzc2FnZXMsXG4gICAgICAgICAgICB1c2VyczogZGF0YVtrZXldLnVzZXJzXG4gICAgICAgIH1cbiAgICAgICAgYWxsRGF0YS5wdXNoKGluZGl2Q2hhbm5lbClcbiAgICB9KVxuICAgIHNpZGViYXJDaGFubmVscyhhbGxEYXRhKVxuICAgIHJldHVybiBhbGxEYXRhO1xufVxuXG4vLyBQYXJzZXMgdGhlIGRhdGEgcmVjZWl2ZWQgZnJvbSBEQiB0byBwcmVwYXJlIGZvciBwb3N0aW5nXG5jb25zdCBtZXNzYWdlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZERhdGFiYXNlO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgcG9zdFNhdmVkTWVzc2FnZXMgPSByZXF1aXJlKCcuL3Bvc3RTYXZlZE1lc3NhZ2VzJylcbiAgICBjb25zdCBhbGxNZXNzYWdlcyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBbXTtcbiAgICBhbGxNZXNzYWdlcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBpbmRpdk1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB1c2VyOiBkYXRhW2tleV0udXNlcixcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgdGV4dDogZGF0YVtrZXldLnRleHQsXG4gICAgICAgICAgICBtZWRpYTogZGF0YVtrZXldLm1lZGlhXG4gICAgICAgIH1cbiAgICAgICAgYWxsRGF0YS5wdXNoKGluZGl2TWVzc2FnZSlcbiAgICB9KVxuICAgIHBvc3RTYXZlZE1lc3NhZ2VzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRhdGFiYXNlUGFyc2UsXG4gICAgbWVzc2FnZVBhcnNlXG59OyIsImNvbnN0IHVwZGF0ZURhdGFiYXNlQ2hhbm5lbCA9IChjaGFubmVsLCB1c2VyKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS8ke2NoYW5uZWwudGFibGV9LyR7Y2hhbm5lbC5jaGFubmVsTmFtZX0vdXNlcnMvJHt1c2VyLmlkfS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlRGF0YWJhc2VDaGFubmVsOyIsIi8vIEdlbmVyYXRlcyB0b2RheSdzIGRhdGUgaW4gZXggZm9ybWF0OiBPY3QsIDcsIDE5ODlcbmNvbnN0IGRhdGVHZW5lcmF0b3IgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9udGhOYW1lcyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBkYXkgPSB0b2RheS5nZXREYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBtb250aE5hbWVzW3RvZGF5LmdldE1vbnRoKCldO1xuICAgIGNvbnN0IHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRhdGUgPSBgJHttb250aH0gJHtkYXl9LCAke3llYXJ9YDtcbiAgICByZXR1cm4gZGF0ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlR2VuZXJhdG9yOyIsImNvbnN0IGRpcmVjdE1lc3NhZ2VVc2VyID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBvaCBoZXkgdGhlcmUuIHRoaXMgZmVhdHVyZSBpc24ndCByZWFkeSB5ZXRgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpcmVjdE1lc3NhZ2VVc2VyOyIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGlucHV0IGZpZWxkc1xuY29uc3QgaW5wdXRGYWN0b3J5ID0gKHR5cGUsIGlkZW50aWZpZXIsIGNsYXNzTGlzdCwgcGxhY2Vob2xkZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGlkZW50aWZpZXIpO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KVxuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgXG4gICAgcmV0dXJuIGlucHV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dEZhY3Rvcnk7XG4iLCIvLyBHZW5lcmF0ZXMgbGFiZWxzIGZvciBpbnB1dHNcbmNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gKGxhYmVsVGV4dCkgPT4ge1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ2lucHV0X19sYWJlbCcpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuXG4gICAgcmV0dXJuIGxhYmVsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0TGFiZWxGYWN0b3J5OyIsImNvbnN0IGtlZXBNZXNzYWdlc0JvdHRvbSA9ICgpID0+IHtcbiAgICBsZXQgbWVzc2FnZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZXMnKTtcbiAgICBtZXNzYWdlQm9keS5zY3JvbGxUb3AgPSA5OTk5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtlZXBNZXNzYWdlc0JvdHRvbTsiLCIvLyBUT0RPOiBoYXZlIHRoZSBkZWZhdWx0IGNoYW5uZWwgYmUgdGhlIGxhc3QgYWN0aXZlIGNoYW5uZWxcbi8vIEN1cnJlbnRseSBsb2FkcyB0aGUgd2F0ZXJjb29sZXIgY2hhbm5lbCBieSBkZWZhdWx0XG5jb25zdCBsb2FkRGVmYXVsdENoYW5uZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2V0Q3VycmVudENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWxDaGVjaycpLnNldEN1cnJlbnRDaGFubmVsO1xuICAgIGNvbnN0IGNoYW5uZWxEZXRhaWxzTGVmdCA9IHJlcXVpcmUoJy4vY2hhbm5lbERldGFpbHMnKS5jaGFubmVsRGV0YWlsc0xlZnQ7XG4gICAgY29uc3QgbG9hZE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKS5sb2FkTWVzc2FnZXM7XG5cbiAgICBjb25zdCBmaXJzdENoYW5uZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fY2hhbm5lbHMtLWxpc3QnKS5jaGlsZE5vZGVzWzBdXG4gICAgZmlyc3RDaGFubmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNoYW5uZWwnKVxuICAgIHNldEN1cnJlbnRDaGFubmVsKGZpcnN0Q2hhbm5lbClcbiAgICBsb2FkTWVzc2FnZXMoZmlyc3RDaGFubmVsLmlkKVxuXG59XG5cbi8vIERlbGF5IHRvIGxvYWQgZGVmYXVsdCBjaGFubmVsXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGxvYWREZWZhdWx0Q2hhbm5lbCgpO1xuICAgIH0sIDUwMCk7XG4gfTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRGVmYXVsdENoYW5uZWw7XG4iLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBsb2dpbiBwYWdlXG5jb25zdCBsb2dpblVzZXJNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2xvZ2luTW9kYWwnKVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbG9naW4nKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGxvZ2luTW9kYWxDb250ZW50KCkpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlck1vZGFsO1xuXG5jb25zdCBsb2dpbk1vZGFsQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50U3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGlucHV0RmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRGYWN0b3J5Jyk7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeVRleHQgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlUZXh0Jyk7XG4gICAgY29uc3QgbG9naW5Vc2VyID0gcmVxdWlyZSgnLi91c2VyTG9naW4nKTtcbiAgICBjb25zdCBjcmVhdGVVc2VyID0gcmVxdWlyZSgnLi91c2VyQ3JlYXRlJyk7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBsb2dpbk1vZGFsVGl0bGUoKTtcblxuICAgIGNvbnN0IGRpc3BsYXlOYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckRpc3BsYXlOYW1lJywgJ2xvZ2luX19pbnB1dCcsICdGdWxsIG5hbWUnKTtcbiAgICBjb25zdCBlbWFpbElucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJFbWFpbCcsICdsb2dpbl9faW5wdXQnLCAneW91QGV4YW1wbGUuY29tJyk7XG4gICAgY29uc3QgcGFzc0lucHV0ID0gaW5wdXRGYWN0b3J5KCdwYXNzd29yZCcsICd1c2VyUGFzcycsICdsb2dpbl9faW5wdXQnLCAncGFzc3dvcmQnKTtcbiAgICBjb25zdCBzaWduVXBCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnc2lnbnVwX19idXR0b24nLCdDcmVhdGUgYWNjb3VudCcsIGNyZWF0ZVVzZXIpXG5cbiAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsb2dpbkJ1dHRvbi50ZXh0Q29udGVudCA9ICdPciwgc2lnbiBpbiB0byBleGlzdGluZyBhY2NvdW50J1xuICAgIGxvZ2luQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX19idXR0b24nKTtcbiAgICBsb2dpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvZ2luVXNlcik7XG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fY29udGVudCcpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGlzcGxheU5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChlbWFpbElucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHBhc3NJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChzaWduVXBCdXR0b24pO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRTdHJ1Y3R1cmU7XG59XG5cbmNvbnN0IGxvZ2luTW9kYWxUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnU2lnbiBpbiB0byBzbGFjayc7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnR2V0IHN0YXJ0ZWQgY29sbGFib3JhdGluZyB3aXRoIHlvdXIgdGVhbW1hdGVzLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX3RpdGxlJyk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0aXRsZVN0cnVjdHVyZTtcbn1cbiIsImNvbnN0IG1lZGlhVXBsb2FkZXIgPSAoKSA9PiB7XG4gICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgbGV0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWZpbGVdJykuZmlsZXNbMF07XG5cbiAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcmV2aWV3LnNyYyA9IHJlYWRlci5yZXN1bHQ7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgaWYgKGZpbGUpIHtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfVxufVxuXG5jb25zdCB1cGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkRmlsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVkaWFVcGxvYWRlcik7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbWVzc2FnZXNcbmNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gKGRhdGUsIG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19yaWdodCcpXG4gICAgY29uc3QgdGl0bGUgPSBtZXNzYWdlVGl0bGUoZGF0ZSwgbWVzc2FnZS51c2VyLmVtYWlsKTtcbiAgICBjb25zdCBhdmF0YXIgPSBtZXNzYWdlQXZhdGFyKCk7XG4gICAgbWVzc2FnZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgdGV4dC5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19ib2R5Jyk7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2UudGV4dDtcbiAgICBcbiAgICBib2R5LmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGV4dClcbiAgICBcbiAgICBtZXNzYWdlU3RydWN0dXJlLmFwcGVuZENoaWxkKGF2YXRhcilcbiAgICBtZXNzYWdlU3RydWN0dXJlLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgcmV0dXJuIG1lc3NhZ2VTdHJ1Y3R1cmU7XG59XG5cbi8vIFRPRE86IHN3YXAgZW1haWwgdy8gZGlzcGxheU5hbWVcbi8vIFRPRE86IGRhdGUgbmVlZHMgdG8gZGlzcGxheSBmb3IgZGF0ZSBwb3N0ZWQgaWYgbWVzc2FnZSBhbHJlYWR5IGV4aXN0c1xuY29uc3QgbWVzc2FnZVRpdGxlID0gKGRhdGUsIHVzZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbWVzc2FnZVRpdGxlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlJylcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGRpc3BsYXlOYW1lLnRleHRDb250ZW50ID0gdXNlcjtcbiAgICBjb25zdCBwb3N0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHBvc3REYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICBkaXNwbGF5TmFtZS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX190aXRsZS0tdXNlcicpO1xuICAgIHBvc3REYXRlLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VfX3RpdGxlLS1kYXRlJyk7XG4gICAgbWVzc2FnZVRpdGxlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lKVxuICAgIG1lc3NhZ2VUaXRsZS5hcHBlbmRDaGlsZChwb3N0RGF0ZSlcbiAgICBcbiAgICByZXR1cm4gbWVzc2FnZVRpdGxlO1xufVxuXG5jb25zdCBtZXNzYWdlQXZhdGFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGF2YXRhci5zcmMgPSAnaW1nL2F2YXRhci5wbmcnXG4gICAgYXZhdGFyLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2VzX19hdmF0YXInKVxuICAgIHJldHVybiBhdmF0YXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlRmFjdG9yeTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCdjaGFubmVsTW9kYWwnKVxuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ld0NoYW5uZWxNb2RhbDtcblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jcmVhdGVOZXdDaGFubmVsO1xuICAgIGNvbnN0IGNsb3NlQ3JlYXRlTmV3TW9kYWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKS5jbG9zZUNyZWF0ZU5ld01vZGFsO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudCcpXG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBtb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnTmFtZScpO1xuICAgIGNvbnN0IHB1cnBvc2VMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdQdXJwb3NlJyk7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAnbmFtZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgJ2UuZy4gbWFya2V0aW5nJyk7XG4gICAgY29uc3QgcHVycG9zZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3B1cnBvc2VJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuXG4gICAgY29uc3QgbW9kYWxBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1hY3Rpb25zJylcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY2FuY2VsJywnQ2FuY2VsJywgY2xvc2VDcmVhdGVOZXdNb2RhbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY3JlYXRlJywnQ3JlYXRlIGNoYW5uZWwnLCBjcmVhdGVOZXdDaGFubmVsKVxuXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKVxuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG1vZGFsQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuLy8gdGl0bGUgY29udGVudCBmb3IgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsImNvbnN0IG5ld1VzZXJBZGRlZFRvQ2hhbm5lbCA9ICh1c2VyKSA9PiB7XG4gICAgY29uc3QgZGF0ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZGF0ZUdlbmVyYXRvcicpO1xuICAgIGNvbnN0IHBvc3RBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgY29uc3QgYWRkTWVzc2FnZVRvQ2hhbm5lbCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VBZGRNZXNzYWdlJykuYWRkTWVzc2FnZVRvQ2hhbm5lbDtcbiAgICBjb25zdCBtZXNzYWdlRmFjdG9yeSA9IHJlcXVpcmUoJy4vbWVzc2FnZUZhY3RvcnknKVxuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2U7XG4gICAgY29uc3QgY2hhbm5lbCA9ICd3YXRlcmNvb2xlcic7XG4gICAgY29uc3QgdGV4dCA9IGBqb2luZWQgIyR7Y2hhbm5lbH1gXG4gICAgXG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBjb25zdCBtZWRpYSA9ICcnO1xuXG4gICAgY29uc3QgbmV3TWVzc2FnZSA9IHtcbiAgICAgICAgY2hhbm5lbDogJy1MQk41X3NreDUxTDdoSlFwNVIxJyxcbiAgICAgICAgdXNlcixcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgbWVkaWFcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KGRhdGUsIG5ld01lc3NhZ2UpXG4gICAgcG9zdEFyZWEuYXBwZW5kQ2hpbGQobWVzc2FnZVN0cnVjdHVyZSk7XG4gICAgYWRkTWVzc2FnZVRvQ2hhbm5lbChuZXdNZXNzYWdlKVxuICAgIGFkZE1lc3NhZ2UobmV3TWVzc2FnZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXdVc2VyQWRkZWRUb0NoYW5uZWw7IiwiLy8gQWxsb3dzIHVzZXIgdG8gY3JlYXRlIGFuZCBwb3N0IGEgbmV3IG1lc3NhZ2VcbmNvbnN0IHBvc3RNZXNzYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGdldEN1cnJlbnRVc2VyID0gcmVxdWlyZSgnLi91c2VyQ2hlY2snKS5nZXRDdXJyZW50VXNlcjtcbiAgICBjb25zdCBnZXRDdXJyZW50Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbENoZWNrJykuZ2V0Q3VycmVudENoYW5uZWw7XG4gICAgY29uc3QgbWVzc2FnZUZhY3RvcnkgPSByZXF1aXJlKCcuL21lc3NhZ2VGYWN0b3J5JylcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKVxuICAgIGNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSByZXF1aXJlKCcuL2RhdGFiYXNlQWRkTWVzc2FnZScpLmFkZE1lc3NhZ2VUb0NoYW5uZWw7XG4gICAgY29uc3QgYWRkTWVzc2FnZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VBZGRNZXNzYWdlJykuYWRkTWVzc2FnZTtcbiAgICBjb25zdCBrZWVwTWVzc2FnZXNCb3R0b20gPSByZXF1aXJlKCcuL2tlZXBNZXNzYWdlc0JvdHRvbScpO1xuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKTtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpLnZhbHVlXG4gICAgY29uc3QgcG9zdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICBjb25zdCB1c2VyID0gZ2V0Q3VycmVudFVzZXIoKVxuICAgIGNvbnN0IHVzZXJJRCA9IHVzZXIudWlkO1xuICAgIGNvbnN0IGNoYW5uZWwgPSBnZXRDdXJyZW50Q2hhbm5lbCgpO1xuICAgIGNvbnN0IG1lZGlhID0gJyc7XG5cbiAgICBjb25zdCBkYXRlID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIFxuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSB7XG4gICAgICAgIGNoYW5uZWw6IGNoYW5uZWwuaWQsXG4gICAgICAgIHVzZXIsXG4gICAgICAgIGRhdGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIG1lZGlhXG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VTdHJ1Y3R1cmUgPSBtZXNzYWdlRmFjdG9yeShkYXRlLCBuZXdNZXNzYWdlKVxuXG4gICAgcG9zdEFyZWEuYXBwZW5kQ2hpbGQobWVzc2FnZVN0cnVjdHVyZSk7XG4gICAgY2xlYXJJbnB1dHMoJ3dyaXRlTWVzc2FnZScpXG5cbiAgICBhZGRNZXNzYWdlVG9DaGFubmVsKG5ld01lc3NhZ2UpXG4gICAgYWRkTWVzc2FnZShuZXdNZXNzYWdlKVxuICAgIGtlZXBNZXNzYWdlc0JvdHRvbSgpO1xufVxuXG4vLyBFdmVudCBsaXN0ZW5lciB3YWl0aW5nIGZvciB1c2VyIHRvIGhpdCAnZW50ZXInIGJlZm9yZSBwb3N0aW5nIG5ldyBtZXNzYWdlXG5jb25zdCBzdWJtaXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZSA9PiB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IDEzKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKCk7XG4gICAgfVxufSk7IiwiLy8gQXBwZW5kcyBuZXcgbWVzc2FnZSB0byAjbWVzc2FnZSBkaXYgaW4gRE9NXG5jb25zdCBwb3N0TWVzc2FnZSA9IChhbGxNZXNzYWdlcykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VGYWN0b3J5ID0gcmVxdWlyZSgnLi9tZXNzYWdlRmFjdG9yeScpXG4gICAgY29uc3QgcG9zdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICBhbGxNZXNzYWdlcy5mb3JFYWNoKG1lc3MgPT4ge1xuICAgICAgICBjb25zdCBkYXRlID0gbWVzcy5kYXRlO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzcztcbiAgICAgICAgY29uc3QgbWVzc2FnZVN0cnVjdHVyZSA9IG1lc3NhZ2VGYWN0b3J5KGRhdGUsIG1lc3NhZ2UpXG4gICAgICAgIHBvc3RBcmVhLmFwcGVuZENoaWxkKG1lc3NhZ2VTdHJ1Y3R1cmUpO1xuICAgIH0pXG4gICAgcG9zdEFyZWEuc2Nyb2xsVG9wID0gOTk5OTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3N0TWVzc2FnZTsiLCIvLyBOT1QgV09SS0lORyAtLSBORUVEIFRPIEZJWFxuXG4vLyBMaXN0ZW5pbmcgZm9yIHVwZGF0ZXMgaW4gdGhlIGRhdGFiYXNlIHRvIHBvc3QgdG8gRE9NIGZvciBhbGwgdXNlcnNcbmNvbnN0IHJlYWx0aW1lQWRkTWVzc2FnZXMgPSAoKSA9PiB7XG4gICAgbGV0IGRhdGFiYXNlUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGNoYW5uZWwvYCk7XG4gICAgZGF0YWJhc2VSZWYub24oJ3ZhbHVlJywgc25hcCA9PiB7XG4gICAgICAgIGNvbnN0IGdldEN1cnJlbnRDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsQ2hlY2snKS5nZXRDdXJyZW50Q2hhbm5lbDtcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGdldEN1cnJlbnRDaGFubmVsKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gc25hcC52YWwoKTtcbiAgICAgICAgY29uc3Qga2V5QXJyYXkgPSBPYmplY3Qua2V5cyhtZXNzYWdlcylcbiAgICAgICAgY29uc3QgbmV3TWVzc2FnZSA9IG1lc3NhZ2VzLmNoYW5uZWwubWVzc2FnZXNcbiAgICAgICAgY29uc3QgYWxsTWVzc2FnZXMgPSBbXTtcbiAgICAgICAga2V5QXJyYXkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGl2TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdXNlcjogbWVzc2FnZXNba2V5XS51c2VyLFxuICAgICAgICAgICAgICAgIGRhdGU6IG1lc3NhZ2VzW2tleV0uZGF0ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlc1trZXldLnRleHQsXG4gICAgICAgICAgICAgICAgbWVkaWE6IG1lc3NhZ2VzW2tleV0ubWVkaWFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbE1lc3NhZ2VzLnB1c2goaW5kaXZNZXNzYWdlKVxuICAgICAgICB9KVxuICAgICAgICB2ZXJpZnlVc2VyKG5ld01lc3NhZ2UpXG4gICAgICAgIHBvc3ROZXdVc2VyTWVzc2FnZShjaGFubmVsLCBuZXdNZXNzYWdlKTtcbiAgICB9KVxufVxuXG5jb25zdCB2ZXJpZnlVc2VyID0gKG5ld01lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgdXNlclRoYXRQb3N0ZWRNZXNzYWdlID0gbmV3TWVzc2FnZS51c2VyO1xuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXIoKS51aWQ7XG4gICAgaWYgKHVzZXJUaGF0UG9zdGVkTWVzc2FnZSAhPT0gY3VycmVudFVzZXIpIHtcbiAgICAgICAgLy8gcG9zdE5ld1VzZXJNZXNzYWdlKG5ld01lc3NhZ2UpXG4gICAgICAgIGNvbnNvbGUubG9nKCdzYW1lIHVzZXInKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NhbWUgdXNlcicpXG4gICAgfVxufVxuXG4vLyBjb25zdCBwb3N0TmV3VXNlck1lc3NhZ2UgPSAoY2hhbm5lbCkgPT4ge1xuLy8gICAgIGNvbnN0IGxvYWRNZXNzYWdlcyA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJykubG9hZE1lc3NhZ2VzO1xuLy8gICAgIGNvbnN0IHByaW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtZXNzYWdlcycpO1xuLy8gICAgIHByaW50QXJlYS5mb3JFYWNoKG0gPT4ge1xuLy8gICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKSB7XG4vLyAgICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9KVxuLy8gICAgIGxvYWRNZXNzYWdlcyhjaGFubmVsKTtcbi8vIH1cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSByZWFsdGltZUFkZE1lc3NhZ2VzOyIsIi8vIENyZWF0ZXMgY2hhbm5lbHMgY29tcG9uZW50IGZvciBzaWRlYmFyXG5jb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSAoYWxsRGF0YSkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgY2hhbm5lbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgc2lkZWJhclVzZXJzID0gcmVxdWlyZSgnLi9zaWRlYmFyVXNlcnMnKTtcbiAgICBjb25zdCBzaWRlYmFyU3RydWN0dXJlID0gcmVxdWlyZSgnLi9zaWRlYmFyU3RydWN0dXJlJyk7XG4gICAgY29uc3QgY2hhbmdlQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbmdlQ2hhbm5lbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGNoYW5uZWxzSGVhZGVyKCk7XG5cblxuICAgIGFsbERhdGEuZm9yRWFjaChjID0+IHtcbiAgICAgICAgY29uc3QgY2hhbm5lbFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY2hhbm5lbFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgYy5rZXkpXG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXB1cnBvc2UnLCBjLnB1cnBvc2UpO1xuICAgICAgICBjaGFubmVsUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlQ2hhbm5lbClcbiAgICAgICAgY2hhbm5lbFJvdy5jbGFzc0xpc3QgPSAnaW5kaXZpZHVhbC1jaGFubmVsJ1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGhhc2guc3JjID0gJ2ltZy9oYXNoLnBuZydcblxuICAgICAgICBjb25zdCBjaGFubmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGNoYW5uZWwudGV4dENvbnRlbnQgPSBjLm5hbWU7XG5cbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChoYXNoKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChjaGFubmVsKTtcbiAgICAgICAgY2hhbm5lbExpc3QuYXBwZW5kQ2hpbGQoY2hhbm5lbFJvdyk7XG4gICAgfSlcbiAgICBjaGFubmVsTGlzdC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWxpc3QnO1xuXG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2hhbm5lbExpc3QpO1xuXG4gICAgc2lkZWJhclN0cnVjdHVyZShjaGFubmVsQ29tcG9uZW50KVxuICAgIHNpZGViYXJVc2VycyhhbGxEYXRhKVxufVxuXG5jb25zdCBjaGFubmVsc0hlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5SWNvbicpO1xuICAgIGNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9IHJlcXVpcmUoJy4vbmV3Q2hhbm5lbE1vZGFsJyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWhlYWRlcidcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQ2hhbm5lbHMnXG4gICAgY29uc3QgY3JlYXRlQ2hhbm5lbCA9IGJ1dHRvbkZhY3RvcnkoJ3NpZGViYXJfX2NoYW5uZWxzLS1uZXcnLCAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBhZGQtY2hhbm5lbFwiPmFkZF9jaXJjbGVfb3V0bGluZTwvaT4nLCBuZXdDaGFubmVsTW9kYWwpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ2hhbm5lbCk7XG5cbiAgICByZXR1cm4gaGVhZGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJDaGFubmVsczsiLCJjb25zdCBkcm9wZG93bkNvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBnZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuZ2V0Q3VycmVudFVzZXI7XG4gICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgdXNlci50ZXh0Q29udGVudCA9IGdldEN1cnJlbnRVc2VyKCkuZW1haWw7XG4gICAgdXNlci5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fZHJvcGRvd24tLXVzZXInO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbJ1Byb2ZpbGUgJiBhY2NvdW50JywgJ1ByZWZlcmVuY2VzJywgJ1NpZ24gb3V0J11cbiAgICBjb25zdCBvcHRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG9wdGlvbkxpc3QuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9fZHJvcGRvd24tLW9wdGlvbkxpc3QnKVxuICAgIG9wdGlvbnMuZm9yRWFjaChvID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBvO1xuICAgICAgICBvcHRpb24uY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2Ryb3Bkb3duLS1vcHRpb24nXG4gICAgICAgIGlmIChvID09PSAnU2lnbiBvdXQnKSB7XG4gICAgICAgICAgICBjb25zdCBsb2dvdXRVc2VyID0gcmVxdWlyZSgnLi91c2VyTG9nb3V0JylcbiAgICAgICAgICAgIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvZ291dFVzZXIpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbkxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KVxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodXNlcik7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChvcHRpb25MaXN0KTtcbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuY29uc3Qgc2lkZWJhckRyb3Bkb3duID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdpZCcsICdkcm9wZG93bkJhY2tncm91bmQnKVxuICAgIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9fZHJvcGRvd24tLWJhY2tncm91bmQnKTtcbiAgICBiYWNrZ3JvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VTaWRlYmFyRHJvcGRvd24pO1xuXG4gICAgY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZHJvcGRvd24uc2V0QXR0cmlidXRlKCdpZCcsICdhY2NvdW50T3B0aW9ucycpO1xuICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX2Ryb3Bkb3duJyk7XG5cbiAgICBjb25zdCBjb250ZW50ID0gZHJvcGRvd25Db250ZW50KCk7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpXG4gICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChkcm9wZG93bilcbn1cblxuY29uc3QgY2xvc2VTaWRlYmFyRHJvcGRvd24gPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWNjb3VudE9wdGlvbnMnKTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Ryb3Bkb3duQmFja2dyb3VuZCcpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgYm9keS5yZW1vdmVDaGlsZChtb2RhbClcbiAgICBib2R5LnJlbW92ZUNoaWxkKGJhY2tncm91bmQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJEcm9wZG93bjsiLCJjb25zdCBzaWRlYmFySGVhZCA9ICh1c2VyKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhckRyb3Bkb3duID0gcmVxdWlyZSgnLi9zaWRlYmFyRHJvcGRvd24nKTtcbiAgICBjb25zdCB1c2VyTG9nb3V0ID0gcmVxdWlyZSgnLi91c2VyTG9nb3V0JylcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19oZWFkZXInO1xuICAgIGhlYWRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NpZGViYXJIZWFkZXInKVxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNpZGViYXJEcm9wZG93bik7XG4gICAgY29uc3QgY29udGVudCA9IGhlYWRlckNvbnRlbnQodXNlcik7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIHNpZGViYXIuaW5zZXJ0QmVmb3JlKGhlYWRlciwgc2lkZWJhci5maXJzdENoaWxkKVxufTtcblxuY29uc3QgaGVhZGVyQ29udGVudCA9ICh1c2VyKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXJDb250ZW50LmNsYXNzTGlzdCA9ICdzaWRlYmFyX19oZWFkZXItLWNvbnRlbnQnXG4gICAgaGVhZGVyQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NpZGViYXJIZWFkZXInKVxuICAgIGNvbnN0IGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaGVhZGVyVGV4dC50ZXh0Q29udGVudCA9IHVzZXIuZW1haWw7XG4gICAgaGVhZGVyVGV4dC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyLS1uYW1lJ1xuICAgIGhlYWRlclRleHQuc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBjb25zdCBoZWFkZXJEcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGVhZGVyRHJvcC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9faGVhZGVyLS1pY29uJ1xuICAgIGhlYWRlckRyb3Auc2V0QXR0cmlidXRlKCdpZCcsICdzaWRlYmFySGVhZGVyJylcbiAgICBoZWFkZXJEcm9wLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGRyb3BcIiBpZD1cInNpZGViYXJIZWFkZXJcIj5rZXlib2FyZF9hcnJvd19kb3duPC9pPidcbiAgICBoZWFkZXJDb250ZW50LmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xuICAgIGhlYWRlckNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRHJvcCk7XG5cbiAgICByZXR1cm4gaGVhZGVyQ29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFySGVhZDsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBzaWRlYmFyXG5jb25zdCBjcmVhdGVTaWRlYmFyID0gKGNoYW5uZWxDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IGxvZ291dFVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dvdXQnKTtcbiAgICAvLyBzaWRlYmFyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChjaGFubmVsQ29tcG9uZW50KTtcbiAgICAvLyBzaWRlYmFyLmFwcGVuZENoaWxkKGFjY291bnRVc2Vycyk7XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7IiwiY29uc3Qgc2lkZWJhclVzZXJDb21wb25lbnQgPSAoYWxsRGF0YSkgPT4ge1xuICAgIGNvbnN0IHVzZXJDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdXNlckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgc2lkZWJhclN0cnVjdHVyZSA9IHJlcXVpcmUoJy4vc2lkZWJhclN0cnVjdHVyZScpO1xuICAgIGNvbnN0IGNoYW5nZUNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5nZUNoYW5uZWwnKTtcbiAgICBjb25zdCBkaXJlY3RNZXNzYWdlVXNlciA9IHJlcXVpcmUoJy4vZGlyZWN0TWVzc2FnZVVzZXInKTtcbiAgICBjb25zdCBwcmludEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhcicpXG4gICAgY29uc3QgaGVhZGVyID0gdXNlcnNIZWFkZXIoKTtcbiAgICBjb25zdCB3YXRlcmNvb2xlciA9IGFsbERhdGFbMF0udXNlcnNcbiAgICBsZXQgdXNlcnMgPSBbXVxuXG4gICAgZm9yKGxldCBrZXkgaW4gd2F0ZXJjb29sZXIpIHtcbiAgICAgICAgdXNlcnMucHVzaCh3YXRlcmNvb2xlcltrZXldKTtcbiAgICB9XG5cbiAgICB1c2Vycy5mb3JFYWNoKHUgPT4ge1xuICAgICAgICBjb25zdCB1c2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB1c2VyUm93LnNldEF0dHJpYnV0ZSgnaWQnLCB1LmlkKVxuICAgICAgICB1c2VyUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlyZWN0TWVzc2FnZVVzZXIpXG4gICAgICAgIHVzZXJSb3cuY2xhc3NMaXN0ID0gJ2luZGl2aWR1YWwtdXNlcidcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHN0YXR1cy5zcmMgPSAnaW1nL29ubGluZS5wbmcnXG5cbiAgICAgICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICB1c2VyLnRleHRDb250ZW50ID0gdS5lbWFpbDtcblxuICAgICAgICB1c2VyUm93LmFwcGVuZENoaWxkKHN0YXR1cyk7XG4gICAgICAgIHVzZXJSb3cuYXBwZW5kQ2hpbGQodXNlcik7XG4gICAgICAgIHVzZXJMaXN0LmFwcGVuZENoaWxkKHVzZXJSb3cpO1xuICAgIH0pXG4gICAgdXNlckxpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX3VzZXJzLS1saXN0JztcblxuICAgIHVzZXJDb21wb25lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB1c2VyQ29tcG9uZW50LmFwcGVuZENoaWxkKHVzZXJMaXN0KTtcbiAgICBwcmludEFyZWEuYXBwZW5kQ2hpbGQodXNlckNvbXBvbmVudClcbn1cblxuY29uc3QgdXNlcnNIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWhlYWRlcidcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnRGlyZWN0IE1lc3NhZ2VzJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICByZXR1cm4gaGVhZGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJVc2VyQ29tcG9uZW50OyIsIi8vIENoZWNraW5nIHdoZXRoZXIgb3Igbm90IHVzZXIgaXMgbG9nZ2VkIGluXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG5jb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoZmlyZWJhc2VVc2VyID0+IHtcbiAgICBpZiAoZmlyZWJhc2VVc2VyKSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gZmlyZWJhc2VVc2VyO1xuICAgICAgICBjb25zdCBzaWRlYmFySGVhZCA9IHJlcXVpcmUoJy4vc2lkZWJhckhlYWQnKTtcbiAgICAgICAgY29uc3QgbG9naW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbk1vZGFsJyk7XG4gICAgICAgIGxvZ2luTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBzaWRlYmFySGVhZChjdXJyZW50VXNlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59KVxuXG5jb25zdCBnZXRDdXJyZW50VXNlciA9ICgpID0+IHtcbiAgICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbmNvbnN0IHNldEN1cnJlbnRVc2VyID0gKHVzZXIpID0+IHtcbiAgICBjdXJyZW50VXNlciA9IHVzZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN1cnJlbnRVc2VyLFxuICAgIHNldEN1cnJlbnRVc2VyXG59OyIsIi8vIExldHMgdXNlciBjcmVhdGUgbmV3IGFjY291bnRcbmNvbnN0IGNyZWF0ZVVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVG9EZWZhdWx0Q2hhbm5lbCA9IHJlcXVpcmUoJy4vYWRkVG9DaGFubmVsJylcbiAgICBjb25zdCBzZXRDdXJyZW50VXNlciA9IHJlcXVpcmUoJy4vdXNlckNoZWNrJykuc2V0Q3VycmVudFVzZXJcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBuZXdVc2VyQWRkZWRUb0NoYW5uZWwgPSByZXF1aXJlKCcuL25ld1VzZXJBZGRlZFRvQ2hhbm5lbCcpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJEaXNwbGF5TmFtZScpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcykudGhlbigodXNlcikgPT4ge1xuICAgICAgICBzZXRDdXJyZW50VXNlcih1c2VyKVxuICAgICAgICBhZGRUb0RlZmF1bHRDaGFubmVsKHVzZXIpXG4gICAgICAgIG5ld1VzZXJBZGRlZFRvQ2hhbm5lbCh1c2VyKTtcbiAgICB9KVxuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVXNlcjsiLCIvLyBMb2dzIHVzZXIgaW50byBwcm9kdWN0XG5jb25zdCBsb2dpblVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlckVtYWlsJykudmFsdWU7XG4gICAgY29uc3QgcGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyUGFzcycpLnZhbHVlO1xuICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5cbiAgICBjbGVhcklucHV0cygndXNlckVtYWlsJylcbiAgICBjbGVhcklucHV0cygndXNlclBhc3MnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyRGlzcGxheU5hbWUnKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpO1xuICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKVxuXG59XG5cbiBcbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyOyIsIi8vIExvZ3Mgb3V0IHVzZXJcbmNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJylcbiAgICBjb25zdCBzaWRlYmFySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXJIZWFkZXInKVxuXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWNjb3VudE9wdGlvbnMnKTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Ryb3Bkb3duQmFja2dyb3VuZCcpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgc2lkZWJhci5yZW1vdmVDaGlsZChzaWRlYmFySGVhZGVyKTtcbiAgICBib2R5LnJlbW92ZUNoaWxkKG1vZGFsKVxuICAgIGJvZHkucmVtb3ZlQ2hpbGQoYmFja2dyb3VuZCk7XG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXRVc2VyOyJdfQ==
