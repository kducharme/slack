(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loadDatabase = require('./databaseLoad');
const createSidebar = require('./sidebarStructure')

loadDatabase();




},{"./databaseLoad":8,"./sidebarStructure":16}],2:[function(require,module,exports){
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
const clearInputs = (identifier) => {
    for(let i = 0; i < identifier.length; i++) {
        identifier[i].value = '';
    }
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
},{"./clearInputs":4,"./databaseCreate":6,"./dateGenerator":11}],6:[function(require,module,exports){
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



},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{"./databaseParse":9}],9:[function(require,module,exports){
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
},{"./databaseLoad":8,"./sidebarChannels":15}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
// Generates labels for inputs
const inputLabelFactory = (labelText) => {
    const label = document.createElement('p');
    label.classList.add('input__label');
    label.textContent = labelText;

    return label;
}

module.exports = inputLabelFactory;
},{}],14:[function(require,module,exports){
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
},{"./buttonFactoryText":3,"./createNewChannel":5,"./databaseCreate":6,"./inputFactory":12,"./inputLabelFactory":13}],15:[function(require,module,exports){
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
},{"./buttonFactoryIcon":2,"./newChannelModal":14,"./sidebarStructure":16}],16:[function(require,module,exports){
const createSidebar = (channelComponent) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    sidebar.appendChild(channelComponent);
}

module.exports = createSidebar;

},{"./sidebarChannels":15}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeUljb24uanMiLCJzY3JpcHRzL2J1dHRvbkZhY3RvcnlUZXh0LmpzIiwic2NyaXB0cy9jbGVhcklucHV0cy5qcyIsInNjcmlwdHMvY3JlYXRlTmV3Q2hhbm5lbC5qcyIsInNjcmlwdHMvZGF0YWJhc2VDcmVhdGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlRGVsZXRlLmpzIiwic2NyaXB0cy9kYXRhYmFzZUxvYWQuanMiLCJzY3JpcHRzL2RhdGFiYXNlUGFyc2UuanMiLCJzY3JpcHRzL2RhdGFiYXNlVXBkYXRlLmpzIiwic2NyaXB0cy9kYXRlR2VuZXJhdG9yLmpzIiwic2NyaXB0cy9pbnB1dEZhY3RvcnkuanMiLCJzY3JpcHRzL2lucHV0TGFiZWxGYWN0b3J5LmpzIiwic2NyaXB0cy9uZXdDaGFubmVsTW9kYWwuanMiLCJzY3JpcHRzL3NpZGViYXJDaGFubmVscy5qcyIsInNjcmlwdHMvc2lkZWJhclN0cnVjdHVyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGxvYWREYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJyk7XG5jb25zdCBjcmVhdGVTaWRlYmFyID0gcmVxdWlyZSgnLi9zaWRlYmFyU3RydWN0dXJlJylcblxubG9hZERhdGFiYXNlKCk7XG5cblxuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsImNvbnN0IGNsZWFySW5wdXRzID0gKGlkZW50aWZpZXIpID0+IHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaWRlbnRpZmllci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZGVudGlmaWVyW2ldLnZhbHVlID0gJyc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFySW5wdXRzOyIsImNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gcmVxdWlyZSgnLi9jbGVhcklucHV0cycpXG4gICAgY29uc3QgZGF0YWJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL2RhdGFiYXNlQ3JlYXRlJylcbiAgICBjb25zdCBkYXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9kYXRlR2VuZXJhdG9yJylcbiAgICBjb25zdCBuYW1lID0gZS5wYXRoWzJdLmNoaWxkTm9kZXNbMl0udmFsdWU7XG4gICAgY29uc3QgcHVycG9zZSA9IGUucGF0aFsyXS5jaGlsZE5vZGVzWzRdLnZhbHVlO1xuICAgIGNvbnN0IGRhdGUgPSBkYXRlR2VuZXJhdG9yKCk7XG4gICAgY29uc3QgdXNlcnMgPSBbXTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcHVycG9zZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdXNlcnMsXG4gICAgICAgIG1lc3NhZ2VzXG4gICAgfTtcbiAgICBjbGVhcklucHV0cyhjaGFubmVsSW5wdXQpO1xuICAgIGRhdGFiYXNlQ3JlYXRlKGNoYW5uZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld0NoYW5uZWw7IiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gKGNoYW5uZWwpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbicsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjaGFubmVsKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VDcmVhdGU7XG5cblxuIiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGRlbGV0ZVRhc2tJbkRCID0gKGtleSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke2tleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGtleSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufSIsImNvbnN0IGxvYWREYXRhYmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZVBhcnNlID0gcmVxdWlyZSgnLi9kYXRhYmFzZVBhcnNlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLmpzb24/cHJpbnQ9cHJldHR5JyxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICBkYXRhYmFzZVBhcnNlKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkRGF0YWJhc2U7IiwiLy8gUGFyc2VzIHRoZSBkYXRhIGxvYWRlZCBmcm9tIGZpcmViYXNlXG5jb25zdCBkYXRhYmFzZVBhcnNlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhYmFzZUxvYWQgPSByZXF1aXJlKCcuL2RhdGFiYXNlTG9hZCcpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICBjb25zdCBhbGxEYXRhID0gW107XG4gICAgY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgICAgbGV0IGluZGl2Q2hhbm5lbCA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGFbY2hhbm5lbF0ubmFtZSxcbiAgICAgICAgICAgIHB1cnBvc2U6IGRhdGFbY2hhbm5lbF0ucHVycG9zZSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGFbY2hhbm5lbF0uZGF0ZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBkYXRhW2NoYW5uZWxdLm1lc3NhZ2VzLFxuICAgICAgICAgICAgdXNlcnM6IGRhdGFbY2hhbm5lbF0udXNlcnNcbiAgICAgICAgfVxuICAgICAgICBhbGxEYXRhLnB1c2goaW5kaXZDaGFubmVsKVxuICAgIH0pXG4gICAgc2lkZWJhckNoYW5uZWxzKGFsbERhdGEpXG4gICAgcmV0dXJuIGFsbERhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0YWJhc2VQYXJzZTsiLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZmlyZWJhc2VVcGRhdGUgPSAodGFza1VwZGF0ZSkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC8ke3Rhc2tVcGRhdGUua2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0YXNrVXBkYXRlKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlyZWJhc2VVcGRhdGU7IiwiLy8gR2VuZXJhdGVzIHRvZGF5J3MgZGF0ZSBpbiBleCBmb3JtYXQ6IE9jdCwgNywgMTk4OVxuY29uc3QgZGF0ZUdlbmVyYXRvciA9ICgpID0+IHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoTmFtZXNbdG9kYXkuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIHJldHVybiBkYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVHZW5lcmF0b3I7IiwiLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgaW5wdXQgZmllbGRzXG5jb25zdCBpbnB1dEZhY3RvcnkgPSAodHlwZSwgaWRlbnRpZmllciwgY2xhc3NMaXN0LCBwbGFjZWhvbGRlcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRlbnRpZmllcik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIEdlbmVyYXRlcyBsYWJlbHMgZm9yIGlucHV0c1xuY29uc3QgaW5wdXRMYWJlbEZhY3RvcnkgPSAobGFiZWxUZXh0KSA9PiB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnaW5wdXRfX2xhYmVsJyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRMYWJlbEZhY3Rvcnk7IiwiLy8gQ3JlYXRlcyB0aGUgc3RydWN0dXJlIGZvciB0aGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9ICgpID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBjcmVhdGVDaGFubmVsQ29udGVudCgpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbCcpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXdDaGFubmVsTW9kYWw7XG5cbi8vIEhpZGVzIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgaGlkZUNyZWF0ZU5ld0NoYW5uZWwgPSAoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hpJylcbn1cblxuLy8gQ3JlYXRlcyB0aGUgY29udGVudCBmb3IgdGhlIGNyZWF0ZSBuZXcgY2hhbm5lbCBtb2RhbFxuY29uc3QgY3JlYXRlQ2hhbm5lbENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudFN0cnVjdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBpbnB1dEZhY3RvcnkgPSByZXF1aXJlKCcuL2lucHV0RmFjdG9yeScpO1xuICAgIGNvbnN0IGJ1dHRvbkZhY3RvcnlUZXh0ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5VGV4dCcpO1xuICAgIGNvbnN0IGlucHV0TGFiZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dExhYmVsRmFjdG9yeScpO1xuICAgIGNvbnN0IGRhdGFiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9kYXRhYmFzZUNyZWF0ZScpO1xuICAgIGNvbnN0IGNyZWF0ZU5ld0NoYW5uZWwgPSByZXF1aXJlKCcuL2NyZWF0ZU5ld0NoYW5uZWwnKTtcbiAgICBjb250ZW50U3RydWN0dXJlLmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQnKVxuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gbW9kYWxUaXRsZSgpO1xuXG4gICAgY29uc3QgbmFtZUxhYmVsID0gaW5wdXRMYWJlbEZhY3RvcnkoJ05hbWUnKTtcbiAgICBjb25zdCBwdXJwb3NlTGFiZWwgPSBpbnB1dExhYmVsRmFjdG9yeSgnUHVycG9zZScpO1xuXG4gICAgY29uc3QgbmFtZUlucHV0ID0gaW5wdXRGYWN0b3J5KCd0ZXh0JywgJ2NoYW5uZWxJbnB1dCcsICdjcmVhdGVDaGFubmVsX19jb250ZW50LS1pbnB1dCcsICdlLmcuIG1hcmtldGluZycpO1xuICAgIGNvbnN0IHB1cnBvc2VJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdjaGFubmVsSW5wdXQnLCAnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0taW5wdXQnLCBgRW50ZXIgY2hhbm5lbCBwdXJwb3NlLi5gKTtcblxuICAgIGNvbnN0IG1vZGFsQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb2RhbEFjdGlvbnMuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fY29udGVudC0tYWN0aW9ucycpXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gYnV0dG9uRmFjdG9yeVRleHQoJ2NyZWF0ZUNoYW5uZWxfX2NvbnRlbnQtLWNhbmNlbCcsJ0NhbmNlbCcsIGhpZGVDcmVhdGVOZXdDaGFubmVsKVxuICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19jb250ZW50LS1jcmVhdGUnLCdDcmVhdGUgY2hhbm5lbCcsIGNyZWF0ZU5ld0NoYW5uZWwpXG5cbiAgICBtb2RhbEFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKVxuICAgIG1vZGFsQWN0aW9ucy5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b24pXG5cbiAgICAvLyBOZWVkcyByZWZhY3RvcmluZyAtIHJlYWxseSByZXBldGl0aXZlXG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZVN0cnVjdHVyZSk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKHB1cnBvc2VMYWJlbCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlSW5wdXQpO1xuICAgIGNvbnRlbnRTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQobW9kYWxBY3Rpb25zKTtcblxuICAgIHJldHVybiBjb250ZW50U3RydWN0dXJlO1xufVxuXG5jb25zdCBtb2RhbFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlU3RydWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDcmVhdGUgbmV3IGNoYW5uZWwnO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gJ0NoYW5uZWxzIGFyZSB3aGVyZSB5b3VyIG1lbWJlcnMgY29tbXVuaWNhdGUuIFRoZXnigJlyZSBiZXN0IHdoZW4gb3JnYW5pemVkIGFyb3VuZCBhIHRvcGljIOKAlCAjbGVhZHMsIGZvciBleGFtcGxlLic7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuY2xhc3NMaXN0LmFkZCgnY3JlYXRlQ2hhbm5lbF9fdGl0bGUnKTtcbiAgICB0aXRsZVN0cnVjdHVyZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVTdHJ1Y3R1cmUuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHRpdGxlU3RydWN0dXJlO1xufSIsIi8vIENyZWF0ZXMgY2hhbm5lbHMgY29tcG9uZW50IGZvciBzaWRlYmFyXG5jb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSAoYWxsRGF0YSkgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgY2hhbm5lbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgc2lkZWJhclN0cnVjdHVyZSA9IHJlcXVpcmUoJy4vc2lkZWJhclN0cnVjdHVyZScpO1xuICAgIGNvbnN0IGhlYWRlciA9IGNoYW5uZWxzSGVhZGVyKCk7XG4gICAgXG4gICAgYWxsRGF0YS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb25zdCBjaGFubmVsUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjaGFubmVsUm93LmNsYXNzTGlzdCA9ICdpbmRpdmlkdWFsLWNoYW5uZWwnXG4gICAgICAgIGNvbnN0IGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaGFzaC5zcmMgPSAnaW1nL2hhc2gucG5nJ1xuXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgY2hhbm5lbC50ZXh0Q29udGVudCA9IGMubmFtZTtcbiAgICAgICAgY2hhbm5lbC5ocmVmID0gYy5uYW1lO1xuXG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoaGFzaCk7XG4gICAgICAgIGNoYW5uZWxSb3cuYXBwZW5kQ2hpbGQoY2hhbm5lbCk7XG4gICAgICAgIGNoYW5uZWxMaXN0LmFwcGVuZENoaWxkKGNoYW5uZWxSb3cpO1xuICAgIH0pXG4gICAgY2hhbm5lbExpc3QuY2xhc3NMaXN0ID0gJ3NpZGViYXJfX2NoYW5uZWxzLS1saXN0JztcbiAgICBcbiAgICBjaGFubmVsQ29tcG9uZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY2hhbm5lbENvbXBvbmVudC5hcHBlbmRDaGlsZChjaGFubmVsTGlzdCk7XG5cbiAgICBzaWRlYmFyU3RydWN0dXJlKGNoYW5uZWxDb21wb25lbnQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2lkZWJhckNoYW5uZWxzO1xuXG5jb25zdCBjaGFubmVsc0hlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5ID0gcmVxdWlyZSgnLi9idXR0b25GYWN0b3J5SWNvbicpO1xuICAgIGNvbnN0IG5ld0NoYW5uZWxNb2RhbCA9IHJlcXVpcmUoJy4vbmV3Q2hhbm5lbE1vZGFsJyk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaGVhZGVyLmNsYXNzTGlzdCA9ICdzaWRlYmFyX19jaGFubmVscy0taGVhZGVyJ1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcbiAgICBjb25zdCBjcmVhdGVDaGFubmVsID0gYnV0dG9uRmFjdG9yeSgnc2lkZWJhcl9fY2hhbm5lbHMtLW5ldycsICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGFkZC1jaGFubmVsXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9pPicsIG5ld0NoYW5uZWxNb2RhbClcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59IiwiY29uc3QgY3JlYXRlU2lkZWJhciA9IChjaGFubmVsQ29tcG9uZW50KSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY29uc3Qgc2lkZWJhckNoYW5uZWxzID0gcmVxdWlyZSgnLi9zaWRlYmFyQ2hhbm5lbHMnKTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKGNoYW5uZWxDb21wb25lbnQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNpZGViYXI7XG4iXX0=
