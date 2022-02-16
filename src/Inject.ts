function AddUriScript(uri: string){
    let s = document.createElement('script');
    s.setAttribute("src",uri);
    document.head.appendChild(s);
}
function AddUriCss(uri: string){
    let s = document.createElement('link');
    s.setAttribute("rel", "stylesheet");
    s.setAttribute("type", "text/css");
    s.setAttribute("href", uri);
    document.head.appendChild(s);
}
let scripts = [
    "libs/js/jquery.dataTables.min.js",
    "libs/js/rowReorder.dataTables.min.js",

    "js/Injects/Resources.js",
    "js/Injects/DataManagers/Datas.js",

    'js/Injects/DataManagers/VillageData.js',
    'js/Injects/DataManagers/AccountData.js',
    'js/Injects/DataManagers/ServerData.js',

    'js/Injects/Prototypes.js',
    'js/Injects/CurrentInstance.js',
    'js/Injects/HotKeys.js',

    'js/Injects/Elements/PopUpElement.js',
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

let path = chrome.runtime.getURL("");
localStorage.setItem("TSRoot",path);
AddUriCss(path + "libs/css/jquery.dataTables.min.css");
AddUriCss(path + "libs/css/rowReorder.dataTables.min.css");
AddUriCss(path + "css/TS.css");
for(let i = 0; i < scripts.length; i++) AddUriScript(path + scripts[i]);
