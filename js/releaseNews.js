import './normal.js';
import {NawaNawa} from  './normal.js';
function releaseNews(title,content,imgSrc)
{
    var news=firebase.database().ref('/news');
    var image= new Image();
    var title=title||"無標題";
    var content=content||"無內容";
    image.src=imgSrc;
    var next=(newnews)=>
    {
        news.push(newnews).then(
            ()=>{
                alert("發布文章"+title+"成功");
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
$(
    ()=>
    {
        $("#release-button").on("click",function(){
            var father=this.parentNode.parentNode.parentNode;
            var content=father.querySelector("#article-content").value,title=father.querySelector("#article-title").value,imgSrc=father.querySelector("img").src;
            releaseNews(title,content,imgSrc);
        })
    }
);