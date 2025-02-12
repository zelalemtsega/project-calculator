// fuctions for the basic operators

function add(a,b){
return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if (b===0){
        return "ERROR! can't divide by zero"
    }
    return a/b;
}

//operator function
function operate(operator,a,b){
    if (operator==='+'){
        return add(a,b);
    }else if (operator==='-'){
        return subtract(a,b);
    }else if (operator==='*'){
        return multiply(a,b);
    }else if (operator==='/'){
        return divide(a,b);
    }else {
        return "you input invalid operator"
    }
}

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector("#display");

function updateDisplay(content) {
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    if (display.textContent === "0") {
        display.textContent = content;
    } else {
        display.textContent += content;
    }
}

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => updateDisplay(button.textContent));
});

document.querySelector(".decimal").addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        updateDisplay(".");
    }
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => setOperator(button.textContent));
});

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = parseFloat(display.textContent);
    currentOperator = operator;
    shouldResetDisplay = true;
}
document.querySelector(".equals").addEventListener("click", evaluate);

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === "/" && display.textContent === "0") {
        display.textContent = "Error: Cannot divide by 0";
        return;
    }
    secondNumber = parseFloat(display.textContent);
    display.textContent = roundResult(operate(currentOperator, firstNumber, secondNumber));
    currentOperator = null;
}

function roundResult(result) {
    return Math.round(result * 1000) / 1000; // Round to 3 decimal places
}
document.querySelector(".clear").addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;
});

