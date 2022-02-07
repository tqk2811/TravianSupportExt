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
    constructor(resource: IResources | TNumArray4){
        if(Array.isArray(resource))
        {
            this.Lumber = resource[0];
            this.Claypit = resource[1];
            this.Iron = resource[2];
            this.Crop = resource[3];
        }
        else
        {
            this.Lumber = resource.Lumber;
            this.Claypit = resource.Claypit;
            this.Iron = resource.Iron;
            this.Crop = resource.Crop;
        }
    }
    public Lumber: number;
    public Claypit: number;
    public Iron: number;
    public Crop: number;

    public static FromNumArray4(arr : TNumArray4): Resources{
        return new Resources([arr[0], arr[1], arr[2], arr[3]]);
    }

    public ToArray4(): TNumArray4{
        return [this.Lumber, this.Claypit, this.Iron, this.Crop];
    }



    public Divide(b: number | IResources | TNumArray4) : Resources{
        return Resources.Divide(this, b);
    }
    public static Divide(a: IResources, b: number | IResources | TNumArray4): Resources{
        if(typeof b === "number")
            return new Resources([a.Lumber / b, a.Claypit / b, a.Iron / b, a.Crop / b]);
        else if(Array.isArray(b))
            return new Resources([a.Lumber / b[0], a.Claypit / b[1], a.Iron / b[2], a.Crop / b[3]]);
        else
            return new Resources([a.Lumber / b.Lumber, a.Claypit / b.Claypit, a.Iron / b.Iron, a.Crop / b.Crop]);
    }


    public Multiple(b: number | IResources | TNumArray4) : Resources{
        return Resources.Multiple(this, b);
    }
    public static Multiple(a: IResources, b: number | IResources | TNumArray4): Resources{
        if(typeof b === "number")
            return new Resources([a.Lumber * b, a.Claypit * b, a.Iron * b, a.Crop * b]);
        else if(Array.isArray(b))
            return new Resources([a.Lumber * b[0], a.Claypit * b[1], a.Iron * b[2], a.Crop * b[3]]);
        else
            return new Resources([a.Lumber * b.Lumber, a.Claypit * b.Claypit, a.Iron * b.Iron, a.Crop * b.Crop]);
    }


    public Minus(b: number | IResources | TNumArray4) : Resources{
        return Resources.Minus(this, b);
    }
    public static Minus(a: IResources, b: number | IResources | TNumArray4): Resources{
        if(typeof b === "number")
            return new Resources([a.Lumber - b, a.Claypit - b, a.Iron - b, a.Crop - b]);
        else if(Array.isArray(b))
            return new Resources([a.Lumber - b[0], a.Claypit - b[1], a.Iron - b[2], a.Crop - b[3]]);
        else
            return new Resources([a.Lumber - b.Lumber, a.Claypit - b.Claypit, a.Iron - b.Iron, a.Crop - b.Crop]);
    }


    public Add(b: number | IResources | TNumArray4) : Resources{
        return Resources.Add(this, b);
    }
    public static Add(a: IResources, b:  number | IResources | TNumArray4): Resources{
        if(typeof b === "number")
            return new Resources([a.Lumber + b, a.Claypit + b, a.Iron + b, a.Crop + b]);
        else if(Array.isArray(b))
            return new Resources([a.Lumber + b[0], a.Claypit + b[1], a.Iron + b[2], a.Crop + b[3]]);
        else
            return new Resources([a.Lumber + b.Lumber, a.Claypit + b.Claypit, a.Iron + b.Iron, a.Crop + b.Crop]);
    }


    public AlwaysPositive() : Resources{
        return Resources.AlwaysPositive(this);
    }
    public static AlwaysPositive(a: IResources | TNumArray4): Resources{
        if(Array.isArray(a))
            return new Resources([Math.max(0, a[0]), Math.max(0, a[1]), Math.max(0, a[2]), Math.max(0, a[3])]);
        else
            return new Resources([Math.max(0, a.Lumber), Math.max(0, a.Claypit), Math.max(0, a.Iron), Math.max(0, a.Crop)]);
    }

    public Max(a: IResources | TNumArray4): Resources{
        if(Array.isArray(a))
            return new Resources([
                Math.max(a[0], this.Lumber),
                Math.max(a[1], this.Claypit),
                Math.max(a[2], this.Iron),
                Math.max(a[3], this.Crop)
            ]);
        else
            return new Resources([
                Math.max(a.Lumber, this.Lumber),
                Math.max(a.Claypit, this.Claypit),
                Math.max(a.Iron, this.Iron),
                Math.max(a.Crop, this.Crop)
            ]);
    }

    public ItemMax() : number{
        return Resources.ItemMax(this);
    }
    public static ItemMax(a: IResources | TNumArray4): number{
        if(Array.isArray(a))
            return Math.max(a[0], a[1], a[2], a[3]);
        else
            return Math.max(a.Lumber, a.Claypit, a.Iron, a.Crop);
    }

    public ItemMaxKey(): string {
        let keys = Object.keys( this );
        let key: string = keys[0];
        for(let i = 1; i < keys.length; i++)
        {
            if(this[keys[i]] > this[key])
                key = keys[i];
        }
        return key;
    }


    public Min(a: IResources | TNumArray4): Resources{
        if(Array.isArray(a))
            return new Resources([
                Math.min(a[0], this.Lumber),
                Math.min(a[1], this.Claypit),
                Math.min(a[2], this.Iron),
                Math.min(a[3], this.Crop)
            ]);
        else
            return new Resources([
                Math.min(a.Lumber, this.Lumber),
                Math.min(a.Claypit, this.Claypit),
                Math.min(a.Iron, this.Iron),
                Math.min(a.Crop, this.Crop)
            ]);
    }

    public ItemMin() : number{
        return Resources.ItemMin(this);
    }
    public static ItemMin(a: IResources | TNumArray4): number{
        if(Array.isArray(a))
            return Math.min(a[0], a[1], a[2], a[3]);
        else 
            return Math.min(a.Lumber, a.Claypit, a.Iron, a.Crop);
    }

    public ItemMinKey(): string {
        let keys = Object.keys( this );
        let key: string = keys[0];
        for(let i = 1; i < keys.length; i++)
        {
            if(this[keys[i]] < this[key])
                key = keys[i];
        }
        return key;
    }

    public floor(): Resources{
        return Resources.floor(this);
    }
    public static floor(a: IResources | TNumArray4): Resources{
        if(Array.isArray(a))
            return new Resources([Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3])]);
        else
            return new Resources([Math.floor(a.Lumber), Math.floor(a.Claypit), Math.floor(a.Iron), Math.floor(a.Crop)]);
    }


    public round(): Resources{
        return Resources.round(this);
    }
    public static round(a: IResources | TNumArray4): Resources{
        if(Array.isArray(a))
            return new Resources([Math.round(a[0]), Math.round(a[1]), Math.round(a[2]), Math.round(a[3])]);
        else
            return new Resources([Math.round(a.Lumber), Math.round(a.Claypit), Math.round(a.Iron), Math.round(a.Crop)]);
    }

    public Total(): number{
        return Resources.Total(this);
    }
    public static Total(a: IResources | TNumArray4): number{
        if(Array.isArray(a))
            return a[0] + a[1] + a[2] + a[3];
        else
            return a.Lumber + a.Claypit + a.Iron + a.Crop;
    }

    // public FixTarget(max_received_target: IResources): Resources{
    //     return new Resources([
    //         this.Lumber > max_received_target.Lumber ? 0 : this.Lumber,
    //         this.Claypit > max_received_target.Claypit ? 0 : this.Claypit,
    //         this.Iron > max_received_target.Iron ? 0 : this.Iron,
    //         this.Crop > max_received_target.Crop ? 0 : this.Crop
    //     ]);
    // }

    // public FixCurrent(max_send_current: IResources): Resources{
    //     return new Resources([
    //         this.Lumber > max_send_current.Lumber ? 999999 : this.Lumber,
    //         this.Claypit > max_send_current.Claypit ? 999999 : this.Claypit,
    //         this.Iron > max_send_current.Iron ? 999999 : this.Iron,
    //         this.Crop > max_send_current.Crop ? 999999 : this.Crop
    //     ]);
    // }


    private static _ConstResources : TConstResources = {
        "c_0" : { Resources: Resources.FromNumArray4([6400,6650,5940,1340]), RunTwice : 1 },
        "c_1" : { Resources: Resources.FromNumArray4([29700,33250,32000,6700]), RunTwice : 1 },
        "c_2" : { Resources: Resources.FromNumArray4([14850,16625,16000,3350]), RunTwice : 1 },
        "c_3" : { Resources: Resources.FromNumArray4([9900,11084,10667,2234]), RunTwice : 1 },
    }

    public static get CelebrationResources() : TConstResources { return Resources._ConstResources; }

    public toString(): string {
        return JSON.stringify(this);
    }
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