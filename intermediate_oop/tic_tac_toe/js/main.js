document.addEventListener("DOMContentLoaded", function () {



});


function Player(name, symbol, turn) {
    this.turn = turn;
    this.symbol = symbol;
    this.name = name;
}

function Game() {
    this.players = [];
    this.player1 = new Player('torre', 'X', true);
    this.player2 = new Player('not Torre', 'O', false);
    this.storePlayer = function () {
        this.players.push(this.player1, this.player2);
        return this.players;
    }
    this.currentPlayer = undefined;
    this.getCurrentPlayer = function () {
        if (this.players[0].turn) {
            this.currentPlayer = this.players[0];
            this.players[0].turn = false;
            this.players[1].turn = true;
        } else {
            this.currentPlayer = this.players[1];
            this.players[1].turn = false;
            this.players[0].turn = true;
        }
    }
    this.play = function () {
        this.storePlayer();
        this.getCurrentPlayer();
    }
}
var g = new Game();
g.storePlayer();
g.getCurrentPlayer();



function Square() {
    this.taken = false;
    this.symbol = symbol;

}

Square.protoype.isFree() {
    if (this.taken) {
        return true;
    } else {
        return false;
    }
}

Square.prototype.setSquareSymbol() {
    if (!square.isFree) {
        square.symbol = currentPlayer.symbol;
        square.taken = true;
    }
}

function Board(squares)() {
    this.squares = squares;
    this.board = [];
}

Board.prototype.buildBoard() {

}



function Game() {

}