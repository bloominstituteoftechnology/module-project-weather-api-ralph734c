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
    console.log(dropDown.value);
    weatherWidget.style.display = "none";

    const infoP = document.querySelector(".info");
    infoP.textContent = "Fetching weather data...";

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
        let nextItem = "";
        let emojiIndex = descriptions.indexOf(currentWeatherObj.weather_description);
        console.log(emojiIndex);
        // const emojiReturn = descriptions.find(el => el )
        // console.log(``)

        const todayStatsDiv = document.querySelector("#todayStats");
        const minMaxTemp = todayStatsDiv.querySelector("div:nth-child(1)");
        minMaxTemp.textContent = `${currentWeatherObj.temperature_min}°/${currentWeatherObj.temperature_max}°`;

        const precipDiv = todayStatsDiv.querySelector("div:nth-child(2)");
        precipDiv.textContent = `Precipitation: ${currentWeatherObj.precipitation_probability * 100}%`;

        const humidityDiv = todayStatsDiv.querySelector("div:nth-child(3)");
        humidityDiv.textContent = `Precipitation: ${currentWeatherObj.humidity}%`;

        const windDiv = todayStatsDiv.querySelector("div:nth-child(4)");
        windDiv.textContent = `Precipitation: ${currentWeatherObj.wind_speed}m/s`;
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
