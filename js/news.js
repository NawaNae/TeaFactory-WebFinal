import './normal.js';
import {NawaNawa} from  './normal.js';
function getVariable()
{
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    HashStr=HashStr.substring(1, document.location.hash.length);

}
function hashChangeHandler(e)
{

    if(location.hash)
    {
        NawaNawa.getVariable();
        //e.preventDefault();
    }
    else{}
}
window.onhashchange=hashChangeHandler;
$(()=>
{
    var news = firebase.database().ref("/news");
    var handler=new NawaNawa.Classes.firebaseDynamicChildsHandler(news,"#news-container",'one-news-container mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone  card flex-md-row bg-alpha border-none','card-body text-md-left','card-title','card-title');
});