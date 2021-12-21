"use strict";
import * as cookie from "./cookie.js";

window.onload = function () {
    initFields();
};

function initFields() {
    document.getElementById("create").addEventListener("click", async (e) => {
        e.preventDefault();

        let user = await createUser();
    });
}

async function createUser() {
    // Assigning values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const sec_question = document.getElementById("sec-question-answer").getAttribute("placeholder");
    const sec_question_answer = document.getElementById("sec-question-answer").value;

    // Validation input fields
    let inputs = document.getElementsByClassName("input");
    if (!username || !email || !password || !passwordConfirm || !sec_question_answer) {
        let htmlString = `<p id="missing-message">Fill in the form, missing: <br>`;
        let htmlInputsMissing = " ";
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

    // Do passwords match?
    if (password == passwordConfirm) {
        fetch("https://web2-routexploreapi.herokuapp.com/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: `${username}`,
                email: `${email}`,
                password: `${password}`,
                security_question: `${sec_question}`,
                security_question_answer: `${sec_question_answer}`,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    document.getElementById("message-container").innerHTML = `<p id="error-message">${data.value} </p>`;
                }
                const timeUntillCookieExpiresInSeconds = 1 * (60 * 60); // Set to expire in 1 hr
                cookie.setCookie("username", `${data.username}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("email", `${data.email}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("token", `${data.token}`, { "max-age": timeUntillCookieExpiresInSeconds });
                cookie.setCookie("id", `${data.user_id}`, { "max-age": timeUntillCookieExpiresInSeconds });
                if (!data.error) {
                    window.location.href = "../html/home.html";
                }
            });
    } else {
        document.getElementById("message-container").innerHTML = `<p id="missing-message">Passwords do not match</p>`;
    }
}
