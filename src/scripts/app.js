const loadDB = require('./databaseLoad').loadDatabase;
const loginUserModal = require('./loginScreen');
const keepMessagesBottom = require('./keepMessagesBottom');
// const channelDetails = require('./channelDetails').channelDetails;

loadDB();
loginUserModal();
keepMessagesBottom();
// channelDetails();



