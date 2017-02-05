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


//Loop through Users and pull user info into array to be displayed in html
firebase.database().ref().child('users').once('value', function (snapshot) {
    var exists = (snapshot.val() !== null);
    var userDataObj = snapshot.val();

    for (let key in userDataObj) {
        var userData = userDataObj[key]
        console.log(userData.score)
        userArray.push({
            name: userData.username,
            highScore: userData.score
        })
    }

}).then(function () {
    console.log(userArray);
    var descending = userArray.sort((a, b) => Number(b.highScore) - Number(a.highScore));
    console.log(descending);
    var $oList = document.getElementById('leaderboard-ol');
    var htmlStr = ""
    descending.forEach(function (item) {
        htmlStr += `<li>${item.name}: ${item.highScore}`
    })
    $('ol').append(htmlStr);
});





firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in.
            //Hide Auth Button
            $('#firebaseui-auth-container').hide();
            $('#btnLogOut').show();


            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;

            //if User is logged in show their name and profile-pic
            $('#player').show();
            $('#player-pic').attr('src', photoURL);
            $('#player-name').text(displayName);

            console.log(displayName)
                //WRITE USER DATA WHEN SIGNED IN THE FIRST TIME
            checkForFirstTime(uid);

            function userFirstTimeCallback(userId, exists) {
                if (exists) {
                    console.log('user has logged in before!');
                    // Do something here you want to do for non-firstime users...
                } else {
                    // Do something here you want to do for first time users (Store data in database?)
                    console.log('user does not exist becuase they have never logged in before!');
                    userArray.push({
                        name: displayName,
                        highScore: 0
                    });
                    console.log(userArray)

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



            //GET USER TOKEN
            user.getToken().then(function (accessToken) {


            });
        } else {
            console.log('user logged out')
            $('#player').hide();

        }
    },
    function (error) {
        console.log(error);
    });


var logOut = document.getElementById("btnLogOut");

logOut.addEventListener('click', e => {
    firebase.auth().signOut();
    $('#firebaseui-auth-container').show();
    $('#btnLogOut').hide();
    console.log("log out button hit");
});