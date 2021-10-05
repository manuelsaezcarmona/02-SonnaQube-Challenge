"use strict";
import * as view from "./view-calculator.js";
let operand1 = "";
let operand2 = "";
let operator = "";

// Funciones.

const calc = (operand1, operand2, operatorValue) => {
    let result;
    switch (operatorValue) {
        case "+":
            result = operand1 + operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "X":
            result = operand1 * operand2;
            break;
        case "÷":
            result = operand1 / operand2;
            break;
        default:
            break;
    }
    if (isNaN(result)) return 0;

    return result;
};

const pushOperator = (operatorValue) => {
    if (operand1) {
        operand2 = parseFloat(view.current.textContent);
        operand1 = calc(operand1, operand2, operatorValue);
        operand2 = 0;
        view.previous.textContent = operand1.toString() + operatorValue;
        view.current.textContent = "0";
    } else {
        operand1 = parseFloat(view.current.textContent);
        view.toogleDisplay(view.current, view.previous);
        view.displayNumber(view.previous, operatorValue);
    }
};

const calcTotal = () => {
    operand2 = parseFloat(view.current.textContent);
    operand1 = calc(operand1, operand2, operator);
    view.previous.textContent = "0";
    view.current.textContent = operand1.toString();
    operand1 = "";
    operand2 = "";
};

/* FUNCIONES DE ESTRUCTURA*/

const realizarAcciones = (accion) => {
    switch (accion) {
        case "AC":
            view.resetDisplay();
            operand1 = 0;
            operand2 = 0;
            break;
        case "⮌":
            view.deleteNumber();
            break;
        case "=":
            calcTotal();
            break;
    }
};

const mainCalculator = (tipoBoton, value) => {
    switch (tipoBoton) {
        case "number":
            view.displayNumber(view.current, value);
            break;
        case "operator":
            operator = value;
            pushOperator(value);
            break;
        case "action":
            realizarAcciones(value);
            break;
    }
}; // mainCalculator

// Listeners.
botonera.addEventListener("click", (evento) => {
    // console.log(evento.target);
    mainCalculator(evento.target.classList.value, evento.target.textContent);
});