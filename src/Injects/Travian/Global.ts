class Global{
    public static InitSidebarBoxActiveVillage() : void{
        if(!window.Instance.isPlus){
            let workshop = $("a.layoutButton.workshop.gold");
            if(!workshop.hasClass("disable")){
                workshop.removeClass("gold");
                workshop.addClass("green");
                workshop.off("click");
                workshop.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Workshop });
            }

            let stable = $("a.layoutButton.stable.gold");
            if(!stable.hasClass("disable")){
                stable.removeClass("gold");
                stable.addClass("green");
                stable.off("click");
                stable.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Stable });
            }

            let barracks = $("a.layoutButton.barracks.gold");
            if(!barracks.hasClass("disable")){
                barracks.removeClass("gold");
                barracks.addClass("green");
                barracks.off("click");
                barracks.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Barracks });
            }

            let market = $("a.layoutButton.market.gold");
            if(!market.hasClass("disable")){
                market.removeClass("gold");
                market.addClass("green");
                market.off("click");
                market.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Marketplace });
            }
        }
    }

    public static InitSidebarBoxLinklist():void{
        $("#sidebarBoxLinklist").each(function(){
            // window.Instance.Account.LinkedList.forEach(element => {
                
            // });
        });
    }

    public static InitSidebarBoxVillagelist() : void {
        Global.SidebarBox_RenderCulture();



    }
    private static SidebarBox_RenderCulture (): void{
        let slots = $(".expansionSlotInfo .boxTitle .slots").text().getASCII().match(/\d+\/\d+$/);
        let e_expansionSlotInfo = $(".expansionSlotInfo").get()[0];
        if(e_expansionSlotInfo._travianTooltip)
        {
            let tooltip_text = $(".expansionSlotInfo").get()[0]._travianTooltip.text.getASCII().match(/\d+\/\d+$/);
            $(".expansionSlotInfo .boxTitle").html(slots + " (" + tooltip_text + ")").css("font-size", "small").css("width", "75%");
            let village = VillageData.GetCurrent();
            if(village.Celebration && village.Celebration > 0)
            {
                let timer = new TsTimerElement();
                timer.NavigateUrl = "/build.php?gid=24";
                timer.IsSound = false;
                timer.EndIime = village.Celebration;
                timer.setAttribute("style","float:right;padding-right: 8px;width:25%;text-align: right;");
                timer.Init();
                $(".expansionSlotInfo .boxTitle").get()[0].insertAdjacentElement("beforebegin",timer);
            }
        }
        else 
        {
            console.log("SidebarBox_RenderCulture: _travianTooltip not found");
            window.setTimeout(Global.SidebarBox_RenderCulture, 1000);//wait render
        }
    }
    private static SidebarBoxShow_Build(): void{

    }
    private static SidebarBoxShow_TroopTrain(): void{

    }
    private static SidebarBoxShow_Celebration(): void{

    }
    private static SidebarBoxShow_Resource(): void{

    }
    private static SidebarBoxShow_AttackRed(): void{

    }
}