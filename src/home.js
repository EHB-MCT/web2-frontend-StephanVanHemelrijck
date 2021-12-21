import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";
import * as m from "./map.js";

// MAPBOX API KEY
const mapbox_api_key = "pk.eyJ1Ijoic3VlemhvbyIsImEiOiJja3hjMGUybm4wZGc3MnVtbThhazd2ZWk0In0.vZFkONLp_lXJZK15bC0xCg";

// GRAPHHOPPER API KEY
const graphhopper_api_key = "0e189b71-b607-4cb2-97b4-5678175d8fc6";

// Map layers
let map = m.initMap();
const layergroup = L.layerGroup().addTo(map);
let polyline;
window.onload = function () {
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    header.init();
    init();
    personalizeHTML();
    // Map interaction
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
        const latlngs = await m.reverseCoordinates(route); // Reverse to latlngs
        // Creating a layergroup for polyline
        polyline = await L.polyline(latlngs, { color: "#FC5200", weight: 2, lineJoin: "round" });
        layergroup.addLayer(polyline);
        // polylines_layergroup.clearLayers();
        // Delete marker and it's corresponding polyline
        marker.on("click", async (e) => {
            map.removeLayer(e.target);
            m.deleteFromRoute(e.target);
            // console.log(polyline_layergroup);
            markerCount -= 1;
            const sortedMarkers = await m.sortCoordinates();
            // Initialize new latlng list
            const newRoute = await m.createRoute(); // Returns lnglats list
            // Function to reverse lnglats into a latlngs list || Needed for API request
            const latlngs = await m.reverseCoordinates(newRoute);
            // Create new route
            polyline = await L.polyline(latlngs, { color: "#FC5200", weight: 2, lineJoin: "round" });
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

function init() {
    // reset
    document.getElementById("reset").addEventListener("click", (e) => {
        // refresh page = delete markers?
        window.location.replace(window.location.pathname + window.location.search + window.location.hash);
    });
    // search
    document.getElementById("search").addEventListener("click", async (e) => {
        e.preventDefault();
        const startLocation = document.getElementById("location-start").value;
        // Get location in latlng
        const location = await m.getLatlng(startLocation);
        const lat = location.geometry.coordinates[1];
        const lng = location.geometry.coordinates[0];
        console.log(lat, lng);
        // Fly to location
        map.flyTo(new L.LatLng(lat, lng), 14);
    });
    // Save
    document.getElementById("save").addEventListener("click", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        if (!name) {
            alert("Please assign a name before trying to save.");
            return;
        }
        let latlngslist;
        // PolylineEnc to save in db
        let polylineEnc;
        for (let i in map._layers) {
            if (map._layers[i]._latlngs) {
                latlngslist = map._layers[i]._latlngs;
                const polyline = L.polyline(latlngslist, 5);
                polylineEnc = polyline.encodePath();
            }
        }
        // Find startlocation
        const startLat = latlngslist[0].lat;
        const startLng = latlngslist[0].lng;
        const startLatLng = [startLat, startLng];
        // Calculate location based on [lat,long]
        const startLocation = await m.getLocation(startLatLng);
        // Found this on Leaflet plugins documentation, leaflet-image plugin.
        // Code from https://github.com/mapbox/leaflet-image/issues/113
        // Using import in html script recommended by Hirmes https://github.com/mapbox/leaflet-image/issues/113#issuecomment-505661878
        const startPointLat = latlngslist[0].lat;
        const startPointLng = latlngslist[0].lng;
        // Image to save in db
        await leafletImage(map, function (err, canvas) {
            // now you have canvas
            // example thing to do with that canvas:
            var img = document.createElement("img");
            var dimensions = map.getSize();
            img.width = dimensions.x;
            img.height = dimensions.y;
            img.src = canvas.toDataURL();
            img.id = "route-img";
            document.getElementById("images").innerHTML = "";
            document.getElementById("images").appendChild(img);
            const data = {
                created_by: cookie.getCookie("username"),
                route_name: name,
                route_start_location: {
                    country: startLocation.country,
                    state: startLocation.state,
                    city: startLocation.city,
                    postcode: startLocation.postcode,
                    street: startLocation.street,
                    name: startLocation.name,
                    point: startLocation.point,
                },
                route_coordinates: latlngslist,
                route_polyline_encoded: polylineEnc,
                route_img_url: img.src,
            };
            saveRoute(data);
            alert("Route saved!");
        });
    });
}

async function saveRoute(data) {
    fetch("https://web2-routexploreapi.herokuapp.com/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}
