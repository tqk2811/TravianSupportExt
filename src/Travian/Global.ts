function InitSidebarBoxActiveVillage() : void{
    if(!window.Instance.isPlus){
        let workshop = $("a.layoutButton.workshop.gold");
        if(!workshop.hasClass("disable")){
            workshop.removeClass("gold");
            workshop.addClass("green");
            workshop.off("click");
            workshop.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Workshop });
        }

        let stable = $("a.layoutButton.stable.gold");
        if(!stable.hasClass("disable")){
            stable.removeClass("gold");
            stable.addClass("green");
            stable.off("click");
            stable.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Stable });
        }

        let barracks = $("a.layoutButton.barracks.gold");
        if(!barracks.hasClass("disable")){
            barracks.removeClass("gold");
            barracks.addClass("green");
            barracks.off("click");
            barracks.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Barracks });
        }

        let market = $("a.layoutButton.market.gold");
        if(!market.hasClass("disable")){
            market.removeClass("gold");
            market.addClass("green");
            market.off("click");
            market.on("click", function(){ window.location.href = "/build.php?gid=" + Building.Marketplace });
        }
    }
}

function InitSidebarBoxLinklist():void{
    $("#sidebarBoxLinklist").each(function(){
        // window.Instance.Account.LinkedList.forEach(element => {
            
        // });
    });
}