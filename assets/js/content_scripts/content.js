// content.js
console.log("Hello content");
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'selectElement') {
    selectElement();
  }
});

var selectedElement;

function selectElement(event) {
  event.preventDefault();
  event.stopPropagation();
  
  if (selectedElement) {
    selectedElement.style.border = 'none';
  }
  
  selectedElement = event.target;
  selectedElement.style.border = '2px solid red';

  let clickedElementValue = "";
  if (selectedElement.id) {
    clickedElementValue = "#" + selectedElement.id;
  } else if (selectedElement.className) {
    clickedElementValue = "." + selectedElement.className.split(" ").join(".");
  }

  if (clickedElementValue) {
    chrome.runtime.sendMessage({ type: "updateInputValue", value: clickedElementValue });
  }

  console.log(clickedElementValue);
  
  document.addEventListener('mousemove', mousemoveHandler, { passive: true });
}

document.addEventListener('click', selectElement);
function mousemoveHandler(event) {
  console.clear()
  console.log(document.elementFromPoint(event.clientX, event.clientY));
}

document.addEventListener('mousemove', e => {
  console.clear()
  console.log(document.elementFromPoint(e.clientX, e.clientY));
}, { passive: true });


