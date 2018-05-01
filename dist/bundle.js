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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeUljb24uanMiLCJzY3JpcHRzL2J1dHRvbkZhY3RvcnlUZXh0LmpzIiwic2NyaXB0cy9jaGFuZ2VDaGFubmVsLmpzIiwic2NyaXB0cy9jbGVhcklucHV0cy5qcyIsInNjcmlwdHMvY3JlYXRlTmV3Q2hhbm5lbC5qcyIsInNjcmlwdHMvY3JlYXRlTmV3UG9zdC5qcyIsInNjcmlwdHMvZGF0YWJhc2VDcmVhdGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlQ3JlYXRlTWVzc2FnZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VEZWxldGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlTG9hZC5qcyIsInNjcmlwdHMvZGF0YWJhc2VQYXJzZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VVcGRhdGUuanMiLCJzY3JpcHRzL2RhdGVHZW5lcmF0b3IuanMiLCJzY3JpcHRzL2lucHV0RmFjdG9yeS5qcyIsInNjcmlwdHMvaW5wdXRMYWJlbEZhY3RvcnkuanMiLCJzY3JpcHRzL2xvYWREZWZhdWx0Q2hhbm5lbC5qcyIsInNjcmlwdHMvbG9naW5TY3JlZW4uanMiLCJzY3JpcHRzL25ld0NoYW5uZWxNb2RhbC5qcyIsInNjcmlwdHMvc2lkZWJhckNoYW5uZWxzLmpzIiwic2NyaXB0cy9zaWRlYmFyU3RydWN0dXJlLmpzIiwic2NyaXB0cy91c2VyQ2hlY2suanMiLCJzY3JpcHRzL3VzZXJDcmVhdGUuanMiLCJzY3JpcHRzL3VzZXJMb2dpbi5qcyIsInNjcmlwdHMvdXNlckxvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBsb2FkRGF0YWJhc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpO1xuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSByZXF1aXJlKCcuL2xvZ2luU2NyZWVuJylcblxubG9hZERhdGFiYXNlKCk7XG5sb2dpblVzZXJNb2RhbCgpO1xuXG5cblxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaWNvbi1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgdGV4dC1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCJjb25zdCBjaGFuZ2VDaGFubmVsID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGFsbENoYW5uZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluZGl2aWR1YWwtY2hhbm5lbCcpO1xuICAgIGxldCBjbGlja2VkQ2hhbm5lbCA9IGV2dC50YXJnZXRcblxuICAgIGlmICghY2xpY2tlZENoYW5uZWwuaWQpIHtcbiAgICAgICAgY2xpY2tlZENoYW5uZWwgPSBldnQucGF0aFsxXVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGxDaGFubmVsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUNoYW5uZWwnKSkge1xuICAgICAgICAgICAgYWxsQ2hhbm5lbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQ2hhbm5lbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsaWNrZWRDaGFubmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZUNoYW5uZWwnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5nZUNoYW5uZWw7IiwiLy8gQ2xlYXJzIGZpZWxkcyBhZnRlciBzdWJtaXNzaW9uIG9mIGEgZm9ybS9pbnB1dFxuY29uc3QgY2xlYXJJbnB1dHMgPSAoaWRlbnRpZmllcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGlkZW50aWZpZXIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWRlbnRpZmllcn1gKS52YWx1ZSA9ICcnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xlYXJJbnB1dHM7IiwiY29uc3QgY3JlYXRlTmV3Q2hhbm5lbCA9IChlKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJyk7XG4gICAgY29uc3QgZGF0YWJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL2RhdGFiYXNlQ3JlYXRlJyk7XG4gICAgY29uc3QgZGF0ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZGF0ZUdlbmVyYXRvcicpO1xuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZUlucHV0Jyk7XG4gICAgY29uc3QgcHVycG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwdXJwb3NlSW5wdXQnKTtcbiAgICBjb25zdCBkYXRlID0gZGF0ZUdlbmVyYXRvcigpO1xuICAgIGNvbnN0IHVzZXJzID0ge307XG5cbiAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICBuYW1lOiBuYW1lLnZhbHVlLFxuICAgICAgICBwdXJwb3NlOiBwdXJwb3NlLnZhbHVlLFxuICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICB1c2VyczogdXNlcnNcbiAgICB9O1xuICAgIGNsZWFySW5wdXRzKG5hbWUuaWQpO1xuICAgIGNsZWFySW5wdXRzKHB1cnBvc2UuaWQpO1xuICAgIGRhdGFiYXNlQ3JlYXRlKGNoYW5uZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld0NoYW5uZWw7IiwiLy8gVXNlciBjYW4gd3JpdGUgYW5kIHBvc3QgYSB0ZXh0IG1lc3NhZ2UgdG8gdGhlIG1lc3NhZ2UgYXJlYVxuY29uc3QgY3JlYXRlTmV3UG9zdCA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cml0ZU1lc3NhZ2UnKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld1Bvc3Q7IiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcblxuKi9cblxuY29uc3QgZGF0YWJhc2VDcmVhdGUgPSAoY2hhbm5lbCkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNoYW5uZWwpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRhYmFzZUNyZWF0ZTtcblxuXG4iLCIvLyBzYW1lIGFzIGNoYW5uZWwgYnV0IG1lc3NhZ2UgdGllciIsIi8qXG5ORUVEUzpcbi0gTXVsdGkgdGllcnMgZm9yIGNoYW5uZWwgYW5kIG1lc3NhZ2VzXG4qL1xuXG5jb25zdCBkZWxldGVUYXNrSW5EQiA9IChrZXkpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHtrZXl9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShrZXkpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCJjb25zdCBsb2FkRGF0YWJhc2UgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VQYXJzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VQYXJzZScpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uP3ByaW50PXByZXR0eScsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgZGF0YWJhc2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZERhdGFiYXNlOyIsIi8vIFBhcnNlcyB0aGUgZGF0YSBsb2FkZWQgZnJvbSBmaXJlYmFzZVxuY29uc3QgZGF0YWJhc2VQYXJzZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2VMb2FkID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKTtcbiAgICBjb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSByZXF1aXJlKCcuL3NpZGViYXJDaGFubmVscycpO1xuICAgIGNvbnN0IGNoYW5uZWxzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGNoYW5uZWxzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGluZGl2Q2hhbm5lbCA9IHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5hbWU6IGRhdGFba2V5XS5uYW1lLFxuICAgICAgICAgICAgcHVycG9zZTogZGF0YVtrZXldLnB1cnBvc2UsXG4gICAgICAgICAgICBkYXRlOiBkYXRhW2tleV0uZGF0ZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBkYXRhW2tleV0ubWVzc2FnZXMsXG4gICAgICAgICAgICB1c2VyczogZGF0YVtrZXldLnVzZXJzXG4gICAgICAgIH1cbiAgICAgICAgYWxsRGF0YS5wdXNoKGluZGl2Q2hhbm5lbClcbiAgICB9KVxuICAgIHNpZGViYXJDaGFubmVscyhhbGxEYXRhKVxuICAgIHJldHVybiBhbGxEYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFiYXNlUGFyc2U7IiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGZpcmViYXNlVXBkYXRlID0gKHRhYmxlLCBrZXkpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tLyR7dGFibGV9LyR7a2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0YXNrVXBkYXRlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlyZWJhc2VVcGRhdGU7IiwiLy8gR2VuZXJhdGVzIHRvZGF5J3MgZGF0ZSBpbiBleCBmb3JtYXQ6IE9jdCwgNywgMTk4OVxuY29uc3QgZGF0ZUdlbmVyYXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbdG9kYXkuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIHJldHVybiBkYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVHZW5lcmF0b3I7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiLy8gVE9ETzogaGF2ZSB0aGUgZGVmYXVsdCBjaGFubmVsIGJlIHRoZSBsYXN0IGFjdGl2ZSBjaGFubmVsXG4vLyBDdXJyZW50bHkgbG9hZHMgdGhlIHdhdGVyY29vbGVyIGNoYW5uZWwgYnkgZGVmYXVsdFxuY29uc3QgbG9hZERlZmF1bHRDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0Q2hhbm5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmRpdmlkdWFsLWNoYW5uZWwnKVswXVxuICAgIGZpcnN0Q2hhbm5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmVDaGFubmVsJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRGVmYXVsdENoYW5uZWw7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZERlZmF1bHRDaGFubmVsKTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBsb2dpbiBwYWdlXG5jb25zdCBsb2dpblVzZXJNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2xvZ2luTW9kYWwnKVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbG9naW4nKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGxvZ2luTW9kYWxDb250ZW50KCkpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlck1vZGFsO1xuXG5jb25zdCBsb2dpbk1vZGFsQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50U3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGlucHV0RmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRGYWN0b3J5Jyk7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeVRleHQgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlUZXh0Jyk7XG4gICAgY29uc3QgbG9naW5Vc2VyID0gcmVxdWlyZSgnLi91c2VyTG9naW4nKTtcbiAgICBjb25zdCBjcmVhdGVVc2VyID0gcmVxdWlyZSgnLi91c2VyQ3JlYXRlJyk7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBsb2dpbk1vZGFsVGl0bGUoKTtcblxuICAgIGNvbnN0IGRpc3BsYXlOYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAndXNlckRpc3BsYXlOYW1lJywgJ2xvZ2luX19pbnB1dCcsICdGdWxsIG5hbWUnKTtcbiAgICBjb25zdCBlbWFpbElucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJFbWFpbCcsICdsb2dpbl9faW5wdXQnLCAneW91QGV4YW1wbGUuY29tJyk7XG4gICAgY29uc3QgcGFzc0lucHV0ID0gaW5wdXRGYWN0b3J5KCdwYXNzd29yZCcsICd1c2VyUGFzcycsICdsb2dpbl9faW5wdXQnLCAncGFzc3dvcmQnKTtcbiAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdsb2dpbl9fYnV0dG9uJywnU2lnbiBpbicsIGxvZ2luVXNlcilcblxuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBzaWduVXBCdXR0b24udGV4dENvbnRlbnQgPSAnT3IsIGNyZWF0ZSBhIG5ldyBhY2NvdW50J1xuICAgIHNpZ25VcEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzaWdudXBfX2J1dHRvbicpO1xuICAgIHNpZ25VcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVVzZXIpO1xuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX2NvbnRlbnQnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGRpc3BsYXlOYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZW1haWxJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwYXNzSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoc2lnblVwQnV0dG9uKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBsb2dpbk1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1NpZ24gaW4gdG8gc2xhY2snO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0dldCBzdGFydGVkIGNvbGxhYnJvYXRpbmcgd2l0aCB5b3VyIHRlYW1tYXRlcy4nO1xuICAgIHRpdGxlU3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59XG4iLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgbmV3Q2hhbm5lbE1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ld0NoYW5uZWxNb2RhbDtcblxuLy8gSGlkZXMgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBoaWRlQ3JlYXRlTmV3Q2hhbm5lbCA9ICgpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGknKVxufVxuXG4vLyBDcmVhdGVzIHRoZSBjb250ZW50IGZvciB0aGUgY3JlYXRlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjcmVhdGVDaGFubmVsQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50U3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGlucHV0RmFjdG9yeSA9IHJlcXVpcmUoJy4vaW5wdXRGYWN0b3J5Jyk7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeVRleHQgPSByZXF1aXJlKCcuL2J1dHRvbkZhY3RvcnlUZXh0Jyk7XG4gICAgY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0TGFiZWxGYWN0b3J5Jyk7XG4gICAgY29uc3QgZGF0YWJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL2RhdGFiYXNlQ3JlYXRlJyk7XG4gICAgY29uc3QgY3JlYXRlTmV3Q2hhbm5lbCA9IHJlcXVpcmUoJy4vY3JlYXRlTmV3Q2hhbm5lbCcpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudCcpXG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBtb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnTmFtZScpO1xuICAgIGNvbnN0IHB1cnBvc2VMYWJlbCA9IGlucHV0TGFiZWxGYWN0b3J5KCdQdXJwb3NlJyk7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSBpbnB1dEZhY3RvcnkoJ3RleHQnLCAnbmFtZUlucHV0JywgJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWlucHV0JywgJ2UuZy4gbWFya2V0aW5nJyk7XG4gICAgY29uc3QgcHVycG9zZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3B1cnBvc2VJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuXG4gICAgY29uc3QgbW9kYWxBY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG1vZGFsQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1hY3Rpb25zJylcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tY2FuY2VsJywnQ2FuY2VsJywgaGlkZUNyZWF0ZU5ld0NoYW5uZWwpXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNyZWF0ZScsJ0NyZWF0ZSBjaGFubmVsJywgY3JlYXRlTmV3Q2hhbm5lbClcblxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pXG4gICAgbW9kYWxBY3Rpb25zLmFwcGVuZENoaWxkKGNyZWF0ZUJ1dHRvbilcblxuICAgIC8vIE5lZWRzIHJlZmFjdG9yaW5nIC0gcmVhbGx5IHJlcGV0aXRpdmVcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocHVycG9zZUxhYmVsKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChtb2RhbEFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRTdHJ1Y3R1cmU7XG59XG5cbmNvbnN0IG1vZGFsVGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGVTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0NyZWF0ZSBuZXcgY2hhbm5lbCc7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnQ2hhbm5lbHMgYXJlIHdoZXJlIHlvdXIgbWVtYmVycyBjb21tdW5pY2F0ZS4gVGhleeKAmXJlIGJlc3Qgd2hlbiBvcmdhbml6ZWQgYXJvdW5kIGEgdG9waWMg4oCUICNsZWFkcywgZm9yIGV4YW1wbGUuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsX190aXRsZScpO1xuICAgIHRpdGxlU3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVTdHJ1Y3R1cmU7XG59IiwiLy8gQ3JlYXRlcyBjaGFubmVscyBjb21wb25lbnQgZm9yIHNpZGViYXJcbmNvbnN0IHNpZGViYXJDaGFubmVscyA9IChhbGxEYXRhKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBjaGFubmVsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBzaWRlYmFyU3RydWN0dXJlID0gcmVxdWlyZSgnLi9zaWRlYmFyU3RydWN0dXJlJyk7XG4gICAgY29uc3QgY2hhbmdlQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbmdlQ2hhbm5lbCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGNoYW5uZWxzSGVhZGVyKCk7XG4gICAgXG4gICAgYWxsRGF0YS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb25zdCBjaGFubmVsUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjaGFubmVsUm93LnNldEF0dHJpYnV0ZSgnaWQnLCBjLmtleSlcbiAgICAgICAgY2hhbm5lbFJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZUNoYW5uZWwpXG4gICAgICAgIGNoYW5uZWxSb3cuY2xhc3NMaXN0ID0gJ2luZGl2aWR1YWwtY2hhbm5lbCdcbiAgICAgICAgY29uc3QgaGFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBoYXNoLnNyYyA9ICdpbWcvaGFzaC5wbmcnXG5cbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBjaGFubmVsLnRleHRDb250ZW50ID0gYy5uYW1lO1xuXG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoaGFzaCk7XG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoY2hhbm5lbCk7XG4gICAgICAgIGNoYW5uZWxMaXN0LmFwcGVuZENoaWxkKGNoYW5uZWxSb3cpO1xuICAgIH0pXG4gICAgY2hhbm5lbExpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1saXN0JztcbiAgICBcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChjaGFubmVsTGlzdCk7XG5cbiAgICBzaWRlYmFyU3RydWN0dXJlKGNoYW5uZWxDb21wb25lbnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckNoYW5uZWxzO1xuXG5jb25zdCBjaGFubmVsc0hlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5SWNvbicpO1xuICAgIGNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9IHJlcXVpcmUoJy4vbmV3Q2hhbm5lbE1vZGFsJyk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0taGVhZGVyJ1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcbiAgICBjb25zdCBjcmVhdGVDaGFubmVsID0gYnV0dG9uRmFjdG9yeSgnc2lkZWJhcl9fY2hhbm5lbHMtLW5ldycsICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGFkZC1jaGFubmVsXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9pPicsIG5ld0NoYW5uZWxNb2RhbClcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59IiwiY29uc3QgY3JlYXRlU2lkZWJhciA9IChjaGFubmVsQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBsb2dvdXRVc2VyID0gcmVxdWlyZSgnLi91c2VyTG9nb3V0Jyk7XG4gICAgY29uc3QgbG9nT3V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9nb3V0VXNlcik7XG4gICAgbG9nT3V0LnRleHRDb250ZW50ID0gJ0xvZyBvdXQnXG4gICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoJ2xvZ291dF9fYnV0dG9uJylcblxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoY2hhbm5lbENvbXBvbmVudCk7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChsb2dPdXQpO1xufSBcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaWRlYmFyO1xuIiwiLy8gQ29uc3RhbnRseSBydW5uaW5nIHRvIGNoZWNrIHdoZXRoZXIgb3Igbm90IHVzZXIgaXMgbG9nZ2VkIGluXG5jb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoZmlyZWJhc2VVc2VyID0+IHtcbiAgICBpZiAoZmlyZWJhc2VVc2VyKSB7XG4gICAgICAgIGNvbnN0IGxvZ2luTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Nb2RhbCcpO1xuICAgICAgICBsb2dpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ2luTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBjb25zb2xlLmxvZygnVXNlciBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbn0pIiwiLy8gTGV0cyB1c2VyIGNyZWF0ZSBuZXcgYWNjb3VudFxuY29uc3QgY3JlYXRlVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRW1haWwnKS52YWx1ZTtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRGlzcGxheU5hbWUnKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJQYXNzJykudmFsdWU7XG4gICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcblxuICAgIGNsZWFySW5wdXRzKCd1c2VyRW1haWwnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyUGFzcycpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJEaXNwbGF5TmFtZScpXG5cbiAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpXG4gICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpXG5cbiAgICBhZGRUb1dhdGVyY29vbGVyKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVc2VyOyIsIi8vIExvZ3MgdXNlciBpbnRvIHByb2R1Y3RcbmNvbnN0IGxvZ2luVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhcklucHV0cyA9IHJlcXVpcmUoJy4vY2xlYXJJbnB1dHMnKTtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VyRW1haWwnKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJQYXNzJykudmFsdWU7XG4gICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcblxuICAgIGNsZWFySW5wdXRzKCd1c2VyRW1haWwnKVxuICAgIGNsZWFySW5wdXRzKCd1c2VyUGFzcycpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJEaXNwbGF5TmFtZScpXG5cbiAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcyk7XG4gICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpXG5cbn1cblxuIFxubW9kdWxlLmV4cG9ydHMgPSBsb2dpblVzZXI7IiwiLy8gTG9ncyBvdXQgdXNlclxuY29uc3QgbG9nb3V0VXNlciA9ICgpID0+IHtcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dFVzZXI7Il19
