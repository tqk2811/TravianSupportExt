class Global{
    public static Init_SidebarBox_ActiveVillage() : void{
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

        $("#sidebarBoxActiveVillage .content .loyalty").each(function(){
            let select = document.createElement("select");
            for(let key in VillageAdvanced){
                if (isNaN(Number(key))) {
                    let option = document.createElement("option");
                    option.value = VillageAdvanced[key];
                    option.innerText = key;
                    select.appendChild(option);
                }
            }
            select.value = AccountData.GetCurrent().VillageAdvanced.toString();
            let select_onchange = function(){
                let account = AccountData.GetCurrent();
                account.VillageAdvanced = Number(select.value);
                account.Save();
                $("ts-village-row-adv").each(function(){ this.remove();});
                Global.Villagelist_RenderVillageRowAdv(account);
            }
            select.onchange = select_onchange;
            $(this).get()[0].insertAdjacentElement("afterbegin",select);
            HotKeys.Push(81,function(){
                let val_str =  VillageAdvanced[Number(select.value) + 1];
                let val = VillageAdvanced.None;
                if(val_str) val = Number(select.value) + 1;
                select.value = val.toString();
                select_onchange();
            });


            let img_setting = document.createElement("img");
            img_setting.src = window.TsResources.svg_setting;
            img_setting.className = "tjs-svg";
            img_setting.onclick = function(){
                let j_popup = $("pop-up#ts-setting");
                if(j_popup.length == 0) Global.GeneratePopUpSetting();
            };
            $(this).get()[0].insertAdjacentElement("afterbegin",img_setting);
        });
    }

    public static Init_SidebarBox_Linklist():void{
        $("#sidebarBoxLinklist .header .buttonsWrapper").each(function(){
            let a = document.createElement("a");
            a.className = "layoutButton buttonFramed withIcon round forum green";
            a.href = "#";
            a.onclick = function(){};

            let img = document.createElement("img");
            img.src = window.TsResources.svg_forum;
            
            a.onclick = function(){
                let j_popup = $("pop-up#ts-linked-list");
                if(j_popup.length == 0) Global.GeneratePopUpLinkedList();
            };
            a.appendChild(img);
            this.appendChild(a);
        });

        $("#sidebarBoxLinklist .content").each(function(){
            let account = AccountData.GetCurrent();
            if( account.LinkedList && account.LinkedList.length > 0)
            {
                let linklistNotice = $(this).find(".linklistNotice");
                if(linklistNotice.length != 0)
                {
                    $(this).find(".linklistNotice").first().remove();
                    let ul_linkerlist = document.createElement("ul");
                    this.appendChild(ul_linkerlist);
                }
                let ul = $(this).find("ul");

                account.LinkedList.forEach(element => {
                    let li = document.createElement("li");
                    let aTag = document.createElement('a');
                    let span = document.createElement("span");
                    aTag.href = element.Url;
                    if(element.openNewTab) aTag.target = "_blank";
                    span.className = "name";
                    span.innerText = element.Name;                    
                    aTag.appendChild(span);
                    li.appendChild(aTag);
                    ul.append(li);
                });
            }


            let cb_data : boolean = account.CheckboxData["sidebarBoxLinklist_bringToTop"];
            if(cb_data == null) cb_data = false;
            if(cb_data) $("#sidebarBoxLinklist").get()[0]?.MoveElementUp(5);//move to top
	            else $("#sidebarBoxLinklist").get()[0]?.MoveElementDown(5);// back to bot

            let checkbox_linkerlisttop = new SaveCheckBoxElement(cb_data, "Bring to top", function(state:boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData["sidebarBoxLinklist_bringToTop"] = state;
                account.Save();

                if(state) $("#sidebarBoxLinklist").get()[0]?.MoveElementUp(5);//move to top
	            else $("#sidebarBoxLinklist").get()[0]?.MoveElementDown(5);// back to bot
            });
            this.appendChild(checkbox_linkerlisttop);
        });
    }

    private static GeneratePopUpLinkedList(){
        let popup = new PopUpElement("ts-linked-list");

        let content = $(popup).find(".content");
        content.html(`<table></table>`);
        let table = content.find("table");

        let account = AccountData.GetCurrent();
        let datatable = table.DataTable({
            pagingType: "full_numbers",
            "paging": false,
            scrollY: "200px",
            columns: [
                { 
                    orderable: false,
                    searchable: false,
                    data: "Name" , 
                    title: "Name", 
                    render: function(data :string, type, row : ILinkedList, meta : DataTables.CellMetaSettings){
                        return `<input type="text" value="${data}" class="linked-list-name"></input>`; 
                    }
                },
                {
                    orderable: false,
                    searchable: false,
                    data: "Url", 
                    title: "Link", 
                    render: function(data :string, type, row : ILinkedList, meta : DataTables.CellMetaSettings){ 
                        return `<input type="text" value="${data}" class="linked-list-url"></input>`; 
                    } 
                },
                {
                    orderable: false,
                    searchable: false,
                    data: "openNewTab", 
                    title: "Open New Tab", 
                    width: "90px",
                    render: function(data :boolean, type, row : ILinkedList, meta : DataTables.CellMetaSettings){ 
                        return `
                        <input type="checkbox" ${data ? "checked" : "" } class="linked-list-openNewTab"></input>
                        <button class="textButtonV1 tjs-btn-delete" version="textButtonV1" ts-action="delete">Delete</button>
                        `; 
                    } 
                },
            ],
            data: account.LinkedList,
            searching: false,
            info: false,
            rowReorder: {
                selector: "tr",
                enable: true,
                dataSrc: "Name"
            }
        });
        
        let footer = $(popup).find(".footer").html(`
        <button class="textButtonV1 green" version="textButtonV1" ts-action="save">Save</button>
        <button class="textButtonV1 green" version="textButtonV1" ts-action="add">Add</button>
        `);
        
        datatable.on("row-reorder",function(e : Event,diff : any, edit : any){
            for(let i = 0, ien = diff.length; i < ien; i++){
                // get id row
                let idQ = diff[i].node.id;
                let idNewQ = idQ.replace("row_", "");
                // get position
                let position = diff[i].newPosition + 1;
                //call funnction to update data
                //updateOrder(idNewQ, position);
            }
        });
        table.on("change", "input", function(){
            let t = $(this);
            let data = datatable.row(t.closest("tr")).data() as ILinkedList;
            if(t.hasClass("linked-list-name")) data.Name = t.val() as string;
            else if(t.hasClass("linked-list-url")) data.Url = t.val() as string;
            else if(t.hasClass("linked-list-openNewTab")) data.openNewTab = this.prop("checked");
        });
        table.on("click",'button[ts-action="delete"]', function(){
            if(confirm("Delete?"))
            {
                datatable.row($(this).closest("tr")).remove();
                datatable.draw();
            }
        });
        footer.find("button[ts-action='save']").on("click",function(){
            let linkedList : ILinkedList[] = [];
            datatable.rows().every(function(rowIdx, tableLoop, rowLoop){
                let data = this.data() as ILinkedList;
                console.log(data);
                linkedList.push({ Name: data.Name, Url: data.Url, openNewTab: data.openNewTab });
            });
            
            let account = AccountData.GetCurrent();
            account.LinkedList = linkedList;
            account.Save();
        });
        footer.find("button[ts-action='add']").on("click",function(){  
            let newData : ILinkedList = {
                Name: "New Link",
                Url: "/dorf1.php",
                openNewTab: false
            }
            datatable.row.add(newData).draw();
        });
    }

    private static GeneratePopUpSetting(){
        let popup = new PopUpElement("ts-setting");




    }
//----------------------Villagelist------------------------------------------

    public static Init_SidebarBox_Villagelist() : void {
        Global.Villagelist_RenderCulture();
        Global.Villagelist_RenderVillageRowAdv(AccountData.GetCurrent());
    }

    private static Villagelist_RenderVillageRowAdv(account : AccountData) : void{
        if(account.VillageAdvanced != VillageAdvanced.None)
        {
            $("#sidebarBoxVillagelist .villageList .listEntry").each(function(){
                let village = VillageData.Load(parseInt(this.getAttribute("data-did")));
                switch(account.VillageAdvanced)
                {
                    case VillageAdvanced.Build:
                        Global.Villagelist_Show_Build(this, village);
                        break;
                    case VillageAdvanced.TroopTrains:
                        Global.Villagelist_Show_TroopTrain(this, village);
                        break;
                    case VillageAdvanced.Celebration:
                        Global.Villagelist_Show_Celebration(this, village);
                        break;
                    case VillageAdvanced.Resource:
                        Global.Villagelist_Show_Resource(this, village);
                        break;
                    case VillageAdvanced.AttackRed:
                        Global.Villagelist_Show_AttackRed(this, village);
                        break;
                }
            });
        }
    }

    private static Villagelist_RenderCulture (): void{
        let slots = $(".expansionSlotInfo .boxTitle .slots").text().getASCII().match(/\d+\/\d+$/);
        let tooltip_text = $(".expansionSlotInfo").get()[0]._travianTooltip.text.getASCII().match(/\d+\/\d+$/);
        $(".expansionSlotInfo .boxTitle").html(slots + " (" + tooltip_text + ")");
        let village = VillageData.GetCurrent();
        if(village.CelebrationEndTime && village.CelebrationEndTime > 0)
        {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?gid=${Building.TownHall}&t=1`;
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            $(".expansionSlotInfo .boxTitle").get()[0].insertAdjacentElement("beforebegin", timer);
        }
    }

    private static _build_Color: string[] = ["Blue","BlueGray","Gray"];
    private static Villagelist_Show_Build(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        let index = 0;
        village.BuildsEndTime.forEach((val: number) => {
            if(val < Date.now() || index == 3) return;
            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = val;
            timer.Color = Global._build_Color[index++];
            timer.Init();
            elements.push(timer);
        });
        if(village.DemolishEndTime && village.DemolishEndTime > Date.now()){
            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = village.DemolishEndTime;
            timer.Color = "Red";
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.MainBuilding}`;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(4, 1fr)";
        row.appendChild(row_adv);
    }

    private static Villagelist_Show_TroopTrain(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        for(let key in village.TroopTrains){
            let val = village.TroopTrains[key];
            let building: Building = Number(key);

            if(val.IsEnable)
            {
                let timer = new TsTimerElement();
                timer.IsSound = true;
                timer.EndIime = val.EndTime;
                timer.Color = TroopTrain_Data[building].color;
                timer.AdvText = TroopTrain_Data[building].name + ":%s";
                timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${building}`;
                timer.Init();
                elements.push(timer);
            }
        }   
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(5, 1fr)";
        row.appendChild(row_adv);
    }

    private static Villagelist_Show_Celebration(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        if(village.CelebrationEndTime && village.CelebrationEndTime > 0)
        {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.TownHall}`;
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(1, 1fr)";
        row.appendChild(row_adv);
    }

    private static Villagelist_Show_Resource(row: HTMLElement, village: VillageData): void{ 
        let elements: HTMLElement[] = [];
        for(let key in village.Resources){
            let span = document.createElement("span");
            span.innerText = village.Resources[key].toLocaleString();
            span.style.textAlign = "right";
            elements.push(span);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(4, 1fr)";
        row.appendChild(row_adv);
    }

    private static Villagelist_Show_AttackRed(row: HTMLElement, village: VillageData): void{
        let elements: HTMLElement[] = [];
        if(village.AttackCount > 0)
        {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.RallyPoint}&tt=1&filter=1&subfilters=1`;
            timer.Color = "Red";
            timer.AdvText = `${village.AttackCount} in %s`;
            timer.IsSound = false;
            timer.EndIime = village.AttackFirstEndTime;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(1, 1fr)";
        row.appendChild(row_adv);
    }

//----------------------Villagelist------------------------------------------


public static Init_ResourceWrapper() : void{
    let func = function(){
        let vals = $(this).find(":is(.resource, .resources) span");
        //if(vals.length < 4) vals = $(this).find(".resources span");
        if(vals.length < 4) return;
        let total: number = 0;
        total += Number(vals[0].innerText);
        total += Number(vals[1].innerText);
        total += Number(vals[2].innerText);
        total += Number(vals[3].innerText);
        $(this)
            .addClass("tjs-resourceWrapper")
            .append(`<div class="inlineIcon resource tjs-resourceWrapper"><span class="value value">∑ = ${total}</span></div>`);
    }

    $(".resourceWrapper").each(func);
    $(document).on("DOMNodeInserted", ".tip-contents .resourceWrapper:not(.tjs-resourceWrapper)", func);
}












}