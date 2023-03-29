// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function(tab) {
//        console.log("Current URL: ", tab.url);
//     });
//  });

 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request.action === 'getTabUrl') {
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
       sendResponse({ tabUrl: tabs[0].url });
     });
     return true;
   }
 });
 