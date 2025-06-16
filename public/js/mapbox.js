console.log("maptiler.js loaded ✅");

document.addEventListener("DOMContentLoaded", function () {
  const mapBox = document.getElementById("map");
  if (!mapBox) return;

  const locations = JSON.parse(mapBox.dataset.locations);
  console.log("Parsed locations:", locations);

  // ✅ Set the MapTiler API key
  maptilersdk.config.apiKey = "UX2b0HMn9kmKv4uz6hMN"; // Replace with your real key

  const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS, // Or use your custom style URL
    scrollZoom: false,
    zoom: 2,
  });

  const bounds = new maptilersdk.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundColor = "#28b485";
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.borderRadius = "50%";

    new maptilersdk.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .setPopup(
        new maptilersdk.Popup().setText(`${loc.description} - Day ${loc.day}`)
      )
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
  });
});
