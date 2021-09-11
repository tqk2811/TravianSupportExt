interface TsResources{
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
    test: TSRoot + "res/test.jpeg",
    svg_forum: TSRoot + "res/forum.svg",
};