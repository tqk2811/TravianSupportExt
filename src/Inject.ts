function AddUriScript(uri){
    let s = document.createElement('script');
    s.setAttribute("src",uri);
    document.head.appendChild(s);
}
let scripts = [
    'js/Injects/DataManagers/VillageData.js',
    'js/Injects/DataManagers/AccountData.js',
    'js/Injects/DataManagers/ServerData.js',

    'js/Injects/Prototypes.js',
    'js/Injects/CurrentInstance.js',
    'js/Injects/HotKeys.js',
    'js/Injects/TsTimerElement.js',

    'js/Injects/Travian/Statistics.js',
    'js/Injects/Travian/Global.js',
    'js/Injects/Travian/Dorf.js',

    'js/Injects/App.js',
];


for(let i = 0; i < scripts.length; i++){
    AddUriScript(chrome.runtime.getURL(scripts[i]));
}