import './normal.js';
import {NawaNawa} from  './normal.js';
window.addEventListener("load",()=>{
    var news=firebase.database().ref("/news").limitToLast(6);
    var nhandlerObj=new NawaNawa.Classes.firebaseChildsHandler(news,".news .card",'.card-title','.card-text','img');
    var certificate = firebase.database().ref("/certificate").limitToLast(4);
    var chandlerObj=new NawaNawa.Classes.firebaseChildsHandler(certificate,".medals .card",'.card-title','undefined','img');
    chandlerObj.addEventListener();
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
    $('.buttons .delete-button').on('click',function()
    {
        var container=this.parentNode.parentNode;
            if(container.dataset.dbkey)
                if(confirm("確定要刪除文章?這個操作將無法復原"))
                    NawaNawa.removeNews(container.dataset.dbkey); 
    });
    $('.buttons .edit-button').on('click',function()
    {
        var container=this.parentNode.parentNode;
        if(container.dataset.dbkey)
        {
            location.href="editNews.html#"+container.dataset.dbkey;
        }    
    });
    $('.buttons .read-button').on('click',function()
    {
        var container=this.parentNode.parentNode;
        if(container.dataset.dbkey)
            location.href="news.html#"+container.dataset.dbkey;
    })
});