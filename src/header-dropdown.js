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
    // Delete User
    document.getElementById("delete").addEventListener("click", (e) => {
        deleteUser();
    });
}

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
    console.log(document.cookie);
    cookie.deleteCookie("username");
    cookie.deleteCookie("email");
    cookie.deleteCookie("token");
    window.location.href = "../html/index.html";
}
