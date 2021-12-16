import * as cookie from "./cookie.js";

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function init() {
    // Nav dropdown button
    document.getElementById("username-nav").addEventListener("click", (e) => {
        toggleDropdown();
    });
    // Log Out
    document.getElementById("logout").addEventListener("click", (e) => {
        logOut();
    });
}

export function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

export function logOut() {
    console.log("logging out");
    cookie.deleteCookie("username");
    cookie.deleteCookie("email");
    cookie.deleteCookie("session_token");
    window.location.href = "../html/index.html";
}
