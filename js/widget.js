import {firebaseConfig as config,firebaseUiConfig as uiConfig} from './firebaseconfig.js';
firebase.initializeApp(config);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
// within the element corresponding to the selector specified.
ui.start('#firebaseui-auth-container', uiConfig);