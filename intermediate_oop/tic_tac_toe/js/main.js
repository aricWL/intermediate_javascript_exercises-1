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
    let board = document.getElementById('board');
    board.addEventListener('click', function (e) {
        let square = event.target;
        game.getCurrentPlayer();
        square.innerHTML = game.currentPlayer.symbol;

        //Get id from clicked elemnent and 
        let id = event.target.getAttribute('id').split("_").slice(1);
        console.log(id);
        boardData.boardLayout[id[0]][id[1]].setSquareSymbol();
        console.log(boardData.boardLayout[id[0]][id[1]]);
        console.log(boardData);

        //Check Game Winner
        boardData.gameOver();
        if (boardData.gameOver() === true) {
            console.log("game over");
        }

    });


    //Clear the Board Data and InnerHTML
    let newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', function () {
        boardData.clearBoard();
        console.log(boardData);
        startGame();
        console.log(boardData);
    });


});