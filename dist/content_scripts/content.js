/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./assets/js/content_scripts/content.js ***!
  \**********************************************/
// content.js
console.log("Hello content");
var selectedElement;
function selectElement(event) {
  event.preventDefault();
  event.stopPropagation();
  if (selectedElement) {
    selectedElement.style.border = 'none';
  }
  selectedElement = event.target;
  selectedElement.style.border = '2px solid red';
  document.getElementById('status').innerHTML = 'Element selected: ' + selectedElement.tagName;
}
document.addEventListener('click', selectElement);

// Get the selector for an element
/******/ })()
;