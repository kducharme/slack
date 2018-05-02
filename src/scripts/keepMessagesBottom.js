const keepMessagesBottom = () => {
    console.log('hi')
    let messageBody = document.querySelector('#messages');
    console.log(messageBody.scrollHeight)
    messageBody.scrollTop = messageBody.scrollHeight;
}

window.onload = keepMessagesBottom();

module.exports = keepMessagesBottom;