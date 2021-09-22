interface IServerData{
    Troops: TTroopData;
    Heros : THeros;
}
class ServerData implements IServerData {
    private constructor(private serverData: IServerData) {
        
    }
    public get Troops(): TTroopData { return this.serverData.Troops; }
    public get Heros() : THeros { return this.serverData.Heros; }
    //public set Heros(val : THeros) { this.serverData.Heros = val; }


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
            Heros: {},
            Troops: {}
        });
    }
}