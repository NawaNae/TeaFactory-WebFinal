import {firebaseConfig} from './firebaseconfig.js';
firebase.initializeApp(firebaseConfig);
var registerBtn=document.querySelector("#register"),
registerClick =function()
{
    firebase.auth().createUserWithEmailAndPassword(document.querySelector("#email").value, document.querySelector("#password").value).then(function()
    {
        if (window.opener) 
        {
            // The widget has been opened in a popup, so close the window
            // and return false to not redirect the opener.
            window.close();
            return false;
        } 
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("error "+errorMessage);
      });
};

registerBtn.onclick=registerClick;
