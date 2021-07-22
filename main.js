const apiKey = 'b65158e7b3b5053c6e71f146bdea8e59';
const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeather(city) {
  const resp = await fetch(url(city));
  const respData = await resp.json();

  console.log(respData);
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
      <h2> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
      <small class = "weather2">${data.weather[0].main}</small>
  `;

  // cleanup
  main.innerHTML = '';

  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeather(city);
  }
});
