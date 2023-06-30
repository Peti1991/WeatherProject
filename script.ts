
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
let textField = document.createElement("div");
textField.setAttribute('id', 'result-header');
document.getElementById("root")!.appendChild(textField);

//create selectable list  into div for input
let cityDatalist = document.createElement("datalist");
cityDatalist.setAttribute('id', 'citieslist');
document.getElementById("root")!.appendChild(cityDatalist);


//spinner
let loading = document.createElement("div")
loading.setAttribute('id','spinner')
document.body.appendChild(loading);
const spinner = document.getElementById("spinner") as HTMLSelectElement;
spinner.setAttribute('style', 'display') ;

//fetch if input >3 
let myEventListener = async (event: Event) => {
  let userInput = (event.target as HTMLInputElement).value;
    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="+userInput+"&appid=b8fd0881b87ef2f2311bfc0636d5cba4&units=metric"
      
      /*"http://api.weatherapi.com/v1/current.json?q=" +
      userInput +
      "&key=6885d9accf8948e6acc113000232406"*/
      )
      let data = await response.json();
      render(data);
      
      if (!data) {
        spinner.setAttribute('style', 'display:none');
      } else {
        spinner.setAttribute('style', 'display') ;
      }
    //image
    showImage(userInput).then((picture) => {
      if (picture['photos'].length === 0) {
        spinner.setAttribute('style', 'display:none');
      } else {
        renderImage(picture['photos'][0]['src']["large2x"])  
      }
    }).then(data => {
      spinner.setAttribute('style', 'display:none');
    });
};

// input
let resultHeaderElement = document.getElementById("result-header")!;
let inputElement = document.getElementById("inputField")!;
inputElement.addEventListener("click", myEventListener);

//output
let render = (content: any) => {
  resultHeaderElement.innerHTML =
    "<h2>" + "Weather in " + content["name"] + "</h2>" +
    "<h1>" + content["main"]["temp"] + " &deg;C" + "</h1>" +
    "<div id="+"'container2'>" +
      "<img " + "src=" + "https://openweathermap.org/img/wn/" + content["weather"][0]["icon"] + ".png" + " alt=''" +"/>" +
      "<div>" + content["weather"][0]["description"] + "</div>" +
    "</div>" +
    "<div>" + "humidity: " + content["main"]["humidity"] + " %" + "</div>" +
    "<div>" + "wind: " + content["wind"]["speed"] + " km/h" + "</div>"
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
   const res = await fetch("cities.json");
   obj = await res.json();
   let i = 0;
   let cityNames: string[] = [];
   while (obj[i] !== undefined) {
     cityNames = [...cityNames, obj[i]];
     options += '<option value="' + cityNames[i] + '" />';
     i++;
   }
   
   document.getElementById("citieslist")!.innerHTML = options;
   spinner.setAttribute('style', 'display:none') ;
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