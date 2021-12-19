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
    let markerCount = 0;
    map.addEventListener("click", async (event) => {
        layergroup.clearLayers();
        // Add marker
        const marker = await L.marker([event.latlng["lat"], event.latlng["lng"]], { draggable: true, riseOnHover: true }).addTo(map);
        m.addToRoute(marker);
        markerCount += 1;
        console.log(markerCount);
        // Need to have 2 markers before executing get request
        if (markerCount < 2) {
            return;
        }
        // Create route
        const route = await m.createRoute();
        const drawRoute = await m.drawRoute(route);
        // Creating a layergroup for polyline
        const polyline = await L.polyline(drawRoute, { color: "#FC5200", weight: 2, lineJoin: "round" });
        layergroup.addLayer(polyline);
        // polylines_layergroup.clearLayers();
        // Delete marker and it's corresponding polyline
        marker.on("click", (e) => {
            map.removeLayer(e.target);
            m.deleteFromRoute(e.target);
            // console.log(polyline_layergroup);
            map.removeLayer(polyline);
            markerCount -= 1;
        });
        marker.on("drag", (e) => {
            console.log("Drag");
        });
    });
};

function drawPolylines() {}

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);

    // Welcome message
    document.getElementById("welcome").innerHTML += " " + userCapitalCase + "!";
    // Nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}
