// Initialize Leaflet map
const map = L.map('map').setView([15.8700, 100.9925], 6); // Center on Thailand

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers
const cities = {
  Bangkok: [13.7563, 100.5018],
  ChiangMai: [18.7883, 98.9853],
  Phuket: [7.8804, 98.3923]
};

for (const city in cities) {
  const coords = cities[city];
  L.marker(coords)
    .addTo(map)
    .bindPopup(city)
    .on('click', () => {
      alert(`You clicked on ${city}`);
    });
}
