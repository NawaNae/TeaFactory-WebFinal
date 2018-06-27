import './normal.js';
import {NawaNawa} from  './normal.js';
function getVariable()
{
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    return HashStr;
}
var id;
function hashChangeHandler(e)
{

    if(location.hash)
    {
        id=getVariable();
        var news = firebase.database().ref("/news/"+id);
        var img=document.querySelector("#article-image-src");
        var title=document.querySelector("#article-title");
        var content=document.querySelector("#article-content");
       

        var spinner=document.createElement("div");
        spinner.className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active";
//        componentHandler.upgradeElement(spinner);

        news.once('value',(data)=>{
            var val=data.val();
            img.value=val.image;
            document.querySelector(".card img").src=val.image;
            title.value=val.title;
            content.value=val.content;
        });
      

    }
    else{}
}
function resetNews(title,content,imgSrc,uid=id)
{
    var news=firebase.database().ref('/news/'+id);
    var image= new Image();
    var title=title||"無標題";
    var content=content||"無內容";
    image.src=imgSrc;
    var next=(newnews)=>
    {
        news.set(newnews).then(
            ()=>{
                alert("編輯文章"+title+"成功");
            }
        ).catch(e)
        {
            ()=>
            {
                alert("發布文章"+title+e.message);
            }
        }
    }
    image.onload=()=>
    {
        var newnews={
            image:imgSrc,
            title:title,
            content:content,
            time:(new Date(Date.now())).toJSON()
        }
        next(newnews);
    };
    image.onerror=()=>
    {        
        var newnews={
            title:title,
            content:content,
            time:(new Date(Date.now())).toJSON()
        }
        next(newnews);
    };
}
window.onhashchange=hashChangeHandler;
$(
    function()
    {
        hashChangeHandler();
        $("#save-button").on("click",function(){
            var img=document.querySelector("#article-image-src");
            var title=document.querySelector("#article-title");
            var content=document.querySelector("#article-content");
            resetNews(title.value,content.value,img.value);
        })
    }
);