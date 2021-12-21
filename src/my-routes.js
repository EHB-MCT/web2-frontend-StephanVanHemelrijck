import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";

window.onload = async function () {
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    header.init();
    personalizeHTML();
    document.getElementById("big-container").innerHTML = `<h1 style="color:#FFFFFF; padding: 50px; text-shadow: 1px 1px black;">Loading Routes...</h1>`;
    await printMyRoutes();
    document.getElementById("search").addEventListener("click", (e) => {
        e.preventDefault();
        searchRoutes();
    });
    document.getElementById("reset").addEventListener("click", printMyRoutes());
    document.getElementById("deleteBtn").addEventListener("click", (e) => {
        e.preventDefault();
        const route = document.getElementById("deletevalue").value;
        if (!route) {
            alert("Paste a route ID in the corresponding box.");
            return;
        } else {
            deleteRoute(route);
        }
    });
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    // Insert name into nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}

function searchRoutes() {
    // Assigning search value
    const city = document.getElementById("searchvalue").value;
    if (!city) {
        alert("Search field is empty");
        return;
    } else {
        printMyRoutesByCity(city);
    }
}

async function deleteRoute(route) {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/id/:id" + "?id=" + route, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = window.location.href;
        });
}

async function printMyRoutesByCity(city) {
    const user_id = cookie.getCookie("id");
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/city/:city" + "?city=" + city + "&user_id=" + user_id)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                document.getElementById("big-container").innerHTML = document.getElementById(
                    "big-container"
                ).innerHTML = `<h1 style="color:#FFFFFF; padding: 50px; text-shadow: 1px 1px black;">You don't have any routes starting in this city...</h1>`;
                return;
            } else {
                document.getElementById("big-container").innerHTML = "";
                let htmlString = ``;
                data.forEach((element) => {
                    // Clear the loading message
                    // Capitalize username
                    const str = element.created_by;
                    const userName = element.created_by.charAt(0).toUpperCase() + str.slice(1);
                    htmlString = ` <div id="container">
                    <p id="route-id">Route ID: ${element.route_id}</p>
                    <div id="container-img">
                    <img src="${element.route_img_url}" alt="${element.route_name}" />
                    </div>
                    <div id="description">
                    <div id="names">
                    <p id="routename"><span>Route:</span> ${element.route_name}</p>
                    <p id="creatorname"><span>Created by:</span> ${userName}</p>
                    <div id="${element.route_id}" class="addtofav"></div>
                    </div>
                    <p id="startpoint"><span>Startpoint:</span> ${element.route_start_location.city}, ${element.route_start_location.state}, ${element.route_start_location.country}</p>
                    </div>
                    </div>`;
                    document.getElementById("big-container").insertAdjacentHTML("afterbegin", htmlString);
                });
            }
        });
}

async function printMyRoutes() {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/user/:id" + "?id=" + cookie.getCookie("id"), {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error || data.length == 0) {
                document.getElementById(
                    "big-container"
                ).innerHTML = `<h1 style="color:#FFFFFF; padding: 50px; text-shadow: 1px 1px black;">You have no routes...</h1>`;
                return;
            } else {
                document.getElementById("big-container").innerHTML = "";
                let htmlString = ``;
                data.forEach((element) => {
                    // Clear the loading message
                    // Capitalize username
                    const str = element.created_by;
                    const userName = element.created_by.charAt(0).toUpperCase() + str.slice(1);
                    htmlString = ` <div id="container">
                    <p id="route-id">Route ID: ${element.route_id}</p>
                    <div id="container-img">
                    <img src="${element.route_img_url}" alt="${element.route_name}" />
                    </div>
                    <div id="description">
                    <div id="names">
                    <p id="routename"><span>Route:</span> ${element.route_name}</p>
                    <p id="creatorname"><span>Created by:</span> ${userName}</p>
                    <div id="${element.route_id}" class="icon-star-full addtofav"></div>
                    </div>
                    <p id="startpoint"><span>Startpoint:</span> ${element.route_start_location.city}, ${element.route_start_location.state}, ${element.route_start_location.country}</p>
                    </div>
                    </div>`;
                    document.getElementById("big-container").insertAdjacentHTML("afterbegin", htmlString);
                });
            }
        });
}
