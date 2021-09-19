$(function () {
    if(!window.Travian) return;
    window.Instance = new CurrentInstance();
    
    let currentVillage = VillageData.Load(window.Instance.villageId);
    currentVillage.Read();
    currentVillage.Save();    
    Village.Reader();


    Village.Render();
    Dorf.Render();
    Build.Render();
    Alliance.Render();
    
    //global
    Global.Init_SidebarBox_ActiveVillage();
    Global.Init_SidebarBox_Linklist();
    Global.Init_SidebarBox_Villagelist();
    Global.Init_ResourceWrapper();


    TsTimerElement.Start();
    HotKeys.Init();
});