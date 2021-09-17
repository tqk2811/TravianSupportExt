class Alliance
{
    public static Render(): void
    {
        if(window.location.pathname.startsWith("/alliance")){
            $("table.allianceMembers .attack").each(function () {
                let e = $(this);
                let alt = e.attr("alt");
                if (alt) {
                    let count = alt.match(/\d+/);
                    let e_numattack = document.createElement("a1");
                    e_numattack.setAttribute("style", "color: red;grid-column-start: 2;");
                    e_numattack.innerText = "( " + count + " ) ";
                    e.get()[0].insertAdjacentElement("beforebegin", e_numattack);
                    e.appendTo(e_numattack);
                }
            });
        }
    }
}