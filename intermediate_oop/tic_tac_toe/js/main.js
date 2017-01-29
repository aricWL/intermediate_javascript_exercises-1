const game = new Game();
let boardData = new Board();







document.addEventListener("DOMContentLoaded", function () {

    //Start the Game on Load
    function startGame() {
        game.storePlayer();
        game.getCurrentPlayer();
        boardData.buildBoard();
    }
    startGame();




    //Event Listener On Board
    //Get the current player
    //Set the innerHTML with the correct Player Piece

    board.addEventListener('click', function (e) {
        let id = event.target.getAttribute('id').split("_").slice(1);
        let board = document.getElementById('board');
        let dataSquare = boardData.boardLayout[id[0]][id[1]];
        let square = event.target;


        //Change current player display

        if ($('#current').text() === "Current Player: X") {
            $('#current').text('Current Player: O');
        } else {
            $('#current').text("Current Player: X");
        }

        //If square does not has a symbol in it set square with the current player's symbol
        if (dataSquare.taken === false) {
            game.getCurrentPlayer();
            square.innerHTML = game.currentPlayer.symbol;

            //Get id from clicked elemnent and set symbol in data square
            dataSquare.setSquareSymbol();
            console.log(boardData.boardLayout);


            //Check Game Winner
            if (boardData.gameOver() === true) {
                console.log("game over");
                document.getElementById('blackout').style.display = "block";
                $('#current').text(`The Winner is Player ${game.currentPlayer.symbol}`);

            }

        }
    });


    //Clear the Board Data and InnerHTML
    let newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', function () {
        boardData.clearBoard();
        document.getElementById('blackout').style.display = "none";
        startGame();
    });


});