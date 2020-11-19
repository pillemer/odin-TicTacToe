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
                if (checkForWinner(gamePlay.currentplayer.marker)) {
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

    const getState = () => { return board };

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


// Player factory
const Player = (name, marker) => {
    return {name, marker};
}


const gamePlay = (() => {
    const gridCells = document.querySelectorAll('.gridCell')
    let board = gameBoard();
    let markers = ['X', 'O']
    let playerOne = Player('Player 1', markers[0])
    let playerTwo = Player('Player 2', markers[1]);
    let currentplayer = playerOne;

    const switchPlayer = () => {
        if (gamePlay.currentplayer.name == playerOne.name) {
            gamePlay.currentplayer = playerTwo;
        } 
        else {gamePlay.currentplayer = playerOne;}
    }

    const gameOver = () => {
        document.getElementById("overlay").style.display = "block";
        document.getElementById('text').innerHTML = `<P>GAME OVER!</P><P> ${gamePlay.currentplayer.name} WINS.</p>`
        }

    const off = () => {
        document.getElementById("overlay").style.display = "none";
        document.querySelector('h2').textContent = 'Place your marker to start'
        gamePlay.newGame();
    }    

    const gameModeSwitch = () => {
        const modeButton = document.querySelector('#gameMode')
        let singlePlayer = modeButton.value
        if (singlePlayer) {
            modeButton.innerHTML = 'Two Player'
            modeButton.value = '';
        }
        else {
            modeButton.innerHTML = 'Single Player'
            modeButton.value = 'true';
        }
        gamePlay.newGame();
    }

    const newGame = () => {
        gameBoard().clearMarks();
        gamePlay.board = gameBoard()
        gamePlay.currentplayer = playerOne;
        return {board, currentplayer}
    };

    return { board, 
            currentplayer, 
            switchPlayer, 
            gameModeSwitch, 
            gameOver, 
            newGame, 
            off, 
    }

})();
