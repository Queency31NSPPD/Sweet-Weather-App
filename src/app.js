function dateFormat(timetape){
    let date = new Date(timetape);
    let hours = date.getHours();
     if (hours < 10){
        hours = `0${hours}`;
     }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function showTemperature(response){
    console.log(response)
    
    let  temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

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
}

let apiKey = "0b8bet4102f106df6eef01d97o5b3bab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Abakaliki&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);