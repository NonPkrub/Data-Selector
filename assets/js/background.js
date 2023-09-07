chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tabUrl: tabs[0].url });
    });
    return true;
  }
});
// Use a regular function to access the correct context
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "updateInputValue") {
    const inputId = storedData.inputList.findIndex((input) => !input.disabled);
    if (inputId >= 0) {
      storedData.inputList[inputId].value = message.value;
      storedData.inputList[inputId].disabled = true;
      // Save the updated data
      chrome.storage.local.set({ inputList: storedData.inputList });
    }
  }
});

// Or, explicitly bind the function to the Vue instance// Initialize stored data
let storedData = {};

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveData") {
    storedData = message.data;
    chrome.storage.local.set(storedData);
  } else if (message.action === "clearData") {
    storedData = {};
    chrome.storage.local.clear();
  }
});

// let storedData = {};

// // Message listener
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "saveData") {
//     storedData = message.data;
//     chrome.storage.local.set(storedData);
//   } else if (message.action === "clearData") {
//     storedData = {};
//     chrome.storage.local.clear();
//   }
// });
// chrome.action.onClicked.addListener(function (tab) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

//     chrome.tabs.executeScript(tab.id, { file: "content_scripts/content.js" }, () => {
//       chrome.tabs.sendMessage(tab.id, { type: "startContentScript" });
//     });

//   });
// });

// chrome.action.onClicked.addListener(function (tab) {
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   chrome.tabs.executeScript(tabs[0].id, { file: "dist/content_scripts/content.js" }, () => {
//       // Script loaded successfully
//       chrome.tabs.sendMessage(tabs[0].id, { type: "startContentScript" });
//   });
// });
// });
