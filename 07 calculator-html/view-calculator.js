"use strict";

// Selectores.
export const botonera = document.querySelector("#botonera");
export const previous = document.querySelector("#previous");
export const current = document.querySelector("#current");

export const displayNumber = function (led, text) {
    if (text === "." && led.textContent.includes(".")) return;
    if (led.textContent === "0" && text !== ".") led.textContent = "";
    led.textContent += text;
}; // display number

export const resetDisplay = () => {
    current.textContent = "0";
    previous.textContent = "0";
};

export const deleteNumber = () => {
    let numberText = current.textContent.slice(0, -1);
    if (numberText.length >= 1) {
        current.textContent = numberText;
    } else {
        current.textContent = "0";
    }
};

export const toogleDisplay = (led1, led2) => {
    led2.textContent = led1.textContent;
    led1.textContent = "0";
};