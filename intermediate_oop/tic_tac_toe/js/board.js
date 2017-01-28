function Board() {
    this.boardLayout = [];
}
Board.prototype.buildBoard = function () {
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(new Square());
        }
        this.boardLayout.push(row);
    }
    return this.boardLayout;
}

Board.prototype.clearBoard = function () {
    this.boardLayout = [];
    document.querySelectorAll(".square").forEach(function (square) {
        square.innerHTML = "";
    });
}

Board.prototype.gameOver = function () {
    for (let i = 0; i < this.boardLayout; i++) {
        if (board.boardLayout[i][0].symbol === "X") {
            console.log("3 in a row");
            return true;
        } else {
            console.log("not 3 in a row")
            return false
        }
    }
}