import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";

window.onload = function () {
    header.init();
    personalizeHTML();
    printRoutes();
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    // Insert name into nav
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}

async function printRoutes() {
    await fetch("https://web2-routexploreapi.herokuapp.com/routes", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let htmlString = ``;
            data.forEach((element) => {
                htmlString += ` <div id="container">
                <div id="container-img">
                <img src="${element.route_img_url}" alt="${element.route_name}" />
                </div>
                <div id="description">
                <div id="names">
                <p id="routename"><span>Route:</span> ${element.route_name}</p>
                <p id="creatorname"><span>Created by:</span> ${element.created_by}</p>
                </div>
                <p id="startpoint"><span>Startpoint:</span> ${element.route_start_location.city}, ${element.route_start_location.state}, ${element.route_start_location.country}</p>
                </div>
                </div>`;
            });
            document.getElementById("big-container").insertAdjacentHTML("beforeend", htmlString);
        });
}