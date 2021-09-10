//https://stackoverflow.com/a/34031855/5034139

enum Building {
    None = 0,
    Woodcutter = 1,
    ClayPit,
    IronMine,
    Cropland,
    Sawmill,
    Brickyard,
    IronFoundry,
    GrainMill,
    Bakery,
    Warehouse,
    Granary,
    //Amory was remove
    Smithy = 13,
    TournamentSquare,
    MainBuilding,
    RallyPoint,
    Marketplace,
    Embassy,
    Barracks,
    Stable,
    Workshop,
    Academy,
    Cranny,
    TownHall,
    Residence,
    Palace,
    Treasury,
    TradeOffice,
    GreatBarracks,
    GreatStable,
    CityWall,
    EarthWall,
    Palisade,
    StonemasonLodge,
    Brewery,
    Trapper,
    HeroMansion,
    GreatWarehouse,
    GreatGranary,
    WonderOfTheWorld,
    HorseDrinkingTrough,
    StoneWall,
    CommandCenter,
    MakeshiftWall,
    Waterworks,
    Hospital
}
type TrainType =    Building.Barracks | Building.GreatBarracks | Building.Stable |
                    Building.GreatStable | Building.Smithy | Building.Workshop | Building.Hospital;


type NumArray4 = [number, number, number, number];

type TroopTrains =  { [key in TrainType]: TroopTrain };

class TroopTrain {
    public IsEnable: boolean;
    public EndTime: number;
}

class Resources{
    constructor(lumber: number, claypit: number, iron: number, crop: number){
        this.Lumber = lumber;
        this.Claypit = claypit;
        this.Iron = iron;
        this.Crop = crop;
    }
    public Lumber: number;
    public Claypit: number;
    public Iron: number;
    public Crop: number;
}

interface IVillageData{
    VillageId: number;

    BuildsEndTime: number[];
    DemolishEndTime: number;
    TroopTrains: TroopTrains;
    Celebration: number;

    Storage: number;
    Granary: number;
    Resources: Resources;

    LastUpdateAt: number;

    AttackCount: number;
    AttackFirstEndTime: number;
}

class VillageData implements IVillageData {
    private constructor(private villageData: IVillageData) {
        
    }
    
    public get VillageId(): number{ return this.villageData.VillageId; };

    public get BuildsEndTime(): number[]{ return this.villageData.BuildsEndTime; }
    //private set BuildsEndTime(val:number[]){ this.villageData.BuildsEndTime = val; }

    public get DemolishEndTime(): number{ return this.villageData.DemolishEndTime; }
    //private set DemolishEndTime(val:number){ this.villageData.DemolishEndTime = val; }

    public get TroopTrains(): TroopTrains { return this.villageData.TroopTrains; }
    //private set TroopTrains(val: TroopTrains){ this.villageData.TroopTrains = val; }

    public get Celebration(): number{ return this.villageData.Celebration; }
    public set Celebration(val:number){ this.villageData.Celebration = val; }//update from load /village/statistics

    public get Storage(): number{ return this.villageData.Storage; }
    //private set Storage(val:number){ this.villageData.Storage = val; }

    public get Granary(): number{ return this.villageData.Granary; }
    //private set Granary(val:number){ this.villageData.Granary = val; }
    
    public get Resources(): Resources{ return this.villageData.Resources; }
    public set Resources(val:Resources){ this.villageData.Resources = val; }//update from load /village/statistics
    
    public get LastUpdateAt(): number{ return this.villageData.LastUpdateAt; }
    //private set LastUpdateAt(val:number){ this.villageData.LastUpdateAt = val; }

    public get AttackCount(): number{ return this.villageData.AttackCount; }
    //private set AttackCount(val:number){ this.villageData.AttackCount = val; }

    public get AttackFirstEndTime(): number{ return this.villageData.AttackFirstEndTime; }
    //private set AttackFirstEndTime(val:number){ this.villageData.AttackFirstEndTime = val; }

    public Read(): void {
        this.villageData.Storage = Number($("#stockBar.warehouse.capacity.value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.villageData.Granary = Number($("#stockBar.granary.capacity.value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.Resources = new Resources(
            Number($("#l1").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l2").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l3").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")),
            Number($("#l4").text().trim().getASCII().replaceAll(".", "").replaceAll(",", ""))
        );

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
                {
                    let val = $(".under_progress td.dur span").last().attr("value");
                    if (val && val != '') {
                        if (!this.TroopTrains[window.Instance.Gid]) this.TroopTrains[window.Instance.Gid] = new TroopTrain();
                        this.TroopTrains[window.Instance.Gid].EndTime = Date.now() + (Number(val) * 1000);
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
                    $(".buildDuration .timer").each(function (i, e) { builds.push(Number($(this).attr("value"))); });
                    this.villageData.BuildsEndTime = builds;

                    //count attack comming
                    let attack_count = 0;
                    let attack_time = 0;
                    $("#movements tr").each(function (i, e) { 

                    });
                    this.villageData.AttackCount = attack_count;
                    this.villageData.AttackFirstEndTime = attack_time;
                    break;
                }
        }
    }

    public Save(): void {
        this.villageData.LastUpdateAt = Date.now();
        localStorage.setItem("TsVillage_" + this.VillageId, JSON.stringify(this));
    }
    public static Load(villageId: number): VillageData {
        let data = localStorage.getItem("TsVillage_" + villageId);
        if(data)
        {
            let villageData = JSON.parse(data) as IVillageData;
            return new VillageData(villageData);
        }
        else return new VillageData({
            VillageId : villageId,
            BuildsEndTime: [],
            DemolishEndTime: 0,
            TroopTrains: {} as { [key in TrainType]: TroopTrain },
            Celebration: 0,
            Storage: 0,
            Granary: 0,
            Resources: new Resources(0,0,0,0),
            LastUpdateAt: 0,
            AttackCount:0,
            AttackFirstEndTime:0
        });
    }

    public static GetCurrent(): VillageData{
        return VillageData.Load(window.Instance.villageId);
    }
}