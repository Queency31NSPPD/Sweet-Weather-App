function dateFormat(timetape){
    let date = new Date(timetape);
    let hours = date.getHours();
     if (hours < 10){
        hours = `0${hours}`;
     }
     let year = date.getFullYear();

     let dayOfMonth = date.getDate();
     
     let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[date.getMonth()];

    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days =["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let day = days[date.getDay()];
return ` ${day}, ${dayOfMonth} ${month} ${year}, time: ${hours}:${minutes}`;
}

function forecastWeekDays(timetape){
    let date = new Date(timetape * 1000);
    let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"];

    return days[day];

}

function showForecast (response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay){
forecastHTML = forecastHTML + `<div class="col-sm">
                <div class="weather-forecast-date">${forecastWeekDays(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                  alt=""
                  width="50"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
              </div>
            </div>`;
});


forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
 
}

function getForecast(coordinates){
   
    let apiKey = `0b8bet4102f106df6eef01d97o5b3bab`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function showTemperature(response){
    
    let  temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusDegree);

celsiusDegree = response.data.temperature.current;

     let  cityLocation = document.querySelector("#city");
    cityLocation.innerHTML = response.data.city;

     let  humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

     let  windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed)

      let weatherDiscription   = document.querySelector("#weather-condition");
    weatherDiscription.innerHTML = response.data.condition.description;

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = dateFormat(response.data.time * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

    iconElement.setAttribute(
        "alt", response.data.condition.description);

 getForecast(response.data.coordinates);
        
}

function search(city) {
let apiKey = "0b8bet4102f106df6eef01d97o5b3bab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheitDegree(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitDegree = (celsiusDegree * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitDegree);
}

function showCelsiusDegree(event){
    event.preventDefault();
     celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
     let temperatureElement = document.querySelector("#temperature");
     temperatureElement.innerHTML = Math.round(celsiusDegree);
}

let celsiusDegree = null;


let form = document.querySelector("#google-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitDegree);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusDegree);

search("Abakaliki");


