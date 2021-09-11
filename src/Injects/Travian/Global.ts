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
        $("#sidebarBoxLinklist .header .buttonsWrapper").each(function(){
            let a = document.createElement("a");
            a.className = "layoutButton buttonFramed withIcon round forum green";
            a.href = "#";
            a.onclick = function(){};

            let img = document.createElement("img");
            img.src = window.TsResources.svg_forum;
            
            a.appendChild(img);
            this.appendChild(a);
        });

        $("#sidebarBoxLinklist .content").each(function(){
            let account = AccountData.GetCurrent();
            if( account.LinkedList && 
                account.LinkedList.length > 0 && 
                $("#sidebarBoxLinklist .content .linklistNotice").length > 0)
            {
                $(this).find(".linklistNotice").first().remove();
                let ul_linkerlist = document.createElement("ul");
                this.appendChild(ul_linkerlist);
                account.LinkedList.forEach(element => {
                    let li = document.createElement("li");
                    let aTag = document.createElement('a');
                    aTag.href = element.Url;
                    aTag.innerText = element.Name;
                    li.appendChild(aTag);
                    ul_linkerlist.appendChild(li);
                });
            }
            
            let checkbox_linkerlisttop = new SaveCheckBoxElement("sidebarBoxLinklist_bringToTop", function(state:boolean){
                if(state) $("#sidebarBoxLinklist").get()[0]?.MoveElementUp(5);//move to top
	            else $("#sidebarBoxLinklist").get()[0]?.MoveElementDown(5);// back to bot
            });
            let label_checkbox_linkerlisttop = document.createElement("label");
            label_checkbox_linkerlisttop.innerText = "Bring to top";
            this.appendChild(checkbox_linkerlisttop);
            this.appendChild(label_checkbox_linkerlisttop);
        });
    }

    public static InitSidebarBoxVillagelist() : void {
        Global.SidebarBox_RenderCulture();
        
        let account = AccountData.GetCurrent();
        $("#sidebarBoxVillagelist .villageList .listEntry").each(function(){
            let village = VillageData.Load(parseInt(this.getAttribute("data-did")));
            switch(account.VillageAdvanced)
            {
                case VillageAdvanced.Build:
                    Global.SidebarBoxShow_Build(this, village);
                    break;
                case VillageAdvanced.TroopTrains:
                    Global.SidebarBoxShow_TroopTrain(this, village);
                    break;
                case VillageAdvanced.Celebration:
                    Global.SidebarBoxShow_Celebration(this, village);
                    break;
                case VillageAdvanced.Resource:
                    Global.SidebarBoxShow_Resource(this, village);
                    break;
                case VillageAdvanced.AttackRed:
                    Global.SidebarBoxShow_AttackRed(this, village);
                    break;
            }
        });
    }
    private static SidebarBox_RenderCulture (): void{
        let slots = $(".expansionSlotInfo .boxTitle .slots").text().getASCII().match(/\d+\/\d+$/);
        let tooltip_text = $(".expansionSlotInfo").get()[0]._travianTooltip.text.getASCII().match(/\d+\/\d+$/);
        $(".expansionSlotInfo .boxTitle").html(slots + " (" + tooltip_text + ")");
        let village = VillageData.GetCurrent();
        if(village.CelebrationEndTime && village.CelebrationEndTime > 0)
        {
            let timer = new TsTimerElement();
            timer.NavigateUrl = "/build.php?gid=24";
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            $(".expansionSlotInfo .boxTitle").get()[0].insertAdjacentElement("beforebegin", timer);
        }
    }
    private static _build_Color: string[] = ["Blue","BlueGray","Gray"];
    private static SidebarBoxShow_Build(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        village.BuildsEndTime.forEach((val: number, index: number) => {
            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = val;
            timer.Color = Global._build_Color[index];
            timer.Init();
            elements.push(timer);
        });
        row.appendChild(new VillageRowAdv(elements));
    }


    private static _TroopTrain_Data: {[key in TroopBuilding]: { color:string, name:string }} = 
    {
        [Building.Barracks]: { color: "#0069FF", name: "b" },
        [Building.GreatBarracks]: { color: "#78A5D3", name: "B" },
        [Building.Stable]: { color: "#7700F6", name: "s" },
        [Building.GreatStable]: { color: "#C574F3", name: "S" },
        [Building.Workshop]: { color: "#C84545", name: "w" },
    };
    private static SidebarBoxShow_TroopTrain(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        for(let key in village.TroopTrains){
            let val = village.TroopTrains[key];
            let building: Building = Number(key);

            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = val.EndTime;
            timer.Color = Global._TroopTrain_Data[building].color;
            timer.AdvText = Global._TroopTrain_Data[building].name + ":%s";
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${building}`;
            timer.Init();
            elements.push(timer);
        }   
        row.appendChild(new VillageRowAdv(elements));
    }
    private static SidebarBoxShow_Celebration(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        if(village.CelebrationEndTime && village.CelebrationEndTime > 0)
        {
            let timer = new TsTimerElement();
            timer.NavigateUrl = "/build.php?gid=24";
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            elements.push(timer);
        }
        row.appendChild(new VillageRowAdv(elements));
    }
    private static SidebarBoxShow_Resource(row: HTMLElement, village: VillageData): void{ 
        let elements: HTMLElement[] = [];
        
        
        row.appendChild(new VillageRowAdv(elements));
    }
    private static SidebarBoxShow_AttackRed(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        
        
        row.appendChild(new VillageRowAdv(elements));
    }
}