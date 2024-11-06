const gameBoard = {
    size: 4,
    board: [],
    icons: {
        player: '<i className="fa-solid fa-chess-knight"></i>',
        obstacle: '<i className="fa-solid fa-dungeon"></i>',
        collectable: `<i class="fa-solid fa-ring"></i>`
    },
    odds: {
        chanceOfBlock: .2,
        chanceOfCollectable: .3
    },
    obstacles: [],
    collectables: [],
    init() { // method used to initialize the game
        this.createEmptyBoard();
        this.setUpBoard();
    },
    createEmptyBoard() {
        for (let i = 0; i < this.size; i++){
            let row = Array(this.size).fill('');
            this.board.push(row);
        }
    },
    setUpBoard() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (Math.random() < this.odds.chanceOfBlock) {
                    this.board[row][col] = '0';
                    this.obstacles.push({row: row, col: col});
                }
                else if (Math.random() < this.odds.chanceOfCollectable) {
                    this.board[row][col] = 'c';
                    this.collectables.push({row: row, col: col});
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    gameBoard.init();
    alert(`board: ${this.board.length}`);
})