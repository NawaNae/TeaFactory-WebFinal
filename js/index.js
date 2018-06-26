import './normal.js';
import {NawaNawa} from  './normal.js';
window.addEventListener("load",()=>{
    var news=firebase.database().ref("/news").limitToLast(6);
    var handlerObj=new NawaNawa.Classes.firebaseChildsHandler(news,".news .card",'.card-title','.card-text','img');
    // news.on('child_added',function(data)
    // {

    //    /* var val=data.val();
    //     var title=val.title;
    //     var src=val.image;
    //     var content=val.content;
    //     var card=document.querySelector(".news .card[data-dbkey="+data.key+"]");
    //     if(!card)
    //     {
    //         cards=document.querySelectorAll(".news .card");
    //         for(card of cards)
    //             if(!card.dataset.dbkey)
    //                 break;
    //         card.dataset.dbkey=data.key;
    //     }
    //     if(src)
    //         card.querySelector('img').src=src;
    //     card.querySelector('.card-title').innerHTML=title;
    //     card.querySelector('.card-text').innerHTML=content;*/
    // });
});