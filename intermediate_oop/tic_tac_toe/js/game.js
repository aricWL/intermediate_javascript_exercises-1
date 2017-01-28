//Player
function Player(name, symbol, turn) {
    this.turn = turn;
    this.symbol = symbol;
    this.name = name;
}
//Game
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
            return this.currentPlayer;
        } else {
            this.currentPlayer = this.players[1];
            this.players[1].turn = false;
            this.players[0].turn = true;
            return this.currentPlayer;
        }
    }
    this.play = function () {
        this.storePlayer();
        return this.getCurrentPlayer();
    }
}


const g = new Game();
g.storePlayer();
g.getCurrentPlayer();
var b = new Board();
b.buildBoard();
b.boardLayout[0][1].setSquareSymbol();
console.log(b.boardLayout[0][1]);