interface TsResources{
    ding_sound: string;
    test: string;
    svg_forum:string;
    svg_close:string;
    svg_setting:string;
}
interface Window {
    TsResources: TsResources;
    Travian: any;
}

let TSRoot = localStorage.getItem('TSRoot');
window.TsResources = 
{
    ding_sound: TSRoot + "res/ding.mp3",
    test: TSRoot + "res/test.jpeg",
    svg_forum: TSRoot + "res/forum.svg",
    svg_close: TSRoot + "res/close.svg",
    svg_setting: TSRoot + "res/setting.svg"
};