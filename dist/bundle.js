(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const createSidebar = require('./sidebarStructure')

createSidebar();

// const loadDatabase = require('./databaseLoad');

// loadDatabase();


},{"./sidebarStructure":12}],2:[function(require,module,exports){
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
// Creates the structure for the new channel modal
const createNewChannel = () => {
    const modal = document.createElement('span');
    const modalContent = createChannelContent();
    const body = document.querySelector('body');
    modal.classList.add('createChannel')
    body.appendChild(modal);
}

module.exports = createNewChannel;

// Hides create new channel modal
const hideCreateNewChannel = () => {
    console.log('hi')
}

// Creates the content for the create new channel modal
const createChannelContent = () => {
    const contentStructure = document.createElement('span');
    const inputFactory = require('./inputFactory');
    const buttonFactoryText = require('./buttonFactoryText');
    const databaseCreate = require('./databaseCreate');

    const nameInput = inputFactory('text', 'createChannel__input', 'e.g. marketing');
    const purposeInput = inputFactory('text', 'createChannel__input', `Enter channel purpose..`);
    const cancelButton = buttonFactoryText('createChannel__button','Cancel', hideCreateNewChannel)
    const createButton = buttonFactoryText('createChannel__button','Create channel', databaseCreate)
    contentStructure.appendChild(nameInput);
    contentStructure.appendChild(purposeInput);

    return contentStructure;
}
},{"./buttonFactoryText":3,"./databaseCreate":5,"./inputFactory":10}],5:[function(require,module,exports){
/*
NEEDS:
- Multi tiers for channel and messages
*/

const firebaseCreate = (task) => {
    console.log('hi')
    $.ajax({
        url: 'https://slack-kd.firebaseio.com/channel.json',
        type: "POST",
        data: JSON.stringify(task),
        success: function () {
            console.log("success");
        },
        error: function (error) {
            console.log("error: " + error)
        }
    });
}

exports.module = firebaseCreate;



},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
const loadDatabase = () => {
    const databaseParse = require('./databaseParse');
    $.ajax({
        url: 'https://slack-kd.firebaseio.com/channel.json?print=pretty',
        type: "GET",
        success: function (data) {
            firebaseParse(data)
        },
        error: function (error) {
            console.table(error)
        }
    });
}

module.exports = loadDatabase;
},{"./databaseParse":8}],8:[function(require,module,exports){
// const firebaseParse = (data) => {
//     const getFirebaseData = require('./databaseLoad');
//     const printTasks = require('./printTasks');
//     let allTasks = []
//     const keys = Object.keys(data);
//     keys.forEach(task => {
//         let individualTask = {
//             key: task,
//             title: data[task].title,
//             details: data[task].details,
//             priority: data[task].priority,
//             lane: data[task].lane,
//         }
//     })
//     return allTasks;
// }

// module.exports = firebaseParse;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
// Factory for creating input fields
const inputFactory = (type, classList, placeholder) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList.add(classList)
    input.placeholder = placeholder;
    
    return input;
};

module.exports = inputFactory;

},{}],11:[function(require,module,exports){
// Creates channels component for sidebar
const sidebarChannels = () => {
    const buttonFactory = require('./buttonFactoryIcon');
    const createNewChannel = require('./createNewChannel');
    const sectionTitle = document.createElement('span');
    sectionTitle.classList = 'sidebar__channels--header'

    const title = document.createElement('h2');
    title.textContent = 'Channels'

    const createChannel = buttonFactory('sidebar__channels--new', '<i class="material-icons add-channel">add_circle_outline</i>', createNewChannel)

    sectionTitle.appendChild(title);
    sectionTitle.appendChild(createChannel);

    return sectionTitle
}

module.exports = sidebarChannels;
},{"./buttonFactoryIcon":2,"./createNewChannel":4}],12:[function(require,module,exports){
const createSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarChannels = require('./sidebarChannels');
    const sectionTitle = sidebarChannels();

    console.log(sectionTitle)

    sidebar.appendChild(sectionTitle);
}

module.exports = createSidebar;

},{"./sidebarChannels":11}]},{},[1,2,3,4,5,6,7,8,9,10,11,12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC5qcyIsInNjcmlwdHMvYnV0dG9uRmFjdG9yeUljb24uanMiLCJzY3JpcHRzL2J1dHRvbkZhY3RvcnlUZXh0LmpzIiwic2NyaXB0cy9jcmVhdGVOZXdDaGFubmVsLmpzIiwic2NyaXB0cy9kYXRhYmFzZUNyZWF0ZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VEZWxldGUuanMiLCJzY3JpcHRzL2RhdGFiYXNlTG9hZC5qcyIsInNjcmlwdHMvZGF0YWJhc2VQYXJzZS5qcyIsInNjcmlwdHMvZGF0YWJhc2VVcGRhdGUuanMiLCJzY3JpcHRzL2lucHV0RmFjdG9yeS5qcyIsInNjcmlwdHMvc2lkZWJhckNoYW5uZWxzLmpzIiwic2NyaXB0cy9zaWRlYmFyU3RydWN0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGNyZWF0ZVNpZGViYXIgPSByZXF1aXJlKCcuL3NpZGViYXJTdHJ1Y3R1cmUnKVxuXG5jcmVhdGVTaWRlYmFyKCk7XG5cbi8vIGNvbnN0IGxvYWREYXRhYmFzZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJyk7XG5cbi8vIGxvYWREYXRhYmFzZSgpO1xuXG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBpY29uLWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uVGV4dDtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xuICAgIHJldHVybiBidXR0b247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvbkZhY3Rvcnk7XG4iLCIvLyBGYWN0b3J5IGZvciBjcmVhdGluZyB0ZXh0LWJhc2VkIGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkZhY3RvcnkgPSAoY2xhc3NMaXN0LCBidXR0b25UZXh0LCBldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uRmFjdG9yeTtcbiIsIi8vIENyZWF0ZXMgdGhlIHN0cnVjdHVyZSBmb3IgdGhlIG5ldyBjaGFubmVsIG1vZGFsXG5jb25zdCBjcmVhdGVOZXdDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUNoYW5uZWxDb250ZW50KCk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdjcmVhdGVDaGFubmVsJylcbiAgICBib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVOZXdDaGFubmVsO1xuXG4vLyBIaWRlcyBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGhpZGVDcmVhdGVOZXdDaGFubmVsID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdoaScpXG59XG5cbi8vIENyZWF0ZXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBjcmVhdGUgbmV3IGNoYW5uZWwgbW9kYWxcbmNvbnN0IGNyZWF0ZUNoYW5uZWxDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRTdHJ1Y3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgaW5wdXRGYWN0b3J5ID0gcmVxdWlyZSgnLi9pbnB1dEZhY3RvcnknKTtcbiAgICBjb25zdCBidXR0b25GYWN0b3J5VGV4dCA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeVRleHQnKTtcbiAgICBjb25zdCBkYXRhYmFzZUNyZWF0ZSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VDcmVhdGUnKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdjcmVhdGVDaGFubmVsX19pbnB1dCcsICdlLmcuIG1hcmtldGluZycpO1xuICAgIGNvbnN0IHB1cnBvc2VJbnB1dCA9IGlucHV0RmFjdG9yeSgndGV4dCcsICdjcmVhdGVDaGFubmVsX19pbnB1dCcsIGBFbnRlciBjaGFubmVsIHB1cnBvc2UuLmApO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGJ1dHRvbkZhY3RvcnlUZXh0KCdjcmVhdGVDaGFubmVsX19idXR0b24nLCdDYW5jZWwnLCBoaWRlQ3JlYXRlTmV3Q2hhbm5lbClcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBidXR0b25GYWN0b3J5VGV4dCgnY3JlYXRlQ2hhbm5lbF9fYnV0dG9uJywnQ3JlYXRlIGNoYW5uZWwnLCBkYXRhYmFzZUNyZWF0ZSlcbiAgICBjb250ZW50U3RydWN0dXJlLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgY29udGVudFN0cnVjdHVyZS5hcHBlbmRDaGlsZChwdXJwb3NlSW5wdXQpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRTdHJ1Y3R1cmU7XG59IiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGZpcmViYXNlQ3JlYXRlID0gKHRhc2spID0+IHtcbiAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc2xhY2sta2QuZmlyZWJhc2Vpby5jb20vY2hhbm5lbC5qc29uJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRhc2spLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0cy5tb2R1bGUgPSBmaXJlYmFzZUNyZWF0ZTtcblxuXG4iLCIvKlxuTkVFRFM6XG4tIE11bHRpIHRpZXJzIGZvciBjaGFubmVsIGFuZCBtZXNzYWdlc1xuKi9cblxuY29uc3QgZGVsZXRlVGFza0luREIgPSAoa2V5KSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9zbGFjay1rZC5maXJlYmFzZWlvLmNvbS9jaGFubmVsLyR7a2V5fS5qc29uYCxcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoa2V5KSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKCdlcnJvcjogJyArIGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiY29uc3QgbG9hZERhdGFiYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGFiYXNlUGFyc2UgPSByZXF1aXJlKCcuL2RhdGFiYXNlUGFyc2UnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICdodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwuanNvbj9wcmludD1wcmV0dHknLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZmlyZWJhc2VQYXJzZShkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZERhdGFiYXNlOyIsIi8vIGNvbnN0IGZpcmViYXNlUGFyc2UgPSAoZGF0YSkgPT4ge1xuLy8gICAgIGNvbnN0IGdldEZpcmViYXNlRGF0YSA9IHJlcXVpcmUoJy4vZGF0YWJhc2VMb2FkJyk7XG4vLyAgICAgY29uc3QgcHJpbnRUYXNrcyA9IHJlcXVpcmUoJy4vcHJpbnRUYXNrcycpO1xuLy8gICAgIGxldCBhbGxUYXNrcyA9IFtdXG4vLyAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuLy8gICAgIGtleXMuZm9yRWFjaCh0YXNrID0+IHtcbi8vICAgICAgICAgbGV0IGluZGl2aWR1YWxUYXNrID0ge1xuLy8gICAgICAgICAgICAga2V5OiB0YXNrLFxuLy8gICAgICAgICAgICAgdGl0bGU6IGRhdGFbdGFza10udGl0bGUsXG4vLyAgICAgICAgICAgICBkZXRhaWxzOiBkYXRhW3Rhc2tdLmRldGFpbHMsXG4vLyAgICAgICAgICAgICBwcmlvcml0eTogZGF0YVt0YXNrXS5wcmlvcml0eSxcbi8vICAgICAgICAgICAgIGxhbmU6IGRhdGFbdGFza10ubGFuZSxcbi8vICAgICAgICAgfVxuLy8gICAgIH0pXG4vLyAgICAgcmV0dXJuIGFsbFRhc2tzO1xuLy8gfVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IGZpcmViYXNlUGFyc2U7IiwiLypcbk5FRURTOlxuLSBNdWx0aSB0aWVycyBmb3IgY2hhbm5lbCBhbmQgbWVzc2FnZXNcbiovXG5cbmNvbnN0IGZpcmViYXNlVXBkYXRlID0gKHRhc2tVcGRhdGUpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovL3NsYWNrLWtkLmZpcmViYXNlaW8uY29tL2NoYW5uZWwvJHt0YXNrVXBkYXRlLmtleX0uanNvbmAsXG4gICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGFza1VwZGF0ZSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZSgnZXJyb3I6ICcgKyBlcnJvcilcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpcmViYXNlVXBkYXRlOyIsIi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGlucHV0IGZpZWxkc1xuY29uc3QgaW5wdXRGYWN0b3J5ID0gKHR5cGUsIGNsYXNzTGlzdCwgcGxhY2Vob2xkZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBcbiAgICByZXR1cm4gaW5wdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0RmFjdG9yeTtcbiIsIi8vIENyZWF0ZXMgY2hhbm5lbHMgY29tcG9uZW50IGZvciBzaWRlYmFyXG5jb25zdCBzaWRlYmFyQ2hhbm5lbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uRmFjdG9yeSA9IHJlcXVpcmUoJy4vYnV0dG9uRmFjdG9yeUljb24nKTtcbiAgICBjb25zdCBjcmVhdGVOZXdDaGFubmVsID0gcmVxdWlyZSgnLi9jcmVhdGVOZXdDaGFubmVsJyk7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QgPSAnc2lkZWJhcl9fY2hhbm5lbHMtLWhlYWRlcidcblxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdDaGFubmVscydcblxuICAgIGNvbnN0IGNyZWF0ZUNoYW5uZWwgPSBidXR0b25GYWN0b3J5KCdzaWRlYmFyX19jaGFubmVscy0tbmV3JywgJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgYWRkLWNoYW5uZWxcIj5hZGRfY2lyY2xlX291dGxpbmU8L2k+JywgY3JlYXRlTmV3Q2hhbm5lbClcblxuICAgIHNlY3Rpb25UaXRsZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgc2VjdGlvblRpdGxlLmFwcGVuZENoaWxkKGNyZWF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIHNlY3Rpb25UaXRsZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZGViYXJDaGFubmVsczsiLCJjb25zdCBjcmVhdGVTaWRlYmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNvbnN0IHNpZGViYXJDaGFubmVscyA9IHJlcXVpcmUoJy4vc2lkZWJhckNoYW5uZWxzJyk7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gc2lkZWJhckNoYW5uZWxzKCk7XG5cbiAgICBjb25zb2xlLmxvZyhzZWN0aW9uVGl0bGUpXG5cbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2lkZWJhcjtcbiJdfQ==
