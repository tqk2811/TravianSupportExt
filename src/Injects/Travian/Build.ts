class Build{
    public static Render():void{
        if(window.Instance.Gid){
            switch(window.Instance.Gid)
            {
                case Building.Barracks:
                case Building.Stable:
                case Building.GreatBarracks:
                case Building.GreatStable:
                case Building.Workshop:
                case Building.Hospital:
                case Building.Smithy:{
                    Build.TrainTimer();
                    break;
                }

                case Building.Marketplace:{
                    Build.Marketplace();
                    break;
                }
            }
        }                
    }


//---------------------------troop training---------------------------------
    private static TrainTimer() :void{
        $("#build_value tbody").each(function(){
            let village = VillageData.GetCurrent();
            let state : boolean = village.TroopTrains[window.Instance.Gid]?.IsEnable;
            if(state == null) state = false;

            let tr_cb = document.createElement("tr");
            let th_cb = document.createElement("th");
            let cb = new SaveCheckBoxElement(state, "Show", function(state:boolean){
                let village = VillageData.GetCurrent();

                if (!village.TroopTrains[window.Instance.Gid]) 
                    village.TroopTrains[window.Instance.Gid] = new TroopTrain();

                village.TroopTrains[window.Instance.Gid].IsEnable = state;
                village.Save();
            });
            th_cb.appendChild(cb);
            tr_cb.appendChild(th_cb);


            let tr_shortcut = document.createElement("tr");
            let th_shortcut = document.createElement("th");
            th_shortcut.className = "tjs-fast-click";
            let account = AccountData.GetCurrent();
            if(account.CheckboxData["cb_fastclick"] == undefined) account.CheckboxData["cb_fastclick"] = false;
            let cb_fastclick = new SaveCheckBoxElement(account.CheckboxData["cb_fastclick"], "Fast click", function(state:boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData["cb_fastclick"] = state;
                account.Save();
            });
            th_shortcut.appendChild(cb_fastclick);

            $(".build form .unit").each(function(){
                let current = $(this);
                let img = document.createElement("img");
                img.className = this.className;
                img.onclick = function(){
                    current.closest(".details").find(".cta a").trigger("click");
                    let account = AccountData.GetCurrent();
                    if(account.CheckboxData["cb_fastclick"]) $("form button.startTraining").trigger("click");
                };
                th_shortcut.appendChild(img);
            });

            tr_shortcut.appendChild(th_shortcut);

            this.insertAdjacentElement("afterbegin", tr_shortcut);
            this.insertAdjacentElement("afterbegin", tr_cb);
        });
    }
//---------------------------troop training---------------------------------


    private static Marketplace() :void {
        Build.Marketplace_SendResourcesTab();

    }

    private static Marketplace_SendResourcesTab() : void{
        $("#enterVillageName").each(function(){
            //datalist for enterVillageName
            let datalist = document.createElement("datalist");
            datalist.id = "tjs_villageDataList";
            window.Instance.e_Villages.forEach(function(val: Element){
                if($(val).hasClass("active")) return;
                let option = document.createElement("option");
                option.value = $(val).find(".name").text();
                datalist.appendChild(option);
            });
            document.body.appendChild(datalist);
            $(this).attr("list", "tjs_villageDataList");

            //clear icon for enterVillageName
            $(this).closest("tr")
                .append(`<td><img src="${window.TsResources.svg_close}" class="tjs-svg" onclick="$('#enterVillageName').val('')"></td>`);





        });
    }
    private static Marketplace_DataList_enterVillageName() : void{
        
    }








}