(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loadDatabase = require('./databaseLoad');
const loginUserModal = require('./loginScreen')

loadDatabase();
loginUserModal();




},{"./databaseLoad":11,"./loginScreen":18}],2:[function(require,module,exports){
// Factory for creating icon-based buttons
const buttonFactory = (classList, buttonText, eventListener) => {
    const button = document.createElement('button');
    button.addEventListener('click', eventListener)
    button.innerHTML = buttonText;
    button.classList.add(classList);
    return button;
};

module.exports = buttonFactory;

},{}],3:[function(require,module,exports){
// Factory for creating text-based buttons
const buttonFactory = (classList, buttonText, eventListener) => {
    const button = document.createElement('button');
    button.addEventListener('click', eventListener)
    button.textContent = buttonText;
    button.classList.add(classList);
    return button;
};

module.exports = buttonFactory;

},{}],4:[function(require,module,exports){
const changeChannel = (evt) => {
    const allChannels = document.querySelectorAll('.individual-channel');
    const activeChannel = evt.path[0]

    for (let i = 0; i < allChannels.length; i++) {
        if (allChannels[i].classList.contains('activeChannel')) {
            allChannels[i].classList.remove('activeChannel');
        }
    }
    activeChannel.classList.add('activeChannel');

}

module.exports = changeChannel;
},{}],5:[function(require,module,exports){
// Clears fields after submission of a form/input
const clearInputs = (identifier) => {
    console.log(identifier)
    document.querySelector(`#${identifier}`).value = ''
}

module.exports = clearInputs;
},{}],6:[function(require,module,exports){
const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs');
    const databaseCreate = require('./databaseCreate');
    const dateGenerator = require('./dateGenerator');
    const name = document.querySelector('#nameInput');
    const purpose = document.querySelector('#purposeInput');
    const date = dateGenerator();
    const users = {};

    const channel = {
        name: name.value,
        purpose: purpose.value,
        date: date,
        users: users
    };
    clearInputs(name.id);
    clearInputs(purpose.id);
    databaseCreate(channel);
}

module.exports = createNewChannel;
},{"./clearInputs":5,"./databaseCreate":8,"./dateGenerator":14}],7:[function(require,module,exports){
// User can write and post a text message to the message area
const createNewPost = () => {
    const input = document.querySelector('#writeMessage');

}

module.exports = createNewPost;
},{}],8:[function(require,module,exports){
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



},{}],9:[function(require,module,exports){
// same as channel but message tier
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{"./databaseParse":12}],12:[function(require,module,exports){
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
},{"./databaseLoad":11,"./sidebarChannels":20}],13:[function(require,module,exports){
/*
NEEDS:
- Multi tiers for channel and messages
*/

const firebaseUpdate = (table, key) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/${table}/${key}.json`,
        type: "PATCH",
        data: JSON.stringify(taskUpdate),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

module.exports = firebaseUpdate;
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
// Generates labels for inputs
const inputLabelFactory = (labelText) => {
    const label = document.createElement('p');
    label.classList.add('input__label');
    label.textContent = labelText;

    return label;
}

module.exports = inputLabelFactory;
},{}],17:[function(require,module,exports){
// TODO: have the default channel be the last active channel
// Currently loads the watercooler channel by default
const loadDefaultChannel = () => {
    const firstChannel = document.querySelectorAll('.individual-channel')[0]
    firstChannel.classList.add('activeChannel')
}

module.exports = loadDefaultChannel;

window.addEventListener('load', loadDefaultChannel);
},{}],18:[function(require,module,exports){
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

},{"./buttonFactoryText":3,"./inputFactory":15,"./userCreate":23,"./userLogin":24}],19:[function(require,module,exports){
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
},{"./buttonFactoryText":3,"./createNewChannel":6,"./databaseCreate":8,"./inputFactory":15,"./inputLabelFactory":16}],20:[function(require,module,exports){
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
},{"./buttonFactoryIcon":2,"./changeChannel":4,"./newChannelModal":19,"./sidebarStructure":21}],21:[function(require,module,exports){
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

},{"./sidebarChannels":20,"./userLogout":25}],22:[function(require,module,exports){
// Constantly running to check whether or not user is logged in
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const loginModal = document.querySelector('#loginModal');
        loginModal.classList.add('hide');
    }
    else {
        loginModal.classList.remove('hide');
        console.log('User does not exist');
    }
})
},{}],23:[function(require,module,exports){
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
},{"./clearInputs":5}],24:[function(require,module,exports){
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
},{"./clearInputs":5}],25:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeUljb24uanMiLCJzY3JpcHRzL2J1dHRvbkZhY3RvcnlUZXh0LmpzIiwic2NyaXB0cy9jaGFuZ2VDaGFubmVsLmpzIiwic2NyaXB0cy9jbGVhcklucHV0cy5qcyIsInNjcmlwdHMvY3JlYXRlTmV3Q2hhbm5lbC5qcyIsInNjcmlwdHMvY3JlYXRlTmV3UG9zdC5qcyIsInNjcmlwdHMvZGF0YWJhc2VDcmVhdGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlTWVzc2FnZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VEZWxldGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlTG9hZC5qcyIsInNjcmlwdHMvZGF0YWJhc2VQYXJzZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VVcGRhdGUuanMiLCJzY3JpcHRzL2RhdGVHZW5lcmF0b3IuanMiLCJzY3JpcHRzL2lucHV0RmFjdG9yeS5qcyIsInNjcmlwdHMvaW5wdXRMYWJlbEZhY3RvcnkuanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL25ld0NoYW5uZWxNb2RhbC5qcyIsInNjcmlwdHMvc2lkZWJhckNoYW5uZWxzLmpzIiwic2NyaXB0cy9zaWRlYmFyU3RydWN0dXJlLmpzIiwic2NyaXB0cy91c2VyQ2hlY2suanMiLCJzY3JpcHRzL3VzZXJDcmVhdGUuanMiLCJzY3JpcHRzL3VzZXJMb2dpbi5qcyIsInNjcmlwdHMvdXNlckxvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGxvYWREYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJyk7XG5jb25zdCBsb2dpblVzZXJNb2RhbCA9IHJlcXVpcmUoJy4vbG9naW5TY3JlZW4nKVxuXG5sb2FkRGF0YWJhc2UoKTtcbmxvZ2luVXNlck1vZGFsKCk7XG5cblxuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsImNvbnN0IGNoYW5nZUNoYW5uZWwgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgYWxsQ2hhbm5lbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kaXZpZHVhbC1jaGFubmVsJyk7XG4gICAgY29uc3QgYWN0aXZlQ2hhbm5lbCA9IGV2dC5wYXRoWzBdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNoYW5uZWwnKSkge1xuICAgICAgICAgICAgYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQ2hhbm5lbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFjdGl2ZUNoYW5uZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlQ2hhbm5lbCcpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbmdlQ2hhbm5lbDsiLCIvLyBDbGVhcnMgZmllbGRzIGFmdGVyIHN1Ym1pc3Npb24gb2YgYSBmb3JtL2lucHV0XG5jb25zdCBjbGVhcklucHV0cyA9IChpZGVudGlmaWVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coaWRlbnRpZmllcilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZGVudGlmaWVyfWApLnZhbHVlID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhcklucHV0czsiLCJjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKGUpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJyk7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lSW5wdXQnKTtcbiAgICBjb25zdCBwdXJwb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1cnBvc2VJbnB1dCcpO1xuICAgIGNvbnN0IGRhdGUgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgdXNlcnMgPSB7fTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsdWUsXG4gICAgICAgIHB1cnBvc2U6IHB1cnBvc2UudmFsdWUsXG4gICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgIHVzZXJzOiB1c2Vyc1xuICAgIH07XG4gICAgY2xlYXJJbnB1dHMobmFtZS5pZCk7XG4gICAgY2xlYXJJbnB1dHMocHVycG9zZS5pZCk7XG4gICAgZGF0YWJhc2VDcmVhdGUoY2hhbm5lbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3Q2hhbm5lbDsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuXG4qL1xuXG5jb25zdCBkYXRhYmFzZUNyZWF0ZSA9IChjaGFubmVsKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24nLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY2hhbm5lbCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlQ3JlYXRlO1xuXG5cbiIsIi8vIHNhbWUgYXMgY2hhbm5lbCBidXQgbWVzc2FnZSB0aWVyIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24/cHJpbnQ9cHJldHR5JyxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICBkYXRhYmFzZVBhcnNlKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRGF0YWJhc2U7IiwiLy8gUGFyc2VzIHRoZSBkYXRhIGxvYWRlZCBmcm9tIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZVBhcnNlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZUxvYWQgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbmFtZTogZGF0YVtrZXldLm5hbWUsXG4gICAgICAgICAgICBwdXJwb3NlOiBkYXRhW2tleV0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFba2V5XS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFba2V5XS5tZXNzYWdlcyxcbiAgICAgICAgICAgIHVzZXJzOiBkYXRhW2tleV0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VQYXJzZTsiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZmlyZWJhc2VVcGRhdGUgPSAodGFibGUsIGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vJHt0YWJsZX0vJHtrZXl9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRhc2tVcGRhdGUpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaXJlYmFzZVVwZGF0ZTsiLCIvLyBHZW5lcmF0ZXMgdG9kYXkncyBkYXRlIGluIGV4IGZvcm1hdDogT2N0LCA3LCAxOTg5XG5jb25zdCBkYXRlR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhOYW1lc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bW9udGh9ICR7ZGF5fSwgJHt5ZWFyfWA7XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZUdlbmVyYXRvcjsiLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpbnB1dCBmaWVsZHNcbmNvbnN0IGlucHV0RmFjdG9yeSA9ICh0eXBlLCBpZGVudGlmaWVyLCBjbGFzc0xpc3QsIHBsYWNlaG9sZGVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZGVudGlmaWVyKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdClcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIFxuICAgIHJldHVybiBpbnB1dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRGYWN0b3J5O1xuIiwiLy8gR2VuZXJhdGVzIGxhYmVscyBmb3IgaW5wdXRzXG5jb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IChsYWJlbFRleHQpID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdpbnB1dF9fbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcblxuICAgIHJldHVybiBsYWJlbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dExhYmVsRmFjdG9yeTsiLCIvLyBUT0RPOiBoYXZlIHRoZSBkZWZhdWx0IGNoYW5uZWwgYmUgdGhlIGxhc3QgYWN0aXZlIGNoYW5uZWxcbi8vIEN1cnJlbnRseSBsb2FkcyB0aGUgd2F0ZXJjb29sZXIgY2hhbm5lbCBieSBkZWZhdWx0XG5jb25zdCBsb2FkRGVmYXVsdENoYW5uZWwgPSAoKSA9PiB7XG4gICAgY29uc3QgZmlyc3RDaGFubmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluZGl2aWR1YWwtY2hhbm5lbCcpWzBdXG4gICAgZmlyc3RDaGFubmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNoYW5uZWwnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWREZWZhdWx0Q2hhbm5lbDtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkRGVmYXVsdENoYW5uZWwpOyIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIGxvZ2luIHBhZ2VcbmNvbnN0IGxvZ2luVXNlck1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9naW5Nb2RhbCcpXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdsb2dpbicpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobG9naW5Nb2RhbENvbnRlbnQoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW5Vc2VyTW9kYWw7XG5cbmNvbnN0IGxvZ2luTW9kYWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBsb2dpblVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dpbicpO1xuICAgIGNvbnN0IGNyZWF0ZVVzZXIgPSByZXF1aXJlKCcuL3VzZXJDcmVhdGUnKTtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGxvZ2luTW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgZGlzcGxheU5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICd1c2VyRGlzcGxheU5hbWUnLCAnbG9naW5fX2lucHV0JywgJ0Z1bGwgbmFtZScpO1xuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckVtYWlsJywgJ2xvZ2luX19pbnB1dCcsICd5b3VAZXhhbXBsZS5jb20nKTtcbiAgICBjb25zdCBwYXNzSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3Bhc3N3b3JkJywgJ3VzZXJQYXNzJywgJ2xvZ2luX19pbnB1dCcsICdwYXNzd29yZCcpO1xuICAgIGNvbnN0IGxvZ2luQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2xvZ2luX19idXR0b24nLCdTaWduIGluJywgbG9naW5Vc2VyKVxuXG4gICAgY29uc3Qgc2lnblVwQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHNpZ25VcEJ1dHRvbi50ZXh0Q29udGVudCA9ICdPciwgY3JlYXRlIGEgbmV3IGFjY291bnQnXG4gICAgc2lnblVwQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NpZ251cF9fYnV0dG9uJyk7XG4gICAgc2lnblVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlVXNlcik7XG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fY29udGVudCcpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGlzcGxheU5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChlbWFpbElucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHBhc3NJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChsb2dpbkJ1dHRvbik7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChzaWduVXBCdXR0b24pO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRTdHJ1Y3R1cmU7XG59XG5cbmNvbnN0IGxvZ2luTW9kYWxUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnU2lnbiBpbiB0byBzbGFjayc7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnR2V0IHN0YXJ0ZWQgY29sbGFicm9hdGluZyB3aXRoIHlvdXIgdGVhbW1hdGVzLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX3RpdGxlJyk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0aXRsZVN0cnVjdHVyZTtcbn1cbiIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBuZXdDaGFubmVsTW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gY3JlYXRlQ2hhbm5lbENvbnRlbnQoKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWwnKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3Q2hhbm5lbE1vZGFsO1xuXG4vLyBIaWRlcyBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGhpZGVDcmVhdGVOZXdDaGFubmVsID0gKCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoaScpXG59XG5cbi8vIENyZWF0ZXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGNyZWF0ZUNoYW5uZWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRMYWJlbEZhY3RvcnknKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcbiAgICBjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gcmVxdWlyZSgnLi9jcmVhdGVOZXdDaGFubmVsJyk7XG4gICAgY29udGVudFN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50JylcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IG1vZGFsVGl0bGUoKTtcblxuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdOYW1lJyk7XG4gICAgY29uc3QgcHVycG9zZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ1B1cnBvc2UnKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICduYW1lSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCAnZS5nLiBtYXJrZXRpbmcnKTtcbiAgICBjb25zdCBwdXJwb3NlSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAncHVycG9zZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgYEVudGVyIGNoYW5uZWwgcHVycG9zZS4uYCk7XG5cbiAgICBjb25zdCBtb2RhbEFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbW9kYWxBY3Rpb25zLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWFjdGlvbnMnKVxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jYW5jZWwnLCdDYW5jZWwnLCBoaWRlQ3JlYXRlTmV3Q2hhbm5lbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY3JlYXRlJywnQ3JlYXRlIGNoYW5uZWwnLCBjcmVhdGVOZXdDaGFubmVsKVxuXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbilcbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9uKVxuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGVTdHJ1Y3R1cmUpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG1vZGFsQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuY29uc3QgbW9kYWxUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZVN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQ3JlYXRlIG5ldyBjaGFubmVsJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdDaGFubmVscyBhcmUgd2hlcmUgeW91ciBtZW1iZXJzIGNvbW11bmljYXRlLiBUaGV54oCZcmUgYmVzdCB3aGVuIG9yZ2FuaXplZCBhcm91bmQgYSB0b3BpYyDigJQgI2xlYWRzLCBmb3IgZXhhbXBsZS4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX3RpdGxlJyk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0aXRsZVN0cnVjdHVyZTtcbn0iLCIvLyBDcmVhdGVzIGNoYW5uZWxzIGNvbXBvbmVudCBmb3Igc2lkZWJhclxuY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gKGFsbERhdGEpID0+IHtcbiAgICBjb25zdCBjaGFubmVsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGNoYW5uZWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHNpZGViYXJTdHJ1Y3R1cmUgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKTtcbiAgICBjb25zdCBjaGFuZ2VDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFuZ2VDaGFubmVsJyk7XG4gICAgY29uc3QgaGVhZGVyID0gY2hhbm5lbHNIZWFkZXIoKTtcbiAgICBcbiAgICBhbGxEYXRhLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNoYW5uZWxSb3cuc2V0QXR0cmlidXRlKCdpZCcsIGMua2V5KVxuICAgICAgICBjaGFubmVsUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlQ2hhbm5lbClcbiAgICAgICAgY2hhbm5lbFJvdy5jbGFzc0xpc3QgPSAnaW5kaXZpZHVhbC1jaGFubmVsJ1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGhhc2guc3JjID0gJ2ltZy9oYXNoLnBuZydcblxuICAgICAgICBjb25zdCBjaGFubmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGNoYW5uZWwudGV4dENvbnRlbnQgPSBjLm5hbWU7XG5cbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChoYXNoKTtcbiAgICAgICAgY2hhbm5lbFJvdy5hcHBlbmRDaGlsZChjaGFubmVsKTtcbiAgICAgICAgY2hhbm5lbExpc3QuYXBwZW5kQ2hpbGQoY2hhbm5lbFJvdyk7XG4gICAgfSlcbiAgICBjaGFubmVsTGlzdC5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWxpc3QnO1xuICAgIFxuICAgIGNoYW5uZWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGNoYW5uZWxMaXN0KTtcblxuICAgIHNpZGViYXJTdHJ1Y3R1cmUoY2hhbm5lbENvbXBvbmVudClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaWRlYmFyQ2hhbm5lbHM7XG5cbmNvbnN0IGNoYW5uZWxzSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnkgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlJY29uJyk7XG4gICAgY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gcmVxdWlyZSgnLi9uZXdDaGFubmVsTW9kYWwnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1oZWFkZXInXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzJ1xuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgbmV3Q2hhbm5lbE1vZGFsKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn0iLCJjb25zdCBjcmVhdGVTaWRlYmFyID0gKGNoYW5uZWxDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IGxvZ291dFVzZXIgPSByZXF1aXJlKCcuL3VzZXJMb2dvdXQnKTtcbiAgICBjb25zdCBsb2dPdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsb2dPdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dvdXRVc2VyKTtcbiAgICBsb2dPdXQudGV4dENvbnRlbnQgPSAnTG9nIG91dCdcbiAgICBsb2dPdXQuY2xhc3NMaXN0LmFkZCgnbG9nb3V0X19idXR0b24nKVxuXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChjaGFubmVsQ29tcG9uZW50KTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGxvZ091dCk7XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7XG4iLCIvLyBDb25zdGFudGx5IHJ1bm5pbmcgdG8gY2hlY2sgd2hldGhlciBvciBub3QgdXNlciBpcyBsb2dnZWQgaW5cbmNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChmaXJlYmFzZVVzZXIgPT4ge1xuICAgIGlmIChmaXJlYmFzZVVzZXIpIHtcbiAgICAgICAgY29uc3QgbG9naW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbk1vZGFsJyk7XG4gICAgICAgIGxvZ2luTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9naW5Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSkiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJEaXNwbGF5TmFtZScpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcylcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxuICAgIGFkZFRvV2F0ZXJjb29sZXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVVzZXI7IiwiLy8gTG9ncyB1c2VyIGludG8gcHJvZHVjdFxuY29uc3QgbG9naW5Vc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcbiAgICBjbGVhcklucHV0cygndXNlckRpc3BsYXlOYW1lJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKTtcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG4gXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlcjsiLCIvLyBMb2dzIG91dCB1c2VyXG5jb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0VXNlcjsiXX0=
