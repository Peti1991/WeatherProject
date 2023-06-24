"use strict";
/*
    let city = document.getElementById("root")!

     function citySelector(city:HTMLElement) {
        console.log(city)
     fetch ("http://api.weatherapi.com/v1/current.json?q="+city+"&key=6885d9accf8948e6acc113000232406")
    }

    
let myEventListener = (event:Event) => {
    let userInput = ((event.target as HTMLInputElement).value)
}
    
city.addEventListener("input", myEventListener)

    citySelector(city)

let inputField = document.createElement("INPUT");
inputField.setAttribute("type", "text");
inputField.setAttribute("value", "City");
document.body.appendChild(inputField);
*/
let myEventListener = (event) => {
    let userInput = event.target.value;
    fetch("http://api.weatherapi.com/v1/current.json?q=" + userInput + "&key=6885d9accf8948e6acc113000232406");
};
// input
let inputElement = document.getElementById("root");
inputElement.addEventListener("input", myEventListener);
