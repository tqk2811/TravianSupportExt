class CurrentInstance{
    constructor(){
        this._UserName = $(".playerName").text();

        this._e_build = document.getElementById("build");

        this._e_Villages = document.querySelectorAll("#sidebarBoxVillagelist ul li");

        this._e_ActiveVillage = document.querySelector("#sidebarBoxVillagelist ul li.active");

        if(this._e_ActiveVillage){
            this._villageId = parseInt(this._e_ActiveVillage.querySelector("a").href.getParameterByName("newdid"));
        }

        if(this._e_build){
            let gid_str = this.e_build.getAttribute("class").split(" ")[0];
            this._Gid = Number(gid_str.substring(3,gid_str.length));
        }
        else this._Gid = -1;

        this._isPlus = document.querySelector("#sidebarBoxActiveVillage a.layoutButton.green") != null;

        this._e_TabMains = document.querySelectorAll(".contentNavi a.tabItem");
        this._e_ActiveTabMain = document.querySelector(".contentNavi a.tabItem.active");
        this._e_TabSubs = document.querySelectorAll(".contentNavi div.container");
        this._e_ActiveTabSub = document.querySelector(".contentNavi div.container.active");

        if(this._UserName) this._Account = AccountData.Load(this._UserName);
        if(this._villageId) this._Village = VillageData.Load(this._villageId);

        console.log("TravianSupport Ext: UserName:" + this._UserName 
            + ", isPlus:" + this._isPlus
            + ", Gid:" + this._Gid
            + ", VillageId:" + this._villageId);
    }

    _UserName: string;
    _villageId: number;
    _Gid: number;
    _isPlus: boolean;


    _e_build: Element;

    _e_Villages: NodeListOf<Element>;
    _e_ActiveVillage: Element;

    _e_TabMains: NodeListOf<Element>;
    _e_ActiveTabMain: Element;

    _e_TabSubs: NodeListOf<Element>;
    _e_ActiveTabSub: Element;



    _Account: AccountData;
    _Village: VillageData;


    
    public get UserName(): string{ 
        return this._UserName;
    }
    public get villageId(): number{
        return this._villageId;
    }
    public get Gid(): number{
        return this._Gid;
    }
    public get isPlus(): boolean{
        return this._isPlus;
    }

    public get e_build(): Element{
        return this._e_build;
    }
    public get e_Villages(): NodeListOf<Element>{
        return this._e_Villages;
    }
    public get e_ActiveVillage(): Element{
        return this._e_ActiveVillage;
    }
    public get e_TabMains(): NodeListOf<Element>{
        return this._e_TabMains;
    }
    public get e_ActiveTabMain(): Element{
        return this._e_ActiveTabMain;
    }
    public get e_TabSubs(): NodeListOf<Element>{
        return this._e_TabSubs;
    }
    public get e_ActiveTabSub(): Element{
        return this._e_ActiveTabSub;
    }
    public get Account(): AccountData{
        return this._Account;
    }
    public get Village(): VillageData{
        return this._Village;
    }
}