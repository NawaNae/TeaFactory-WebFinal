export var firebaseConfig = {
    apiKey: "AIzaSyCWldsTXM-HqUORn222Ys9cFz-0kvgcj1U",
    authDomain: "teaweb-8fb7b.firebaseapp.com",
    databaseURL: "https://teaweb-8fb7b.firebaseio.com",
    projectId: "teaweb-8fb7b",
    storageBucket: "teaweb-8fb7b.appspot.com",
    messagingSenderId: "384896334158"
  };
  export var firebaseUiConfig = {
    'signInSuccessUrl': '/',// Url to redirect to after a successful sign-in.
    'callbacks': 
    {
        'signInSuccess': 
            function(user, credential, redirectUrl) 
            {
                if (window.opener) 
                {
                    // The widget has been opened in a popup, so close the window
                    // and return false to not redirect the opener.
                    window.close();
                    return false;
                } 
                else
                {
                    return true; // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
                }
            }
    },
    'signInOptions': 
    [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    'tosUrl': 'https://www.google.com'// Terms of service url.
};