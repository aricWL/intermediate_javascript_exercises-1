const game = new Game();
game.storePlayer();
game.getCurrentPlayer();

let boardData = new Board();
boardData.buildBoard();






document.addEventListener("DOMContentLoaded", function () {

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
    });


    //Clear the Board Data and InnerHTML
    let newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', function () {
        boardData.clearBoard();
        console.log(boardData);
    });


});