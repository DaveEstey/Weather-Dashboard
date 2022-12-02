url = "http://api.openweathermap.org/data/2.5/forecast?appid=d8fc6379947058620cb310f2db57deb3"
var inputBtn = document.querySelector("#getInputBtn")
var inputText = document.querySelector("#getInputText")

function makeWeather(weekForecast) {
     var currWeather = document.createElement("article");
        currWeather.setAttribute("class", "currForecast");      
        var weatherEl = document.querySelector("#weatherOutput")
            weatherEl.innerHTML = "";
       
    for (var i = 0; i < weekForecast.list.length; i = i + 8) {
        var weekWeather = document.createElement("article") 
            weekWeather.setAttribute("class", "forecast"+ i); 
            console.log("WW check"+ weekWeather)
            weekWeather.innerHTML = (weekForecast.forEach(list.weather));
            weatherEl.appendChild(weekWeather);

    }

}

function createFetch() {
    var userInput = inputText.value;
    userInput = userInput.replace(/ /g, '-')

    inputUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=d8fc6379947058620cb310f2db57deb3"
    fetch(inputUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            makeWeather(data);
        })
        .catch(function () {
            inputText.value = "";
            alert('Unable to connect to GitHub');
        });

}



inputBtn.addEventListener("click", createFetch);
