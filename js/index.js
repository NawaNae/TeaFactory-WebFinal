import './normal.js';
import {NawaNawa} from  './normal.js';
window.addEventListener("load",()=>{
    var news=firebase.database().ref("/news").limitToLast(6);
    var nhandlerObj=new NawaNawa.Classes.firebaseChildsHandler(news,".news .card",'.card-title','.card-text','img');
    var certificate = firebase.database().ref("/certificate").limitToLast(4);
    var chandlerObj=new NawaNawa.Classes.firebaseChildsHandler(certificate,".medals .card",'.card-title','undefined','img');
    chandlerObj.addEventListener();
});