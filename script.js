// Setting up the map focused on London at zoom level 4
var map = L.map('map').setView([51.5074, -0.1278], 4);

// Using Stamen Watercolor tile layer
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
}).addTo(map);

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Fetch data from your Google Sheet JSON URL
//fetch('https://gsx2json.com/api?id=1HbEwMv14h_plxF8xqIGrUZT2nhLXzgdpEbFXla7g0fI_ID&sheet=1')
//fetch('https://raw.githubusercontent.com/Ari-keys/Ari-keys.github.io/main/csvjson.json')
fetch('https://script.google.com/macros/s/AKfycbyYRMEOhQBIKGNUzotdqfZ6ZQq_L3mdWbRGRy8x3DimxotfWwNutwD5sstIWOaduUaChA/exec')

    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            // Create a marker for each point
           // var marker = L.marker([row.Latitude, row.Longitude]).addTo(map);
            var marker = L.marker([row.Latitude, row.Longitude], { icon: redIcon }).addTo(map);

            // Create the popup content
           var popupContent = `
    <div class="popup-container">
        <h1>${row.Country}</h1>
         <img src="${row.ImageURL}" alt="${row.Heading}" class="popup-image" >
                <strong class="larger-heading">${row.Heading}</strong><br>
        ${row.Description}<br>
        <a href="${row.SourceURL}" target="_blank">See more archives from ${row.Country} </a>
    </div>
`;

            // Bind the popup to the marker
          //  marker.bindPopup(popupContent);
          // Add the popup to the map
          //var popup = L.popup().setContent(popupContent);
         var popup = L.popup({minWidth: 350}).setContent(popupContent);
          
marker.bindPopup(popup);
          
        });
    })
    .catch(error => {
        console.error("Error fetching or processing data:", error);
    });