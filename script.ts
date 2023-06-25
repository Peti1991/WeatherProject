
// create input into div
let inputField = document.createElement("input");
inputField.setAttribute('type', 'text');
inputField.setAttribute('id', 'inputField');
inputField.setAttribute('list', 'citieslist');
inputField.setAttribute('value', '');
inputField.className = "css-class-name"; //modify looks
document.getElementById("root")!.appendChild(inputField );

//create p into div for output
let textField = document.createElement("p");
textField.setAttribute('id', 'result-header');
document.getElementById("root")!.appendChild(textField);

//create selectable list  into div for input
let cityDatalist = document.createElement("datalist");
cityDatalist.setAttribute('id', 'citieslist');
document.getElementById("root")!.appendChild(cityDatalist);



//fetch if input >3 
let myEventListener = async (event: Event) => {
  let userInput = (event.target as HTMLInputElement).value;
  if (userInput.length>3) {
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="+userInput+"&appid=b8fd0881b87ef2f2311bfc0636d5cba4&units=metric"

    /*"http://api.weatherapi.com/v1/current.json?q=" +
      userInput +
      "&key=6885d9accf8948e6acc113000232406"*/
  )
  let data = await response.json();
  render(data);
  }
};

// input
let resultHeaderElement = document.getElementById("result-header")!;
let inputElement = document.getElementById("inputField")!;
inputElement.addEventListener("input", myEventListener);

//output
let render = (content: any) => {
  resultHeaderElement.innerHTML =
    "<h1>" +
    content["name"] +
    "<br>" +
    "Temperature: " +
    content["main"]["temp"] +
    " Celsius" +
    "<br>" +
    "</h1>";
};
resultHeaderElement.className = "aClassName";

//cities list loading 
let options = "";

async function foo() {
  let obj;
  const res = await fetch("./citylist.json");
  obj = await res.json();
  let i = 0;
  let cityNames: string[] = [];
  while (obj["cities"][i] !== undefined) {
    cityNames = [...cityNames, obj["cities"][i]["name"]];
    options += '<option value="' + cityNames[i] + '" />';
    i++;
  }
  /*console.log(cityNames);*/
  document.getElementById("citieslist")!.innerHTML = options;
}
foo();

/* cities end */
