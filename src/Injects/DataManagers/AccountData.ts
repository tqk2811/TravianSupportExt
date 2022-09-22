interface IAccountData{
    UserName: string;
    LinkedList: ILinkedList[];
    CheckboxData: TCheckboxData;
    VillageAdvanced: VillageAdvanced;
}

class AccountData implements IAccountData {
    private constructor(private accountData: IAccountData) {
        
    }
    public get UserName(): string { return this.accountData.UserName; }
    
    public get LinkedList(): ILinkedList[] { return this.accountData.LinkedList; }
    public set LinkedList(val :ILinkedList[]){ this.accountData.LinkedList = val; }
    public get CheckboxData(): TCheckboxData { return this.accountData.CheckboxData; }

    public get VillageAdvanced(): VillageAdvanced { return this.accountData.VillageAdvanced; }
    public set VillageAdvanced(val :VillageAdvanced){ this.accountData.VillageAdvanced = val; }

    public Save(): void {
        localStorage.setItem("TsAccount_" + this.accountData.UserName, JSON.stringify(this.accountData));
    }
    public static Load(userName: string): AccountData {
        if(!userName || userName == '') throw new Error("userName is null/undefined");
        let data = localStorage.getItem("TsAccount_" + userName);
        if(data){
            let accountData = JSON.parse(data) as IAccountData;
            return new AccountData(accountData);
        }
        else return new AccountData({
            UserName: userName,
            LinkedList: [
                { Name: "Farm List", Url: "/build.php?id=39&gid=16&tt=99", openNewTab: false },
                { Name: "Green Attack Reports", Url: "/report/offensive?opt=AAABAA==", openNewTab: false },
                { Name: "Alli Attack Reports", Url: "/alliance/reports?filter=1,2,3&own=0&page=1", openNewTab: false },
                { Name: "Alli Defend Reports", Url: "/alliance/reports?filter=4,5,6,7&own=0&page=1", openNewTab: false },
                { Name: "Alli Spy Reports", Url: "/alliance/reports?filter=15,16,17&own=0&page=1", openNewTab: false },
                { Name: "Alli Def-Spy Reports", Url: "/alliance/reports?filter=18,19&own=0&page=1", openNewTab: false },
            ],
            CheckboxData: {},
            VillageAdvanced: VillageAdvanced.Build
        });
    }

    public static GetCurrent(): AccountData{
        return AccountData.Load(window.Instance.UserName);
    }
}