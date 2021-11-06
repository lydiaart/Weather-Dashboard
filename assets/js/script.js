var searchCity = document.querySelector("#search-query")
var searchBtn = document.querySelector("#search-btn")
var textFrame = document.querySelector(".text-frame")
var flexBox = document.querySelector(".flexbox")
var searchHistoryEl = document.querySelector("#search-history")
var searchHistory = JSON.parse(localStorage.getItem("history")) || []



searchBtn.addEventListener("click", function () {
  console.log(searchCity.value)

  if (searchHistory.indexOf(searchCity.value) === -1){
    searchHistory.push(searchCity.value)

    localStorage.setItem("history", JSON.stringify(searchHistory))
  }
   

  getCityWeather(searchCity.value);

  getSearchResult()
})

getSearchResult()

function getSearchResult() {
  searchHistoryEl.innerHTML = ""
  for (let i = 0; i < searchHistory.length; i++) {
    searchHistoryEl.innerHTML = searchHistoryEl.innerHTML + `
    <div class="row">
    <a class="search-results btn center grey lighten-2 col s11">
    <span class="center black-text">${searchHistory[i]}</span>
    </a>
    </div>

    `

  }

  var searchResults = document.querySelectorAll(".search-results")

  for (let i = 0; i < searchResults.length; i++) {
    searchResults[i].addEventListener("click", function () {
      var cityName = this.textContent
      getCityWeather(cityName);

    })

  }



}

function getCityWeather(cityName) {


  var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=15b3aa0f567265f18ce1bd88486e5f83`
  fetch(currentWeatherAPI)
    .then(function (response) {
      return response.json()
    })
    .then(function (currentWeatherData) {
      console.log(currentWeatherData)

      var UVAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&units=imperial&appid=15b3aa0f567265f18ce1bd88486e5f83`

      fetch(UVAPI)
        .then(function (UVresponse) {
          return UVresponse.json()
        })
        .then(function (UVData) {

          console.log(UVData)

          textFrame.innerHTML = `
                    <span>
    
                       ${currentWeatherData.name}(${moment(currentWeatherData.dt, "X").format("MM/DD/YYYY")})  
                   
                       <img class="image"  src="http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png"     /> 
                      
                  </span>
    
                   <p>Temp:${currentWeatherData.main.temp}</p>
                   <p>Wind:${currentWeatherData.wind.speed}</p>
                   <p>humidity:${currentWeatherData.main.humidity}</p>
                   <p>UV Index:${UVData.current.uvi}</p>
                   `

          flexBox.innerHTML = ""
          for (let i = 1; i < UVData.daily.length - 2; i++) {
            console.log(UVData.daily[i])
            console.log(moment(UVData.daily[i].dt, "X").format("MM/DD/YYYY"))

            flexBox.innerHTML = flexBox.innerHTML + `
                         <div class="col-card ">
                         <div class="card-panel grey lighten-2 cardStyle">
                           <div class="container">
                           <span>
    
                           ${moment(UVData.daily[i].dt, "X").format("MM/DD/YYYY")}  
                       
                           <img class="image"  src="http://openweathermap.org/img/wn/${UVData.daily[i].weather[0].icon}.png"/> 
                      </span>
        
                       <p>Temp:${UVData.daily[i].temp.max}</p>
                       <p>Wind:${UVData.daily[i].wind_speed}</p>
                       <p>humidity:${UVData.daily[i].humidity}</p>
                      </div>
                      </div>
                      </div>
                         `

          }

        })

    })

}


getCityWeather(searchHistory[searchHistory.length-1]);
