const game = {
    state: {
        turn: 0,
        roll: 0,
        scoreCount: 0,
        target: 60,
        size: 5,
        keepers: [],
        idxs: []
    },
    rollDice: function (){
        let size = 5;
        let rolledNums = 0;
        let ctr = 1;

        for (i = 0; i < size; i++){
            if (this.state.idxs.includes(i)){
                let idx = this.state.idxs.indexOf(i);
                let kVal = this.state.keepers[idx];
                let slot = `slot-${ctr}`
                document.getElementById(slot).innerHTML = kVal + "";
                ctr++;
            }
            else {
                rolledNums = Math.floor(Math.random() * 6) + 1;
                let slot = `slot-${ctr}`
                // document.getElementById(slot).innerHTML = 5 + ""; // forcing a full house
                document.getElementById(slot).innerHTML = rolledNums + "";
                ctr++;
            }
        }
    },
    getRollScore: function (score){
        // let keeperTotal = this.getKeepers(score);
        return this.getKeepers(score);

    },
    getKeepers: function (score){
        let size = 5;
        let ctr = 1;
        let keeperTotal = 0;

        for (i = 0; i < size; i++){
            let id = `slot-${ctr}`
            let slot = document.getElementById(id).innerHTML;
            let slotVal = parseInt(slot)
            console.log(slotVal)

            if (slotVal === score){
                keeperTotal += score;
                let divID = `dice-nums${ctr}`;
                document.getElementById(divID).style.backgroundColor = "pink";
                this.state.keepers.push(slotVal);
                this.state.idxs.push(i);
            }
            ctr++;
        }
        this.updateScore(keeperTotal);
        return keeperTotal;
    },
    updateScore: function (total){
        this.state.scoreCount += total;
        document.getElementById('total-score').innerHTML = `Total Score: ${this.state.scoreCount}`;
    },
    startGame: function (){
        let maxTurns = 3;
        let maxRolls = 3;

        if (this.state.roll === maxRolls){
            this.resetTurn();
            this.resetScoreButtons();
            this.state.turn += 1;
            this.state.roll = 0;
            document.getElementById('num-of-turns-and-rolls').innerHTML =
                `Turn: ${this.state.turn} Roll: ${this.state.roll}`;
        }
        else {
            this.rollDice()
            this.state.roll += 1;
            document.getElementById('num-of-turns-and-rolls').innerHTML =
                `Turn: ${this.state.turn} Roll: ${this.state.roll}`;
        }

        if (this.state.turn === maxTurns){
            document.getElementById('total-score').innerHTML = 'Game Over';
            document.getElementById('roll-button').disabled = true;
            this.state.turn = 0;
        }

    },
    getFullHouse: function (){
        let ctr = 1;
        let dice_values = [];
        let total = 0;
        let size = 0;

        for (i = 0; i < size; i++){
            let die = `slot-${ctr}`;
            console.log(i)
            let p_die = parseInt(document.getElementById(die).innerHTML);
            dice_values.push(p_die);
            ctr++;
        }

        if (dice_values[0] === dice_values[1] && dice_values[1] === dice_values[2] &&
            dice_values[2] === dice_values[3] && dice_values[3] === dice_values[4]){
            total = 25;
            this.state.roll = 3;
            ctr = 1;

            for (i = 0; i < 5; i++){
                let divID = `dice-nums${ctr}`
                document.getElementById(divID).style.backgroundColor = "pink";
                ctr++;
            }
        }

        this.updateScore(total);
        return total;
    },
    getThreeOfAKind: function (){
        let ctr = 1;
        let dice_values = [];
        let size = 5;

        for (i = 0; i < size; i++){
            let die = `slot-${ctr}`;
            let p_die = parseInt(document.getElementById(die).innerHTML);
            dice_values.push(p_die);
            ctr++;
        }

        let die_size = dice_values.length - 1;
        dice_values.sort();
        let total = 0;

        if (dice_values[die_size] === dice_values[die_size - 1] && dice_values[die_size] === dice_values[die_size - 2]){
            total = dice_values[die_size] + dice_values[die_size - 1] + dice_values[die_size - 2];
        }
        else if (dice_values[die_size - 4] === dice_values[die_size - 3] && dice_values[die_size - 4] === dice_values[die_size - 2]){
            total = dice_values[die_size - 4] + dice_values[die_size - 3] + dice_values[die_size - 2]
        }
        else if (dice_values[die_size - 1] === dice_values[die_size - 2] && dice_values[die_size - 1] === dice_values[die_size - 3]){
            total = dice_values[die_size - 1] + dice_values[die_size - 2] + dice_values[die_size - 3]
        }
        else {
            total = 0;
        }

        this.updateScore(total);
        return total;

    },
    getFourOfAKind: function() {
        let ctr = 1;
        let dice_vals = [];
        let size = 5;

        for (i = 0; i < size; i++){
            let die = `slot-${ctr}`;
            let p_die = parseInt(document.getElementById(die).innerHTML);
            dice_vals.push(p_die);
            ctr++;
        }

        let die_size = dice_vals.length - 1;
        dice_vals.sort();
        let total = 0;

        if (dice_vals[die_size] === dice_vals[die_size - 1] &&
            dice_vals[die_size - 1] === dice_vals[die_size - 2] &&
            dice_vals[die_size - 2] === dice_vals[die_size - 3]){
            total = dice_vals[die_size] + dice_vals[die_size - 1] + dice_vals[die_size - 2] + dice_vals[die_size - 3];
        }
        else if (dice_vals[die_size - 4] === dice_vals[die_size - 3] &&
                dice_vals[die_size - 3] === dice_vals[die_size - 2] &&
                dice_vals[die_size - 2] === dice_vals[die_size - 1]){
            total = dice_vals[die_size - 4] + dice_vals[die_size - 3] + dice_vals[die_size - 2] + dice_vals[die_size - 1];
        }
        else {
            total = 0;
        }

        this.updateScore(total);
        return total;

    },
    resetTurn: function (){
        let size = 5;
        let ctr = 1;

        for (i = 0; i < size; i++){
            let id = `slot-${ctr}`;
            let divID = `dice-nums${ctr}`
            document.getElementById(id).innerHTML = '-';
            document.getElementById(divID).style.backgroundColor = "#ef1897";
            ctr++;
        }
    },
    resetGame: function (){
        this.resetTurn();
        this.resetScoreButtons();
        this.state.roll = 0;
        this.state.turn = 0;
        this.state.keepers = [];
        this.state.idxs = [];
        this.state.scoreCount = 0;

        document.getElementById('roll-button').disabled = false;
        document.getElementById('total-score').innerHTML = "Total Score: 0";
        document.getElementById('num-of-turns-and-rolls').innerHTML = "Turn: 0 Roll: 0";
    },
    resetScoreButtons: function (){
        let size = 9;
        let ctr = 1;

        for (i = 0; i < size; i++){
            let sb = `score-button-${ctr}`;
            document.getElementById(sb).disabled = false;
            document.getElementById(sb).innerHTML = "Score";
            ctr++;
        }
    },
};

