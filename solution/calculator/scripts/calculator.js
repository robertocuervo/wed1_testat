/**
 * core
 */
/*(function () {
    "use strict";*/
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
        calculatorState.operator = operator;
        return calculatorState;
    }

    function calculate() {
        if (calculatorState.operand2 !== undefined) {
            calculatorState.operand1 = doCalculation();
            calculatorState.operand2 = undefined;
        }
        return calculatorState;
    }

    function calculateNewNumberWithDigit(number, digit) {
        var currentValue = (number === undefined) ? 0 : number;
        return (currentValue * 10) + parseInt(digit);
    }

    function updateCurrentInputValue(digit) {
        if (calculatorState.operator === undefined) {
            calculatorState.operand1 = calculateNewNumberWithDigit(calculatorState.operand1, digit);
        } else {
            calculatorState.operand2 = calculateNewNumberWithDigit(calculatorState.operand2, digit);
        }
        return calculatorState;
    }


    function clear() {
        calculatorState.operand1 = undefined;
        calculatorState.operand2 = undefined;
        calculatorState.operator = undefined;
    }

    /**
     * UI
     */

    function writeOutput(value) {
		document.querySelector("#output").innerHTML = value;
		
		
        //$("#output").html(output);
    }

    function writeInput(value) {
		document.querySelector("#input").innerHTML = value;
    }

    function welcomeClickHandler() {
        writeOutput("");
        $("button").unbind("click", welcomeClickHandler);
    }

    function numberClickHandler(event) {
        var state = updateCurrentInputValue(event.target.value);
        if (state.operator === undefined) {
            writeInput(state.operand1);
        } else {
            writeInput(state.operand2);
        }
    }

    function operatorClickHandler(event) {
        var state = defineOperator(event.target.value);
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


    function initializeClickHandlers() {
        $("button").click(welcomeClickHandler);
        /*$(".number").click(numberClickHandler);
        $(".operator").click(operatorClickHandler);
        $("#key-\\=").click(equalsClickHandler);
        $("#key-c").click(clearClickHandler);*/
		//document.getElementbyId('button').addEventListener('click', welcomeClickHandler);
		var numberElements = document.getElementsByClassName('number');
		for (var i=0; i < numberElements.length; i++)
		{
			numberElements[i].addEventListener('click', numberClickHandler);
		}
		var operatorElements = document.getElementsByClassName('operator');
		for (var i=0; i < operatorElements.length; i++)
		{
			operatorElements[i].addEventListener('click', operatorClickHandler);
		}
		
		document.getElementById('key-=').addEventListener('click', equalsClickHandler);
		document.getElementById('key-c').addEventListener('click', clearClickHandler);
    }

    $(function () {
        writeOutput("Welcome");
        initializeClickHandlers();
    });

//})();