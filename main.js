// 1. Initialize map
const map = L.map('map').setView([15.8700, 100.9925], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 2. Define city coordinates
const cities = {
  "Bangkok": [13.7563, 100.5018],
  "Chiang Mai": [18.7883, 98.9853],
  "Phuket": [7.8804, 98.3923]
};

// 3. Add markers
for (const city in cities) {
  const coords = cities[city];
  L.marker(coords)
    .addTo(map)
    .bindPopup(city)
    .on('click', () => getWeather(city));
}

// 4. Diagnostic fetch to see exactly what the API returns
function getWeather(city) {
  const apiUrl = `https://61kb3h2tlb.execute-api.ap-southeast-2.amazonaws.com/prod/weather?city=${encodeURIComponent(city)}`;

  console.log("Fetching weather for:", city);
  console.log("API URL:", apiUrl);

  document.getElementById('weather-info').innerHTML = `<p>Loading weather for ${city}...</p>`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("✅ FULL API response:", data);

      // Display raw response on the web page too
      document.getElementById('weather-info').innerHTML = `
        <h3>Raw response for ${city}</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    })
    .catch(error => {
      console.error('❌ Fetch error:', error);
      document.getElementById('weather-info').innerHTML = `
        <p style="color:red;">Failed to fetch weather for ${city}.</p>
        <pre>${error.message}</pre>
      `;
    });
}
