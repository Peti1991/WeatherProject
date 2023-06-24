
let myEventListener =  async (event: Event) => {
  let userInput = (event.target as HTMLInputElement).value
  let response = await fetch ("http://api.weatherapi.com/v1/current.json?q="+userInput+"&key=6885d9accf8948e6acc113000232406")
let data = await response.json()
render(data)
}

// input
let resultHeaderElement = document.getElementById("result-header")!
let inputElement = document.getElementById("root")!
inputElement.addEventListener("input", myEventListener)

//output
let render = (content: any) => {
    resultHeaderElement.innerHTML = "<h1>"+"Temperature: " + content["current"]["temp_c"] + " Celsius"
    +"<br>"+
    "Temperature: " + content["current"]["temp_f"] + " Fahrenheit"+"<br>"+"</h1>"
    resultHeaderElement.className = "aClassName"

}
