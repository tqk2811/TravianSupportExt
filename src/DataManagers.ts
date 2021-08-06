type NumArray4 = [number,number,number,number];
type TrainType =    Building.Barracks | Building.GreatBarracks | Building.Stable | 
                    Building.GreatStable | Building.Smithy | Building.Workshop | Building.Hospital;

class TroopTrain{
    public IsEnable: boolean;
    public EndTime: number;
}

class VillageData{
    constructor(VillageId: number){
        this.VillageId = VillageId;
        this.BuildsEndTime = [];
        this.DemolishEndTime = 0;
        this.TroopTrains = {} as {[key in TrainType]: TroopTrain};
        this.Celebration = 0;

        this.Storage = 0;
        this.Granary = 0;
        this.Resources = [0,0,0,0];

        this.LastUpdateAt = 0;
        
        this.Save();
    }
    public VillageId: number;

    public BuildsEndTime: number[];
    public DemolishEndTime: number;
    public TroopTrains: {[key in TrainType]: TroopTrain};
    public Celebration: number;

    public Storage: number;
    public Granary: number;
    public Resources: NumArray4;

    public LastUpdateAt: number;

    public Read(): void
    {
        this.Storage = Number($("#stockBar.warehouse.capacity.value").text().getASCII().replaceAll(".","").replaceAll(",",""));
        this.Granary = Number($("#stockBar.granary.capacity.value").text().getASCII().replaceAll(".","").replaceAll(",",""));
        this.Resources = [
            Number($("#l1").text().getASCII().replaceAll(".","").replaceAll(",","")),
            Number($("#l2").text().getASCII().replaceAll(".","").replaceAll(",","")),
            Number($("#l3").text().getASCII().replaceAll(".","").replaceAll(",","")),
            Number($("#l4").text().getASCII().replaceAll(".","").replaceAll(",",""))
        ];

        switch(window.Instance.Gid){
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
                if(val && val != ''){
                    if(!this.TroopTrains[window.Instance.Gid]) this.TroopTrains[window.Instance.Gid] = new TroopTrain();
                    this.TroopTrains[window.Instance.Gid].EndTime = Date.now() + (Number(val) * 1000);
                }
                break;
            }
            case Building.MainBuilding:
            {
                let val = $("#demolish .timer").attr("value");
                if(val && val != ''){
                    this.DemolishEndTime = Date.now() + (Number(val) * 1000);
                }
            }
        }
    }
    
    private ReadNonBuilding():void 
    {
        switch(window.location.pathname){
            case "/dorf1.php":
            case "/dorf2.php":
                {
                    let builds = new Array<number>();
                    $(".buildDuration .timer").each(function(i,e){ builds.push(Number( $(this).attr("value"))); });
                    this.BuildsEndTime = builds;
                    break;
                }
        }
        // if(window.location.pathname.startsWith("/village/statistics"))
        // {
        //     let maintab = window.Instance.e_ActiveTabMain;
        //     if(maintab)
        //     {
        //         let href = maintab.getAttribute("href");
        //         switch(href){
        //             case "/village/statistics/overview":
        //             {
                        
        //             }
        //             case "/village/statistics/resources":
        //             {
                        
        //             }
        //             case "/village/statistics/warehouse":
        //             {
                        
        //             }
        //             case "/village/statistics/culturepoints":
        //             {
        //                 $("#culture_points tr td.cel a").each(function(i,e){
        //                     let row = $(e);
        //                     let id = Number(row.attr("href").getParameterByName("newdid"));
        //                     let time = Number(row.find("span.timer").attr("value"));

        //                     let village =VillageData.Load(id);
        //                     if(!village) village = new VillageData(id);

        //                     village.LastUpdateAt = Date.now() + (time * 1000);
        //                 });
        //             }
        //             case "/village/statistics/troops":
        //             {

        //             }
        //         }
        //     }
        // }
    }

    public Save(): void{
        this.LastUpdateAt = Date.now();
        localStorage.setItem("TsVillage_" + this.VillageId, JSON.stringify(this));
    }
    public static Load(villageId: number): VillageData{
        return JSON.parse(localStorage.getItem("TsVillage_" + villageId)) as VillageData;
    }
}


class AccountData{
    constructor(UserName: string){
        this.UserName = UserName;
        this.LinkedList = new Array<LinkedList>();
        this.Save();
    }
    public UserName: string;
    public LinkedList: Array<LinkedList>;



    public Save(): void{
        localStorage.setItem("TsAccount_" + this.UserName, JSON.stringify(this));
    }
    public static Load(userName: string): AccountData{
        return JSON.parse(localStorage.getItem("TsAccount_" + userName)) as AccountData;
    }
}

class ServerData{
    constructor(){
        this.Troops  = new Array<Troop>();
        this.Heros = {} as { [userName : string]: Hero};
        this.Save();
    }
    public Troops: Array<Troop>;
    public Heros: { [userName : string]: Hero};



    public Save(): void{
        localStorage.setItem("TsServer", JSON.stringify(this));
    }
    public static Load(): ServerData{
        return JSON.parse(localStorage.getItem("TsServer")) as ServerData;
    }
}

class Troop{
    public Id: number;
    public Name: string;
    public Resources: NumArray4;
}
class Hero{
    public Name: string;
    public Exp: number;
    public UpdateTime: number;
}
class LinkedList{
    public Name: string;
    public Url: string;
}
enum TroopId{

}
enum Building{
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