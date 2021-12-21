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
    await printFavoriteRoutes();
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    // Insert name into nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
    document.getElementById("deleteBtn").addEventListener("click", (e) => {
        e.preventDefault();
        const route = document.getElementById("deletevalue").value;
        if (!route) {
            alert("Paste a route ID in the corresponding box.");
            return;
        } else {
            deleteFromFavorites(route);
        }
    });
}

async function printFavoriteRoutes() {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/favorite_routes/:id" + "?id=" + cookie.getCookie("id"), {
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
                console.log(data);
                document.getElementById("big-container").innerHTML = "";
                let htmlString = ``;
                data.forEach((element) => {
                    fetch("https://web2-routexploreapi.herokuapp.com/routes/:route_id?" + "route_id=" + element.route_id)
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            // Clear the loading message
                            // Capitalize username
                            const str = data.created_by;
                            const userName = data.created_by.charAt(0).toUpperCase() + str.slice(1);
                            htmlString = ` <div id="container">
                    <p id="route-id">Route ID: ${data.route_id}</p>
                    <div id="container-img">
                    <img src="${data.route_img_url}" alt="${data.route_name}" />
                    </div>
                    <div id="description">
                    <div id="names">
                    <p id="routename"><span>Route:</span> ${data.route_name}</p>
                    <p id="creatorname"><span>Created by:</span> ${userName}</p>
                    <div id="${data.route_id}" class="icon-star-full addtofav"></div>
                    </div>
                    <p id="startpoint"><span>Startpoint:</span> ${data.route_start_location.city}, ${data.route_start_location.state}, ${data.route_start_location.country}</p>
                    </div>
                    </div>`;
                            document.getElementById("big-container").insertAdjacentHTML("afterbegin", htmlString);
                        });
                });
            }
        });
}

async function deleteFromFavorites(route) {
    console.log(route);
    const user_id = cookie.getCookie("id");
    await fetch("https://web2-routexploreapi.herokuapp.com/routes/favorite_routes/:route_id" + "?route_id=" + route, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user_id }),
    })
        .then((res) => res.json())
        .then((data) => (window.location.href = window.location.href));
}
