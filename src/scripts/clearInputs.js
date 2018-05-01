// Clears fields after submission of a form/input
const clearInputs = (identifier) => {
    console.log(identifier)
    document.querySelector(`#${identifier}`).value = ''
}

module.exports = clearInputs;