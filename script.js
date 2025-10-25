require('dotenv').config();
const apiKey = process.env.apiKey;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = data.main.temp + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".feels-like").textContent = data.main.feels_like;
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    document.querySelector(".country").textContent = data.sys.country;

    const main = data.weather[0].main;
    if (main === "Clouds") weatherIcon.src = "img/clouds.png";
    else if (main === "Clear") weatherIcon.src = "img/clear.png";
    else if (main === "Rain") weatherIcon.src = "img/rain.png";
    else if (main === "Drizzle") weatherIcon.src = "img/drizzle.png";
    else if (main === "Mist") weatherIcon.src = "img/mist.png";
    else if (main === "Snow") weatherIcon.src = "img/snow.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});