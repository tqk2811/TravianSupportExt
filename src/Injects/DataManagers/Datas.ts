//-------------------------------------account-------------------------------------
enum VillageAdvanced {
    None,
    Build,
    TroopTrains,
    Celebration,
    Resource,
    AttackRed
}
interface ILinkedList {
    openNewTab: boolean;
    Name: string;
    Url: string;
}
type TCheckboxData = { [key: string]: boolean };







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

type TTroopTrain =  Building.Barracks | Building.GreatBarracks | Building.Stable |
                    Building.GreatStable | Building.Smithy | Building.Workshop | Building.Hospital;
type TTroopTrains = { [key : number]: ITroopTrain };

type TTroopBuilding = Building.Barracks | Building.Stable | Building.Workshop | 
                    Building.GreatBarracks | Building.GreatStable;

type TNumArray4 = [number, number, number, number];


//can't use enum in Mapped types, that key number is TrainType
interface ITroopTrain{
    IsEnable: boolean;
    EndTime: number;
}

const TroopTrain_Data: {[key in TTroopBuilding ]: { color:string, name:string }} = 
    {
        [Building.Barracks]: { color: "#0069FF", name: "b" },
        [Building.GreatBarracks]: { color: "#78A5D3", name: "B" },
        [Building.Stable]: { color: "#7700F6", name: "s" },
        [Building.GreatStable]: { color: "#C574F3", name: "S" },
        [Building.Workshop]: { color: "#C84545", name: "w" },
    };

interface IMarketResources{
    Resources: IResources;
    RunTwice: number;
}
type TConstResources = { [key : string]: IMarketResources };

interface IResources{
    Lumber: number;
    Claypit: number;
    Iron: number;
    Crop: number;
}
class Resources implements IResources{
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

    public static FromNumArray4(arr : TNumArray4): Resources{
        return new Resources(arr[0], arr[1], arr[2], arr[3]);
    }

    private static _ConstResources : TConstResources = {
        "c_0" : { Resources: Resources.FromNumArray4([6400,6650,5940,1340]), RunTwice : 1 },
        "c_1" : { Resources: Resources.FromNumArray4([29700,33250,32000,6700]), RunTwice : 1 },
        "c_2" : { Resources: Resources.FromNumArray4([14850,16625,16000,3350]), RunTwice : 1 },
        "c_3" : { Resources: Resources.FromNumArray4([9900,11084,10667,2234]), RunTwice : 1 },
    }

    public static get CelebrationResources() : TConstResources { return Resources._ConstResources; }
}




//-------------------------------------server-------------------------------------

// enum TroopId {  }
type TTroopName =  { [lang : string]: string };
interface ITroop{
    Name: TTroopName;
    Resources: IResources;
}
type TTroopData = { [key: number | string]: ITroop };



interface IHero {
    Exp: number;
    UpdateTime: number;
}
type THeros = { [userName: string]: IHero };