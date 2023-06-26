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
// create input into div
let inputField = document.createElement("input");
inputField.setAttribute('type', 'text');
inputField.setAttribute('id', 'inputField');
inputField.setAttribute('placeholder', 'Search');
inputField.setAttribute('list', 'citieslist');
inputField.setAttribute('value', '');
inputField.className = "css-class-name"; //modify looks
document.getElementById("root").appendChild(inputField);
//create p into div for output
let textField = document.createElement("p");
textField.setAttribute('id', 'result-header');
document.getElementById("root").appendChild(textField);
//create selectable list  into div for input
let cityDatalist = document.createElement("datalist");
cityDatalist.setAttribute('id', 'citieslist');
document.getElementById("root").appendChild(cityDatalist);
//fetch if input >3 
let myEventListener = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let userInput = event.target.value;
    if (userInput.length > 3) {
        let response = yield fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=b8fd0881b87ef2f2311bfc0636d5cba4&units=metric"
        /*"http://api.weatherapi.com/v1/current.json?q=" +
          userInput +
          "&key=6885d9accf8948e6acc113000232406"*/
        );
        let data = yield response.json();
        render(data);
        //image
        showImage(userInput).then((picture) => {
            renderImage(picture['photos'][0]['src']["large2x"]);
        });
    }
});
// input
let resultHeaderElement = document.getElementById("result-header");
let inputElement = document.getElementById("inputField");
inputElement.addEventListener("input", myEventListener);
//output
let render = (content) => {
    resultHeaderElement.innerHTML =
        "<h1>" +
            "Weather in " + content["name"] +
            "<br>" +
            content["main"]["temp"] + " &deg;C" +
            "<br>" +
            "humidity: " + content["main"]["humidity"] + " %" +
            "<br>" +
            content["weather"][0]["description"] +
            "<br>" +
            "wind: " + content["wind"]["speed"] + " km/h" +
            "</h1>";
};
resultHeaderElement.className = "aClassName";
// image
let renderImage = (content) => {
    var _a;
    let body = (_a = document.getElementById("root")) === null || _a === void 0 ? void 0 : _a.parentElement;
    body === null || body === void 0 ? void 0 : body.setAttribute("style", "background-image: url(" + content + ")");
};
// cities list loading 
let options = "";
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        let obj;
        const res = yield fetch("./citylist.json");
        obj = yield res.json();
        let i = 0;
        let cityNames = [];
        while (obj["cities"][i] !== undefined) {
            cityNames = [...cityNames, obj["cities"][i]["name"]];
            options += '<option value="' + cityNames[i] + '" />';
            i++;
        }
        /*console.log(cityNames);*/
        document.getElementById("citieslist").innerHTML = options;
    });
}
foo();
/* cities end */
// image
function showImage(city) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://api.pexels.com/v1/search?per_page=1&query=" + city;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "29BsL09NdOPDyrFlPK5f41obNPfklBfdJ735pT8aiKCUsZEwAKP5K2j5",
            },
        });
        return response.json();
    });
}
