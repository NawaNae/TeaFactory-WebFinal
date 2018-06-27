import './normal.js';
import {NawaNawa} from  './normal.js';
window.addEventListener("load",()=>{
    var news=firebase.database().ref("/news").limitToLast(6);
    var handlerObj=new NawaNawa.Classes.firebaseChildsHandler(news,".news .card",'.card-title','.card-text','img');
});