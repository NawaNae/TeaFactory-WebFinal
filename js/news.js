import './normal.js';
import {NawaNawa} from  './normal.js';
import {commentBoxR} from './G+.js';
function getVariable()
{
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    return HashStr;
}
function hashChangeHandler(e)
{

    if(location.hash)
    {
        var id=getVariable();
        var news = firebase.database().ref("/news/"+id);
        $("#news-detail").modal('show');
        $("#news-detail .news-content").html('');
        var spinner=document.createElement("div");
        spinner.className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active";
        componentHandler.upgradeElement(spinner);
        document.querySelector(".comment-box-container").appendChild(spinner);
        news.once('value',(data)=>{
            var val=data.val();
            $("#news-detail .news-content").html(val.content);
            document.querySelector("#GP").innerHTML='<script src="https://apis.google.com/js/platform.js" async defer></script><g:plusone></g:plusone>'
            $("#news-detail .news-title").html(val.title);
            commentBoxR(".comment-box-container");
        });
      

    }
    else{}
}
window.onhashchange=hashChangeHandler;
$(()=>
{
    setTimeout(()=>document.getElementById('loader').remove(),3500)
    var news = firebase.database().ref("/news");
    var handler=new NawaNawa.Classes.firebaseDynamicChildsHandler(news,"#news-container",'one-news-container mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone  card flex-md-row bg-alpha border-none','card-body text-md-left','card-title','card-title');
    hashChangeHandler();
});