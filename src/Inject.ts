function AddUriScript(uri: string){
    let s = document.createElement('script');
    s.setAttribute("src",uri);
    document.head.appendChild(s);
}

localStorage.setItem("TSRoot",chrome.runtime.getURL(""));
let scripts = [
    "js/Injects/Resources.js",
    
    'js/Injects/DataManagers/VillageData.js',
    'js/Injects/DataManagers/AccountData.js',
    'js/Injects/DataManagers/ServerData.js',

    'js/Injects/Prototypes.js',
    'js/Injects/CurrentInstance.js',
    'js/Injects/HotKeys.js',

    'js/Injects/Elements/SaveCheckBoxElement.js',
    'js/Injects/Elements/TsTimerElement.js',
    'js/Injects/Elements/VillageRowAdvElement.js',

    'js/Injects/Travian/Village.js',
    'js/Injects/Travian/Global.js',
    'js/Injects/Travian/Dorf.js',
    'js/Injects/Travian/Build.js',
    'js/Injects/Travian/Alliance.js',

    'js/Injects/App.js',
];
for(let i = 0; i < scripts.length; i++){
    AddUriScript(chrome.runtime.getURL(scripts[i]));
}
