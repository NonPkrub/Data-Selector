chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getTabUrl') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tabUrl: tabs[0].url });
    });
    return true;
  }
});

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