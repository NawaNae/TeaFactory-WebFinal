import './normal.js';
import {NawaNawa} from  './normal.js';
function getVariable()
{
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    HashStr=HashStr.substring(1, document.location.hash.length);
    return HashStr;
}
function hashChangeHandler(e)
{

    if(location.hash)
    {
        var id=NawaNawa.getVariable();
        var news = firebase.database().ref("/news/"+id);
        news.on('value',()=>{

        });
        $("#news-detail").modal('show');
        $("#news-detail .news-content").html('<div class="mdl-spinner mdl-js-spinner is-active"></div>');

    }
    else{}
}
window.onhashchange=hashChangeHandler;
$(()=>
{
    var news = firebase.database().ref("/news");
    var handler=new NawaNawa.Classes.firebaseDynamicChildsHandler(news,"#news-container",'one-news-container mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone  card flex-md-row bg-alpha border-none','card-body text-md-left','card-title','card-title');
});