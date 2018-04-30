const clearInputs = (identifier) => {
    for(let i = 0; i < identifier.length; i++) {
        identifier[i].value = '';
    }
}

module.exports = clearInputs;