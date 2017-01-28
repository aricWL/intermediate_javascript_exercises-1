document.addEventListener("DOMContentLoaded", function () {





    let board = document.getElementById('board');
    board.addEventListener('click', function (e) {
        let square = event.target;
        g.getCurrentPlayer();
        square.innerHTML = g.currentPlayer.symbol;

    })


});