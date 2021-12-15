/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/***/ (() => {

eval("\r\n\r\nwindow.onload = function () {\r\n    initFields();\r\n};\r\n\r\nfunction initFields() {\r\n    document.getElementById(\"create\").addEventListener(\"click\", async (e) => {\r\n        e.preventDefault();\r\n\r\n        let user = await createUser();\r\n    });\r\n}\r\n\r\nasync function createUser() {\r\n    // Assigning values\r\n    const username = document.getElementById(\"username\").value;\r\n    const email = document.getElementById(\"email\").value;\r\n    const password = document.getElementById(\"password\").value;\r\n    const passwordConfirm = document.getElementById(\"password-confirm\").value;\r\n\r\n    // Validation input fields\r\n    let inputs = document.getElementsByClassName(\"input\");\r\n    if (!username || !email || !password || !passwordConfirm) {\r\n        let htmlString = `<p id=\"missing-message\">Fill in the form, missing: <br>`;\r\n        let htmlInputsMissing = \" \";\r\n        let htmlStringEnd = ` </p>`;\r\n        for (let input of inputs) {\r\n            if (!input.value) {\r\n                htmlInputsMissing += `${input.name}, `;\r\n            }\r\n        }\r\n        // .slice used to delete the \",\" for the last element\r\n        const finalHTML = htmlString + htmlInputsMissing.slice(0, htmlInputsMissing.length - 2) + htmlStringEnd;\r\n        document.getElementById(\"message-container\").innerHTML = finalHTML;\r\n        return;\r\n    }\r\n\r\n    // Do passwords match?\r\n    if (password == passwordConfirm) {\r\n        const user = JSON.stringify({\r\n            username: username,\r\n            email: email,\r\n            password: password,\r\n        });\r\n\r\n        fetch(\"https://web2-routexploreapi.herokuapp.com/users/register\", {\r\n            method: \"POST\",\r\n            headers: { \"Content-Type\": \"application/json\" },\r\n            body: user,\r\n        })\r\n            .then((response) => response.json())\r\n            .then((data) => {\r\n                console.log(data);\r\n                console.log(\"account created\");\r\n            })\r\n            .then((data) => {\r\n                window.location.href = \"../html/home.html\";\r\n            });\r\n    } else {\r\n        document.getElementById(\"message-container\").innerHTML = `<p id=\"missing-message\">Passwords do not match</p>`;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/register.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/register.js"]();
/******/ 	
/******/ })()
;