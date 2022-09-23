class Alliance {
    public static Render(): void {
        if (window.location.pathname.startsWith("/alliance")) {
            $("table.allianceMembers .attack").each(function () {
                let e = $(this);
                let alt = e.attr("alt");
                if (alt) {
                    let matches: IterableIterator<RegExpMatchArray> = alt.matchAll(/\d+/g);

                    let attack_count = "0";
                    let raid_count = "0";

                    let attack = matches.next();
                    attack_count = attack?.value;
                    let raid = attack.done ? null : matches.next();
                    raid_count = raid?.value;

                    let e_span = document.createElement("span");
                    e_span.setAttribute("style", "grid-column-start: 2;");

                    e_span.appendChild(Alliance.BuildA1("(","black"));
                    e_span.appendChild(Alliance.BuildA1(attack_count,"red"));
                    e_span.appendChild(Alliance.BuildA1(", ","black"));
                    e_span.appendChild(Alliance.BuildA1(raid_count,"teal"));
                    e_span.appendChild(Alliance.BuildA1(")","black"));
                    
                    e.get()[0].insertAdjacentElement("beforebegin", e_span);
                    e.appendTo(e_span);
                }
            });
        }
    }

    static BuildA1(text: string, color: string): HTMLElement {
        let e_a1 = document.createElement("a1");
        e_a1.setAttribute("style", `color: ${color};`);
        e_a1.innerText = text;
        return e_a1;
    }
}