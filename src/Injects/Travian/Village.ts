class Village {
    public static Reader(): void {
        if (window.Instance.isPlus && window.location.pathname.startsWith("/village/statistics")) {
            let maintab = window.Instance.e_ActiveTabMain;
            if (maintab) {
                let href = maintab.getAttribute("href");
                switch (href) {
                    case "/village/statistics/overview":
                        {
                            break;
                        }
                    case "/village/statistics/resources":
                        {
                            $("#ressources tr").each(function (index, element) {
                                let row = $(element);
                                let vil = row.find("td.vil a").first();
                                if (vil.length > 0) {
                                    let id = Number(vil.attr("href").getParameterByName("newdid"));
                                    let lum = Number(row.find("td.lum").text().trim().getASCII().replaceAll(",", "").replaceAll(".", ""));
                                    let clay = Number(row.find("td.clay").text().trim().getASCII().replaceAll(",", "").replaceAll(".", ""));
                                    let iron = Number(row.find("td.iron").text().trim().getASCII().replaceAll(",", "").replaceAll(".", ""));
                                    let crop = Number(row.find("td.crop").text().trim().getASCII().replaceAll(",", "").replaceAll(".", ""));

                                    let village = VillageData.Load(id);
                                    village.Resources = new Resources([lum, clay, iron, crop]);
                                    village.Save();
                                }
                            });
                            break;
                        }
                    case "/village/statistics/warehouse":
                        {
                            break;
                        }
                    case "/village/statistics/culturepoints":
                        {
                            $("#culture_points tr td.cel a").each(function (index, element) {
                                let row = $(element);
                                let id = Number(row.attr("href").getParameterByName("newdid"));
                                let time = Number(row.find("span.timer").attr("value"));

                                let village = VillageData.Load(id);
                                village.CelebrationEndTime = Date.now() + (time * 1000);
                                village.Save();
                            });
                            break;
                        }
                    case "/village/statistics/troops":
                        {
                            break;
                        }
                }
            }
        }
    }


    public static Render(): void {
        if (window.Instance.isPlus && window.location.pathname.startsWith("/village/statistics")) {
            let maintab = window.Instance.e_ActiveTabMain;
            if (maintab) {
                let href = maintab.getAttribute("href");
                switch (href) {
                    case "/village/statistics/overview":
                        {
                            Village.NumCountAtt("att1", "color:red;");
                            Village.NumCountAtt("att3", "color:#7312a3");
                            Village.ChangeNavigate("att1", "1", "1");
                            Village.ChangeNavigate("att3", "1", "1");
                            Village.ChangeNavigate("def1", "1", "2");
                            Village.ChangeNavigate("def2", "2", "5");
                            Village.ChangeNavigate("def3", "1", "3");
                            $(".unit").each(function (index, element) {
                                let e = $(element);
                                let alt = e.attr("alt");
                                if (alt) {
                                    let count = alt.match(/\d+x/);
                                    let e_numattack = document.createElement("a1");
                                    e_numattack.innerText = count[0];
                                    e.get()[0].insertAdjacentElement("beforebegin", e_numattack);
                                }
                            });
                        }
                    case "/village/statistics/resources":
                        {

                        }
                    case "/village/statistics/warehouse":
                        {

                        }
                    case "/village/statistics/culturepoints":
                        {

                        }
                    case "/village/statistics/troops":
                        {

                        }
                }
            }
        }
    }

    private static NumCountAtt(className: string, color: string): void {
        $("." + className).each(function () {
            let e = $(this);
            let alt = e.attr("alt");
            if (alt) {
                let count = alt.match(/\d+x/);
                let e_numattack = document.createElement("a1");
                e_numattack.setAttribute("style", color);
                e_numattack.innerText = "( " + count + " ) ";
                e.get()[0].insertAdjacentElement("beforebegin", e_numattack);
            }
        });
    }

    private static ChangeNavigate(className: string, filter: string, subfilters: string) : void{
        $("." + className).each(function () {
            let e = $(this);
            let parent = e.parent();
            let href = parent.attr("href");
            if (href) {
                let newdid = href.getParameterByName("newdid");
                parent.attr("href",`/build.php?newdid=${newdid}&gid=16&tt=1&filter=${filter}&subfilters=${subfilters}`);
            }
        });
    }
}