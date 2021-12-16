import * as cookie from "./cookie.js";

window.onload = function () {
    console.log(document.cookie);
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    init();
    personalizeHTML();
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    console.log(userCapitalCase);

    document.getElementById("welcome").innerHTML += " " + userCapitalCase + "!";
    document.getElementById("username-nav").innerHTML = userCapitalCase;
}

function init() {
    // Nav dropdown button
    document.getElementById("username-nav").addEventListener("click", (e) => {
        console.log("klik");
        toggleDropdown();
    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    const dropwdown = document.getElementById("myDropdown").classList.toggle("show");
    console.log(dropwdown);
}
