$(document).ready(function () {
    window.Instance = new CurrentInstance();
    
    let currentVillage = VillageData.Load(window.Instance.villageId);
    currentVillage.Read();
    currentVillage.Save();
    

    StatisticsReader();
    StatisticsRender();
    //global
    //InitSidebarBoxActiveVillage();
    //InitSidebarBoxLinklist();

    //TsTimerElement.Start();
});