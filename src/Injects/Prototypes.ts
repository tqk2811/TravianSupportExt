interface TravianTooltip{
    title:string;
    text:string;
}
interface HTMLElement{
    _travianTooltip: TravianTooltip;
}

interface Element{
    Remove(): void;
    MoveElementUp(times :number): void;
    MoveElementDown(times :number): void;
}
Element.prototype.Remove = function(){
    this.parentElement.removeChild(this);
};
Element.prototype.MoveElementUp = function(times :number = 1){
    while(times >0){
        if(this.previousElementSibling) this.parentNode.insertBefore(this, this.previousElementSibling);
        else break;
        times--;
    }
};
Element.prototype.MoveElementDown = function(times :number = 1){
    while(times >0){
        if(this.nextElementSibling) this.parentNode.insertBefore(this.nextElementSibling, this);
        else break;
        times--;
    }
};

interface NodeList{
    Remove(): void;
}
interface HTMLCollection{
    Remove(): void;
}
NodeList.prototype.Remove = HTMLCollection.prototype.Remove = function(){
    for(let i=this.length-1;i>= 0;i--) 
        if(this[i] && this[i].parentElement) 
            this[i].parentElement.removeChild(this[i]);
}



interface String{
    replaceAll(find: string, replace : string): string;
    format(...args: string[]): string;
    getASCII(): string;
    getParameterByName(name: string): string;
}
String.prototype.replaceAll = function(find: string, replace : string): string {
    let str = this;
    while(true)
    {
        if(str.indexOf(find) >= 0) str = str.replace(find,replace);
        else return str;
    }
}
String.prototype.format = function(...args: string[]){
    return args.reduce((p,c) => p.replace(/%s/,c), this);
};
String.prototype.getASCII = function(){
    return this.replace(/[^\x00-\x7F]/g, "");
}
String.prototype.getParameterByName = function(name: string) : string{
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(this);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

interface Number{
    GetTimeTextFromMiliSecondLeft(): string;
    GetTimeTextFromSecondLeft(): string;
    GetTimeTextFromHour(): string;
    zeroPad(length : number): string;
}
Number.prototype.zeroPad = function(length : number) : string{
    return String(this).padStart(length, '0');
}
Number.prototype.GetTimeTextFromMiliSecondLeft = function() : string{
    return Math.round(this / 1000).GetTimeTextFromSecondLeft();
}
Number.prototype.GetTimeTextFromSecondLeft = function() : string{
    let sec_ = this % 60;
    let temp_ = (this - sec_)/60;
    let min_ = temp_ % 60;
    let hour_ = (temp_ - min_)/60;
    
    let text_ = sec_.zeroPad(2);
    text_ = min_.zeroPad(2) + ":" + text_;
    if(hour_ > 0)text_ =  hour_.zeroPad(2) + ":" + text_;
    return text_;
}
Number.prototype.GetTimeTextFromHour = function() : string{
    let hour_ = Math.floor(this);
    let min = (this - hour_) * 60;
    let min_ = Math.floor(min);
    let sec = (min - min_) * 60;
    //let sec_ = sec.toFixed(3);

    let text_ = sec.zeroPad(2);
    text_ =  min_.zeroPad(2) + ":" + text_;
    if(hour_ > 0) text_ = hour_.zeroPad(2) + ":" + text_;
    return text_;
}




interface Window{
    Instance: CurrentInstance;
}