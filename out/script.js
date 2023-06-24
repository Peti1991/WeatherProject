"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let myEventListener = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let userInput = event.target.value;
    let response = yield fetch("http://api.weatherapi.com/v1/current.json?q=" + userInput + "&key=6885d9accf8948e6acc113000232406");
    let data = yield response.json();
    render(data);
});
// input
let resultHeaderElement = document.getElementById("result-header");
let inputElement = document.getElementById("root");
inputElement.addEventListener("input", myEventListener);
//output
let render = (content) => {
    resultHeaderElement.innerHTML = "<h1>" + "Temperature: " + content["current"]["temp_c"] + " Celsius"
        + "<br>" +
        "Temperature: " + content["current"]["temp_f"] + " Fahrenheit" + "<br>";
    "</h1>";
    resultHeaderElement.className = "aClassName";
};
