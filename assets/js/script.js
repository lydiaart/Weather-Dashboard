var searchCity = document.querySelector("#search-query")
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=15b3aa0f567265f18ce1bd88486e5f83"

function getCityWeather(cityName) {
    var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=15b3aa0f567265f18ce1bd88486e5f83`
    fetch(currentWeatherAPI)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (currentWeatherData) {
                console.log(currentWeatherData)
            })
        }

    })
}

getCityWeather("Chicago");
