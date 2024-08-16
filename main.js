// Step 1: Select elements
const buttons = document.querySelectorAll('.buttons button');
const display = document.getElementById('display');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');

// Variables to store the first number, operator, and the current state
let firstNumber = '';
let operator = '';
let waitingForSecondNumber = false;

// Step 2: Add event listeners to the buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Handle numbers and the decimal point
        if (!isNaN(buttonText) || buttonText === '.') {
            // Clear the display if waiting for the second number
            if (waitingForSecondNumber) {
                display.value = '';
                waitingForSecondNumber = false;
            }
            display.value += buttonText;
        }

        // Handle operators
        if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            firstNumber = display.value;
            operator = buttonText;
            waitingForSecondNumber = true;
        }
    });
});

// Step 3: Handle the equals button
equalsButton.addEventListener('click', () => {
    const secondNumber = display.value;

    if (firstNumber !== '' && operator !== '') {
        const result = evaluate(firstNumber, operator, secondNumber);
        display.value = result;
        firstNumber = ''; // Reset the first number
        operator = ''; // Reset the operator
        waitingForSecondNumber = false;
    }
});

// Step 4: Handle the delete button
deleteButton.addEventListener('click', () => {
    display.value = display.value.slice(0, -1);
});

// Step 5: Function to evaluate the expression
function evaluate(firstNumber, operator, secondNumber) {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
}
