
// create input into div
let container =document.createElement("div")
container.setAttribute('id','container')
document.getElementById("root")!.appendChild(container);

let inputField = document.createElement("input");
inputField.setAttribute('type', 'text');
inputField.setAttribute('id', 'inputField');
inputField.setAttribute('placeholder', 'Search');
inputField.setAttribute('list', 'citieslist');
inputField.setAttribute('value', '');
inputField.className = "css-class-name"; //modify looks
document.getElementById("container")!.appendChild(inputField );

//button
let btn = document.createElement("button");
btn.setAttribute('id', 'button')
document.getElementById("container")!.appendChild(btn);
btn.innerHTML = "*";



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
  //image
  showImage(userInput).then((picture) => {
    renderImage(picture['photos'][0]['src']["large2x"])
  });
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
let renderImage = (content: any) => {
  let body = document.getElementById("root")?.parentElement;
  body?.setAttribute("style", "background-image: url(" + content + ")");
}

// cities list loading 
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


// image
async function showImage(city: string) {
  let url = "https://api.pexels.com/v1/search?per_page=1&query=" + city
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": "29BsL09NdOPDyrFlPK5f41obNPfklBfdJ735pT8aiKCUsZEwAKP5K2j5",
      
    },
  });

  return response.json(); 
}



/* //favorite list
let [likedCities, setLikedCities] = ([]);
let addFavorite = (likedCity) => {
  setLikedCities((prevlikedCities) => [...prevlikedCities, likedCity]);
};
 */