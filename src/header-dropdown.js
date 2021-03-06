import * as cookie from "./cookie.js";

export function init() {
    // Click dropdown away
    const main = document.getElementsByTagName("main");
    main[0].addEventListener("click", (e) => {
        document.getElementById("myDropdown").classList.remove("show");
    });
    // Logo
    document.getElementById("nav-logo").addEventListener("click", (e) => {
        if (!document.cookie) {
            window.location.href = "../html/index.html";
            return;
        } else {
            window.location.href = "../html/home.html";
        }
    });

    // Nav dropdown button
    document.getElementById("username-nav").addEventListener("click", (e) => {
        toggleDropdown();
    });
    // New Route
    document.getElementById("new-route").addEventListener("click", (e) => {
        window.location.href = "../html/home.html";
    });
    // Routes
    document.getElementById("routes").addEventListener("click", (e) => {
        window.location.href = "../html/routes.html";
    });
    // My Routes
    document.getElementById("my-routes").addEventListener("click", (e) => {
        window.location.href = "../html/my-routes.html";
    });
    // Favorite Routes
    document.getElementById("fav-routes").addEventListener("click", (e) => {
        window.location.href = "../html/favorite-routes.html";
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
    const email = cookie.getCookie("email");
    //web2-routexploreapi.herokuapp.com/users/delete
    await fetch("https://web2-routexploreapi.herokuapp.com/users/:email" + "?email=" + `${email}`, {
        method: "DELETE",
    });
    cookie.deleteCookie("username");
    cookie.deleteCookie("email");
    cookie.deleteCookie("token");
    window.location.href = "../html/index.html";
}
