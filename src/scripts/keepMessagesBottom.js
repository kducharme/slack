const keepMessagesBottom = () => {
    let messageBody = document.querySelector('#messages');
    messageBody.scrollTop = 9999;
}

module.exports = keepMessagesBottom;