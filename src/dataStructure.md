# Data Needs / Structure

userList = [];

user = {
    firstName: 'Kyle',
    lastName: 'Ducharme',
    img: 'img/kducharme.png',
    username: 'ducharme.kyle@gmail.com'
    channels: ['watercooler', 'marketing'];
    messages: ['Hello world!']
}

channelList = [];

channel = {
    name: 'Watercooler',
    purpose: 'To discuss cool things',
    dateCreated: 'April 30, 2018'
    users: [username, username, etc.],
    messages: ['Hello world!', 'Waddup bro'];
}

messageList = [];

message = {
    channel: 'Watercooler'
    date: 'April 30, 2018',
    username: 'ducharme.kyle@gmail.com',
    text: 'Hello world!',
    media: 'img/thailand.png'
}