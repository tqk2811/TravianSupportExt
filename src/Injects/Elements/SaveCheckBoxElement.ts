class SaveCheckBoxElement extends HTMLInputElement{
    constructor(name: string){
        super();
        this._name = name;
        this.type = "checkbox";
        this.onchange = this.CheckedChange.bind(this);
        
    }

    private _name: string;

    private CheckedChange(){
        let account = AccountData.GetCurrent();
        //account.
    }
}
customElements.define('save-checkbox', SaveCheckBoxElement);