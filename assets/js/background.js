chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getTabUrl') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tabUrl: tabs[0].url });
    });
    return true;
  }
});

// chrome.action.onClicked.addListener(function (tab) {

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       sendResponse({ tabUrl: tabs[0].url });
//       chrome.tabs.sendMessage(tab.id, {action: 'selectElement'});
//       chrome.tabs.executeScript(tab.id, { file: "content.js" }).then(() => {
//         console.log('content.js loaded successfully');
//       }).catch((err) => {
//         console.error('Failed to load content.js:', err);
//       });
//     });
 

// });
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'selectElement' });
  });
});


