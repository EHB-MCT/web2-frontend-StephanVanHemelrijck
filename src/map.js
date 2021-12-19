// MAPBOX API KEY
const mapbox_api_key = "pk.eyJ1Ijoic3VlemhvbyIsImEiOiJja3hjMGUybm4wZGc3MnVtbThhazd2ZWk0In0.vZFkONLp_lXJZK15bC0xCg";

// GRAPHHOPPER API KEY
const graphhopper_api_key = "0e189b71-b607-4cb2-97b4-5678175d8fc6";

export function initMap() {
    // Hardcoded center latlong of Belgium
    const map = L.map("map").setView([50.597001818485246, 4.86618856002286], 7);

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + mapbox_api_key, {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapbox_api_key,
        interactive: true,
    }).addTo(map);

    document.getElementById("map").append(map);
    return map;
}

export async function getLocation(latlng) {
    const lat = latlng["lat"];
    const lng = latlng["lng"];
    let location = {};
    await fetch("https://graphhopper.com/api/1/geocode?key=" + graphhopper_api_key + "&reverse=true&point=" + lat + "," + lng + "&debug=true&")
        .then((res) => res.json())
        .then((data) => {
            const city = data.hits[0].city;
            const street = data.hits[0].name;
            location = JSON.stringify({ city: city, street: street });
        })
        .catch((err) => {
            console.log("You didn't click on a piece of land...");
        });
    return location;
}

let markers = [];
export async function addToRoute(marker) {
    markers.push(marker);
}

export async function deleteFromRoute(marker) {
    let filteredMarkers = [];
    for (let i = 0; i < markers.length; i++) {
        if (marker._leaflet_id != markers[i]._leaflet_id) {
            filteredMarkers.push(markers[i]);
        }
    }
    markers = filteredMarkers;
    console.log("filtered", filteredMarkers);
}

export async function createRoute() {
    let urlifiedMarkersList = "";
    let i = 0;
    do {
        urlifiedMarkersList += "&point=" + markers[i]._latlng.lat + "," + markers[i]._latlng.lng;
        i++;
    } while (i < markers.length);

    let x;
    await fetch("https://graphhopper.com/api/1/route?key=0e189b71-b607-4cb2-97b4-5678175d8fc6&profile=bike&points_encoded=false" + urlifiedMarkersList)
        .then((res) => res.json())
        .then((data) => {
            x = data;
        });
    return x;
}

export function drawRoute(data) {
    let coordinates = data.paths[0].points.coordinates;
    let coordinatesReversed = [];
    for (let i = 0; i < coordinates.length; i++) {
        coordinatesReversed.push(coordinates[i].reverse());
    }
    return coordinatesReversed;
}

export async function convertMarkersIntoList() {
    let markersList = "";
    let i = 0;
    do {
        markersList += "[" + markers[i]._latlng.lat + "," + markers[i]._latlng.lng + "]" + ",";
        i++;
    } while (i < markers.length);
    return markersList.slice(0, -1);
}
