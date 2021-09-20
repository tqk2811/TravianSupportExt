//-------------------------------------account-------------------------------------
enum VillageAdvanced {
    None,
    Build,
    TroopTrains,
    Celebration,
    Resource,
    AttackRed
}
class LinkedList {
    public openNewTab: boolean;
    public Name: string;
    public Url: string;
}
class TroopResource{
    
}
type CheckboxData = { [key: string]: boolean };







//-------------------------------------village-------------------------------------
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

type TroopBuilding = Building.Barracks | Building.Stable | Building.Workshop | 
                    Building.GreatBarracks | Building.GreatStable;

type NumArray4 = [number, number, number, number];


//can't use enum in Mapped types, that key number is TrainType
type TypeTroopTrains = { [key : number]: TroopTrain };

class TroopTrain {
    constructor(){
        this.IsEnable = false;
        this.EndTime = 0;
    }
    public IsEnable: boolean;
    public EndTime: number;
}
const TroopTrain_Data: {[key in TroopBuilding]: { color:string, name:string }} = 
    {
        [Building.Barracks]: { color: "#0069FF", name: "b" },
        [Building.GreatBarracks]: { color: "#78A5D3", name: "B" },
        [Building.Stable]: { color: "#7700F6", name: "s" },
        [Building.GreatStable]: { color: "#C574F3", name: "S" },
        [Building.Workshop]: { color: "#C84545", name: "w" },
    };

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

    public static FromNumArray4(arr : NumArray4): Resources{
        return new Resources(arr[0], arr[1], arr[2], arr[3]);
    }
}




//-------------------------------------server-------------------------------------

// enum TroopId {  }
type TroopName =  { [lang : string]: string };
class Troop {
    constructor(){
        this.Name = {};
        this.Resources = new Resources(0, 0, 0, 0);
    }
    //public Id: number;
    public Name: TroopName;
    public Resources: Resources;
}
type TroopData = { [key: number]: Troop };



class Hero {
    public Exp: number;
    public UpdateTime: number;
}
type Heros = { [userName: string]: Hero };