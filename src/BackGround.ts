chrome.runtime.onStartup.addListener(function() {
    console.log("start");
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return { cancel: true }; },
    { urls: ["https://cdn.consentmanager.mgr.consensu.org/*"] },
    ["blocking"]
);