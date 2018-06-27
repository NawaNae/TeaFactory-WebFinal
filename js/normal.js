var NawaNawa=NawaNawa||{};
NawaNawa.Classes=NawaNawa.Classes||{};
NawaNawa.Classes.firebaseDynamicChildsHandler=
class firebaseDynamicChildsHandler
{
    constructor(firebaseRef,fatherQuery,containerClassList,textContainerClassList,titleClassList,contentClassList,orderBy='time')
    {
        this.ref=firebaseRef;
        this.containerClassList=containerClassList;
        this.orderBy=orderBy;
        this.titleClassList=titleClassList;
        this.contentClassList=contentClassList;
        this.fatherQuery=fatherQuery;
        this.textContainerClassList=textContainerClassList;
        this.htmlElements=[];
        this._onValue=data=>{
            var valsO=data.val();
            this.htmlElements=[];
            this.father.innerHTML="";
            var elements=this.htmlElements;

            var vals=[];
            for (var key in valsO)
            {
                vals.push(valsO[key]);
                valsO[key].key=key;
            };
            while(elements.length<vals.length)
                elements.push(this.createElement());
            if(this.orderBy)
                vals.sort((a,b)=>b[this.orderBy]>a[this.orderBy]);
            for(var i=0;i<elements.length&&i<vals.length;i++)
            {
                var element=elements[i],title=element.title,content=element.content,image=element.img;
                var val=vals[i];
                element.container.dataset.dbkey=val.key;
                if(title)title.innerHTML=val.title;
                if(content)content.innerHTML=val.content;
                if(image)image.src=val.image||'./image/home/no_images.png';
            }
            this.onValue(data);
        }
        if(firebaseRef&&fatherQuery&&containerClassList&&textContainerClassList&&titleClassList&&contentClassList&&orderBy)
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
    createElement()
    {
        var container = document.createElement('div'),img=new Image(),title=document.createElement("div"),content=document.createElement("div");
        var textContainer= document.createElement("div");
        container.className=(this.containerClassList);
        textContainer.className=(this.textContainerClassList);
        title.className=(this.titleClassList);
        content.className=(this.contentClassList);
        container.appendChild(img);
        container.appendChild(textContainer);
        textContainer.appendChild(title);
        textContainer.appendChild(content);
        var containerObj={};
        containerObj.container=container;
        containerObj.img=img;
        containerObj.title= title;
        containerObj.content=content;
        if(this.father)
            this.father.appendChild(container);
        return containerObj;
    }
    get father()
    {if(this.fatherQuery)return document.querySelector(this.fatherQuery);}
}
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
            for (var key in valsO)
            {
                vals.push(valsO[key])
                valsO[key].key=key;
            };
            if(this.orderBy)
                vals.sort((a,b)=>b[this.orderBy]>a[this.orderBy]);
            for(var i=0;i<elements.length&&i<vals.length;i++)
            {
                var element=elements[i],title=element.querySelector(this.titleQuery),content=element.querySelector(this.contentQuery),image=element.querySelector(this.imageQuery);
                var val=vals[i];
                element.dataset.dbkey=val.key;
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
        管理員:['syF5GwOXBcPPhfS6CJ66lbQuOea2','BEhHWgsSTGaJV91kzgNxF2LbUPD2']
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
            $('.accountName').text(displayName||"未設定");
            $('.accountLevel').text(NawaNawa.userLevelKey(uid));
            $('.accountEmail').text(email||"未設定" + " " + (emailVerified?"已驗證":"未驗證"));
            $('.accountPhone').text(phoneNumber||"未設定");
            //console.log(providerData);
            $('.accountProvider').text(providerData[0].providerId);
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




