/**
 * core
 */

(function () {
    "use strict";
    var calculatorState = {
        operand1: undefined,
        operand2: undefined,
        operator: undefined
    };

    function doCalculation() {
        'use strict';
        if (calculatorState.operand1 === undefined || calculatorState.operand2 === undefined) {
            return undefined;
        }
        switch (calculatorState.operator) {
            case '+':
                return calculatorState.operand1 + calculatorState.operand2;
            case '-':
                return calculatorState.operand1 - calculatorState.operand2;
            case '/':
                return (calculatorState.operand2 === 0) ? undefined : (calculatorState.operand1 / calculatorState.operand2);
            case '*':
                return calculatorState.operand1 * calculatorState.operand2;
            default:
                return undefined;
        }
    }

    function defineOperator(operator) {
        'use strict';
        calculatorState.operator = operator;
        return calculatorState;
    }

    function calculate() {
        'use strict';
        if (calculatorState.operand2 !== undefined) {
            calculatorState.operand1 = doCalculation();
            calculatorState.operand2 = undefined;
        }
        return calculatorState;
    }

    function calculateNewNumberWithDigit(number, digit) {
        'use strict';
        var currentValue = (number === undefined) ? 0 : number;
        return (currentValue * 10) + parseInt(digit);
    }

    function updateCurrentInputValue(digit) {
        'use strict';
        if (calculatorState.operator === undefined) {
            calculatorState.operand1 = calculateNewNumberWithDigit(calculatorState.operand1, digit);
        } else {
            calculatorState.operand2 = calculateNewNumberWithDigit(calculatorState.operand2, digit);
        }
        return calculatorState;
    }


    function clear() {
        'use strict';
        calculatorState.operand1 = undefined;
        calculatorState.operand2 = undefined;
        calculatorState.operator = undefined;
    }

    /**
     * UI
     */

    function writeOutput(value) {
        'use strict';
        document.querySelector("#output").value = value;
    }

    function writeInput(value) {
        'use strict';
        document.querySelector("#input").value = value;
    }

    function numberClickHandler(event) {
        'use strict';
        var state = updateCurrentInputValue(event.target.value);
        if (state.operator === undefined) {
            writeInput(state.operand1);
        } else {
            writeInput(state.operand2);
        }
    }

    function operatorClickHandler(event) {
        'use strict';
        var state = defineOperator(event.target.value);
        if (state.operand2 === undefined) {
            writeInput("");
        }
        writeOutput(((state.operand1 === undefined) ? "" : (state.operand1 + " ")) + state.operator);
    }

    function equalsClickHandler() {
        'use strict';
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
        'use strict';
        clear();
        writeInput("");
        writeOutput("");
    }


    window.addEventListener('load', function () {
        'use strict';
        var numberElements = document.getElementsByClassName('number');
        for (var i = 0; i < numberElements.length; i++) {
            numberElements[i].addEventListener('click', numberClickHandler);
        }
        var operatorElements = document.getElementsByClassName('operator');
        for (var i = 0; i < operatorElements.length; i++) {
            operatorElements[i].addEventListener('click', operatorClickHandler);
        }
        document.getElementById('key-=').addEventListener('click', equalsClickHandler);
        document.getElementById('key-c').addEventListener('click', clearClickHandler);
    });
})();