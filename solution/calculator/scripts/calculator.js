/**
 * core
 */
var calculatorState = {
    operand1: undefined,
    operand2: undefined,
    operator: undefined
};

function doCalculation() {
    if (calculatorState.operand1 === undefined || calculatorState.operand2 === undefined) {
        return undefined;
    }
    switch (calculatorState.operator) {
        case '+':
            return calculatorState.operand1 + calculatorState.operand2;
            break;
        case '-':
            return calculatorState.operand1 - calculatorState.operand2;
            break;
        case '/':
            return (calculatorState.operand2 === 0) ? undefined : (calculatorState.operand1 / calculatorState.operand2);
            break;
        case '*':
            return calculatorState.operand1 * calculatorState.operand2;
            break;
        default:
            return undefined;
    }
}

function defineOperator(operator) {
    calculatorState.operator = operator;
    return calculatorState;
}

function calculate() {
    if (calculatorState.operand2 != undefined) {
        calculatorState.operand1 = doCalculation();
        calculatorState.operand2 = undefined;
    }
    return calculatorState;
}

function updateCurrentInputValue(digit) {
    if (calculatorState.operator === undefined) {
        calculatorState.operand1 = calculateNewNumberWithDigit(calculatorState.operand1, digit);
    } else {
        calculatorState.operand2 = calculateNewNumberWithDigit(calculatorState.operand2, digit);
    }
    return calculatorState;
}

function calculateNewNumberWithDigit(number, digit) {
    var currentValue = (number === undefined) ? 0 : number;
    return (currentValue * 10) + parseInt(digit);
}

function clear() {
    calculatorState.operand1 = undefined;
    calculatorState.operand2 = undefined;
    calculatorState.operator = undefined;
}

/**
 * UI
 */
$(function () {
    writeOutput("Welcome");
    initializeClickHandlers();
});

function initializeClickHandlers() {
    $("button").click(welcomeClickHandler);
    $(".number").click(numberClickHandler);
    $(".operator").click(operatorClickHandler);
    $("#key-\\=").click(equalsClickHandler);
    $("#key-c").click(clearClickHandler);
}

function welcomeClickHandler() {
    writeOutput("");
    $("button").unbind("click", welcomeClickHandler)
}

function numberClickHandler() {
    var state = updateCurrentInputValue(this.value);
    if (state.operator === undefined) {
        writeInput(state.operand1);
    } else {
        writeInput(state.operand2);
    }
}

function operatorClickHandler() {
    var state = defineOperator(this.value);
    if (state.operand2 === undefined) {
        writeInput("");
    }
    writeOutput(((state.operand1 === undefined) ? "" : (state.operand1 + " ")) + state.operator);
}

function equalsClickHandler() {
    var state = calculate();
    if (state.operand1 === undefined) {
        writeOutput("Invalid calculation");
        clear();
    } else {
        writeInput(state.operand1);
        writeOutput("");
    }
}

function clearClickHandler() {
    clear();
    writeInput("");
    writeOutput("");
}

function writeOutput(output) {
    $("#output").html(output);
}

function writeInput(input) {
    $("#input").html(input);
}

