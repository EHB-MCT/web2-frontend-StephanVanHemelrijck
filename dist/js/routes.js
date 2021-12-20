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

/***/ "./src/header-dropdown.js":
/*!********************************!*\
  !*** ./src/header-dropdown.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init),\n/* harmony export */   \"toggleDropdown\": () => (/* binding */ toggleDropdown),\n/* harmony export */   \"logOut\": () => (/* binding */ logOut),\n/* harmony export */   \"deleteUser\": () => (/* binding */ deleteUser)\n/* harmony export */ });\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"./src/cookie.js\");\n\r\n\r\nfunction init() {\r\n    // Nav dropdown button\r\n    document.getElementById(\"username-nav\").addEventListener(\"click\", (e) => {\r\n        toggleDropdown();\r\n    });\r\n    // New Route\r\n    document.getElementById(\"new-route\").addEventListener(\"click\", (e) => {\r\n        console.log(\"click\");\r\n        window.location.href = window.location.origin + \"/dist/html/home.html\";\r\n    });\r\n    // Routes\r\n    document.getElementById(\"routes\").addEventListener(\"click\", (e) => {\r\n        window.location.href = window.location.origin + \"/dist/html/routes.html\";\r\n    });\r\n    // My Routes\r\n    document.getElementById(\"my-routes\").addEventListener(\"click\", (e) => {\r\n        window.location.href = window.location.origin + \"/dist/html/my-routes.html\";\r\n    });\r\n    // Favorite Routes\r\n    document.getElementById(\"fav-routes\").addEventListener(\"click\", (e) => {\r\n        window.location.href = window.location.origin + \"/dist/html/fav-routes.html\";\r\n    });\r\n    // Delete User\r\n    document.getElementById(\"delete\").addEventListener(\"click\", (e) => {\r\n        deleteUser();\r\n    });\r\n    // Log Out\r\n    document.getElementById(\"logout\").addEventListener(\"click\", (e) => {\r\n        logOut();\r\n    });\r\n}\r\n\r\n/* When the user clicks on the button,\r\ntoggle between hiding and showing the dropdown content */\r\nfunction toggleDropdown() {\r\n    document.getElementById(\"myDropdown\").classList.toggle(\"show\");\r\n}\r\n\r\nfunction logOut() {\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"token\");\r\n    window.location.href = \"../html/index.html\";\r\n}\r\n\r\nasync function deleteUser() {\r\n    console.log(document.cookie);\r\n    const email = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.getCookie(\"email\");\r\n    console.log(email);\r\n    //web2-routexploreapi.herokuapp.com/users/delete\r\n    await fetch(\"https://web2-routexploreapi.herokuapp.com/users/:email\" + \"?email=\" + `${email}`, {\r\n        method: \"DELETE\",\r\n    });\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"username\");\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"email\");\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"token\");\r\n    window.location.href = \"../html/index.html\";\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/header-dropdown.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"./src/cookie.js\");\n/* harmony import */ var _header_dropdown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-dropdown.js */ \"./src/header-dropdown.js\");\n\r\n\r\n\r\nwindow.onload = function () {\r\n    _header_dropdown_js__WEBPACK_IMPORTED_MODULE_1__.init();\r\n    personalizeHTML();\r\n    printRoutes();\r\n};\r\n\r\nfunction personalizeHTML() {\r\n    let user = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.getCookie(\"username\");\r\n    // Capitalize username\r\n    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);\r\n    // Insert name into nav\r\n    document.getElementById(\"username-nav\").innerHTML = userCapitalCase;\r\n}\r\n\r\nasync function printRoutes() {\r\n    await fetch(\"https://web2-routexploreapi.herokuapp.com/routes\", {\r\n        method: \"GET\",\r\n    })\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            console.log(data);\r\n            let htmlString = ``;\r\n            data.forEach((element) => {\r\n                htmlString += ` <div id=\"container\">\r\n                <div id=\"container-img\">\r\n                <img src=\"${element.route_img_url}\" alt=\"${element.route_name}\" />\r\n                </div>\r\n                <div id=\"description\">\r\n                <div id=\"names\">\r\n                <p id=\"routename\"><span>Route:</span> ${element.route_name}</p>\r\n                <p id=\"creatorname\"><span>Created by:</span> ${element.created_by}</p>\r\n                </div>\r\n                <p id=\"startpoint\"><span>Startpoint:</span> ${element.route_start_location.city}, ${element.route_start_location.state}, ${element.route_start_location.country}</p>\r\n                </div>\r\n                </div>`;\r\n            });\r\n            document.getElementById(\"big-container\").insertAdjacentHTML(\"beforeend\", htmlString);\r\n        });\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/routes.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/routes.js");
/******/ 	
/******/ })()
;