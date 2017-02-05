 var score = 0;
 //Grab user data from database will be stored here
 var userArray = [];

 window.addEventListener("load", function () {




     var canvas = document.getElementById("shapes-game"),
         height = canvas.scrollHeight,
         width = canvas.scrollWidth,
         gameOn = false,
         expectedKey = undefined,
         ctx = canvas.getContext('2d'),
         // white triangle = up, red square = down,
         // red triangle = left, white square = right
         expectedKeysMap = {
             white0: 38,
             red1: 40,
             red0: 37,
             white1: 39
         },
         timerSpan = document.getElementById("time-remaining"),
         scoreSpan = document.getElementById("score-val"),
         seconds = 3,
         intervalId;

     canvas.width = width;
     canvas.height = height;





     //******************SHAPE FUNCTIONS***********************//
     var randomSquareCorner = Math.floor(Math.random() * 300 + 50);
     //SHAPES
     var squareRed = {
         corner: [Math.floor(Math.random() * 650 + 50), Math.floor(Math.random() * 650 + 50)],
         width: 50,
         height: 50,
         color: "red",
         draw: function () {
             ctx.fillStyle = this.color;
             ctx.fillRect(this.corner[0], this.corner[1], this.width, this.height);
         }
     }

     var squareWhite = {
         corner: [Math.floor(Math.random() * 650 + 50), Math.floor(Math.random() * 650 + 50)],
         width: 50,
         height: 50,
         color: "white",
         draw: function () {
             ctx.fillStyle = this.color;
             ctx.fillRect(this.corner[0], this.corner[1], this.width, this.height);
         }
     }

     function drawSquareRed() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         squareRed.corner[0];
         squareRed.corner[1];
         squareRed.draw();
     }

     function drawSquareWhite() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         squareWhite.corner[0];
         squareWhite.corner[1];
         squareWhite.draw();
     }


     function drawTriangleWhite() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         var x = Math.floor(Math.random() * 650 + 50);
         var y = Math.floor(Math.random() * 650 + 50);
         ctx.beginPath();
         ctx.fillStyle = "white";
         ctx.moveTo(x, y);
         ctx.lineTo(x + 50, y + 50);
         ctx.lineTo(x, y + 50);
         ctx.fill();
         ctx.closePath();
     }

     function drawTriangleRed() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         var x = Math.floor(Math.random() * 650 + 50);
         var y = Math.floor(Math.random() * 650 + 50);
         ctx.beginPath();
         ctx.fillStyle = "red";
         ctx.moveTo(x, y);
         ctx.lineTo(x + 50, y + 50);
         ctx.lineTo(x, y + 50);
         ctx.fill();
         ctx.closePath();
     }



     //*********************PICK RANDOM SHAPE EVERY 3 SECONDS *****************************//
     var current = 0;

     function pickRandomShape() {
         var arrayOfShapes = [drawTriangleRed, drawTriangleWhite, drawSquareRed, drawSquareWhite];
         var random = arrayOfShapes[Math.floor(Math.random() * 4)];

         if (random === drawTriangleRed) {
             current = 37;

         } else if (random === drawSquareWhite) {
             current = 39;


         } else if (random === drawTriangleWhite) {
             current = 38;


         } else if (random === drawSquareRed) {
             current = 40;


         }
         return random();
     }


     //Prevent window from moving up and down on keypress
     window.addEventListener("keypress", function (event) {
         event.preventDefault();
     });

     var ar = [33, 34, 35, 36, 37, 38, 39, 40];

     $(document).keydown(function (e) {
         var key = e.which;
         //console.log(key);
         //if(key==35 || key == 36 || key == 37 || key == 39)
         if ($.inArray(key, ar) > -1) {
             e.preventDefault();
             return false;
         }
         return true;
     });





     var scoreId = document.getElementById('score-val');
     //****************************CHECK IF KEYPRESS CORRESPONDS WITH CURRENT**************************??
     window.addEventListener("keyup", function (event) {
         event.preventDefault();
         if (event.keyCode !== 32) {


             if (event.keyCode === current) {
                 scoreId.innerHTML = score += 1;
                 pickRandomShape()
                 clearInterval(shapeTimer);
                 shapeTimer = setInterval(function () {
                     pickRandomShape();
                 }, 1500);

             } else if (event.keyCode !== current) {
                 scoreId.innerHTML = score -= 1;
                 clearInterval(shapeTimer);
                 shapeTimer = setInterval(function () {
                     pickRandomShape();
                 }, 1500);
             }
         }
     });




     //**********************GAME COUNTDOWN TIMER ***************************//                  
     var count = 30;

     function countdown() {
         stopGame();
         var timer = document.getElementById('time-remaining');
         if (count === 30) {
             pickRandomShape();
         }
         count--;
         timer.innerHTML = count;
     }

     function stopGame() {
         if (count === 0) {
             clearInterval(gameTimer);
             clearInterval(shapeTimer);
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             document.getElementById('restart-button').style.display = "block";
             updateLeaderBoard();
         }
     }

     var gameTimer;
     var shapeTimer;
     //****************SET INTERVAL ************************************//
     window.addEventListener('keyup', function (e) {
         e.preventDefault();
         if (event.keyCode === 32) {


             gameTimer = setInterval(countdown, 1000);
             shapeTimer = setInterval(function () {
                 pickRandomShape();
             }, 1500);
             document.getElementById('start-game').style.display = "none";
         }
     });




     //*********************RELOAD GAME **************************************//
     document.getElementById('restart-button').addEventListener('click', function () {
         location.reload();
     });


     function updateLeaderBoard() {
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



                     //Check User Score and if Current Score is Greater then User Score in Database, User Score in Database = Current Score

                     firebase.database().ref().child('users').child(uid).child('score').once('value', function (snapshot) {
                         var userDbScore = snapshot.val();
                         console.log(userDbScore)
                         console.log(scoreId.innerHTML);
                         if (userDbScore < scoreId.innerHTML) {

                             firebase.database().ref().child('users').child(uid).update({
                                 score: scoreId.innerHTML
                             });
                         }
                     });


                     user.getToken().then(function (accessToken) {


                     });
                 } else {
                     // User is signed out.


                 }
             },
             function (error) {
                 console.log(error);
             });

     }



 });