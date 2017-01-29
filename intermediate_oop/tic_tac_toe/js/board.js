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
    console.log("hi")
    for (let i = 0; i < this.boardLayout.length; i++) {
        if (this.boardLayout[i][0].symbol !== undefined) {
            if (this.boardLayout[i][0].symbol === this.boardLayout[i][1].symbol && this.boardLayout[i][0].symbol === this.boardLayout[i][2].symbol) {
                return true;
            }
        }
    }
    for (var i = 0; i < this.boardLayout.length; i++) {
        if (this.boardLayout[0][i].symbol == this.boardLayout[1][i].symbol && this.boardLayout[0][i].symbol == this.boardLayout[2][i].symbol && this.boardLayout[2][i].symbol !== undefined) {
            return true;
        }
    }
    if (this.boardLayout[0][0].symbol == this.boardLayout[1][1].symbol && this.boardLayout[0][0].symbol == this.boardLayout[2][2].symbol && this.boardLayout[2][2].symbol !== undefined) {
        return true;
    }
    if (this.boardLayout[0][2].symbol == this.boardLayout[1][1].symbol && this.boardLayout[0][2].symbol == this.boardLayout[2][0].symbol && this.boardLayout[2][0].symbol !== undefined) {
        return true;
    }

    return false;
}