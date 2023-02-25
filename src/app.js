let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurthday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let month = months[now.getMonth()];
function formatDate() {
  return `${day}, ${month} ${date},  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {

      if (fahrenheitLink.classList.contains("active"))
      {
        forecastDay.temp.min = (forecastDay.temp.min * 9) / 5 + 32;
        forecastDay.temp.max = (forecastDay.temp.max * 9) / 5 + 32;
      }

        forecastHTML =
          forecastHTML +
          `

                  <div class="col-2">
                    <div class ="weather-forecast-date">
                    ${formatDay(forecastDay.dt)}
                    </div>
                     <img src="http://openweathermap.org/img/wn/${
                       forecastDay.weather[0].icon
                     }@2x.png"
                    alt=""
                    width="42px"/>
                    <div class="weather-forecast-temperatures">
                     <span class="weather-forecast-temp-max">${Math.round(
                       forecastDay.temp.max
                     )}°</span> 
                    <span class="weather-forecast-temp-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                    </div>
                
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//used tempEl as a global var
let temperatureElement = document.querySelector("#temperature");

function getForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  //temperatureElement.innerHTML = Math.round(response.data.main.temp);
   if (fahrenheitLink.classList.contains("active")) {
       temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
       }
else
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4aa410cf6a213ee686d681951c8186fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //let temperatureElement = document.querySelector("#temperature");
  //remove the active class off the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //from here
  let limTemps = document.querySelectorAll(
    ".weather-forecast-temp-min,.weather-forecast-temp-max"
  );
  limTemps.forEach(function (limTemp) {
    let currentTemperature = limTemp.innerHTML.replace("°", "");
    let newTemperature = (currentTemperature * 9) / 5 + 32;
    limTemp.innerHTML = Math.round(newTemperature) + "°";
  });
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let limTemps = document.querySelectorAll(
    ".weather-forecast-temp-min,.weather-forecast-temp-max"
  );
  limTemps.forEach(function (limTemp) {
    let currentTemperature = limTemp.innerHTML.replace("°", "");
    let newTemperature = ((currentTemperature - 32) * 5) / 9;
    limTemp.innerHTML = Math.round(newTemperature) + "°";
  });
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");

function showPosition(position) {
  let apiKey = "4aa410cf6a213ee686d681951c8186fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function navigate(response) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", navigate);
