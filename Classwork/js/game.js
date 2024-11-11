const gameBoard = {
    size: 4,
    board: [],
    moves: 0,
    score: 0,
    icons: {
        player: '<i class="fa-solid fa-chess-knight player-icon"></i>',
        obstacle: '<i class="fa-solid fa-dungeon obstacle-icon"></i>',
        collectible: '<i class="fa-solid fa-ring collectible-icon"></i>'
    },
    playerPosition: { row: 0, col: 0 },
    odds : {
        chanceOfBlock : .2,
        chanceOfCollect : .3
    },
    obstacles: [],
    collectibles: [],
    init() {
        // alert("The game is a foot");
        this.createEmptyBoard();
        this.setUpBoard()
        this.render();
    },
    setUpBoard() {
        for( let row = 0; row < this.size; row++ ) {
            for( let col = 0; col < this.size; col++ ) {
                if ( Math.random() < this.odds.chanceOfBlock) {
                    this.board[row][col] = 'O';
                    this.obstacles.push({ row: row, col: col });
                } else if (Math.random() <this.odds.chanceOfCollect) {
                    this.board[row][col] = 'C';
                    this.collectibles.push({ row: row, col: col });
                }
            }
        }
        this.board[this.playerPosition.row][this.playerPosition.col] = 'P';
    },
    move( direction ) {
        let pRow = this.playerPosition.row;
        let pCol = this.playerPosition.col;
        pRow = 5;
        pCol = 3;
        switch (direction) {
            case 'up':
                // if (this.playerPosition.col !== 0){
                //
                // }
                pRow = Math.max(0, pRow - 1);
                break;
            case 'down':
                pRow = Math.min(this.size - 1, pRow + 1);
                break;
            case 'left':
                pCol = Math.max(0, pCol - 1);
                break;
            case 'right':
                pCol = Math.min(this.size - 1, pCol + 1);
                break;
        }
        // alert(`Inside Move Direction: nRow: ${direction} nCol: ${pCol}`);
        if (this.board[pRow][pCol] !== '0'){
            this.board[this.playerPosition.row][this.playerPosition.col] = '';
            this.playerPosition.row = pRow;
            this.playerPosition.col = pCol;
            this.moves++;
            if (this.board[pRow][pCol] === 'C'){
                this.score++;
                this.board[pRow][pCol] = '';
                this.collectibles = this.collectibles.filter(
                    collectible =>
                        !( collectible.row === pRow && collectible.col === pCol ));
                this.showNotification("Collected an item!");
            }
            this.board[this.playerPosition.row][this.playerPosition.col] = 'P';
            this.render();
        }
    },
    createEmptyBoard() {
        for( let i = 0; i < this.size; i++ ) {
            let row = Array(this.size).fill('');
            this.board.push(row);  // push appends a row on to the array
        }
    },
    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.innerText = message;
        setTimeout( () => {
            notification.innerText = '';
        }, 3000);
    },
    render(){
        const gameBoardDOM = document.getElementById('game-board');
        gameBoardDOM.innerHTML = '';  // clear it out
        for( let row = 0; row < this.size; row++ ) {
            for( let col = 0; col < this.size; col++ ) {
                const tile = document.createElement('div');
                tile.className = 'tile'; // <div class='tile'
                if ( this.board[row][col] === 'P' ) {
                    tile.innerHTML = this.icons.player;
                } else if ( this.board[row][col] === 'O' ) {
                    tile.innerHTML = this.icons.obstacle;
                } else if (this.board[row][col] === 'C') {
                    tile.innerHTML = this.icons.collectible;
                }
                gameBoardDOM.appendChild( tile);
            }
        }
        document.getElementById('move-count').textContent =
            `Moves: ${this.moves}`;

    }
}
document.addEventListener("DOMContentLoaded", function() {
    gameBoard.init();
    window.addEventListener('keydown', (e) => {
        // alert("Keyed down: " + e.key);
        switch (e.key) {
            case 'ArrowUp':
                gameBoard.move('up');
                break;
            case 'ArrowDown':
                gameBoard.move('down');
                break;
            case 'ArrowLeft':
                gameBoard.move('left');
                break;
            case 'ArrowRight':
                gameBoard.move('right');
                break;
        }

    })
})
