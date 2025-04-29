// 1. Initialize map
const map = L.map('map').setView([15.8700, 100.9925], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 2. Define city coordinates
const cities = {
  Bangkok: [13.7563, 100.5018],
  ChiangMai: [18.7883, 98.9853],
  Phuket: [7.8804, 98.3923]
};

// 3. Add markers and bind click
for (const city in cities) {
  const coords = cities[city];
  L.marker(coords)
    .addTo(map)
    .bindPopup(city)
    .on('click', () => getWeather(city)); // <-- HERE you replace alert() with getWeather()
}

// 4. Function to call AWS API and show data
function getWeather(city) {
  const apiUrl = `https://61kb3h2tlb.execute-api.ap-southeast-2.amazonaws.com/prod/weather?city=${city}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weather = JSON.parse(data.body);
      document.getElementById('weather-info').innerHTML = `
        <h3>Weather in ${weather.City}</h3>
        <p><strong>Temperature:</strong> ${weather.Temperature}°C</p>
        <p><strong>Humidity:</strong> ${weather.Humidity}%</p>
        <p><strong>Description:</strong> ${weather.Description}</p>
        <p><strong>Wind Speed:</strong> ${weather.WindSpeed} km/h</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('weather-info').innerHTML = 'Failed to fetch weather.';
    });
}
