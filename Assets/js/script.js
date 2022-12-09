url = "http://api.openweathermap.org/data/2.5/forecast?appid=d8fc6379947058620cb310f2db57deb3"
var inputBtn = document.querySelector("#getInputBtn")
var inputText = document.querySelector("#getInputText")
var weatherEl = document.querySelector("#weatherOutput")

function saveWeather() {
    var weatherHistory = document.getElementsByClassName("forecast")
    localStorage.setItem("weekWeather", JSON.stringify(weatherHistory))
    console.log(weatherHistory);
} 

/* function getWeather(){
    weatherEl.innerHTML = ""

    weatherEl.innerHTML = localStorage.getItem(JSON.parse(weatherHistory));
} */

function makeWeather(weekForecast) {
    var currWeatherEl = document.getElementById("currentWeather")
    var currentWeatherTitle = document.createElement("h2")
    currentWeatherTitle.innerHTML = "";
     
    var currWeather = document.createElement("article");
        currWeather.setAttribute("class", "currForecast");
        console.log(weekForecast)
        currentWeatherTitle.innerHTML = (weekForecast.city.name +", "+ weekForecast.city.country);
        currWeather.innerHTML = (`<img src= http://openweathermap.org/img/wn/${weekForecast.list[0].weather[0].icon+"@2x.png"} ></img>` + "<br> Day/Time: "+ weekForecast.list[0].dt_txt+ "<br> Temp: " + weekForecast.list[0].main.temp + "<br> Wind speed: " +weekForecast.list[0].wind.speed)     
        currWeatherEl.appendChild(currentWeatherTitle);
        currWeatherEl.appendChild(currWeather);
        

            weatherEl.innerHTML = "";
       
    for (var i = 8; i < weekForecast.list.length; i = i + 8) {
        var weekWeather = document.createElement("article") 
            weekWeather.setAttribute("class", "forecast"); 
            //var icon = createIcon(weekForecast.list[i].weather[0].icon)
            weekWeather.innerHTML = (`<img src= http://openweathermap.org/img/wn/${weekForecast.list[i].weather[0].icon+"@2x.png"} ></img>` + "<br>Day/Time: "+ weekForecast.list[i].dt_txt+ "<br> Temp: " + weekForecast.list[i].main.temp + "<br> Wind speed: " +weekForecast.list[i].wind.speed)
            weatherEl.appendChild(weekWeather);

    }
    saveWeather();

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
            console.log(data)
            makeWeather(data);
        })
        .catch(function () {
            inputText.value = "";
            alert('Unable to connect to GitHub');
        });
    }
        
/*     function createIcon(icon) {
           
        
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            fetch(iconUrl)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (data) {
                    var icon = data
                    return icon;
                })
                .catch(function () {
                    alert('Unable to connect to GitHub');
                });
     

} */



inputBtn.addEventListener("click", createFetch);
// getWeather()
