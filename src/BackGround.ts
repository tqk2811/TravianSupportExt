chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details : chrome.webRequest.WebRequestHeadersDetails) : chrome.webRequest.BlockingResponse {
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