chrome.webRequest.onBeforeRequest.addListener(
    function(details : chrome.webRequest.WebRequestBodyDetails) : chrome.webRequest.BlockingResponse {
        let resut : chrome.webRequest.BlockingResponse = {
            cancel: true,
        };
        return resut;
    },
    {
        types: ["script"],
        urls: ["*://*.consensu.org/*"]
    },
    ["blocking"]
);