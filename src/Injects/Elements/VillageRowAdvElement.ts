class VillageRowAdv extends HTMLElement{
    constructor(elements:HTMLElement[]){
        super();
        if(elements) elements.forEach(element => { this.appendChild(element); });
    }
}
customElements.define('ts-village-row-adv', VillageRowAdv);