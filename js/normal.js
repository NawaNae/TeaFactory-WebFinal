var NawaNawa=NawaNawa||{};

NawaNawa.Classes=NawaNawa.Classes||{};
NawaNawa.Classes.ScrollController=
class ScrollController
{
    constructor(){
        this.lastTop=0;

        this.addEventListiner();
    }
    _onScroll(e)
    {
        var diff=this.top-this.lastTop;
        this.lastTop=this.top;
        this.onScroll(e);
        if(diff>0)
            this.onScrollDown(e);
        else(diff<0)
            this.onScrollUp(e);

    }
    onScroll(e)
    {}
    onScrollUp(e)
    {}
    onScrollDown(e)
    {}
    addEventListiner()
    {
        window.addEventListener("scroll",e=>this._onScroll(e));
    }
    updateBody()
    {
        var body = document.body; // For Safari
        var html = document.documentElement;
        this.body=typeof body.scrollTop!=='undefined'?body:typeof html.scrollTop!=='undefined'?html:undefined;
    }
    get top()
    {return window.pageYOffset}
    set top(val)
    {window.pageYOffset=val;}
    get bottom()
    {return window.pageYOffset+window.innerHeight;}
    set bottom(val)
    {this.top=val-window.innerHeight;}
}
window.addEventListener("load",()=>
{
    var topNavCtrl=new NawaNawa.Classes.ScrollController();
    NawaNawa.navScrollController=topNavCtrl;
    topNavCtrl.header=document.querySelector("header.mdl-layout__header.fixed-top");
    topNavCtrl.onScrollDown=function()
    {
        var height=this.header.offsetHeight;
        if(this.top>0&&this.header.classList.contains("mdl-layout__header--transparent"))
            this.header.classList.remove("mdl-layout__header--transparent");
        if(this.top<=height*3)
        {
            var percent=this.top/(height*3);
            this.header.style.backgroundColor="rgba("+136*percent+","+176*percent+","+75*percent+","+1*percent+")";
        }
        else
        {
            this.header.style.backgroundColor="";
            if(!this.header.classList.contains("nav-bar-background--scrolled"))
                this.header.classList.add("nav-bar-background--scrolled");
        }
    }
    topNavCtrl.onScrollUp=function()
    {
        var height=this.header.offsetHeight;
        if(this.top==0&&!this.header.classList.contains("mdl-layout__header--transparent"))
        {
            this.header.classList.add("mdl-layout__header--transparent");
            this.header.style.backgroundColor=undefined;
        }   
        if(this.top<=height*3&&this.top!==0)
        {
            this.header.style.backgroundColor=undefined;
            if(this.header.classList.contains("nav-bar-background--scrolled"))
                this.header.classList.remove("nav-bar-background--scrolled");
            var percent=this.top/(height*3);
            this.header.style.backgroundColor="rgba("+66*percent+","+66*percent+","+66*percent+","+1*percent+")";
        }
     
    }
    var bottomNavCtrl=new NawaNawa.Classes.ScrollController();
    NawaNawa.navScrollController=bottomNavCtrl;
    bottomNavCtrl.header=document.querySelector("header.mdl-layout__header.fixed-bottom");
    bottomNavCtrl.footer=document.querySelector(".mdl-mini-footer");
    bottomNavCtrl.onScrollDown=function()
    {
       if(this.bottom>=this.footer.offsetTop)
        {
            if(!this.header.classList.contains("hide"))
                this.header.classList.add("hide");
        }
    }
    bottomNavCtrl.onScrollUp=function()
    {
        if(this.bottom<=this.footer.offsetTop)
        {
            if(this.header.classList.contains("hide"))
                this.header.classList.remove("hide");
        }
            
    }
});


