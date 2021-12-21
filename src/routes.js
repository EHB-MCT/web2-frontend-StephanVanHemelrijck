import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";

window.onload = async function () {
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    header.init();
    personalizeHTML();
    document.getElementById("big-container").innerHTML = `<h1 style="color:#FFFFFF; padding: 50px;">Loading Routes...</h1>`;
    await printRoutes();
    document.getElementById("search").addEventListener("click", (e) => searchRoutes());
    document.getElementById("reset").addEventListener("click", printRoutes());
    document.getElementById("favorite").addEventListener("click", (e) => {
        e.preventDefault();
        const route = document.getElementById("favoritevalue").value;
        if (!route) {
            alert("Paste a route ID in the corresponding box.");
            return;
        } else {
            addToFavorites(route);
        }
    });
    // Add to favorite
    // let inputs = document.querySelectorAll("addtofav");
    // for (let i = 0; i < inputs.length; i++) {
    //     inputs[i].addEventListener("click", (e) => {
    //         console.log("click");
    //     });
    // }
};

function searchRoutes() {
    // Assigning search value
    const city = document.getElementById("searchvalue").value;
    if (!city) {
        alert("Search field is empty");
        return;
    } else {
        printRoutesByCity(city);
    }
}

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    // Insert name into nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}

async function addToFavorites(route) {
    // Get user id from cookie
    const user_id = cookie.getCookie("id");
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/favorite_routes/:route_id?route_id=" + route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id,
        }),
    })
        .then((res) => res.json())
        .then((data) => alert("Saved route to favorites"));
}

async function printRoutesByCity(city) {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/city/:city" + "?city=" + city)
        .then((res) => res.json())
        .then((data) => {
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
        });
}

async function printRoutes() {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
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
        });
}
