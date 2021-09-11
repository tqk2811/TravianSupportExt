type SaveCheckBoxCallback = ((checked: boolean) => void);

class SaveCheckBoxElement extends HTMLElement{
    constructor(name: string, callback: SaveCheckBoxCallback = null){
        super();
        this._name = name;
        this._callback = callback;

        this._input = document.createElement("input");
        this._input.type = "checkbox";
        this.attachShadow({mode: 'open'}).appendChild(this._input);

        let account = AccountData.GetCurrent();
        if(account.CheckboxData[name]) 
        {
            this._input.checked = true;
            if(this._callback) this._callback.call(this, this._input.checked);
        }
        this._input.onchange = this.CheckedChange.bind(this);
    }
    private _input: HTMLInputElement;
    private _name: string;
    private _callback: SaveCheckBoxCallback = null;

    private Loaded(){
        if(this._input.checked  && this._callback) this._callback.call(this, this._input.checked);
    }
    private CheckedChange(){
        let account = AccountData.GetCurrent();
        if(this._callback) this._callback.call(this, this._input.checked);
        account.CheckboxData[this._name] = this._input.checked;
        account.Save();
    }
}
customElements.define('save-checkbox', SaveCheckBoxElement);