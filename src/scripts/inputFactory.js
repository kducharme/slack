// Factory for creating input fields
const inputFactory = (type, classList, placeholder) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList.add(classList)
    input.placeholder = placeholder;
    
    return input;
};

module.exports = inputFactory;
