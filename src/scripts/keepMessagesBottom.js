const keepMessagesBottom = () => {
    let messageBody = document.querySelector('#messages');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

module.exports = keepMessagesBottom;