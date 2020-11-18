
// newgame switches markers for some reason?
// make it prettier
// add AI
    // add option to play second against AI.

const displayGrid = (() => {
    const GRIDSIZE = 3;
    const gridBox = document.querySelector('.grid');
    for (let i = 0; i < GRIDSIZE; i++) {
        for (let j = 0; j < GRIDSIZE; j++) {
            gridCell = document.createElement('button');
            gridCell.setAttribute('class', 'gridCell');
            gridCell.setAttribute('id', `${i}${j}`); 
            gridCell.addEventListener('click', () => {
                // place the active player mark on this cell
                gamePlay.board.placeMark(`${i}${j}`, gamePlay.currentplayer.marker);
                // check for a winner
                if (gamePlay.checkForWinner(gamePlay.currentplayer.marker)) {
                    document.querySelector('h2').textContent = 'Game Over'
                    gamePlay.gameOver();
                    return;
                }
                // switch to next player (will cancel out if no mark placed)
                gamePlay.switchPlayer();
                document.querySelector('h2').textContent = `${gamePlay.currentplayer.marker}'s turn`
            });
            gridBox.appendChild(gridCell)
        }
    }
})();



const gameBoard = () => {
    const gridCells = document.querySelectorAll('.gridCell')
    let board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];

    const getState = () => console.log(board);

    const placeMark = (index, marker) => {
        let i = index[0];
        let j = index[1];
        if (board[i][j] == '') {
            board[i][j] = marker;
            for (let i = 0; i < gridCells.length; i++) {
                if (gridCells[i].id == index) {
                    gridCells[i].innerHTML = marker;
                }
            }
        }
        else {gamePlay.switchPlayer()} // keep active player the same if no mark made.
    }

    const clearMarks = () => {
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].innerHTML = '';
        }
    }
    return { getState, placeMark, clearMarks }
}

const Player = (name, marker) => {
    const move = () => {
        // does nothing as of yet
        console.log('some kind of move')
    }
    return {name, marker, move};
}


const gamePlay = (() => {
    const gridCells = document.querySelectorAll('.gridCell')
    let board = gameBoard();
    let markers = ['X', 'O']
    let human = Player('Human', markers[0])
    let comp = Player('Computer', markers[1]);
    let currentplayer = human;

    const switchPlayer = () => {
        if (gamePlay.currentplayer.name == human.name) {
            gamePlay.currentplayer = comp;
        } 
        else {gamePlay.currentplayer = human;}
    }

    const gameOver = () => {
        document.getElementById("overlay").style.display = "block";
        document.getElementById('text').innerHTML = `GAME OVER! ${gamePlay.currentplayer.marker} WINS.`
        }

    const off = () => {
        document.getElementById("overlay").style.display = "none";
        document.querySelector('h2').textContent = 'Place your marker to start'
        gamePlay.newGame();
    }    

    const switchMarker = () => {
        // does nothing as of yet
        markers = markers.reverse()
        gamePlay.newGame();
    }

    const newGame = () => {
        gameBoard().clearMarks();
        gamePlay.board = gameBoard()
        human = Player('Human', markers[0])
        comp = Player('Computer', markers[1]);
        currentplayer = human;
        return {board, currentplayer}
    };

    const checkForWinner = (marker) => {
        // check rows
        for (let i = 0; i < gridCells.length; i += 3) {
            if (gridCells[i].textContent == marker) {
                if ((gridCells[i+1].textContent == marker) && (gridCells[i+2].textContent == marker)){
                    return true;
                }
            }
        }
        // check columns
        for (i = 0; i < 3; i++) {
            if (gridCells[i].textContent == marker) {
                if ((gridCells[i+3].textContent == marker) && (gridCells[i+6].textContent == marker)){
                    return true;
                }
            } 
        }
        // check backslash diagonal
        if (gridCells[0].textContent == marker) {
            if ((gridCells[4].textContent == marker) && (gridCells[8].textContent == marker)){
                return true;
            }
        } 
        // check forwardslash diagonal
        if (gridCells[2].textContent == marker) {
            if ((gridCells[4].textContent == marker) && (gridCells[6].textContent == marker)){
                return true;
            }
        }
        return false;
    }

    return { board, currentplayer, switchPlayer, switchMarker, checkForWinner, gameOver, newGame, off}
})();
