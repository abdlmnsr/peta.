const map = L.map("map").setView([-0.8852, 119.8594], 10); // Palu center

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Load GeoJSON files
function loadGeoJSON(url, style, icon = null, popupProp = "nama") {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style,
        pointToLayer: (feature, latlng) => {
          if (icon) {
            return L.marker(latlng, { icon: icon })
                     .bindPopup(feature.properties[popupProp] || "Info");
          } else {
            return L.circleMarker(latlng, { radius: 6, color: style?.color || "blue" })
                     .bindPopup(feature.properties[popupProp] || "Info");
          }
        }
      }).addTo(map);
    });
}

// Layer styles
loadGeoJSON("data/jalan.geojson", { color: "#888", weight: 2 });
loadGeoJSON("data/sungai.geojson", { color: "#00bcd4", weight: 1 });
loadGeoJSON("data/fasilitas.geojson", { color: "#4caf50" });
loadGeoJSON("data/rumahsakit.geojson", { color: "red" });
