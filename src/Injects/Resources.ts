interface TsResources{
    ding_sound: string;
    test: string;
    svg_forum:string;
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
};