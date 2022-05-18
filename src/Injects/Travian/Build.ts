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
                case Building.RallyPoint:{
                    Build.RallyPoint();
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
            let resources: TNumArray4 = [0,0,0,0];
            for(let i = 0; i < 4; i++){
                resources[i] = Number($(resourceWrappers[i]).find("span.value").text());
            }

            if(!server.Troops[unit_id]) 
                server.Troops[unit_id] = 
                {
                    Name: { },
                    Resources: Resources.FromNumArray4(resources)
                };
            server.Troops[unit_id].Name[window.Travian.Game.language] = name;
            server.Troops[unit_id].Resources = Resources.FromNumArray4(resources);

            let state_showOnMarket : boolean = account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`];
            if(state_showOnMarket == null) state_showOnMarket = false;
            let cb_showOnMarket = new SaveCheckBoxElement(state_showOnMarket, "Show on market", function(state:boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`] = state;
                account.Save();
            });
            $(this).find(".tit").after(cb_showOnMarket);
        });
        server.Save();

        $("#build .upgradeHeader").each(function(){
            let village = VillageData.GetCurrent();
            let state : boolean = village.TroopTrains[window.Instance.Gid]?.IsEnable;
            if(state == null) state = false;
            
            this.style.flexWrap = "wrap";
            let table = document.createElement("table");
            table.className = "transparent";
            let tr_cb = document.createElement("tr");
            let th_cb = document.createElement("th");
            let cb = new SaveCheckBoxElement(state, "Show", function(state:boolean){
                let village = VillageData.GetCurrent();

                if (!village.TroopTrains[window.Instance.Gid]) 
                    village.TroopTrains[window.Instance.Gid] = { EndTime: 0, IsEnable: false };

                village.TroopTrains[window.Instance.Gid].IsEnable = state;
                village.Save();
            });
            th_cb.appendChild(cb);
            tr_cb.appendChild(th_cb);
            table.appendChild(tr_cb);

            if($(".build form .unit").length > 0){
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
                table.appendChild(tr_shortcut);
            }
            
            this.insertAdjacentElement("afterbegin", table);
        });
    }
