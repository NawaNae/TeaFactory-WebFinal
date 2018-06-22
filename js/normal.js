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
            var origin={r:62, g:80, b:34, a:0.455};
            var diff={r:136-origin.r,g:172-origin.g,b:75-origin.b,a:1-origin.a};
            this.header.style.backgroundColor="rgba("+(diff.r*percent+origin.r)+","+(diff.g*percent+origin.g)+","+(diff.b*percent+origin.b)+","+(diff.a*percent+origin.a)+")";
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
            var origin={r:62, g:80, b:34, a:0.455};
            var diff={r:136-origin.r,g:172-origin.g,b:75-origin.b,a:1-origin.a};
            this.header.style.backgroundColor="rgba("+(diff.r*percent+origin.r)+","+(diff.g*percent+origin.g)+","+(diff.b*percent+origin.b)+","+(diff.a*percent+origin.a)+")";
        }
     
    }
});




