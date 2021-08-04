type NumArray4 = Array<[number,number,number,number]>;
type TrainType = "Barack" | "GBarack" | "Stable" | "GStable" | "Smithy" | "Workshop" | "Hospital";

class TroopTrain{
    public IsEnable: boolean;
    public EndTime: number;
}

class VillageData{
    public Id: number;

    public Builds: number[];
    public Demolish: number;
    public Troops: {[key in TrainType]: TroopTrain};
    public Celebration: number;

    public Storage: number;
    public Granary: number;
    public Resources: NumArray4;

    public LastUpdateAt: number;

    public Save(): void{
        this.LastUpdateAt = Date.now();
        localStorage.setItem("village_" + this.Id.toString(), JSON.stringify(this));
    }
    public static Load(id: number): VillageData{
        return JSON.parse(localStorage.getItem("village_" + id.toString())) as VillageData;
    }
}


class AccountData{
    public UserName: string;




    public Save(): void{
        localStorage.setItem("account_" + this.UserName, JSON.stringify(this));
    }
    public static Load(userName: string): AccountData{
        return JSON.parse(localStorage.getItem("account_" + userName)) as AccountData;
    }
}

class ServerData{
    public Troops: Array<Troop>;
    public Heros: { [userName : string]: Hero};



    public Save(): void{
        localStorage.setItem("server", JSON.stringify(this));
    }
    public static Load(): ServerData{
        return JSON.parse(localStorage.getItem("server")) as ServerData;
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