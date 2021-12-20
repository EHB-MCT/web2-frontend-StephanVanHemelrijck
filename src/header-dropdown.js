import * as cookie from "./cookie.js";

export function init() {
    // Nav dropdown button
    document.getElementById("username-nav").addEventListener("click", (e) => {
        toggleDropdown();
    });
    // New Route
    document.getElementById("new-route").addEventListener("click", (e) => {
        console.log("click");
        window.location.href = window.location.origin + "/dist/html/home.html";
    });
    // Routes
    document.getElementById("routes").addEventListener("click", (e) => {
        window.location.href = window.location.origin + "/dist/html/routes.html";
    });
    // My Routes
    document.getElementById("my-routes").addEventListener("click", (e) => {
        window.location.href = window.location.origin + "/dist/html/my-routes.html";
    });
    // Favorite Routes
    document.getElementById("fav-routes").addEventListener("click", (e) => {
        window.location.href = window.location.origin + "/dist/html/fav-routes.html";
    });
    // Delete User
    document.getElementById("delete").addEventListener("click", (e) => {
        deleteUser();
    });
    // Log Out
    document.getElementById("logout").addEventListener("click", (e) => {
        logOut();
    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

export function logOut() {
    cookie.deleteCookie("token");
    window.location.href = "../html/index.html";
}

export async function deleteUser() {
    console.log(document.cookie);
    const email = cookie.getCookie("email");
    console.log(email);
    //web2-routexploreapi.herokuapp.com/users/delete
    await fetch("https://web2-routexploreapi.herokuapp.com/users/:email" + "?email=" + `${email}`, {
        method: "DELETE",
    });
    cookie.deleteCookie("username");
    cookie.deleteCookie("email");
    cookie.deleteCookie("token");
    window.location.href = "../html/index.html";
}
