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
}

let apiKey = "0b8bet4102f106df6eef01d97o5b3bab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Abakaliki&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);