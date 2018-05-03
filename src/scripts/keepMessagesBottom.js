const keepMessagesBottom = () => {
    console.log('hi')
    let messageBody = document.querySelector('#messages');
    console.log(messageBody.scrollHeight)
    messageBody.scrollTop = 9999;
}

module.exports = keepMessagesBottom;