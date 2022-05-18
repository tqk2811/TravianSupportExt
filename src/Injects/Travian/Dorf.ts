class Dorf {
    public static Render(): void {
        if (window.location.pathname.startsWith("/dorf")) {
            Dorf.TroopIcon();
            Dorf.TimerStockbar();
        }
    }

    static TroopIcon(): void {
        $("#movements .def1").parent().attr("href", "/build.php?gid=16&tt=1&filter=1&subfilters=2,3");//all def in
        $("#movements .def2").parent().attr("href", "/build.php?gid=16&tt=1&filter=2&subfilters=5");//def yellow out
        $("#movements .def3").parent().attr("href", "/build.php?gid=16&tt=1&filter=1&subfilters=2,3");//all def in

        $("#movements .att1").parent().attr("href", "/build.php?gid=16&tt=1&filter=1&subfilters=1");//red att
        $("#movements .att2").parent().attr("href", "/build.php?gid=16&tt=1&filter=2&subfilters=4");//att yellow out
        $("#movements .att3").parent().attr("href", "/build.php?gid=16&tt=1&filter=1&subfilters=1");//Violet att (oasis)

        $("#troops .unit").parent().attr("href", "/build.php?gid=16&tt=1&filter=3");
    }

    static TimerStockbar(): void {
        $("#stockBar").each(function () {
            let main_div = document.createElement("div");
            main_div.setAttribute("class", "Tjs_troop_train");

            let current_village: VillageData = VillageData.GetCurrent();

            let div_barack = document.createElement("div");// gid 19,29
            div_barack.setAttribute("class", "Tjs_troop_train_group");
            Dorf.TimerStockbar_TroopTrain_AddChild(div_barack, current_village, Building.Barracks);
            Dorf.TimerStockbar_TroopTrain_AddChild(div_barack, current_village, Building.GreatBarracks);

            let div_stable = document.createElement("div");// gid 20,30
            div_stable.setAttribute("class", "Tjs_troop_train_group");
            Dorf.TimerStockbar_TroopTrain_AddChild(div_stable, current_village, Building.Stable);
            Dorf.TimerStockbar_TroopTrain_AddChild(div_stable, current_village, Building.GreatStable);

            let div_workshop = document.createElement("div");// gid 21
            div_workshop.setAttribute("class", "Tjs_troop_train_group");
            Dorf.TimerStockbar_TroopTrain_AddChild(div_workshop, current_village, Building.Workshop);
            Dorf.TimerStockbar_TroopTrain_AddChild(div_workshop, current_village, Building.Smithy);

            let div_hospital = document.createElement("div");//
            div_hospital.setAttribute("class", "Tjs_troop_train_group");
            Dorf.TimerStockbar_TroopTrain_AddChild(div_hospital, current_village, Building.Hospital);

            main_div.appendChild(div_barack);
            main_div.appendChild(div_stable);
            main_div.appendChild(div_workshop);
            main_div.appendChild(div_hospital);
            this.insertAdjacentElement("beforeend", main_div);
        });
    }

    static TroopTrainShortName: { [key in Building]?: string } =
        {
            [Building.Barracks]: "Barracks",
            [Building.Stable]: "Stable",
            [Building.Workshop]: "Workshop",
            [Building.GreatBarracks]: "GBarracks",
            [Building.GreatStable]: "GStable",
            [Building.Hospital]: "Hospital",
            [Building.Smithy]: "Smithy",
        }

    static TimerStockbar_TroopTrain_AddChild(e: HTMLElement, village: VillageData, building: Building): void {
        let troopTrain: ITroopTrain = village.TroopTrains[building];
        if (troopTrain && troopTrain.IsEnable) {
            let div_ = document.createElement("div");
            let e_a = document.createElement("a");
            e_a.setAttribute("href", "/build.php?gid=" + building);
            e_a.setAttribute("class", "Tjs_troop_train_name");
            //e_a.style.color = "Green";
            e_a.innerText = Dorf.TroopTrainShortName[building] + ":";

            let timer = new TsTimerElement();
            timer.IsSound = false;
            timer.EndIime = troopTrain.EndTime;
            timer.AdvText = "%s";
            //timer.Color = "Blue";
            timer.Init();

            div_.appendChild(e_a);
            div_.appendChild(timer);
            e.appendChild(div_);
        }
    }
}