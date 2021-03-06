interface IVillageData{
    VillageId: number;

    BuildsEndTime: number[];
    DemolishEndTime: number;
    TroopTrains: TTroopTrains;
    CelebrationEndTime: number;

    Storage: number;
    Granary: number;
    Resources: IResources;

    LastUpdateAt: number;

    AttackCount: number;
    AttackFirstEndTime: number;

    BalanceMax: number;
    BalanceMin: number;
}

class VillageData implements IVillageData {
    private constructor(private villageData: IVillageData) {
        
    }
    
    public get VillageId(): number{ return this.villageData.VillageId; };

    public get BuildsEndTime(): number[]{ return this.villageData.BuildsEndTime; }
    //private set BuildsEndTime(val:number[]){ this.villageData.BuildsEndTime = val; }

    public get DemolishEndTime(): number{ return this.villageData.DemolishEndTime; }
    //private set DemolishEndTime(val:number){ this.villageData.DemolishEndTime = val; }

    public get TroopTrains(): TTroopTrains { return this.villageData.TroopTrains; }
    //private set TroopTrains(val: TroopTrains){ this.villageData.TroopTrains = val; }

    public get CelebrationEndTime(): number{ return this.villageData.CelebrationEndTime; }
    public set CelebrationEndTime(val:number){ this.villageData.CelebrationEndTime = val; }//update from load /village/statistics

    public get Storage(): number{ return this.villageData.Storage; }
    public get Granary(): number{ return this.villageData.Granary; }
    
    public get Resources(): IResources{ return this.villageData.Resources; }
    public set Resources(val: IResources){ this.villageData.Resources = val; }//update from load /village/statistics
    
    public get LastUpdateAt(): number{ return this.villageData.LastUpdateAt; }

    public get AttackCount(): number{ return this.villageData.AttackCount; }

    public get AttackFirstEndTime(): number{ return this.villageData.AttackFirstEndTime; }

    public get BalanceMax(): number{ return this.villageData.BalanceMax; }
    public set BalanceMax(val: number){ this.villageData.BalanceMax = val; }

    public get BalanceMin(): number{ return this.villageData.BalanceMin; }
    public set BalanceMin(val: number){ this.villageData.BalanceMin = val; }

    public Read(): void {
        this.villageData.Storage = Number($("#stockBar .warehouse .capacity .value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.villageData.Granary = Number($("#stockBar .granary .capacity .value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.Resources = new Resources([
            Number($("#l1").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l2").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l3").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l4").text().trim().getASCII().replaceAll(".", "").replaceAll(",", ""))
        ]);

        switch (window.Instance.Gid) {
            case Building.None:
                {
                    this.ReadNonBuilding();
                    break;
                }
            case Building.Barracks:
            case Building.GreatBarracks:
            case Building.Stable:
            case Building.GreatStable:
            case Building.Smithy:
            case Building.Workshop:
            case Building.Hospital:
            case Building.TownHall:
                {
                    let val = $(".under_progress td.dur span.timer").last().attr("value");
                    if (val && val != '') {
                        switch(window.Instance.Gid)
                        {
                            case Building.TownHall:
                                this.CelebrationEndTime = Date.now() + (Number(val) * 1000);
                                break;

                            default:
                                if (!this.TroopTrains[window.Instance.Gid]) 
                                    this.TroopTrains[window.Instance.Gid] = { EndTime: 0, IsEnable: false };
                                this.TroopTrains[window.Instance.Gid].EndTime = Date.now() + (Number(val) * 1000);
                                break;
                        }
                    }
                    break;
                }
            case Building.MainBuilding:
                {
                    let val = $("#demolish .timer").attr("value");
                    if (val && val != '') {
                        this.villageData.DemolishEndTime = Date.now() + (Number(val) * 1000);
                    }
                }
        }
    }

    private ReadNonBuilding(): void {
        switch (window.location.pathname) {
            case "/dorf1.php":
            case "/dorf2.php":
                {
                    let builds = new Array<number>();
                    $(".buildDuration .timer").each(function (i, e) { builds.push(Number($(this).attr("value")) * 1000 + Date.now()); });
                    this.villageData.BuildsEndTime = builds;

                    //count attack comming
                    let attack_count = 0;
                    let attack_endTime = 0;
                    $("#movements tr").each(function (i, e) {
                        let a1 = $(this).find(".mov .a1");
                        let timer = $(this).find(".dur_r .timer");
                        let count = Number(a1.text().match(/\d+/g));
                        let timeLeft = Number(timer.attr("value"));
                        if(!Number.isNaN(timeLeft) && !Number.isNaN(count))
                        {
                            attack_count = count;
                            attack_endTime = timeLeft * 1000 + Date.now();
                        }
                    });
                    this.villageData.AttackCount = attack_count;
                    this.villageData.AttackFirstEndTime = attack_endTime;
                    break;
                }
        }
    }

    public Save(): void {
        this.villageData.LastUpdateAt = Date.now();
        localStorage.setItem("TsVillage_" + this.villageData.VillageId, JSON.stringify(this.villageData));
    }
    public static Load(villageId: number): VillageData {
        if(!villageId ) throw new Error("villageId is null/undefined");
        let data = localStorage.getItem("TsVillage_" + villageId);
        if(data)
        {
            let villageData = JSON.parse(data) as IVillageData;
            //check
            if(!villageData.VillageId) villageData.VillageId = villageId;
            if(!villageData.BuildsEndTime) villageData.BuildsEndTime = [];
            if(!villageData.TroopTrains) villageData.TroopTrains = {};
            if(!villageData.Resources) villageData.Resources = new Resources([0,0,0,0]);
            return new VillageData(villageData);
        }
        else return new VillageData({
            VillageId : villageId,
            BuildsEndTime: [],
            DemolishEndTime: 0,
            TroopTrains: {},
            CelebrationEndTime: 0,
            Storage: 0,
            Granary: 0,
            Resources: new Resources([0,0,0,0]),
            LastUpdateAt: 0,
            AttackCount:0,
            AttackFirstEndTime:0,
            BalanceMax:85,
            BalanceMin:0
        });
    }

    public static GetCurrent(): VillageData{
        return VillageData.Load(window.Instance.villageId);
    }
}
