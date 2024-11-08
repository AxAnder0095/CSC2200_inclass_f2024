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
    move(direction) {
        alert("inside move direction" + direction);
    },
    createEmptyBoard() {
        for( let i = 0; i < this.size; i++ ) {
            let row = Array(this.size).fill('');
            this.board.push(row);  // push appends a row on to the array
        }
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
    // alert(`Board:${ gameBoard.board.length }`);
    window.addEventListener('keydown', (e) => {
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
