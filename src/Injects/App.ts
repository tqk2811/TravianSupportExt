$(function () {
    window.Instance = new CurrentInstance();
    
    let currentVillage = VillageData.Load(window.Instance.villageId);
    currentVillage.Read();
    currentVillage.Save();    
    Statistics.Reader();




    
    Statistics.Render();
    Dorf.Render();

    //global
    Global.InitSidebarBoxActiveVillage();
    Global.InitSidebarBoxLinklist();
    Global.InitSidebarBoxVillagelist();
    
    TsTimerElement.Start();
});