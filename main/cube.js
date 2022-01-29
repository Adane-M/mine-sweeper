'use strict';

const MINE = '💣';
var gMineLoc;
var gMineCell = [];


function mineRevealed() {

    for (let i = 0; i < gLevel.SIZE; i++) {
        var cell = gMineCell.pop()
        if (cell) {
            gBoard[cell.i][cell.j] = MINE
            renderCell(cell, MINE);
        }
    }

}


function createRndMine(board, num) {
//redefinde gmineloc & gminecell

    var gMineLoc = [];
    var emptyLocations = getEmptyLocations(board);
    if (!emptyLocations.length) return
    var emptyLocation = emptyLocations.pop();
    gMineCell.push({
        i: emptyLocation.i,
        j: emptyLocation.j
    });
    var loc = board[emptyLocation.i][emptyLocation.j]
    for (let i = 0; i < num; i++) {
        loc.isMine = true
        gMineLoc.push(loc)
    }
    setMinesNegsCount()
    return gMineLoc;
}

function getEmptyLocations(board) {
    var emptyLocations = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell.isShown) {
                continue;
            } else {
                emptyLocations.push({ i: i, j: j });
            }
        }
    }
    shuffle(emptyLocations);
    return emptyLocations;
}

function setMinesNegsCounts(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var currCell = mat[i][j];
            if (currCell.isMine) count++;
        }
    }
    return count
}


function setMinesNegsCount() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            cell.minesAroundCount = setMinesNegsCounts(gBoard, i, j);
        }
    }



}


// function getEmptyPos() {
//     var res = [];
//     for (var i = 0; i < gBoard.length; i++) {
//       for (var j = 0; j < gBoard[0].length; j++) {
//         if (gBoard[i][j] === EMPTY) res.push({ i: i, j: j });
//       }
//     }
//     if (res.length) return res[getRandomInt(0, res.length - 1)];
//     return null;
//   }
