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

/***/ "./src/cookie.js":
/*!***********************!*\
  !*** ./src/cookie.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCookie\": () => (/* binding */ getCookie),\n/* harmony export */   \"setCookie\": () => (/* binding */ setCookie),\n/* harmony export */   \"deleteCookie\": () => (/* binding */ deleteCookie)\n/* harmony export */ });\n// Code found at the following links:\r\n// https://www.w3schools.com/js/js_cookies.asp\r\n// https://javascript.info/cookie#reading-from-document-cookie\r\n// Thanks to those guys for setting up those amazing functions\r\n\r\n// returns the cookie with the given name,\r\n// or undefined if not found\r\nfunction getCookie(cname) {\r\n    let name = cname + \"=\";\r\n    let decodedCookie = decodeURIComponent(document.cookie);\r\n    let ca = decodedCookie.split(\";\");\r\n    for (let i = 0; i < ca.length; i++) {\r\n        let c = ca[i];\r\n        while (c.charAt(0) == \" \") {\r\n            c = c.substring(1);\r\n        }\r\n        if (c.indexOf(name) == 0) {\r\n            return c.substring(name.length, c.length);\r\n        }\r\n    }\r\n    return \"\";\r\n}\r\n\r\n// Creating cookie\r\nfunction setCookie(name, value, options = {}) {\r\n    options = {\r\n        path: \"/\",\r\n        ...options,\r\n    };\r\n\r\n    let updatedCookie = encodeURIComponent(name) + \"=\" + encodeURIComponent(value);\r\n\r\n    for (let optionKey in options) {\r\n        updatedCookie += \"; \" + optionKey;\r\n        let optionValue = options[optionKey];\r\n        if (optionValue !== true) {\r\n            updatedCookie += \"=\" + optionValue;\r\n        }\r\n    }\r\n    document.cookie = updatedCookie;\r\n}\r\n\r\n// Deleting an existing cookie\r\nfunction deleteCookie(cname) {\r\n    setCookie(cname, \"\", { \"max-age\": -1 });\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/cookie.js?");

/***/ }),

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"./src/cookie.js\");\n\r\n\r\n\r\nwindow.onload = function () {\r\n    initFields();\r\n    let currentSession = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.getCookie(\"token\");\r\n    if (currentSession) {\r\n        window.location.href = \"../html/home.html\";\r\n    }\r\n};\r\n\r\nfunction initFields() {\r\n    document.getElementById(\"login\").addEventListener(\"click\", async (e) => {\r\n        e.preventDefault();\r\n\r\n        let credentials = await checkInput();\r\n        if (credentials != undefined) {\r\n            userLogin(credentials[0], credentials[1]);\r\n        }\r\n    });\r\n}\r\n\r\nfunction checkInput() {\r\n    // Assigning values\r\n    const email = document.getElementById(\"email\").value;\r\n    const password = document.getElementById(\"password\").value;\r\n\r\n    // Validation input fields\r\n    let inputs = document.getElementsByClassName(\"input\");\r\n    if (!email || !password) {\r\n        let htmlString = `<p id=\"missing-message\">Fill in the form, missing: <br>`;\r\n        let htmlInputsMissing = \"\";\r\n        let htmlStringEnd = ` </p>`;\r\n        for (let input of inputs) {\r\n            if (!input.value) {\r\n                htmlInputsMissing += `${input.name}, `;\r\n            }\r\n        }\r\n        // .slice used to delete the \",\" for the last element\r\n        const finalHTML = htmlString + htmlInputsMissing.slice(0, htmlInputsMissing.length - 2) + htmlStringEnd;\r\n        document.getElementById(\"message-container\").innerHTML = finalHTML;\r\n        return;\r\n    }\r\n    return [email, password];\r\n}\r\n\r\nfunction userLogin(email, password) {\r\n    fetch(\"https://web2-routexploreapi.herokuapp.com/users/login\", {\r\n        method: \"POST\",\r\n        headers: { \"Content-Type\": \"application/json\" },\r\n        body: JSON.stringify({ email: email, password: password }),\r\n    })\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            if (data.error) {\r\n                document.getElementById(\"message-container\").innerHTML = `<p id=\"error-message\">${data.value} </p>`;\r\n                return;\r\n            }\r\n            document.getElementById(\"message-container\").innerHTML = `<p id=\"error-message\">${data.message} </p>`;\r\n            // Storing user info in cookies\r\n            const timeUntillCookieExpiresInSeconds = 1 * (60 * 60); // Set to expire in 1 hr\r\n            _cookie_js__WEBPACK_IMPORTED_MODULE_0__.setCookie(\"username\", `${data.username}`, { \"max-age\": timeUntillCookieExpiresInSeconds });\r\n            _cookie_js__WEBPACK_IMPORTED_MODULE_0__.setCookie(\"email\", `${data.email}`, { \"max-age\": timeUntillCookieExpiresInSeconds });\r\n            _cookie_js__WEBPACK_IMPORTED_MODULE_0__.setCookie(\"token\", `${data.token}`, { \"max-age\": timeUntillCookieExpiresInSeconds });\r\n            if (!data.error) {\r\n                window.location.href = \"../html/home.html\";\r\n            }\r\n        });\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/login.js");
/******/ 	
/******/ })()
;