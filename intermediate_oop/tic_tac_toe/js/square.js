function Square() {
    this.taken = false;
    this.symbol = undefined;
}
Square.prototype.isFree = function () {
    if (this.taken) {
        return true;
    } else {
        return false;
    }
}
Square.prototype.setSquareSymbol = function () {

    this.symbol = game.currentPlayer.symbol;
    this.taken = true;

}