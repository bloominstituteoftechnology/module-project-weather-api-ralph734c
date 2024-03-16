async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const weatherWidget = document.querySelector("#weatherWidget");
  weatherWidget.style.display = "none";

  const dropDown = document.getElementById("citySelect");
  dropDown.addEventListener("change", evt => {
    dropDown.disabled = true;
    weatherWidget.style.display = "none";

    const infoP = document.querySelector(".info");
    infoP.textContent = "Fetching weather data...";
    
    function findByText(weatherText) { // find the weather emoji using the descriptions array of arrays
      for(let i = 0; i <= descriptions.length - 1; i++){
        for(let j = 0; j < descriptions[i].length; j++){
          if(descriptions[i][j] === weatherText && j + 1 < descriptions[i].length) {
            let nextValueEmoji = descriptions[i][j + 1];
            return nextValueEmoji
          }
        }
      }
    }

    function getDayByDate(dashedDate) {
      const forecastDate = new Date(dashedDate);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const arrIndex = forecastDate.getDay() + 1

      return days[arrIndex]
    }

    const baseUrl = "http://localhost:3003/api/weather";
    axios.get(`${baseUrl}?city=${dropDown.value}`)
      .then(res => {
        infoP.textContent = "";
        dropDown.disabled = false;
        weatherWidget.style.display = "";
        console.log(res.data);
        const currentWeatherObj = res.data.current;

        const apparentTempDiv = document.querySelector("#apparentTemp div:nth-child(2)");
        apparentTempDiv.textContent = `${currentWeatherObj.apparent_temperature}°`;

        const todayDescriptionDiv = document.querySelector("#todayDescription");
        todayDescriptionDiv.textContent = findByText(currentWeatherObj.weather_description)

        const todayStatsDiv = document.querySelector("#todayStats");
        const minMaxTemp = todayStatsDiv.querySelector("div:nth-child(1)");
        minMaxTemp.textContent = `${currentWeatherObj.temperature_min}°/${currentWeatherObj.temperature_max}°`;

        const precipDiv = todayStatsDiv.querySelector("div:nth-child(2)");
        precipDiv.textContent = `Precipitation: ${currentWeatherObj.precipitation_probability * 100}%`;

        const humidityDiv = todayStatsDiv.querySelector("div:nth-child(3)");
        humidityDiv.textContent = `Humidity: ${currentWeatherObj.humidity}%`;

        const windDiv = todayStatsDiv.querySelector("div:nth-child(4)");
        windDiv.textContent = `Wind: ${currentWeatherObj.wind_speed}m/s`;

        // findByText(currentWeatherObj.weather_description)
        const forecastArr = res.data.forecast.daily;

        const firstNextDay = document.querySelector(".next-day");
        const firstDayName = firstNextDay.querySelector("div:nth-child(1)");
        firstDayName.textContent = `${getDayByDate(forecastArr[0].date)}`;

        const firstDayEmoji = firstNextDay.querySelector("div:nth-child(2)");
        firstDayEmoji.textContent = findByText(forecastArr[0].weather_description);
        const firstDayMinMax = firstNextDay.querySelector("div:nth-child(3)");
        firstDayMinMax.textContent = `${forecastArr[0].temperature_min}°/${forecastArr[0].temperature_max}°`;
        const firstDayPrecip = firstNextDay.querySelector("div:nth-child(4)");
        firstDayPrecip.textContent = `Precipitation: ${forecastArr[0].precipitation_probability * 100}%`;
        
        const secondNextDay =  document.querySelector(".next-day + .next-day");
        const secondDayName = secondNextDay.querySelector("div:nth-child(1)");
        secondDayName.textContent = `${getDayByDate(forecastArr[1].date)}`;

        const secondDayEmoji = secondNextDay.querySelector("div:nth-child(2)");
        secondDayEmoji.textContent = findByText(forecastArr[1].weather_description);
        const secondDayMinMax = secondNextDay.querySelector("div:nth-child(3)");
        secondDayMinMax.textContent = `${forecastArr[1].temperature_min}°/${forecastArr[1].temperature_max}°`;
        const secondDayPrecip = secondNextDay.querySelector("div:nth-child(4)");
        secondDayPrecip.textContent = `Precipitation: ${forecastArr[1].precipitation_probability * 100}%`;

        const thirdNextDay =  document.querySelector(".next-day + .next-day + .next-day");
        const thirdDayName = thirdNextDay.querySelector("div:nth-child(1)");
        thirdDayName.textContent = `${getDayByDate(forecastArr[2].date)}`;

        const thirdDayEmoji = thirdNextDay.querySelector("div:nth-child(2)");
        thirdDayEmoji.textContent = findByText(forecastArr[2].weather_description);
        const thirdDayMinMax = thirdNextDay.querySelector("div:nth-child(3)");
        thirdDayMinMax.textContent = `${forecastArr[2].temperature_min}°/${forecastArr[2].temperature_max}°`;
        const thirdDayPrecip = thirdNextDay.querySelector("div:nth-child(4)");
        thirdDayPrecip.textContent = `Precipitation: ${forecastArr[2].precipitation_probability * 100}%`;

        const locationDiv = document.querySelector("#location");
        const locationCityName = locationDiv.querySelector("div:nth-child(1)");
        locationCityName.textContent = `${res.data.location.city}`;
        const locationCountryName = locationDiv.querySelector("div:nth-child(2)");
        locationCountryName.textContent = `${res.data.location.country}`;

      })
      .catch(err => {
        console.log(err.message);
      })
  })
  
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
