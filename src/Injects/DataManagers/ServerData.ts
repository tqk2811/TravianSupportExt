enum TroopId {

}

class Troop {
    public Id: number;
    public Name: string;
    public Resources: NumArray4;
}

class Hero {
    public Name: string;
    public Exp: number;
    public UpdateTime: number;
}

type Heros = { [userName: string]: Hero };
interface IServerData{
    Troops: Troop[];
    Heros : Heros;
}


class ServerData implements IServerData {
    private constructor(private serverData: IServerData) {
        //this.Troops = new Array<Troop>();
        this.Heros = {} as { [userName: string]: Hero };
        this.Save();
    }
    public get Troops(): Troop[] { return this.serverData.Troops; }
    public get Heros():Heros { return this.serverData.Heros; }
    public set Heros(val : Heros) { this.serverData.Heros = val; }


    public Save(): void {
        localStorage.setItem("TsServer", JSON.stringify(this.serverData));
    }
    public static Load(): ServerData {
        let data = localStorage.getItem("TsServer");
        if(data){
            let accountData = JSON.parse(data) as IServerData;
            return new ServerData(accountData);
        }
        else return new ServerData({
            Heros: {} as { [userName: string]: Hero },
            Troops: []
        });
    }
}