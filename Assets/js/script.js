url = "http://api.openweathermap.org/data/2.5/forecast?appid=d8fc6379947058620cb310f2db57deb3"
var inputBtn = document.querySelector("#getInputBtn")
var inputText = document.querySelector("#getInputText")
function createFetch() {
    var userInput = inputText.value;
    userInput = userInput.replace(/ /g, '')

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
        })
        .catch (function () {
    inputText.value = "";
    alert('Unable to connect to GitHub');
});

}



inputBtn.addEventListener("click", createFetch);