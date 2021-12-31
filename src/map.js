// MAPBOX API KEY
const mapbox_api_key = "pk.eyJ1Ijoic3VlemhvbyIsImEiOiJja3hjMGUybm4wZGc3MnVtbThhazd2ZWk0In0.vZFkONLp_lXJZK15bC0xCg";

// GRAPHHOPPER API KEY
const graphhopper_api_key = "55878506-9c1f-4b93-9c8f-a625b7720301";

export function initMap() {
    // Hardcoded center latlong of Belgium
    const options = { preferCanvas: true, zoom: 8, renderer: L.canvas() };
    const map = L.map("map", options).setView([50.597001818485246, 4.86618856002286]);

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

    // document.getElementById("map").append(map);
    return map;
}

export async function getLatlng(location) {
    const newLocation = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=" + mapbox_api_key, {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => data.features[0]);
    return newLocation;
}

export async function getLocation(latlng) {
    const lat = latlng[0];
    const lng = latlng[1];
    let location = {};
    await fetch("https://graphhopper.com/api/1/geocode?key=" + graphhopper_api_key + "&reverse=true&point=" + lat + "," + lng + "&debug=true&")
        .then((res) => res.json())
        .then((data) => {
            location = {
                country: data.hits[0].country,
                state: data.hits[0].state,
                city: data.hits[0].city,
                postcode: data.hits[0].postcode,
                street: data.hits[0].street,
                name: data.hits[0].name,
                point: data.hits[0].point,
            };
        })
        .catch((err) => {
            console.log("You didn't click on a piece of land...");
            return;
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
}

export async function createRoute(ronde = true) {
    let urlifiedMarkersList = "";
    let i = 0;
    do {
        urlifiedMarkersList += "&point=" + markers[i]._latlng.lat + "," + markers[i]._latlng.lng;
        i++;
    } while (i < markers.length);
    if (ronde == true) {
        urlifiedMarkersList += "&point=" + markers[0]._latlng.lat + "," + markers[0]._latlng.lng;
    }
    let x;
    await fetch("https://graphhopper.com/api/1/route?key=0e189b71-b607-4cb2-97b4-5678175d8fc6&profile=bike&points_encoded=false" + urlifiedMarkersList)
        .then((res) => res.json())
        .then((data) => {
            x = data;
        });
    return x;
}

export function reverseCoordinates(data) {
    let coordinates = data.paths[0].points.coordinates;
    let coordinatesReversed = [];
    for (let i = 0; i < coordinates.length; i++) {
        coordinatesReversed.push(coordinates[i].reverse());
    }
    return coordinatesReversed;
}

export function sortCoordinates() {
    const sortedMarkers = markers.sort(function (a, b) {
        if (a._leaflet_id > b._leaflet_id) {
            return a - b;
        }
    });
    markers = sortedMarkers;
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
