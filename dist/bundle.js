(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loadDatabase = require('./databaseLoad');
const createSidebar = require('./sidebarStructure')
const loginUserModal = require('./loginScreen')

loadDatabase();
loginUserModal();




},{"./databaseLoad":9,"./loginScreen":15,"./sidebarStructure":18}],2:[function(require,module,exports){
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
// Clears fields after submission of a form/input
const clearInputs = (identifier) => {
    document.querySelector(`#${identifier}`).value = ''
}

module.exports = clearInputs;
},{}],5:[function(require,module,exports){
const createNewChannel = (e) => {
    const clearInputs = require('./clearInputs')
    const databaseCreate = require('./databaseCreate')
    const dateGenerator = require('./dateGenerator')
    const name = e.path[2].childNodes[2].value;
    const purpose = e.path[2].childNodes[4].value;
    const date = dateGenerator();
    const users = [];
    const messages = [];

    const channel = {
        name,
        purpose,
        date,
        users,
        messages
    };
    clearInputs(channelInput);
    databaseCreate(channel);
}

module.exports = createNewChannel;
},{"./clearInputs":4,"./databaseCreate":7,"./dateGenerator":12}],6:[function(require,module,exports){
// User can write and post a text message to the message area
const createNewPost = () => {
    const input = document.querySelector('#writeMessage');

}

module.exports = createNewPost;
},{}],7:[function(require,module,exports){
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



},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{"./databaseParse":10}],10:[function(require,module,exports){
// Parses the data loaded from firebase
const databaseParse = (data) => {
    const databaseLoad = require('./databaseLoad');
    const sidebarChannels = require('./sidebarChannels');
    const channels = Object.keys(data);
    const allData = [];
    channels.forEach(channel => {
        let indivChannel = {
            name: data[channel].name,
            purpose: data[channel].purpose,
            date: data[channel].date,
            messages: data[channel].messages,
            users: data[channel].users
        }
        allData.push(indivChannel)
    })
    sidebarChannels(allData)
    return allData;
}

module.exports = databaseParse;
},{"./databaseLoad":9,"./sidebarChannels":17}],11:[function(require,module,exports){
/*
NEEDS:
- Multi tiers for channel and messages
*/

const firebaseUpdate = (taskUpdate) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/channel/${taskUpdate.key}.json`,
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
// Generates labels for inputs
const inputLabelFactory = (labelText) => {
    const label = document.createElement('p');
    label.classList.add('input__label');
    label.textContent = labelText;

    return label;
}

module.exports = inputLabelFactory;
},{}],15:[function(require,module,exports){
// Creates the structure for the login page
const loginUserModal = () => {
    const modal = document.createElement('span');
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

},{"./buttonFactoryText":3,"./inputFactory":13,"./userCreate":20,"./userLogin":21}],16:[function(require,module,exports){
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

    const nameInput = inputFactory('text', 'channelInput', 'createChannel__content--input', 'e.g. marketing');
    const purposeInput = inputFactory('text', 'channelInput', 'createChannel__content--input', `Enter channel purpose..`);

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
},{"./buttonFactoryText":3,"./createNewChannel":5,"./databaseCreate":7,"./inputFactory":13,"./inputLabelFactory":14}],17:[function(require,module,exports){
// Creates channels component for sidebar
const sidebarChannels = (allData) => {
    const channelComponent = document.createElement('span');
    const channelList = document.createElement('span');
    const sidebarStructure = require('./sidebarStructure');
    const header = channelsHeader();
    
    allData.forEach(c => {
        const channelRow = document.createElement('span');
        channelRow.classList = 'individual-channel'
        const hash = document.createElement('img');
        hash.src = 'img/hash.png'

        const channel = document.createElement('a')
        channel.textContent = c.name;
        channel.href = c.name;

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
},{"./buttonFactoryIcon":2,"./newChannelModal":16,"./sidebarStructure":18}],18:[function(require,module,exports){
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    sidebar.appendChild(channelComponent);
}

module.exports = createSidebar;

},{"./sidebarChannels":17}],19:[function(require,module,exports){
// Constantly running to check whether or not user is logged in
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    }
    else {
        console.log('User does not exist');
    }
})
},{}],20:[function(require,module,exports){
// Lets user create new account
const createUser = () => {
    const clearInputs = require('./clearInputs');
    const email = document.querySelector('#userEmail').value;
    const pass = document.querySelector('#userPass').value;
    const auth = firebase.auth();

    clearInputs('userEmail')
    clearInputs('userPass')

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))
}


module.exports = createUser
},{"./clearInputs":4}],21:[function(require,module,exports){
// Logs user into product
const loginUser = () => {
    const clearInputs = require('./clearInputs');
    const email = document.querySelector('#userEmail').value;
    const pass = document.querySelector('#userPass').value;
    const auth = firebase.auth();

    clearInputs('userEmail')
    clearInputs('userPass')

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))

}

 
module.exports = loginUser;
},{"./clearInputs":4}],22:[function(require,module,exports){
// Logs out user
const logoutUser = () => {
    firebase.auth().signOut();
}
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeUljb24uanMiLCJzY3JpcHRzL2J1dHRvbkZhY3RvcnlUZXh0LmpzIiwic2NyaXB0cy9jbGVhcklucHV0cy5qcyIsInNjcmlwdHMvY3JlYXRlTmV3Q2hhbm5lbC5qcyIsInNjcmlwdHMvY3JlYXRlTmV3UG9zdC5qcyIsInNjcmlwdHMvZGF0YWJhc2VDcmVhdGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9sb2dpblNjcmVlbi5qcyIsInNjcmlwdHMvbmV3Q2hhbm5lbE1vZGFsLmpzIiwic2NyaXB0cy9zaWRlYmFyQ2hhbm5lbHMuanMiLCJzY3JpcHRzL3NpZGViYXJTdHJ1Y3R1cmUuanMiLCJzY3JpcHRzL3VzZXJDaGVjay5qcyIsInNjcmlwdHMvdXNlckNyZWF0ZS5qcyIsInNjcmlwdHMvdXNlckxvZ2luLmpzIiwic2NyaXB0cy91c2VyTG9nb3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgbG9hZERhdGFiYXNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUxvYWQnKTtcbmNvbnN0IGNyZWF0ZVNpZGViYXIgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKVxuY29uc3QgbG9naW5Vc2VyTW9kYWwgPSByZXF1aXJlKCcuL2xvZ2luU2NyZWVuJylcblxubG9hZERhdGFiYXNlKCk7XG5sb2dpblVzZXJNb2RhbCgpO1xuXG5cblxuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaWNvbi1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvblRleHQ7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25GYWN0b3J5O1xuIiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgdGV4dC1iYXNlZCBidXR0b25zXG5jb25zdCBidXR0b25GYWN0b3J5ID0gKGNsYXNzTGlzdCwgYnV0dG9uVGV4dCwgZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBDbGVhcnMgZmllbGRzIGFmdGVyIHN1Ym1pc3Npb24gb2YgYSBmb3JtL2lucHV0XG5jb25zdCBjbGVhcklucHV0cyA9IChpZGVudGlmaWVyKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWRlbnRpZmllcn1gKS52YWx1ZSA9ICcnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xlYXJJbnB1dHM7IiwiY29uc3QgY3JlYXRlTmV3Q2hhbm5lbCA9IChlKSA9PiB7XG4gICAgY29uc3QgY2xlYXJJbnB1dHMgPSByZXF1aXJlKCcuL2NsZWFySW5wdXRzJylcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKVxuICAgIGNvbnN0IGRhdGVHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2RhdGVHZW5lcmF0b3InKVxuICAgIGNvbnN0IG5hbWUgPSBlLnBhdGhbMl0uY2hpbGROb2Rlc1syXS52YWx1ZTtcbiAgICBjb25zdCBwdXJwb3NlID0gZS5wYXRoWzJdLmNoaWxkTm9kZXNbNF0udmFsdWU7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGVHZW5lcmF0b3IoKTtcbiAgICBjb25zdCB1c2VycyA9IFtdO1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gW107XG5cbiAgICBjb25zdCBjaGFubmVsID0ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBwdXJwb3NlLFxuICAgICAgICBkYXRlLFxuICAgICAgICB1c2VycyxcbiAgICAgICAgbWVzc2FnZXNcbiAgICB9O1xuICAgIGNsZWFySW5wdXRzKGNoYW5uZWxJbnB1dCk7XG4gICAgZGF0YWJhc2VDcmVhdGUoY2hhbm5lbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3Q2hhbm5lbDsiLCIvLyBVc2VyIGNhbiB3cml0ZSBhbmQgcG9zdCBhIHRleHQgbWVzc2FnZSB0byB0aGUgbWVzc2FnZSBhcmVhXG5jb25zdCBjcmVhdGVOZXdQb3N0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyaXRlTWVzc2FnZScpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3UG9zdDsiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZGF0YWJhc2VDcmVhdGUgPSAoY2hhbm5lbCkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNoYW5uZWwpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRhYmFzZUNyZWF0ZTtcblxuXG4iLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZGVsZXRlVGFza0luREIgPSAoa2V5KSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7a2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoa2V5KSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiY29uc3QgbG9hZERhdGFiYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlUGFyc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlUGFyc2UnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgIGRhdGFiYXNlUGFyc2UoZGF0YSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWREYXRhYmFzZTsiLCIvLyBQYXJzZXMgdGhlIGRhdGEgbG9hZGVkIGZyb20gZmlyZWJhc2VcbmNvbnN0IGRhdGFiYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlTG9hZCA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBjb25zdCBjaGFubmVscyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBbXTtcbiAgICBjaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgICBsZXQgaW5kaXZDaGFubmVsID0ge1xuICAgICAgICAgICAgbmFtZTogZGF0YVtjaGFubmVsXS5uYW1lLFxuICAgICAgICAgICAgcHVycG9zZTogZGF0YVtjaGFubmVsXS5wdXJwb3NlLFxuICAgICAgICAgICAgZGF0ZTogZGF0YVtjaGFubmVsXS5kYXRlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IGRhdGFbY2hhbm5lbF0ubWVzc2FnZXMsXG4gICAgICAgICAgICB1c2VyczogZGF0YVtjaGFubmVsXS51c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGFsbERhdGEucHVzaChpbmRpdkNoYW5uZWwpXG4gICAgfSlcbiAgICBzaWRlYmFyQ2hhbm5lbHMoYWxsRGF0YSlcbiAgICByZXR1cm4gYWxsRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYXRhYmFzZVBhcnNlOyIsIi8qXG5ORUVEUzpcbi0gTXVsdGkgdGllcnMgZm9yIGNoYW5uZWwgYW5kIG1lc3NhZ2VzXG4qL1xuXG5jb25zdCBmaXJlYmFzZVVwZGF0ZSA9ICh0YXNrVXBkYXRlKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7dGFza1VwZGF0ZS5rZXl9Lmpzb25gLFxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRhc2tVcGRhdGUpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoJ2Vycm9yOiAnICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaXJlYmFzZVVwZGF0ZTsiLCIvLyBHZW5lcmF0ZXMgdG9kYXkncyBkYXRlIGluIGV4IGZvcm1hdDogT2N0LCA3LCAxOTg5XG5jb25zdCBkYXRlR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ11cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gbW9udGhOYW1lc1t0b2RheS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bW9udGh9ICR7ZGF5fSwgJHt5ZWFyfWA7XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZUdlbmVyYXRvcjsiLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpbnB1dCBmaWVsZHNcbmNvbnN0IGlucHV0RmFjdG9yeSA9ICh0eXBlLCBpZGVudGlmaWVyLCBjbGFzc0xpc3QsIHBsYWNlaG9sZGVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZGVudGlmaWVyKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdClcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIFxuICAgIHJldHVybiBpbnB1dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRGYWN0b3J5O1xuIiwiLy8gR2VuZXJhdGVzIGxhYmVscyBmb3IgaW5wdXRzXG5jb25zdCBpbnB1dExhYmVsRmFjdG9yeSA9IChsYWJlbFRleHQpID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdpbnB1dF9fbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcblxuICAgIHJldHVybiBsYWJlbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dExhYmVsRmFjdG9yeTsiLCIvLyBDcmVhdGVzIHRoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBsb2dpbiBwYWdlXG5jb25zdCBsb2dpblVzZXJNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2xvZ2luJylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChsb2dpbk1vZGFsQ29udGVudCgpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dpblVzZXJNb2RhbDtcblxuY29uc3QgbG9naW5Nb2RhbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGxvZ2luVXNlciA9IHJlcXVpcmUoJy4vdXNlckxvZ2luJyk7XG4gICAgY29uc3QgY3JlYXRlVXNlciA9IHJlcXVpcmUoJy4vdXNlckNyZWF0ZScpO1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbG9naW5Nb2RhbFRpdGxlKCk7XG5cbiAgICBjb25zdCBlbWFpbElucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ3VzZXJFbWFpbCcsICdsb2dpbl9faW5wdXQnLCAneW91QGV4YW1wbGUuY29tJyk7XG4gICAgY29uc3QgcGFzc0lucHV0ID0gaW5wdXRGYWN0b3J5KCdwYXNzd29yZCcsICd1c2VyUGFzcycsICdsb2dpbl9faW5wdXQnLCAncGFzc3dvcmQnKTtcbiAgICBjb25zdCBsb2dpbkJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdsb2dpbl9fYnV0dG9uJywnU2lnbiBpbicsIGxvZ2luVXNlcilcblxuICAgIGNvbnN0IHNpZ25VcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBzaWduVXBCdXR0b24udGV4dENvbnRlbnQgPSAnT3IsIGNyZWF0ZSBhIG5ldyBhY2NvdW50J1xuICAgIHNpZ25VcEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzaWdudXBfX2J1dHRvbicpO1xuICAgIHNpZ25VcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVVzZXIpO1xuXG4gICAgLy8gTmVlZHMgcmVmYWN0b3JpbmcgLSByZWFsbHkgcmVwZXRpdGl2ZVxuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnbG9naW5fX2NvbnRlbnQnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHRpdGxlU3RydWN0dXJlKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGVtYWlsSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQocGFzc0lucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKGxvZ2luQnV0dG9uKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHNpZ25VcEJ1dHRvbik7XG5cbiAgICByZXR1cm4gY29udGVudFN0cnVjdHVyZTtcbn1cblxuY29uc3QgbG9naW5Nb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdTaWduIGluIHRvIHNsYWNrJztcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9ICdHZXQgc3RhcnRlZCBjb2xsYWJyb2F0aW5nIHdpdGggeW91ciB0ZWFtbWF0ZXMuJztcbiAgICB0aXRsZVN0cnVjdHVyZS5jbGFzc0xpc3QuYWRkKCdsb2dpbl9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufVxuIiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBjcmVhdGVDaGFubmVsQ29udGVudCgpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbCcpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXdDaGFubmVsTW9kYWw7XG5cbi8vIEhpZGVzIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgaGlkZUNyZWF0ZU5ld0NoYW5uZWwgPSAoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hpJylcbn1cblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQnKVxuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgbmFtZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ05hbWUnKTtcbiAgICBjb25zdCBwdXJwb3NlTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnUHVycG9zZScpO1xuXG4gICAgY29uc3QgbmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ2NoYW5uZWxJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsICdlLmcuIG1hcmtldGluZycpO1xuICAgIGNvbnN0IHB1cnBvc2VJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdjaGFubmVsSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCBgRW50ZXIgY2hhbm5lbCBwdXJwb3NlLi5gKTtcblxuICAgIGNvbnN0IG1vZGFsQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbEFjdGlvbnMuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tYWN0aW9ucycpXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNhbmNlbCcsJ0NhbmNlbCcsIGhpZGVDcmVhdGVOZXdDaGFubmVsKVxuICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jcmVhdGUnLCdDcmVhdGUgY2hhbm5lbCcsIGNyZWF0ZU5ld0NoYW5uZWwpXG5cbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKVxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24pXG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobW9kYWxBY3Rpb25zKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsIi8vIENyZWF0ZXMgY2hhbm5lbHMgY29tcG9uZW50IGZvciBzaWRlYmFyXG5jb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSAoYWxsRGF0YSkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgY2hhbm5lbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgc2lkZWJhclN0cnVjdHVyZSA9IHJlcXVpcmUoJy4vc2lkZWJhclN0cnVjdHVyZScpO1xuICAgIGNvbnN0IGhlYWRlciA9IGNoYW5uZWxzSGVhZGVyKCk7XG4gICAgXG4gICAgYWxsRGF0YS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb25zdCBjaGFubmVsUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjaGFubmVsUm93LmNsYXNzTGlzdCA9ICdpbmRpdmlkdWFsLWNoYW5uZWwnXG4gICAgICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaGFzaC5zcmMgPSAnaW1nL2hhc2gucG5nJ1xuXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgY2hhbm5lbC50ZXh0Q29udGVudCA9IGMubmFtZTtcbiAgICAgICAgY2hhbm5lbC5ocmVmID0gYy5uYW1lO1xuXG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoaGFzaCk7XG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoY2hhbm5lbCk7XG4gICAgICAgIGNoYW5uZWxMaXN0LmFwcGVuZENoaWxkKGNoYW5uZWxSb3cpO1xuICAgIH0pXG4gICAgY2hhbm5lbExpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1saXN0JztcbiAgICBcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChjaGFubmVsTGlzdCk7XG5cbiAgICBzaWRlYmFyU3RydWN0dXJlKGNoYW5uZWxDb21wb25lbnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckNoYW5uZWxzO1xuXG5jb25zdCBjaGFubmVsc0hlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5SWNvbicpO1xuICAgIGNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9IHJlcXVpcmUoJy4vbmV3Q2hhbm5lbE1vZGFsJyk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0taGVhZGVyJ1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcbiAgICBjb25zdCBjcmVhdGVDaGFubmVsID0gYnV0dG9uRmFjdG9yeSgnc2lkZWJhcl9fY2hhbm5lbHMtLW5ldycsICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGFkZC1jaGFubmVsXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9pPicsIG5ld0NoYW5uZWxNb2RhbClcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59IiwiY29uc3QgY3JlYXRlU2lkZWJhciA9IChjaGFubmVsQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGNoYW5uZWxDb21wb25lbnQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7XG4iLCIvLyBDb25zdGFudGx5IHJ1bm5pbmcgdG8gY2hlY2sgd2hldGhlciBvciBub3QgdXNlciBpcyBsb2dnZWQgaW5cbmNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChmaXJlYmFzZVVzZXIgPT4ge1xuICAgIGlmIChmaXJlYmFzZVVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZmlyZWJhc2VVc2VyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufSkiLCIvLyBMZXRzIHVzZXIgY3JlYXRlIG5ldyBhY2NvdW50XG5jb25zdCBjcmVhdGVVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcyk7XG4gICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVc2VyIiwiLy8gTG9ncyB1c2VyIGludG8gcHJvZHVjdFxuY29uc3QgbG9naW5Vc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpO1xuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJFbWFpbCcpLnZhbHVlO1xuICAgIGNvbnN0IHBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlclBhc3MnKS52YWx1ZTtcbiAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJFbWFpbCcpXG4gICAgY2xlYXJJbnB1dHMoJ3VzZXJQYXNzJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKTtcbiAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSlcblxufVxuXG4gXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luVXNlcjsiLCIvLyBMb2dzIG91dCB1c2VyXG5jb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG59Il19
