window.onload = function () {
    console.log(document.cookie);
    if (!document.cookie) {
        alert("User not logged in, redirecting...");
        window.location.href = "../html/index.html";
    }
};
