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
                datalist.appendChild(option);
            });
            document.body.appendChild(datalist);

            //enterVillageName
            let func_Render_destinationSelect = function(){
                $("#marketSend .destinationSelect").addClass("tjs_enterVillageName");
                $("#marketSend #enterVillageName")
                    .attr("list", "tjs_villageDataList")
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
            type_select.appendChild(func_createOptions("-1", ""));

            type_select.appendChild(func_createOptions("b_0","Balance current village"));
            type_select.appendChild(func_createOptions("b_1","Balance target village"));
            
            type_select.appendChild(func_createOptions("c_0","Small Celebration"));
            type_select.appendChild(func_createOptions("c_1","Big Celebration"));
            type_select.appendChild(func_createOptions("c_2","Big Celebration / 2"));
            type_select.appendChild(func_createOptions("c_3","Big Celebration / 3"));

            

            div_left_market.appendChild(type_select);
            
            //input & label
            let input_number = document.createElement("input");
            input_number.setAttribute("type","number");
            input_number.setAttribute("min","0");
            input_number.setAttribute("max","0");
            //input_number.setAttribute("onchange","gid17_input_number_onchange()");
            
            let label_number_max = document.createElement("label");
            label_number_max.innerText = "/0";
            // label_number_max.onclick = function(){
            //                                             gid17_input_number.value = gid17_input_number.max;
            //                                             gid17_input_number_onchange();															
            //                                         };

            div_left_market.appendChild(input_number);
            div_left_market.appendChild(label_number_max);
            //---------------------------------left---------------------------------


            //---------------------------------right---------------------------------
            

            //---------------------------------right---------------------------------
        });
    }
    private static Marketplace_DataList_enterVillageName() : void{
        
    }








}