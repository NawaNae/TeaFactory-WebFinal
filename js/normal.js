var NawaNawa=NawaNawa||{};
NawaNawa.Classes=NawaNawa.Classes||{};
NawaNawa.Classes.firebaseChildsHandler=
class firebaseChildsHandler
{
    constructor(firebaseRef,queryString,titleQueryString,contentQueryString,imageQueryString,orderBy='time')
    {
        this.ref=firebaseRef;
        this.queryString=queryString;
        this.orderBy=orderBy;
        this.titleQuery=titleQueryString;
        this.contentQuery=contentQueryString;
        this.imageQuery=imageQueryString;
        this._onValue=data=>{
            var valsO=data.val();
            var elements=this.htmlElements;
            var vals=[];
            for (var key in valsO)vals.push(valsO[key]);
            if(this.orderBy)
                vals.sort((a,b)=>b[this.orderBy]>a[this.orderBy]);
            for(var i=0;i<elements.length&&i<vals.length;i++)
            {
                var element=elements[i],title=element.querySelector(this.titleQuery),content=element.querySelector(this.contentQuery),image=element.querySelector(this.imageQuery);
                var val=vals[i];
                if(title)title.innerHTML=val.title;
                if(content)content.innerHTML=val.content;
                if(image)image.src=val.image||'./image/home/no_images.png';
            }
            this.onValue(data);
        }
        if(firebaseRef&&queryString&&titleQueryString&&contentQueryString&&imageQueryString&&orderBy)
            this.addEventListener();
    }
    addEventListener()
    {
        if(!this.ref){console.warn("請設定Dbref才會執行handle");return;}
        if(!this.htmlElements){return;}
        this.ref.on("value",this._onValue);
    }
    onValue(data)
    {}
    get htmlElements()
    {
        if(!this.queryString){console.warn("請設定篩選HtmlElement樣式否則無法更新");return;}
        return document.querySelectorAll(this.queryString);
    }

}
NawaNawa.Classes.ScrollController=
class ScrollController
{
    constructor(){
        this.lastTop=0;

        this.addEventListener();
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
    addEventListener()
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
NawaNawa.userLevelKey=function(uid)
{
    var levelUidTable={
        管理員:['syF5GwOXBcPPhfS6CJ66lbQuOea2']
    };

    var levelKey;
    for (var key in levelUidTable)
        if(levelUidTable[key].find(ele=>ele===uid))
            return key;
    return 'normal';
        
}
NawaNawa.userLevel = function(uid)
{
    var levelKeyValue=
    {
        管理員:4,
        用戶:1,
        訪客:0
    };
    return levelKeyValue[NawaNawa.userLevelKey(uid)];
}
import {firebaseConfig} from './firebaseconfig.js';
  firebase.initializeApp(firebaseConfig);
  let initApp = function() {
    let checkAuth=function(user)
    {
        if (user) {
          // User is signed in.
          
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var uid = user.uid;
          var phoneNumber = user.phoneNumber;
          var providerData = user.providerData;
          
          user. getIdToken().then(function(accessToken) {
            $('#login-dialog').modal('hide');
            $('.accountName').text(displayName);
            $('.accountLevel').text(NawaNawa.userLevelKey(uid));
            $('.accountEmail').text("email\t"+email + " " + (emailVerified?"驗證":"未驗證"));
            $('.accountPhone').text("電話\t"+phoneNumber);
            //console.log(providerData);
            $('.accountProvider').text("登入方式\t"+providerData[0].providerId);
            document.getElementById('account-button').dataset.target="#account-dialog";
            document.body.dataset.userLevelKey=NawaNawa.userLevelKey(uid);
          });
        } else {
          // User is signed out.
          $('.accountName').text("訪客");
          $('.accountLevel').text("");
          $('.accountEmail').text("");
          $('.accountPhone').text("");
          $('.accountProvider').text("");
          $('#account-dialog').modal('hide');
          document.body.dataset.userLevelKey=undefined;
          document.getElementById('account-button').dataset.target="#login-dialog";
          //   document.getElementById('sign-in-status').textContent = 'Signed out';
          //   document.getElementById('sign-in').textContent = 'Sign in';
        }
      }
      let onerror= function(error) {
        console.log(error);
      }
    firebase.auth().onAuthStateChanged(checkAuth,onerror);
  };

export {NawaNawa} ;


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
    initApp();
    $("#saveProfileChange").on('click',function()
    {
       var father=this.parentNode;
       var name=father.querySelector("#account-name").value;
       var password = father.querySelector("#password").value;
       father.querySelector("#account-name").value="";
       father.querySelector("#password").value="";
       var user = firebase.auth().currentUser;
        var newProfile={};
        if(name)newProfile.displayName=name;
        if(password)user.updatePassword(password);
        user.updateProfile(newProfile).then(
        function() {
            $('#accountName').text(name);
        }).catch(function(error) {
            console.log(error.message);
        });
    })
});




