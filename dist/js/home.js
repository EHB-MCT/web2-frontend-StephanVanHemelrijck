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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init),\n/* harmony export */   \"toggleDropdown\": () => (/* binding */ toggleDropdown),\n/* harmony export */   \"logOut\": () => (/* binding */ logOut),\n/* harmony export */   \"deleteUser\": () => (/* binding */ deleteUser)\n/* harmony export */ });\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"./src/cookie.js\");\n\r\n\r\n/* When the user clicks on the button,\r\ntoggle between hiding and showing the dropdown content */\r\nfunction init() {\r\n    // Nav dropdown button\r\n    document.getElementById(\"username-nav\").addEventListener(\"click\", (e) => {\r\n        toggleDropdown();\r\n    });\r\n    // Log Out\r\n    document.getElementById(\"logout\").addEventListener(\"click\", (e) => {\r\n        logOut();\r\n    });\r\n    // Delete User\r\n    document.getElementById(\"delete\").addEventListener(\"click\", (e) => {\r\n        deleteUser();\r\n    });\r\n}\r\n\r\nfunction toggleDropdown() {\r\n    document.getElementById(\"myDropdown\").classList.toggle(\"show\");\r\n}\r\n\r\nfunction logOut() {\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"token\");\r\n    window.location.href = \"../html/index.html\";\r\n}\r\n\r\nasync function deleteUser() {\r\n    console.log(document.cookie);\r\n    const email = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.getCookie(\"email\");\r\n    console.log(email);\r\n    //web2-routexploreapi.herokuapp.com/users/delete\r\n    await fetch(\"https://web2-routexploreapi.herokuapp.com/users/:email\" + \"?email=\" + `${email}`, {\r\n        method: \"DELETE\",\r\n    });\r\n    console.log(document.cookie);\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"username\");\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"email\");\r\n    _cookie_js__WEBPACK_IMPORTED_MODULE_0__.deleteCookie(\"token\");\r\n    window.location.href = \"../html/index.html\";\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/header-dropdown.js?");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"./src/cookie.js\");\n/* harmony import */ var _header_dropdown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-dropdown.js */ \"./src/header-dropdown.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ \"./src/map.js\");\n\r\n\r\n\r\n\r\nwindow.onload = function () {\r\n    if (!document.cookie) {\r\n        alert(\"User not logged in, redirecting...\");\r\n        window.location.href = \"../html/index.html\";\r\n    }\r\n    _header_dropdown_js__WEBPACK_IMPORTED_MODULE_1__.init();\r\n    personalizeHTML();\r\n    // Map interaction\r\n    const map = _map_js__WEBPACK_IMPORTED_MODULE_2__.initMap();\r\n    const layergroup = L.layerGroup().addTo(map);\r\n    let markerCount = 0;\r\n    map.addEventListener(\"click\", async (event) => {\r\n        layergroup.clearLayers();\r\n        // Add marker\r\n        const marker = await L.marker([event.latlng[\"lat\"], event.latlng[\"lng\"]], { draggable: true, riseOnHover: true }).addTo(map);\r\n        _map_js__WEBPACK_IMPORTED_MODULE_2__.addToRoute(marker);\r\n        markerCount += 1;\r\n        console.log(markerCount);\r\n        // Need to have 2 markers before executing get request\r\n        if (markerCount < 2) {\r\n            return;\r\n        }\r\n        // Create route\r\n        const route = await _map_js__WEBPACK_IMPORTED_MODULE_2__.createRoute();\r\n        const drawRoute = await _map_js__WEBPACK_IMPORTED_MODULE_2__.drawRoute(route);\r\n        // Creating a layergroup for polyline\r\n        const polyline = await L.polyline(drawRoute, { color: \"#FC5200\", weight: 2, lineJoin: \"round\" });\r\n        layergroup.addLayer(polyline);\r\n        // polylines_layergroup.clearLayers();\r\n        // Delete marker and it's corresponding polyline\r\n        marker.on(\"click\", (e) => {\r\n            map.removeLayer(e.target);\r\n            _map_js__WEBPACK_IMPORTED_MODULE_2__.deleteFromRoute(e.target);\r\n            // console.log(polyline_layergroup);\r\n            map.removeLayer(polyline);\r\n            markerCount -= 1;\r\n        });\r\n        marker.on(\"drag\", (e) => {\r\n            console.log(\"Drag\");\r\n        });\r\n    });\r\n};\r\n\r\nfunction drawPolylines() {}\r\n\r\nfunction personalizeHTML() {\r\n    let user = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.getCookie(\"username\");\r\n    // Capitalize username\r\n    let userCapitalCase = user.charAt(0).toUpperCase() + user.slice(1);\r\n\r\n    // Welcome message\r\n    document.getElementById(\"welcome\").innerHTML += \" \" + userCapitalCase + \"!\";\r\n    // Nav\r\n    document.getElementById(\"username-nav\").innerHTML = userCapitalCase;\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/home.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initMap\": () => (/* binding */ initMap),\n/* harmony export */   \"getLocation\": () => (/* binding */ getLocation),\n/* harmony export */   \"addToRoute\": () => (/* binding */ addToRoute),\n/* harmony export */   \"deleteFromRoute\": () => (/* binding */ deleteFromRoute),\n/* harmony export */   \"createRoute\": () => (/* binding */ createRoute),\n/* harmony export */   \"drawRoute\": () => (/* binding */ drawRoute),\n/* harmony export */   \"convertMarkersIntoList\": () => (/* binding */ convertMarkersIntoList)\n/* harmony export */ });\n// MAPBOX API KEY\r\nconst mapbox_api_key = \"pk.eyJ1Ijoic3VlemhvbyIsImEiOiJja3hjMGUybm4wZGc3MnVtbThhazd2ZWk0In0.vZFkONLp_lXJZK15bC0xCg\";\r\n\r\n// GRAPHHOPPER API KEY\r\nconst graphhopper_api_key = \"0e189b71-b607-4cb2-97b4-5678175d8fc6\";\r\n\r\nfunction initMap() {\r\n    // Hardcoded center latlong of Belgium\r\n    const map = L.map(\"map\").setView([50.597001818485246, 4.86618856002286], 7);\r\n\r\n    L.tileLayer(\"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=\" + mapbox_api_key, {\r\n        attribution:\r\n            'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n        maxZoom: 18,\r\n        id: \"mapbox/streets-v11\",\r\n        tileSize: 512,\r\n        zoomOffset: -1,\r\n        accessToken: mapbox_api_key,\r\n        interactive: true,\r\n    }).addTo(map);\r\n\r\n    document.getElementById(\"map\").append(map);\r\n    return map;\r\n}\r\n\r\nasync function getLocation(latlng) {\r\n    const lat = latlng[\"lat\"];\r\n    const lng = latlng[\"lng\"];\r\n    let location = {};\r\n    await fetch(\"https://graphhopper.com/api/1/geocode?key=\" + graphhopper_api_key + \"&reverse=true&point=\" + lat + \",\" + lng + \"&debug=true&\")\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            const city = data.hits[0].city;\r\n            const street = data.hits[0].name;\r\n            location = JSON.stringify({ city: city, street: street });\r\n        })\r\n        .catch((err) => {\r\n            console.log(\"You didn't click on a piece of land...\");\r\n        });\r\n    return location;\r\n}\r\n\r\nlet markers = [];\r\nasync function addToRoute(marker) {\r\n    markers.push(marker);\r\n}\r\n\r\nasync function deleteFromRoute(marker) {\r\n    let filteredMarkers = [];\r\n    for (let i = 0; i < markers.length; i++) {\r\n        if (marker._leaflet_id != markers[i]._leaflet_id) {\r\n            filteredMarkers.push(markers[i]);\r\n        }\r\n    }\r\n    markers = filteredMarkers;\r\n    console.log(\"filtered\", filteredMarkers);\r\n}\r\n\r\nasync function createRoute() {\r\n    let urlifiedMarkersList = \"\";\r\n    let i = 0;\r\n    do {\r\n        urlifiedMarkersList += \"&point=\" + markers[i]._latlng.lat + \",\" + markers[i]._latlng.lng;\r\n        i++;\r\n    } while (i < markers.length);\r\n\r\n    let x;\r\n    await fetch(\"https://graphhopper.com/api/1/route?key=0e189b71-b607-4cb2-97b4-5678175d8fc6&profile=bike&points_encoded=false\" + urlifiedMarkersList)\r\n        .then((res) => res.json())\r\n        .then((data) => {\r\n            x = data;\r\n        });\r\n    return x;\r\n}\r\n\r\nfunction drawRoute(data) {\r\n    let coordinates = data.paths[0].points.coordinates;\r\n    let coordinatesReversed = [];\r\n    for (let i = 0; i < coordinates.length; i++) {\r\n        coordinatesReversed.push(coordinates[i].reverse());\r\n    }\r\n    return coordinatesReversed;\r\n}\r\n\r\nasync function convertMarkersIntoList() {\r\n    let markersList = \"\";\r\n    let i = 0;\r\n    do {\r\n        markersList += \"[\" + markers[i]._latlng.lat + \",\" + markers[i]._latlng.lng + \"]\" + \",\";\r\n        i++;\r\n    } while (i < markers.length);\r\n    return markersList.slice(0, -1);\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-stephanvanhemelrijck/./src/map.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/home.js");
/******/ 	
/******/ })()
;