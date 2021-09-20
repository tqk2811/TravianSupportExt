chrome.runtime.onStartup.addListener(function() {
    console.log("start");
});

chrome.browserAction.onClicked.addListener(function(tab : chrome.tabs.Tab) {
    chrome.tabs.create({url: "options.html"});
});

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
	if (message){
        if (message == "inject_resource_githubio"){
            let is_cb_inject_resource = localStorage.getItem('inject_resource_githubio');
            callback(is_cb_inject_resource == "true");
        }
    }
});