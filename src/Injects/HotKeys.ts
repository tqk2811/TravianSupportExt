type CallbackFunction = () => void;
class HotKeys{
    private static HotKeyList:{[key: number] : CallbackFunction} = {};
    public static Init() : void{
        $(document).on("keydown", function(e : JQueryEventObject){
			if(document.activeElement.tagName == "INPUT") return;
			if(document.activeElement.tagName == "TEXTAREA") return;
			console.log("e.which:" + e.which + " | e.keyCode " + e.keyCode);

            let func =  HotKeys.HotKeyList[e.which];
            if(func) func();
		});
    }

    public static Push(code: number | number[], func : CallbackFunction): void {
        if(Array.isArray(code)){
            for(let i = 0; i < code.length; i++)
                HotKeys.HotKeyList[code[i]] = func;
        }
        else HotKeys.HotKeyList[code] = func;
    }
}