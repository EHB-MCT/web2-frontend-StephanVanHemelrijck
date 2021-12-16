import * as cookie from "./cookie.js";

window.onload = function () {
    console.log(document.cookie);
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
    personalizeHTML();
};

function personalizeHTML() {
    let user = cookie.getCookie("username");
    // Capitalize username
    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);
    console.log(userCapitalCase);

    document.getElementById("welcome").innerHTML += " " + userCapitalCase + "!";
    document.getElementById("signup").innerHTML = userCapitalCase;
}
