document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessage = document.getElementById("welcome-message");
    const startButton = document.getElementById("start-button");
    const board = document.getElementById("board");
    const resultMessage = document.getElementById("result-message");

    let currentPlayer = "X";
    let cells = Array.from({ length: 9 }).fill("");
    let gameEnded = false;

    startButton.addEventListener("click", function() {
        welcomeMessage.style.display = "none";
        startButton.style.display = "none";
        renderBoard();
    });

    function renderBoard() {
        board.innerHTML = "";
        cells.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.textContent = value;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        });
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = clickedCell.dataset.index;
        if (cells[index] === "" && !gameEnded) {
            cells[index] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            if (checkWin()) {
                resultMessage.textContent = "Gratulálok, nyereményed egy Fonogram díj!!!";
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(robotMove, 500);
                }
            }
        }
    }

    function robotMove() {
        const emptyCells = cells.reduce((acc, value, index) => {
            if (value === "") {
                acc.push(index);
            }
            return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const robotIndex = emptyCells[randomIndex];
        cells[robotIndex] = "O";
        const robotCell = board.querySelector(`[data-index='${robotIndex}']`);
        robotCell.textContent = "O";
        if (checkWin()) {
            resultMessage.textContent = "A robot nyert!";
            gameEnded = true;
        } else {
            currentPlayer = "X";
        }
    }

    function checkWin() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningConditions.some(combination => {
            const [a, b, c] = combination;
            return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
        });
    }
});
