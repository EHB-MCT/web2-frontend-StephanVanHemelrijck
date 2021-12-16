import * as cookie from "./cookie.js";
import * as header from "./header-dropdown.js";

window.onload = function () {
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    header.init();
    personalizeHTML();
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