//---------------------------troop training---------------------------------

    private static RallyPoint() : void{
        let href = $(window.Instance.e_ActiveTabMain)?.attr("href");
        if(href != undefined){
            if(href.indexOf("tt=2") != -1){//tab sendtroops
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
                $(".gid16 #enterVillageName").attr("list", "tjs_villageDataList");
            }
        }
    }

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
            
            Build.Marketplace_Render_destinationSelect();
            $(document).on(
                "DOMNodeInserted", 
                "#marketSend .destinationSelect:not(.tjs_enterVillageName)", 
                Build.Marketplace_Render_destinationSelect);

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
            cb_noCrop.id = "cb_market_noCrop";

            let state_saveBigCelebration = account.CheckboxData["cb_market_saveBigCelebration"];
            if(state_saveBigCelebration == null) state_saveBigCelebration = false;
            let cb_saveBigCelebration = new SaveCheckBoxElement(state_saveBigCelebration, "Save big celebration",function(state: boolean){
                let account = AccountData.GetCurrent();
                account.CheckboxData["cb_market_saveBigCelebration"] = state;
                account.Save();
            });
            cb_saveBigCelebration.id = "cb_market_saveBigCelebration";

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
                    let troop: ITroop = server.Troops[id];
                    if(troop)
                    {
                        let name : string = troop.Name[window.Travian.Game.language];
                        if(!name) name = troop.Name[troop.Name.FirstKey()];
                        let numId = Number(id);
                        let tribe : string = "?";
                        if(1 <= numId && numId <= 10) tribe = "Romans";
                        else if(11 <= numId && numId <= 20) tribe = "Teutons";
                        else if(21 <= numId && numId <= 30) tribe = "Gauls";
                        else if(31 <= numId && numId <= 40) tribe = "Nature";
                        else if(41 <= numId && numId <= 50) tribe = "Natar";
                        else if(51 <= numId && numId <= 60) tribe = "Egypts";
                        else if(61 <= numId && numId <= 70) tribe = "Huns";

                        type_select.appendChild(func_createOptions(id, `${tribe} - ${name}`));
                    }
                }
            }
            
            type_select.onchange = Build.Marketplace_SelectChange;
            div_left_market.appendChild(type_select);
            
            //input
            let input_number = document.createElement("input");
            input_number.id = "tjs-market-number";
            input_number.setAttribute("type","number");
            input_number.setAttribute("value","0");
            input_number.setAttribute("min","0");
            input_number.setAttribute("max","0");
            input_number.onchange =  Build.Marketplace_NumChange;
            
            //label
            let label_number_max = document.createElement("a");
            label_number_max.id = "tjs-market-number-max";
            label_number_max.innerText = "/0";
            label_number_max.href = "#";
            label_number_max.onclick = function(){
                $("#tjs-market-number").val($("#tjs-market-number").attr("max"));
                Build.Marketplace_NumChange();
            };

            let insert_div = document.createElement("div");
            insert_div.className = "tjs-market-merchant-plus-minus";
            let plus = document.createElement("a");
            plus.href = "#";
            plus.innerText = "+";
            plus.className = "tjs-market-plus";
            plus.onclick = function(e){
                e.preventDefault();
                let type =  $("#tjs-market-type").val();
                if(type != "b_0" && type != "b_1")
                    return;
                let num = Number($("#tjs-market-number").val());
                let merchant_carry = Number($("#addRessourcesLink1").text());
                $("#tjs-market-number").val(num + merchant_carry);
                Build.Marketplace_NumChange();
            }
            let minus = document.createElement("a");
            minus.href = "#";
            minus.className = "tjs-market-minus";
            minus.innerText = "-";
            minus.onclick = function(e){
                e.preventDefault();
                let type =  $("#tjs-market-type").val();
                if(type != "b_0" && type != "b_1")
                    return;
                let num = Number($("#tjs-market-number").val());
                let merchant_carry = Number($("#addRessourcesLink1").text());
                $("#tjs-market-number").val(Math.max(num - merchant_carry,0));
                Build.Marketplace_NumChange();
            };
            insert_div.append(plus);
            insert_div.append(minus);

            div_left_market.appendChild(input_number);
            div_left_market.appendChild(label_number_max);
            div_left_market.appendChild(insert_div);
            
            
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


    private static Marketplace_Render_destinationSelect() : void {
        $("#marketSend .destinationSelect").addClass("tjs_enterVillageName");                
        $("#x2").on("change", Build.Marketplace_SelectChange);
        $("#marketSend #enterVillageName")
            .attr("list", "tjs_villageDataList")
            .on("change", function(){
                let target_village_id = $(`#tjs_villageDataList option[value='${$(this).val()}']`).attr("village-id");
                if(target_village_id && target_village_id != '')
                {
                    let village_target = VillageData.Load(Number(target_village_id));

                    $(".tjs-slider.tjs-village-target .tjs-slider-input")
                        .attr("village-id",village_target.VillageId.toString())
                        .prop("disabled", false)
                        .prop("value", village_target.BalanceMax.toString())
                        .trigger("input");

                    let timer = new TsTimerElement();
                    timer.AdvText = "Updated %s ago.";
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
                    $(".tjs-slider.tjs-village-target .tjs-slider-input").prop("disabled", true);
                }
                Build.Marketplace_SelectChange();
            })
            .closest("tr")
            .append(`<td><img src="${window.TsResources.svg_close}" class="tjs-svg" onclick="$('#enterVillageName').val('').trigger('change');"></td>`);

        //slider
        $("#marketSend .destination").each(function(){
            let village_current = VillageData.GetCurrent();
            let div_current = document.createElement("div");
            div_current.className = "tjs-slider tjs-village-current";
            
            let slider_current_label = document.createElement("label");
            slider_current_label.className = "tjs-slider-label";
            slider_current_label.innerText = `${village_current.BalanceMin}%`;

            let slider_current = document.createElement("input");
            slider_current.type = "range";
            slider_current.min = "0";
            slider_current.max = "100";
            slider_current.value = village_current.BalanceMin.toString();
            slider_current.setAttribute("village-id", window.Instance.villageId.toString());
            slider_current.className = "tjs-slider-input";
            slider_current.onchange = function(){ 
                let village = VillageData.GetCurrent();
                village.BalanceMin = Number(slider_current.value);
                village.Save();
                Build.Marketplace_SelectChange();
            };
            slider_current.oninput = function(){ 
                slider_current_label.innerText = slider_current.value + "%";
            };

            div_current.appendChild(slider_current);
            div_current.appendChild(slider_current_label);

            let div_target = document.createElement("div");
            div_target.className = "tjs-slider tjs-village-target";

            let slider_target_label = document.createElement("label");
            slider_target_label.className = "tjs-slider-label";
            slider_target_label.innerText = "85%";

            let slider_target = document.createElement("input");
            slider_target.type = "range";
            slider_target.min = "0";
            slider_target.max = "100";
            slider_target.value = "85";
            slider_target.className = "tjs-slider-input";
            slider_target.disabled = true;
            slider_target.onchange = function(){
                let village = VillageData.Load(Number(slider_target.getAttribute("village-id")));
                village.BalanceMax = Number(slider_target.value);
                village.Save();
                Build.Marketplace_SelectChange();
            };
            slider_target.oninput = function(){ 
                slider_target_label.innerText = slider_target.value + "%";
            };
            
            div_target.appendChild(slider_target);
            div_target.appendChild(slider_target_label);

            $(this).append(div_current);
            $(this).append(div_target);
        });
    }

    private static Marketplace_SelectChange() : void{
        let type =  $("#tjs-market-type").val();
        let input_number = $("#tjs-market-number");
        let label_number = $("#tjs-market-number-max");
        let enterVillageName = $("#enterVillageName").val();

        switch(type){
            case "-1" : //reset
            {
                input_number.prop("max",0);
                input_number.val("0");
                label_number.html("/0");
            }
            break;

            case "b_0" : 
            case "b_1" : 
            {
                let multiple = Build.Marketplace_GetRunTwice();
                let max_Send : number = Math.floor(Number($("#merchantCapacityValue").text()) * multiple / Build.Marketplace_Balance);

                label_number.html(`x${Build.Marketplace_Balance}`);
                input_number.prop("max", max_Send);
                if(Number(input_number.val()) > max_Send) input_number.val(max_Send);
            }
            break;
            		
            case "c_0" : 
            case "c_1" : 
            case "c_2" : 
            case "c_3" : 
            {
                input_number.prop("max",1);
                input_number.val("1");
                label_number.html("/1");
                let data = Resources.CelebrationResources[type];
                Build.Marketplace_SetResource(data.Resources, data.RunTwice);
            }
            break;

            default :
            {
                let village_current = VillageData.GetCurrent();
                let server = ServerData.Load();
                let id = Number(type);
                let troop : ITroop = server.Troops[id];

                let village_target : VillageData = null;
                let resources_target: IResources = new Resources([0,0,0,0]);
                let storage_target = 9999999;
                let granary_target = 9999999;
                let village_id_target = Number($(".tjs-slider.tjs-village-target .tjs-slider-input").attr("village-id"));
                if(!Number.isNaN(village_id_target)){
                    village_target = VillageData.Load(village_id_target);
                    resources_target = village_target.Resources;
                    storage_target = village_target.Storage * village_target.BalanceMax / 100;
                    granary_target = village_target.Granary * village_target.BalanceMax / 100;
                }

                //avalable current
                let current_save_storage = village_current.Storage * village_current.BalanceMin / 100;
                let current_save_granary = village_current.Granary * village_current.BalanceMin / 100;
                let current_balance: Resources = new Resources(village_current.Resources)
                    .Minus([current_save_storage, current_save_storage, current_save_storage, current_save_granary])
                    .AlwaysPositive();

                //max market can send
                let multiple : number = Build.Marketplace_GetRunTwice();
                let min : number = Build.Marketplace_BalanceTroopTarget(
                    new Resources(resources_target),
                    new Resources([storage_target,storage_target,storage_target,granary_target]),
                    current_balance,
                    new Resources(troop.Resources),
                    Number($("#merchantCapacityValue").text()) * multiple);

                if(min < 0) min = 0;
                input_number.prop("max", min);
                if(Number(input_number.val()) > min) input_number.val(min);
                label_number.html(`/${min}`);
            }
            break;
        }
    }

    private static Marketplace_Balance : number = 1;
    private static Marketplace_NumChange() : void{
        console.log("Marketplace_NumChange");

        let type =  $("#tjs-market-type").val();
        let input_number = $("#tjs-market-number");
        switch(type){
            case "-1" : //reset
            //Build.Marketplace_SetResource([0,0,0,0]);
            break;

            case "b_0" : 
            case "b_1" : 
            {
                let isCurrent = type == "b_0";
                let enterVillageName = $("#enterVillageName").val();
                let multiple = Build.Marketplace_GetRunTwice();
                let target_village_id: string = $(`#tjs_villageDataList option[value='${enterVillageName}']`).attr("village-id");
                let village_target : VillageData = Number.isNaN(Number(target_village_id)) ? null : VillageData.Load(Number(target_village_id));
                let village_current = VillageData.GetCurrent();

                //limit current
                let isNoCrop = ($("#cb_market_noCrop").get()[0] as SaveCheckBoxElement).Checked;
                let isSaveBigCele = ($("#cb_market_saveBigCelebration").get()[0] as SaveCheckBoxElement).Checked;
                let bigcele = Resources.CelebrationResources["c_1"];
                let balance_storage_current = village_current.Storage * village_current.BalanceMin / 100;
                let balance_granary_current = village_current.Granary * village_current.BalanceMin / 100;
                let max_can_send_current = new Resources(village_current.Resources)
                    .Minus([
                        Math.max(balance_storage_current, isSaveBigCele ? bigcele.Resources.Lumber : 0), 
                        Math.max(balance_storage_current, isSaveBigCele ? bigcele.Resources.Claypit : 0),
                        Math.max(balance_storage_current, isSaveBigCele ? bigcele.Resources.Iron : 0),
                        Math.max(balance_granary_current, isSaveBigCele ? bigcele.Resources.Crop : 0, isNoCrop ? 9999999 : 0)
                    ])
                    .AlwaysPositive();

                //limit target. If target not selected, limit is 10m per resource
                let balance_Target_Max = village_target ? village_target.BalanceMax : 100;
                let resource_target = new Resources(village_target ? village_target.Resources : [0,0,0,0]);
                let storage_target = village_target ? village_target.Storage : 9999999;
                let granary_target = village_target ? village_target.Granary : 9999999;
                let balance_storage_target = storage_target * balance_Target_Max / 100;
                let balance_granary_target = granary_target * balance_Target_Max / 100;
                let max_can_received_target = new Resources([balance_storage_target,balance_storage_target,balance_storage_target,balance_granary_target])
                    .Minus(resource_target).AlwaysPositive();

                //limit merchant
                let limit_merchant = Number($("#merchantCapacityValue").text()) * multiple;

                //limit input
                let limit_input = Number(input_number.val()) * Build.Marketplace_Balance * multiple;

                //limit min
                let res_send = Math.min(max_can_send_current.Total(), max_can_received_target.Total(), limit_input, limit_merchant);

                if(isCurrent)
                {
                    //balance current
                    let result = Build.Marketplace_BalanceCurrent(
                        max_can_send_current,
                        new Resources([village_current.Storage, village_current.Storage, village_current.Storage, village_current.Granary]), 
                        max_can_received_target,
                        res_send);

                    Build.Marketplace_SetResource(result.Divide(multiple).round());
                }
                else if(village_target)//ignore balance target when not select target village
                {
                    //balance target
                    let result = Build.Marketplace_BalanceTarget(
                        resource_target,
                        new Resources([balance_storage_target,balance_storage_target,balance_storage_target,balance_granary_target]),
                        max_can_send_current,
                        res_send);

                    Build.Marketplace_SetResource(result.Divide(multiple).round());
                }
            }
            break;
            		
            case "c_0" : 
            case "c_1" : 
            case "c_2" : 
            case "c_3" : 
            {
                input_number.val("1");
                let data = Resources.CelebrationResources[type];
                Build.Marketplace_SetResource(data.Resources, data.RunTwice);
            }
            break;

            default :
            {
                let server = ServerData.Load();
                let id = Number(type);
                let troop : ITroop = server.Troops[id];
                let num = Number(input_number.val());
                let multiple = Build.Marketplace_GetRunTwice();

                let village_target : VillageData = null;
                let resources_target: IResources = new Resources([0,0,0,0]);
                let village_id_target = Number($(".tjs-slider.tjs-village-target .tjs-slider-input").attr("village-id"));
                if(!Number.isNaN(village_id_target)){
                    village_target = VillageData.Load(village_id_target);
                    resources_target = village_target.Resources;
                }

                //troop.Resources.Lumber * num - resources_target.Lumber)/ multiple
                Build.Marketplace_SetResource(Resources.Multiple(troop.Resources, num).Minus(resources_target).Divide(multiple).floor());
            }
            break;
        }
    }
    private static Marketplace_GetRunTwice(): number{
        let x2 = $("#x2");
        if(x2.prop("tagName") == "SELECT") return Number(x2.val());
        else 
        {
            if(x2.prop("checked") == "true") return 2; 
            else return 1;
        }
    }
    private static Marketplace_SetResource(res: IResources | TNumArray4, run_twice: number = Number.NaN) : void{
        if(Array.isArray(res))
        {
            $("#send_select #r1").val(res[0]);
            $("#send_select #r2").val(res[1]);
            $("#send_select #r3").val(res[2]);
            $("#send_select #r4").val(res[3]);
        }
        else
        {
            $("#send_select #r1").val(res.Lumber);
            $("#send_select #r2").val(res.Claypit);
            $("#send_select #r3").val(res.Iron);
            $("#send_select #r4").val(res.Crop);
        }
        
        for(let i = 1; i <= 4 ; i++) window.marketPlace.validateAndVisualizeMerchantCapacity(i);
        if(!Number.isNaN(run_twice))
        {
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

    private static Marketplace_BalanceCurrent(
        resource_current: Resources, 
        storage_current: Resources, 
        resource_canReceived_target: Resources,//maybe full target
        total_send: number, 
        step: number = 5
    ) : Resources
    {
        let res_can_send = resource_current.Min(resource_canReceived_target);
        let result : Resources = new Resources([0,0,0,0]);
        let ignore : Resources = new Resources([step,step,step,step]);
        let keys_check: string[] = ["Lumber", "Claypit", "Iron", "Crop"];
        while(true)//total_send >= step
        {
            //balance by percent
            //maybe full some resource in target -> ignore
            let avalable_current = res_can_send.Minus(result);
            let freespace_target = resource_canReceived_target.Minus(result);

            let ignore_current = avalable_current.Minus(ignore);
            for(let i = 0; i < keys_check.length; i++)
            {
                if(ignore_current[keys_check[i]] < 0) keys_check.splice(i, 1);
            }
            
            let ignore_target = freespace_target.Minus(ignore);
            for(let i = 0; i < keys_check.length; i++)
            {
                if(ignore_target[keys_check[i]] < 0) keys_check.splice(i, 1);
            }

            if(keys_check.length == 0) break;
            if(total_send < step) break;

            let divide = avalable_current.Divide(storage_current);
            let max_key: string = keys_check[0];
            for(let i = 1; i < keys_check.length; i++)
            {
                if(divide[keys_check[i]] > divide[max_key])
                    max_key = keys_check[i];
            }
            result[max_key] += step;
            total_send -= step;
        }
        return result;
    }

    private static Marketplace_BalanceTarget(
        resource_target: Resources, 
        storage_target: Resources,
        resource_maxCanSend_current: Resources,//maybe not enough current
        total_send: number, 
        step: number = 5
    ) : Resources
    {
        let resource_canReceived_target = storage_target.Minus(resource_target);
        let res_can_send = resource_maxCanSend_current.Min(resource_canReceived_target);

        let result: Resources = new Resources([0,0,0,0]);
        let ignore : Resources = new Resources([step,step,step,step]);
        let keys_check: string[] = ["Lumber", "Claypit", "Iron", "Crop"];
        while(true)
        {
            let avalable_current = res_can_send.Minus(result);
            let freespace_target = resource_canReceived_target.Minus(result);

            let ignore_current = avalable_current.Minus(ignore);
            for(let i = 0; i < keys_check.length; i++)
            {
                if(ignore_current[keys_check[i]] < 0) keys_check.splice(i, 1);
            }
            
            let ignore_target = freespace_target.Minus(ignore);
            for(let i = 0; i < keys_check.length; i++)
            {
                if(ignore_target[keys_check[i]] < 0) keys_check.splice(i, 1);
            }

            if(keys_check.length == 0) break;
            if(total_send < step) break;

            let divide = resource_target.Add(result).Divide(storage_target);
            let min_key: string = keys_check[0];
            for(let i = 1; i < keys_check.length; i++)
            {
                if(divide[keys_check[i]] < divide[min_key])
                    min_key = keys_check[i];
            }
            result[min_key] += step;
            total_send -= step;
        }
        return result;
    }

    private static Marketplace_BalanceTroopTarget(
        resource_target: Resources, 
        storage_target: Resources,
        resource_maxCanSend_current: Resources,
        troop_res: Resources,
        total_send: number
    ) : number
    {
        resource_target = resource_target.Min(storage_target);
        let max_target : number = resource_target.Divide(troop_res).ItemMin().floor();
        let res_send : Resources = troop_res.Multiple(max_target).Minus(resource_target).AlwaysPositive();
        let res_send_total : number = res_send.Total();
        let troop_res_total = troop_res.Total();
        while(true)
        {
            max_target++;
            let troop_need : Resources =  troop_res.Multiple(max_target);
            res_send = troop_need.Minus(resource_target).AlwaysPositive();
            res_send_total = res_send.Total();

            //limit storage target
            if(storage_target.Minus(resource_target.Add(res_send)).ItemMin() < 0) break;
            //merchant capacity
            if(total_send < res_send_total + troop_res_total) break;
            //limit current village
            if(resource_maxCanSend_current.Minus(res_send).ItemMin() < 0) break;
        }
        return max_target - 1;
    }
}