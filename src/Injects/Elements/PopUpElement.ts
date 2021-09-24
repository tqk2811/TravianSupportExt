class PopUpElement extends HTMLElement{
    constructor(id: string){
        if($(`pop-up#${id}`).length > 0) throw new Error(`PopUp with id ${id} already exists`);
        super();
        this.id = id;
        document.body.appendChild(this);
        let t = this;
        this.isDown = false;
        this.addEventListener('mousedown', this.mouseDown.bind(this), true);
        this.addEventListener('mouseup', this.mouseup.bind(this), true);
        this.addEventListener('mousemove', this.mousemove.bind(this), true);

        this.innerHTML = `
        <div class="header">
            <div class="buttonsWrapper">
                <a class="layoutButton buttonFramed withIcon round green btn-close" href="#">
                    <img src="${window.TsResources.svg_close}"/>
                </a>
            </div>
        </div>
        <div class="content">

        </div>
        <div class="footer">
            
        </div>
        `;

        $(this).find('.btn-close').click(this.Close.bind(this));
    }

    private isDown: boolean;
    private offSetX: number;
    private offSetY: number;
    private mouseDown(e: MouseEvent){
        let target =  $(e.target);
        if(e.target == this || target.hasClass("header") || target.hasClass("buttonsWrapper"))
        {
            this.isDown = true;
            this.offSetX = this.offsetLeft - e.clientX;
            this.offSetY = this.offsetTop - e.clientY;
        }
    }
    private mouseup(e: MouseEvent){
        this.isDown = false;
    }
    private mousemove(e: MouseEvent){
        e.preventDefault();
        if(this.isDown)
        {
            this.style.left = `${e.clientX + this.offSetX}px`;
            this.style.top  = `${e.clientY + this.offSetY}px`;
        }
    }

    public Close(){
        this.remove();
    }
}
customElements.define('pop-up', PopUpElement);