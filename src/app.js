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

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

    iconElement.setAttribute(
        "alt", response.data.condition.description);
}

let apiKey = "0b8bet4102f106df6eef01d97o5b3bab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Abakaliki&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);