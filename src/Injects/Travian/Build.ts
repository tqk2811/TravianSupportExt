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
        let server = ServerData.Load();        
        let account = AccountData.GetCurrent();

        $("#build .trainUnits .innerTroopWrapper .details").each(function(){
            let unit = $(this).find("img.unit");
            let resourceWrappers = $(this).find(".resourceWrapper .resource").get();

            let class_ = unit.attr("class");
            let unit_id = Number(class_.match(/u([0-9]+)/)[1]);
            let name = unit.attr("alt");
            let resources: NumArray4 = [0,0,0,0];
            for(let i = 0; i < 4; i++){
                resources[i] = Number($(resourceWrappers[i]).find("span.value").text());
            }

            let troop = new Troop();
            troop.Name[window.Travian.Game.language] = name;
            troop.Resources = Resources.FromNumArray4(resources);
            server.Troops[unit_id] = troop;

            let state_showOnMarket : boolean = account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`];
            if(state_showOnMarket == null) state_showOnMarket = false;
            let cb_showOnMarket = new SaveCheckBoxElement(state_showOnMarket, "Show on market", function(state:boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`] = state;
                account.Save();
            });
            $(this).find(".tit").append(cb_showOnMarket);
        });
        server.Save();

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
        //destinationSelect
        $("#marketSend").each(function(){
            //datalist for enterVillageName
            let datalist = document.createElement("datalist");
            datalist.id = "tjs_villageDataList";
            window.Instance.e_Villages.forEach(function(val: Element){
                if($(val).hasClass("active")) return;
                let option = document.createElement("option");
                option.value = $(val).find(".name").text();
                option.setAttribute("village-id", $(val).attr("data-did"));
                datalist.appendChild(option);
            });
            document.body.appendChild(datalist);

            //enterVillageName
            let func_Render_destinationSelect = function(){
                $("#marketSend .destinationSelect").addClass("tjs_enterVillageName");                
                $("#x2").on("change", Build.Marketplace_SelectChange);
                $("#marketSend #enterVillageName")
                    .attr("list", "tjs_villageDataList")
                    .on("change", function(){
                        let target_village_id = $(`#tjs_villageDataList option[value='${$(this).val()}']`).attr("village-id");
                        if(target_village_id && target_village_id != '')
                        {
                            let village_target = VillageData.Load(Number(target_village_id));

                            let timer = new TsTimerElement();
                            timer.AdvText = "Last update %s ago.";
                            timer.Counting = TimerCounting.Up;
                            timer.EndIime = village_target.LastUpdateAt;
                            timer.Init();
                            $(".tjs-market-top .tjs-right .tjs-market-timer").html(timer);

                            $(".tjs-market-top .tjs-right .tjs-market-resource").html(
                                `
                                <div class="inlineIconList resourceWrapper">
                                    <div class="inlineIcon">
                                        <i class="r1"></i>
                                        <span class="value value">${village_target.Resources.Lumber}</span>
                                    </div>
                                    <div class="inlineIcon">
                                        <i class="r2"></i>
                                        <span class="value value">${village_target.Resources.Claypit}</span>
                                    </div>
                                    <div class="inlineIcon">
                                        <i class="r3"></i>
                                        <span class="value value">${village_target.Resources.Iron}</span>
                                    </div>
                                    <div class="inlineIcon">
                                        <i class="r4"></i>
                                        <span class="value value">${village_target.Resources.Crop}</span>
                                    </div>
                                </div>`
                            );
                        // <div class="inlineIcon tjs-resourceWrapper">
                        //     <span class="value value">∑=${village_target.Resources.Lumber + village_target.Resources.Claypit + village_target.Resources.Iron + village_target.Resources.Crop}</span>
                        // </div>
                            $(".tjs-market-top .tjs-right .tjs-market-storage").html(
                                `
                                <div>
                                    Warehouse: ${village_target.Storage}
                                </div>
                                <div>
                                    Granary: ${village_target.Granary}
                                </div>`);
                        }
                        else
                        {
                            $(".tjs-market-top .tjs-right .tjs-market-timer").html("");
                            $(".tjs-market-top .tjs-right .tjs-market-resource").html("");
                            $(".tjs-market-top .tjs-right .tjs-market-storage").html("");
                        }
                        Build.Marketplace_SelectChange();
                    })
                    .closest("tr")
                    .append(`<td><img src="${window.TsResources.svg_close}" class="tjs-svg" onclick="$('#enterVillageName').val('')"></td>`);
            };
            
            func_Render_destinationSelect();
            $(document).on("DOMNodeInserted", "#marketSend .destinationSelect:not(.tjs_enterVillageName)", func_Render_destinationSelect);


            $("#build .carry").remove();

            //---------------------------------tjs-market-top---------------------------------
            let func_createOptions = function(val: string, name: string): HTMLOptionElement{
                let e_option = document.createElement("option");
                e_option.value = val;
                e_option.innerText = name;
                return e_option;
            };
            let account = AccountData.GetCurrent();
            let server = ServerData.Load();

            let div_market = document.createElement("div");
            div_market.className = "tjs-market-top";
            this.insertAdjacentElement("beforebegin",div_market);
            let div_left_market = document.createElement("div");
            div_left_market.className = "tjs-left";
            let div_right_market = document.createElement("div");
            div_right_market.className = "tjs-right";
            div_market.appendChild(div_left_market);
            div_market.appendChild(div_right_market);
            let div_clear = document.createElement("div");
            div_clear.setAttribute("class","clear");
            div_market.insertAdjacentElement("afterend",div_clear);

            //---------------------------------left---------------------------------
            //row 1
            let state_noCrop = account.CheckboxData["cb_market_noCrop"];
            if(state_noCrop == null) state_noCrop = false;
            let cb_noCrop = new SaveCheckBoxElement(state_noCrop, "No crop",function(state: boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData["cb_market_noCrop"] = state;
                account.Save();
            });

            let state_saveBigCelebration = account.CheckboxData["cb_market_saveBigCelebration"];
            if(state_saveBigCelebration == null) state_saveBigCelebration = false;
            let cb_saveBigCelebration = new SaveCheckBoxElement(state_saveBigCelebration, "Save big celebration",function(state: boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData["cb_market_saveBigCelebration"] = state;
                account.Save();
            });

            div_left_market.appendChild(cb_noCrop);
            div_left_market.appendChild(cb_saveBigCelebration);
            //row 2
            //type_select
            let type_select = document.createElement("select");
            type_select.id = "tjs-market-type";
            type_select.appendChild(func_createOptions("-1", ""));

            type_select.appendChild(func_createOptions("b_0","Balance current village"));
            type_select.appendChild(func_createOptions("b_1","Balance target village"));
            
            type_select.appendChild(func_createOptions("c_0","Small Celebration"));
            type_select.appendChild(func_createOptions("c_1","Big Celebration"));
            type_select.appendChild(func_createOptions("c_2","Big Celebration / 2"));
            type_select.appendChild(func_createOptions("c_3","Big Celebration / 3"));
            for(let key in account.CheckboxData){
                if(key.startsWith("cb_troopShowOnMarket_")){
                    let id = key.substring(21);
                    let troop: Troop = server.Troops[id];
                    if(troop)
                    {
                        let name:string = troop.Name[window.Travian.Game.language];
                        if(!name) name = troop.Name[troop.Name.FirstKey()];
                        type_select.appendChild(func_createOptions(id, name));
                    }
                }
            }
            
            type_select.onchange = Build.Marketplace_SelectChange;
            div_left_market.appendChild(type_select);
            
            //input
            let input_number = document.createElement("input");
            input_number.id = "tjs-market-number";
            input_number.setAttribute("type","number");
            input_number.setAttribute("min","0");
            input_number.setAttribute("max","0");
            input_number.onchange =  Build.Marketplace_NumChange;
            
            //label
            let label_number_max = document.createElement("label");
            label_number_max.id = "tjs-market-number-max";
            label_number_max.innerText = "/0";
            label_number_max.onclick = function(){
                $(".tjs-market-number").val($(".tjs-market-number").attr("max"));
                Build.Marketplace_NumChange();
            };

            div_left_market.appendChild(input_number);
            div_left_market.appendChild(label_number_max);
            //---------------------------------left---------------------------------


            //---------------------------------right---------------------------------
            let div_timer = document.createElement("div");
            div_timer.className = "tjs-market-timer";
            let div_resource = document.createElement("div");
            div_resource.className = "tjs-market-resource";
            let div_storage = document.createElement("div");
            div_storage.className = "tjs-market-storage";
            
            div_right_market.appendChild(div_timer);
            div_right_market.appendChild(div_resource);
            div_right_market.appendChild(div_storage);
            //---------------------------------right---------------------------------
        });
    }
    private static Marketplace_SelectChange() : void{
        let type =  $("#tjs-market-type").val();
        let input_number = $("#tjs-market-number");
        let label_number = $("#tjs-market-number-max");
        let x2 = $("#x2").val();
        let enterVillageName = $("#enterVillageName").val();
        let target_village_id: string = null;
        if(enterVillageName && enterVillageName != ''){
            target_village_id = $(`#tjs_villageDataList option[value='${enterVillageName}']`).attr("village-id");
        }


        let server = ServerData.Load();
        let account = AccountData.GetCurrent();
        let village_current = VillageData.GetCurrent();
        let village_target : VillageData = target_village_id ? VillageData.Load(Number(target_village_id)) : null;
        
        switch(type){
            case "-1" : //reset
            input_number.prop("max",0);
            input_number.val("0");
            label_number.html("/0");
            Build.Marketplace_SetResource(new Resources(0,0,0,0), 1);
            break;

            case "b_0" : 
            case "b_1" : 

            break;
            		
            case "c_0" : 
            case "c_1" : 
            case "c_2" : 
            case "c_3" : 
            input_number.prop("max",1);
            input_number.val("1");
            label_number.html("/1");
            let data = Resources.CelebrationResources[type];
            Build.Marketplace_SetResource(data.Resources, data.RunTwice);
            break;

            default :
            Build.Marketplace_SetResource(new Resources(0,0,0,0), 1);
            let id = Number(type);
            let troop : Troop = server.Troops[id];



            break;
        }
    }
    private static Marketplace_NumChange() : void{
        
    }

    private static Marketplace_SetResource(res: Resources, run_twice: number = 1) : void{
        $("#send_select #r1").val(res.Lumber);
        $("#send_select #r2").val(res.Claypit);
        $("#send_select #r3").val(res.Iron);
        $("#send_select #r4").val(res.Crop);
        let x2 = $("#x2");
        if(x2.prop("tagName") == "SELECT")
        {
            x2.val(run_twice);
        }
        else 
        {
            if(run_twice == 1) x2.prop("checked", false);
            else x2.prop("checked", true);
        }
    }
}