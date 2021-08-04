class CurrentInstance{
    constructor(){
        this._UserName = $(".playerName").text();

        this._e_build = document.getElementById("build");

        this._e_villages = document.querySelectorAll("#sidebarBoxVillagelist ul li");

        this._e_ActiveVillage = document.querySelector("#sidebarBoxVillagelist ul li.active");

        if(this._e_ActiveVillage){
            this._villageId = parseInt(this._e_ActiveVillage.querySelector("a").href.getParameterByName("newdid"));
        }

        if(this._e_build){
            let gid_str = this.e_build.getAttribute("class").split(" ")[0];
            this._Gid = Number(gid_str.substring(3,gid_str.length));
        }
        else this._Gid = -1;





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
    _e_villages: NodeListOf<Element>;
    _e_ActiveVillage: Element;








    public get UserName(): string{ 
        return this._UserName;
    }
    public get isPlus(): boolean{
        return this._isPlus;
    }
    public get e_build(): Element{
        return this._e_build;
    }
    public get villageId(): number{
        return this._villageId;
    }
}