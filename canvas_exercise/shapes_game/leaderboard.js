// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOmNu09H_PtwIDU5GOKtyoCTR2jqEEi4s",
    authDomain: "shape-game-f01e9.firebaseapp.com",
    databaseURL: "https://shape-game-f01e9.firebaseio.com",
    storageBucket: "shape-game-f01e9.appspot.com",
    messagingSenderId: "987459077457"
};
firebase.initializeApp(config);



var uiConfig = {
    signInSuccessUrl: '/index.html',
    signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,

        ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);




firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(displayName)
                //WRITE USER DATA WHEN SIGNED IN THE FIRST TIME
            checkForFirstTime(uid);

            function userFirstTimeCallback(userId, exists) {
                if (exists) {
                    console.log('user has logged in before!');
                    // Do something here you want to do for non-firstime users...
                } else {
                    console.log('user does not exist becuase they have never logged in before!');
                    // Do something here you want to do for first time users (Store data in database?)
                    function writeUserDataForTheFirstTime(userId, name, email) {
                        firebase.database().ref('users/' + userId).set({
                            username: name,
                            email: email,
                            score: 0

                        });
                    }
                    writeUserDataForTheFirstTime(uid, displayName, email);
                }
            }

            function checkForFirstTime(userId) {
                firebase.database().ref().child('users').child(userId).once('value', function (snapshot) {
                    var exists = (snapshot.val() !== null);
                    userFirstTimeCallback(userId, exists);
                });
            }




            user.getToken().then(function (accessToken) {


            });
        } else {
            // User is signed out.


        }
    },
    function (error) {
        console.log(error);
    });