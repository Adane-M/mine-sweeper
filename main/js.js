'use strict';

const GAMEON = '🙂';
const LOSE = '🤯';
const VICTORY = '😎';
const EMPTY = '';
const FLAG = '🚩'
var gBoard;
var firstClick = false;
var gStartTime;
var gWatchInterval;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};
function initGame() {
    gBoard = buildBoard(gLevel.SIZE)
    createRndMine(gBoard, gLevel.MINES)
    renderBoard(gBoard, '.board')
    gGame.isOn = true;
    updateShownCount(0)
    gGame.secsPassed = 0;
    //TODO
    gGame.markedCount = 0;

};




function cellClicked(elCell, i, j) {

    if (elCell.classList.contains('.clicked')) {
        return
    } else {
        elCell.classList.add('.clicked')
    }

    if (!firstClick) {
        createRndMine(gBoard, gLevel.MINES)
        firstClick = true;
        startStopWatch();
    }

    var cell = gBoard[i][j]
    elCell.innerText = cell.minesAroundCount
    if (!cell.isShown && !cell.isMine) updateShownCount(1);

    if (cell.minesAroundCount === 0) {
        expandShown(gBoard, i, j)
    }

    if (!gGame.isOn) return;

    if (cell.isMine) {
        elCell.innerText = MINE
        mineRevealed();
        gameOver();
        !gGame.isOn
    }
    if (cell.isMarked) {
        cellMarkedCount(1)
    }



}

function cellMarkedCount(diff) {
    gGame.markedCount += diff;

    var elMark = document.querySelector('.markcount')
    elMark.innerText = gGame.markedCount

}

function updateShownCount(diff) {
    gGame.shownCount += diff

    var gElShownCount = document.querySelector('.showncount');
    gElShownCount.innerText = gGame.shownCount;
}



function gameOver(elBtn) {

    if (gGame.isOn) return
    endStopWatch();
    gWatchInterval = null;

    elBtn = document.querySelector('button');


    if (((gBoard.length - 1) - gLevel.MINES) === gGame.shownCount) {
        elBtn.innerText = VICTORY
        gGame.isOn = false
        alert('GOOD JOB')
    } else {
        elBtn.innerText = LOSE
        gGame.isOn = false
        alert('GAME OVER')
    }



    initGame();
}


function expandShown(mat, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var Cell = mat[i][j];
            if (Cell.isMine || Cell.isShown || Cell.isMarked) continue;

            if (Cell.minesAroundCount === 0) {
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                elCell.innerHTML = Cell.minesAroundCount
                Cell.isShown = true;
                expandShown(gBoard, i, j);
            }


        }
    }
}
