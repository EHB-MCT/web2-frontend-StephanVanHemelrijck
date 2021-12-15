"use strict";

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

    // Validation input fields
    let inputs = document.getElementsByClassName("input");
    if (!username || !email || !password || !passwordConfirm) {
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
        document.getElementById("missing-message-container").innerHTML = finalHTML;
        return;
    }

    // Do passwords match?
    if (password == passwordConfirm) {
        const user = JSON.stringify({
            username: username,
            email: email,
            password: password,
        });

        fetch("https://web2-routexploreapi.herokuapp.com/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: user,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log("account created");
            });

        window.location.href = "../html/home.html";
    } else {
        document.getElementById("missing-message-container").innerHTML = `<p id="missing-message">Passwords do not match</p>`;
    }
}
