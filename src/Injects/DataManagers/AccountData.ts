
class LinkedList {
    public Name: string;
    public Url: string;
}

interface IAccountData{
    UserName: string;
    LinkedList: LinkedList[];
}

class AccountData implements IAccountData {
    private constructor(private accountData: IAccountData) {
        
    }
    public get UserName(): string { return this.accountData.UserName; }

    public get LinkedList(): LinkedList[] { return this.accountData.LinkedList; }
    public set LinkedList(val :LinkedList[]){ this.accountData.LinkedList = val; }


    public Save(): void {
        localStorage.setItem("TsAccount_" + this.UserName, JSON.stringify(this));
    }
    public static Load(userName: string): AccountData {
        let data = localStorage.getItem("TsAccount_" + userName);
        if(data){
            let accountData = JSON.parse(data) as IAccountData;
            return new AccountData(accountData);
        }
        else return new AccountData({
            UserName: userName,
            LinkedList: []
        });
    }

    public static GetCurrent(): AccountData{
        return AccountData.Load(window.Instance.UserName);
    }
}