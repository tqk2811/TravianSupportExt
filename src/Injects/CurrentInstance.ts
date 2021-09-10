class CurrentInstance{
    constructor(){
        this._UserName = $(".playerName").text();

        this._e_build = document.getElementById("build");
        this._e_sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
        if(this._e_sidebarBoxVillagelist)
        {
            this._e_Villages = this._e_sidebarBoxVillagelist.querySelectorAll(".villageList div.listEntry");
            this._e_ActiveVillage = this._e_sidebarBoxVillagelist.querySelector(".villageList div.listEntry.active");
            if(this._e_ActiveVillage){
                this._villageId = parseInt(this._e_ActiveVillage.querySelector("a").href.getParameterByName("newdid"));
            }
        }

        if(this._e_build){
            let gid_str = this.e_build.getAttribute("class").split(" ")[0];
            this._Gid = Number(gid_str.substring(3,gid_str.length)) as Building;
        }
        else this._Gid = Building.None;

        this._isPlus = document.querySelector("#sidebarBoxActiveVillage a.layoutButton.green") != null;

        this._e_TabMains = document.querySelectorAll(".contentNavi a.tabItem");
        this._e_ActiveTabMain = document.querySelector(".contentNavi a.tabItem.active");
        this._e_TabSubs = document.querySelectorAll(".contentNavi div.container");
        this._e_ActiveTabSub = document.querySelector(".contentNavi div.container.active");

        this._Server = ServerData.Load();

        console.log("TravianSupport Ext: UserName:" + this._UserName 
            + ", isPlus:" + this._isPlus
            + ", Gid:" + this._Gid
            + ", VillageId:" + this._villageId);
    }

    private _UserName: string;
    private _villageId: number;
    private _Gid: Building;
    private _isPlus: boolean;


    private _e_build: Element;
    private _e_sidebarBoxVillagelist: Element;

    private _e_Villages: NodeListOf<Element>;
    private _e_ActiveVillage: Element;

    private _e_TabMains: NodeListOf<Element>;
    private _e_ActiveTabMain: Element;

    private _e_TabSubs: NodeListOf<Element>;
    private _e_ActiveTabSub: Element;

    private _Server: ServerData;

    
    public get UserName(): string{ 
        return this._UserName;
    }
    public get villageId(): number{
        return this._villageId;
    }
    public get Gid(): Building{
        return this._Gid;
    }
    public get isPlus(): boolean{
        return this._isPlus;
    }
    public get e_build(): Element{
        return this._e_build;
    }
    public get e_sidebarBoxVillagelist(): Element{
        return this._e_sidebarBoxVillagelist;
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
    public get Server(): ServerData{
        return this._Server;
    }
}