document.addEventListener("DOMContentLoaded", function() {
    function saveGame(){
        let gameObj = JSON.stringify(game);
        localStorage.setItem('gameObj', gameObj);
        let dice = [];
        let button_values = [];

        let die_size = 5;
        let button_size = 9;
        let ctr = 1;

        for (i = 0; i < die_size; i++){
            let id = `slot-${ctr}`;
            dice.push(document.getElementById(id).innerHTML);
            ctr++;
        }
        ctr = 1;

        for (i = 0; i < button_size; i++){
            let sb = `score-button-${ctr}`;
            button_values.push(document.getElementById(sb).innerHTML)
            ctr++;
        }

        localStorage.setItem('dice', JSON.stringify(dice));
        localStorage.setItem('buttons', JSON.stringify(button_values));
        // console.log(button_values)
        console.log(dice)

        let score = document.getElementById('total-score').innerHTML;
        localStorage.setItem('totalScore', score);

        let t_rolls = document.getElementById('num-of-turns-and-rolls').innerHTML;
        localStorage.setItem('t_rolls', t_rolls);

    }

    function loadGame(){
        const localGame = localStorage.getItem('gameObj');
        const gameObj = JSON.parse(localGame);

        game.state.turn = gameObj.state.turn;
        game.state.roll = gameObj.state.roll;
        game.state.scoreCount = gameObj.state.scoreCount;
        game.state.target = gameObj.state.target;
        game.state.size = gameObj.state.size;
        game.state.keepers = gameObj.state.keepers;
        game.state.idxs = gameObj.state.idxs;

        let d_val = localStorage.getItem('dice');
        let b_val = localStorage.getItem('buttons');
        // console.log(d_val)
        let dice = JSON.parse(d_val);
        let buttons = JSON.parse(b_val);
        // console.log(d_val.length)

        let die_size = 5;
        let button_size = 9;
        let ctr = 1;

        for (i = 0; i < die_size; i++){
            let id = `slot-${ctr}`;
            document.getElementById(id).innerHTML = dice[i];
            ctr++;
        }

        ctr = 1;

        for (i = 0; i < button_size; i++){
            let sb = `score-button-${ctr}`;
            document.getElementById(sb).innerHTML = buttons[i];
            ctr++;
        }

        let score = localStorage.getItem('totalScore');
        document.getElementById('total-score').innerHTML = score;

        let t_rolls = localStorage.getItem('t_rolls');
        document.getElementById('num-of-turns-and-rolls').innerHTML = t_rolls;
    }

    document.getElementById("roll-button").addEventListener("click", function() {
        game.startGame();
    });

    document.getElementById('reset-button').addEventListener('click', function (){
        game.resetGame();
    });

    document.getElementById('save-button').addEventListener('click', function (){
        saveGame();
    });

    document.getElementById('load-button').addEventListener('click', function (){
       loadGame();
    });

    document.getElementById('score-button-1').addEventListener("click", function (){
        let score = 1;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-1").innerHTML = updateButton + "";
        document.getElementById("score-button-1").disabled = true;
    });

    document.getElementById('score-button-2').addEventListener("click", function (){
        let score = 2;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-2").innerHTML = updateButton + "";
        document.getElementById("score-button-2").disabled = true;
    });

    document.getElementById('score-button-3').addEventListener("click", function (){
        let score = 3;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-3").innerHTML = updateButton + "";
        document.getElementById("score-button-3").disabled = true;
    });

    document.getElementById('score-button-4').addEventListener("click", function (){
        let score = 4;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-4").innerHTML = updateButton + "";
        document.getElementById("score-button-4").disabled = true;
    });

    document.getElementById('score-button-5').addEventListener("click", function (){
        let score = 5;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-5").innerHTML = updateButton + "";
        document.getElementById("score-button-5").disabled = true;
    });

    document.getElementById('score-button-6').addEventListener("click", function (){
        let score = 6;
        let updateButton = game.getRollScore(score);
        document.getElementById("score-button-6").innerHTML = updateButton + "";
        document.getElementById("score-button-6").disabled = true;
    });

    document.getElementById('score-button-7').addEventListener("click", function (){
        let updateButton = game.getThreeOfAKind();
        document.getElementById("score-button-7").innerHTML = updateButton + "";
        document.getElementById("score-button-7").disabled = true;
    });

    document.getElementById('score-button-8').addEventListener("click", function (){
        let updateButton = game.getFourOfAKind();
        document.getElementById("score-button-8").innerHTML = updateButton + "";
        document.getElementById("score-button-8").disabled = true;
    });

    document.getElementById('score-button-9').addEventListener("click", function (){
        let updateButton = game.getFullHouse();
        document.getElementById("score-button-9").innerHTML = updateButton + "";
        document.getElementById("score-button-9").disabled = true;
    });


});