let cells = document.querySelectorAll('.cube');
let scoreX_text = document.querySelector('.scoreX');
let scoreO_text = document.querySelector('.scoreO');

let startBtn = document.querySelector('.start-button');
let restartBtn = document.querySelector('.restart-button');

let scoreX = localStorage.getItem('scoreX') ? parseInt(localStorage.getItem('scoreX')) : 0;
let scoreO = localStorage.getItem('scoreO') ? parseInt(localStorage.getItem('scoreO')) : 0;

scoreX_text.textContent = scoreX;
scoreO_text.textContent = scoreO;

let turn = 0;
let isWin = 1;

let x_cells = [];
let o_cells = [];

startBtn.addEventListener('click', function () {
    if (isWin === 0) {
        console.log("nope");
    } else {
        StartGameSolo();
    }
});

restartBtn.addEventListener('click', function () {
    if (isWin === 0) {
        StartGameSolo();
    } else {
        console.log("nope");
    }
});

function StartGameSolo() {
    reset();
    cellsHover();
    let field = document.querySelector('.zone');
    field.style.outlineColor = turn === 0 ? "red" : "blue";

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            let row = [...this.classList].find(cls => ['a', 'b', 'c', 'd', 'e'].includes(cls));
            let number = [...this.classList].find(cls => cls.startsWith('n'));
            let cellId = `${row}${number.substring(1)}`;

            if (isWin === 1 || !row || !number || x_cells.includes(cellId) || o_cells.includes(cellId)) {
                return;
            }

            this.style.color = turn === 0 ? "red" : "blue";
            this.textContent = turn === 0 ? "X" : "O";
            turn === 0 ? x_cells.push(cellId) : o_cells.push(cellId);
            turn = 1 - turn;

            field.style.outlineColor = turn === 0 ? "red" : "blue";
            win();
        });
    });
}

function win() {
    let field = document.querySelector('.zone');
    const winCombinations = [
        ['a1', 'a2', 'a3', 'a4', 'a5'], ['b1', 'b2', 'b3', 'b4', 'b5'], ['c1', 'c2', 'c3', 'c4', 'c5'],
        ['d1', 'd2', 'd3', 'd4', 'd5'], ['e1', 'e2', 'e3', 'e4', 'e5'], ['a1', 'b1', 'c1', 'd1', 'e1'],
        ['a2', 'b2', 'c2', 'd2', 'e2'], ['a3', 'b3', 'c3', 'd3', 'e3'], ['a4', 'b4', 'c4', 'd4', 'e4'],
        ['a5', 'b5', 'c5', 'd5', 'e5'], ['a1', 'b2', 'c3', 'd4', 'e5'], ['a5', 'b4', 'c3', 'd2', 'e1']
    ];

    for (let combo of winCombinations) {
        if (combo.every(cell => x_cells.includes(cell))) {
            updateScore('X');
            return;
        }
        if (combo.every(cell => o_cells.includes(cell))) {
            updateScore('O');
            return;
        }
    }
}

function updateScore(winner) {
    let field = document.querySelector('.zone');
    field.style.outlineColor = "yellow";
    cells.forEach(cell => cell.style.color = "yellow");
    
    if (winner === 'X') {
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
        scoreX_text.textContent = scoreX;
    } else {
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
        scoreO_text.textContent = scoreO;
    }
    isWin = 1;
}

function reset() {
    turn = 0;
    isWin = 0;
    x_cells = [];
    o_cells = [];
    cells.forEach(cell => cell.innerHTML = "");
}

function cellsHover() {
    cells.forEach(cell => {
        cell.addEventListener('mouseover', function () {
            let row = [...this.classList].find(cls => ['a', 'b', 'c', 'd', 'e'].includes(cls));
            let number = [...this.classList].find(cls => cls.startsWith('n'));
            let cellId = `${row}${number.substring(1)}`;
            if (isWin === 1 || !row || !number || x_cells.includes(cellId) || o_cells.includes(cellId)) {
                return;
            }
            this.style.color = turn === 0 ? "rgba(255, 0, 0, 0.236)" : "rgba(0, 0, 255, 0.236)";
            this.textContent = turn === 0 ? "X" : "O";
        });

        cell.addEventListener('mouseout', function () {
            let row = [...this.classList].find(cls => ['a', 'b', 'c', 'd', 'e'].includes(cls));
            let number = [...this.classList].find(cls => cls.startsWith('n'));
            let cellId = `${row}${number.substring(1)}`;
            if (!row || !number || x_cells.includes(cellId) || o_cells.includes(cellId)) {
                return;
            }
            this.style.color = "#414141";
            this.textContent = "";
        });
    });
}
