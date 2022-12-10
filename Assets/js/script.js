url = "http://api.openweathermap.org/data/2.5/forecast?appid=d8fc6379947058620cb310f2db57deb3"
var inputBtn = document.querySelector("#getInputBtn")
var inputText = document.querySelector("#getInputText")
var weatherEl = document.querySelector("#weatherOutput")
var historyUl = document.querySelector("#history")

inputBtn.addEventListener("click", function () {
    createFetch(inputText.value)
});

function saveWeather(saveWeather) {
    if (saveWeather == inputText.value && inputText.value) {
        var userInput = inputText.value;
    } else {
        var userInput = saveWeather;
    }
        
    localStorage.setItem(userInput, userInput)
    var newHistory = document.createElement("button")
    newHistory.setAttribute("id", userInput)
    newHistory.innerHTML = userInput
    if (!historyUl.querySelector(`#${userInput}`)) historyUl.appendChild(newHistory);
    newHistory.addEventListener("click", function (event) {
        createFetch(event.target.id)
    })


    

    console.log(userInput);
}

function getWeather(saveWeather) {
    weatherEl.innerHTML = ""
    createFetch(saveWeather)
    localStorage.clear();
}

function getHistory() {
    if (localStorage) {
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while (i--) {
            if (localStorage.getItem(keys[i]) != "") {
            var data =(localStorage.getItem(keys[i]))
            saveWeather(data)
            }
            
        }
        historyUl.addEventListener("click", function () {
            if (!historyUl.querySelector(`#${data}`)) historyUl.append(historyBtn);

        });
    }
}

function makeWeather(weekForecast) {
    var currWeatherEl = document.getElementById("currentWeather")
    var currentWeatherTitle = document.createElement("h2")
    currentWeatherTitle.innerHTML = "";
    currWeatherEl.innerHTML = "";

    var currWeather = document.createElement("article");
    currWeather.setAttribute("class", "currForecast");
    console.log(weekForecast)
    currentWeatherTitle.innerHTML = (weekForecast.city.name + ", " + weekForecast.city.country);
    currWeather.innerHTML = (`<img src= http://openweathermap.org/img/wn/${weekForecast.list[0].weather[0].icon + "@2x.png"} ></img>` + "<br> Day/Time: " + weekForecast.list[0].dt_txt + "<br> Temp: " + weekForecast.list[0].main.temp + "<br> Wind speed: " + weekForecast.list[0].wind.speed)
    currWeatherEl.appendChild(currentWeatherTitle);
    currWeatherEl.appendChild(currWeather);


    weatherEl.innerHTML = "";
    var weekTitle = document.createElement("h2")
    weekTitle.innerHTML = "5 Day Forecast:  "
    weatherEl.append(weekTitle)
    for (var i = 8; i < weekForecast.list.length; i = i + 8) {
        var weekWeather = document.createElement("article")
        weekWeather.setAttribute("class", "forecast");
        //var icon = createIcon(weekForecast.list[i].weather[0].icon)
        weekWeather.innerHTML = (`<img src= http://openweathermap.org/img/wn/${weekForecast.list[i].weather[0].icon + "@2x.png"} ></img>` + "<br>Day/Time: " + weekForecast.list[i].dt_txt + "<br> Temp: " + weekForecast.list[i].main.temp + "<br> Wind speed: " + weekForecast.list[i].wind.speed)
        weatherEl.append(weekWeather);

    }
}

function createFetch(userInput) {


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
    saveWeather(userInput);
}

getHistory();