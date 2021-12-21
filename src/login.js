"use strict";
import * as cookie from "./cookie.js";

window.onload = function () {
    initFields();
    let currentSession = cookie.getCookie("token");
    if (currentSession) {
        window.location.href = "../html/home.html";
    }
};

function initFields() {
    const chkbx = document.getElementById("checkbox-remember-me");
    document.getElementById("login").addEventListener("click", async (e) => {
        e.preventDefault();

        let rememberme = chkbx.checked;
        let credentials = await checkInput();
        if (credentials != undefined) {
            userLogin(credentials[0], credentials[1], rememberme);
        }
    });
}

function checkInput() {
    // Assigning values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation input fields
    let inputs = document.getElementsByClassName("input");
    if (!email || !password) {
        let htmlString = `<p id="missing-message">Fill in the form, missing: <br>`;
        let htmlInputsMissing = "";
        let htmlStringEnd = ` </p>`;
        for (let input of inputs) {
            if (!input.value) {
                htmlInputsMissing += `${input.name}, `;
            }
        }
        // .slice used to delete the "," for the last element
        const finalHTML = htmlString + htmlInputsMissing.slice(0, htmlInputsMissing.length - 2) + htmlStringEnd;
        document.getElementById("message-container").innerHTML = finalHTML;
        return;
    }
    return [email, password];
}

function userLogin(email, password, rememberMe) {
    fetch("https://web2-routexploreapi.herokuapp.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                document.getElementById("message-container").innerHTML = `<p id="error-message">${data.value} </p>`;
                return;
            }
            document.getElementById("message-container").innerHTML = `<p id="error-message">${data.message} </p>`;
            // Storing user info in cookies
            let timeUntillCookieExpiresInSeconds;
            if (rememberMe) {
                timeUntillCookieExpiresInSeconds = 60 * 60 * 24 * 7; // Set to expire in 1 week
                cookie.setCookie("username", `${data.username}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("email", `${data.email}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("token", `${data.token}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("id", `${data.user_id}`, { "max-age": timeUntillCookieExpiresInSeconds });
            } else {
                timeUntillCookieExpiresInSeconds = 60 * 60 * 1; // Set to expire in 1 hr
                cookie.setCookie("username", `${data.username}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("email", `${data.email}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("token", `${data.token}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("id", `${data.user_id}`, { "max-age": timeUntillCookieExpiresInSeconds });
            }
            if (!data.error) {
                document.getElementById("message-container").innerHTML = `<p id="error-message">Logging in...</p>`;
                window.location.href = "../html/home.html";
            }
        });
}
