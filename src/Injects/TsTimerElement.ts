enum TimerState
{
    Running,
    Stopped
}
enum TimerCounting{
    Up,
    Down
}

class TsTimerElement extends HTMLElement{
    constructor(){
        super();
        this.className = "tsTimer";

        this.State = TimerState.Running;
        this.Counting = TimerCounting.Down;
        this.isLoaded = false;
        this.AdvText = "%s";
    }

    private isLoaded: boolean;
    public State: TimerState;
    public Counting: TimerCounting;
    public NavigateUrl: string;
    public Color: string;
    public IsSound: boolean;
    public AdvText: string;
    //public IsFlag: boolean;
    //public IsShowZero: boolean;
    public EndIime: number;//milisec

    public Init(): void{
        let e = this;
        if(this.Color) this.style.color = this.Color;
        if(this.NavigateUrl) this.onclick = function(){location.href = e.NavigateUrl};
    }





    
    private static intervalHandle: number;
    public static Start(): void{
        if(!TsTimerElement.intervalHandle) TsTimerElement.intervalHandle = window.setInterval(TsTimerElement.TimerInterval, 1000);
    }

    private static TimerInterval(): void{
        $(".tsTimer").each(function(){
            let timerElement = $(this).get()[0] as TsTimerElement;
            if(timerElement.State == TimerState.Stopped) return;
            let current = Date.now();
            if((timerElement.Counting == TimerCounting.Up && current >= timerElement.EndIime) ||
                (timerElement.Counting == TimerCounting.Down && current <= timerElement.EndIime)){
                let diff = Math.abs(current - timerElement.EndIime);
                //if(timerElement.IsSound && diff <= 1000) ;//play sound                
                timerElement.innerText =  timerElement.AdvText.format(diff.GetTimeTextFromMiliSecondLeft());
                timerElement.isLoaded = true;
            }
            else if(!timerElement.isLoaded)
            {
                timerElement.innerText = timerElement.AdvText.format("00:00");
                timerElement.isLoaded = true;
            }
        });
    }
}