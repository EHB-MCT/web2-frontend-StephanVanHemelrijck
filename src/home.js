import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";
import * as m from "./map.js";

window.onload = function () {
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    header.init();
    personalizeHTML();
    // Map interaction
    const map = m.initMap();
    const layergroup = L.layerGroup().addTo(map);
    // Event handlers
    let markerCount = 0;
    map.addEventListener("click", async (event) => {
        layergroup.clearLayers();
        // Add marker
        const marker = await L.marker([event.latlng["lat"], event.latlng["lng"]], { draggable: true, riseOnHover: true }).addTo(map);
        m.addToRoute(marker);
        markerCount += 1;
        // Need to have 2 markers before executing get request
        if (markerCount < 2) {
            return;
        }
        // Create route
        const route = await m.createRoute(); // Returns lnglats list
        const drawRoute = await m.reverseCoordinates(route); // Reverse to latlngs
        // Creating a layergroup for polyline
        const polyline = await L.polyline(drawRoute, { color: "#FC5200", weight: 2, lineJoin: "round" });
        layergroup.addLayer(polyline);
        // polylines_layergroup.clearLayers();
        // Delete marker and it's corresponding polyline
        marker.on("click", async (e) => {
            map.removeLayer(e.target);
            m.deleteFromRoute(e.target);
            // console.log(polyline_layergroup);
            markerCount -= 1;
            const sortedMarkers = await m.sortCoordinates();
            console.log(sortedMarkers);
            // Initialize new latlng list
            const newRoute = await m.createRoute(); // Returns lnglats list
            // Function to reverse lnglats into a latlngs list || Needed for API request
            const latlngs = await m.reverseCoordinates(newRoute);
            // Create new route
            const polyline = await L.polyline(latlngs, { color: "#FC5200", weight: 2, lineJoin: "round" });
            // Delete existing polyline
            layergroup.clearLayers();
            // Add new polyline
            layergroup.addLayer(polyline);
        });
        marker.on("dragend", async (e) => {
            // Delete current marker from existing marker array
            // m.deleteFromRoute(e.target);
            // Add marker with back to the existing marker array || This way there are no duplicates
            // m.addToRoute(e.target);
            // Sort markers id low to high in case somehow the order is screwed
            const sortedMarkers = await m.sortCoordinates();
            console.log(sortedMarkers);
            // Initialize new latlng list
            const newRoute = await m.createRoute(); // Returns lnglats list
            // Function to reverse lnglats into a latlngs list || Needed for API request
            const latlngs = await m.reverseCoordinates(newRoute);
            // Create new route
            const polyline = await L.polyline(latlngs, { color: "#FC5200", weight: 2, lineJoin: "round" });
            // Delete existing polyline
            layergroup.clearLayers();
            // Add new polyline
            layergroup.addLayer(polyline);
        });
    });
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);

    // Welcome message
    document.getElementById("welcome").innerHTML += " " + userCapitalCase + "!";
    // Nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}
