/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sw */ \"./src/sw/index.js\");\n/* harmony import */ var _sw__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sw__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties */ \"./src/properties/index.js\");\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_properties__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack://pwa-real-estate-client/./src/index.js?");

/***/ }),

/***/ "./src/properties/index.js":
/*!*********************************!*\
  !*** ./src/properties/index.js ***!
  \*********************************/
/***/ (() => {

eval("(async () => {\n  const renderProperties = async () => {\n    const fetch = async () => {\n      const { data: properties } = await axios.get(\n        \"https://lab-pwa-real-estate.herokuapp.com/properties\"\n      );\n\n      return properties;\n    };\n\n    const buildRow = () => {\n      const $root = document.createElement(\"div\");\n      $root.classList.add(\"row\");\n\n      return $root;\n    };\n\n    const buildCard = ({ name }) => {\n      const $root = document.createElement(\"div\");\n      $root.classList.add(\"col\", \"s12\", \"m6\", \"l4\");\n\n      const $card = document.createElement(\"div\");\n      $card.classList.add(\"card\", \"blue-grey\", \"darken-1\");\n\n      const $header = document.createElement(\"div\");\n      $header.classList.add(\"card-content\", \"white-text\");\n\n      const $name = document.createElement(\"span\");\n      $name.classList.add(\"card-title\");\n\n      const $nameText = document.createTextNode(name);\n\n      $name.append($nameText);\n      $header.append($name);\n      $card.append($header);\n      $root.append($card);\n\n      return $root;\n    };\n\n    const properties = await fetch();\n\n    const $propertiesContainer = document.querySelector(\"#properties\");\n    const $wrapper = buildRow();\n\n    properties.forEach((property) => {\n      const $card = buildCard(property);\n      $wrapper.append($card);\n    });\n\n    $propertiesContainer.append($wrapper);\n  };\n\n  const renderConnectionMessage = async () => {\n    const hasConnection = window.navigator.onLine;\n\n    if (!hasConnection) {\n      const $wrapper = document.createElement(\"div\");\n      $wrapper.classList.add(\"alert__no-connection\");\n\n      const $text = document.createTextNode(\n        \"You have no internet connection. The data you see may be outdated. Please connect to a network to see the most recent data.\"\n      );\n\n      $wrapper.appendChild($text);\n      document.querySelector(\"#alerts\").appendChild($wrapper);\n    }\n  };\n\n  await renderProperties();\n  renderConnectionMessage();\n})();\n\n\n//# sourceURL=webpack://pwa-real-estate-client/./src/properties/index.js?");

/***/ }),

/***/ "./src/sw/index.js":
/*!*************************!*\
  !*** ./src/sw/index.js ***!
  \*************************/
/***/ (() => {

eval("/**\n * Service Worker.\n */\nwindow.addEventListener(\"load\", async () => {\n  if (\"serviceWorker\" in navigator) {\n    try {\n      const sw = await navigator.serviceWorker.register(\"../sw.js\");\n      console.log(\"Service worker registered! 😎\", sw);\n    } catch (err) {\n      console.log(\"😥 Service worker registration failed: \", err);\n    }\n  }\n});\n\n\n//# sourceURL=webpack://pwa-real-estate-client/./src/sw/index.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;