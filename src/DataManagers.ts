type NumArray4 = Array<[number,number,number,number]>;
type TrainType = "Barack" | "GBarack" | "Stable" | "GStable" | "Smithy" | "Workshop" | "Hospital";

export class TroopTrain{
    public IsEnable: boolean;
    public EndTime: number;
}

export class VillageData{
    public Id: number;

    public Builds: number[];
    public Demolish: number;

    public Storage: number;
    public Granary: number;
    public Resources: NumArray4;

    public Celebration: number;

    public LastUpdateAt: number;
    public Troops: {[key: TrainType]: TroopTrain};

    public Save(): void{
        this.LastUpdateAt = Date.now();
        localStorage.setItem("village_" + this.Id.toString(), JSON.stringify(this));
    }
    public static Load(id: number): VillageData{
        return JSON.parse(localStorage.getItem("village_" + id.toString())) as VillageData;
    }
}


export class AccountData{
    public Id: number;




    public Save(): void{
        localStorage.setItem("account_" + this.Id.toString(), JSON.stringify(this));
    }
    public static Load(id: number): AccountData{
        return JSON.parse(localStorage.getItem("account_" + id.toString())) as AccountData;
    }
}