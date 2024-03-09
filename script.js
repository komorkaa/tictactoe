function renderBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        const img = document.createElement("img");
        img.src = ""; // Az induláskor az img src-je üres legyen
        img.alt = "";
        img.classList.add("player-icon");
        cell.appendChild(img);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target.closest(".cell");
    const index = clickedCell.dataset.index;
    if (cells[index] === "" && !gameEnded) {
        cells[index] = currentPlayer;
        const img = clickedCell.querySelector(".player-icon");
        img.src = currentPlayer === "X" ? "https://images.genius.com/0782c5b81992f1935013ae0ba61f8515.1000x1000x1.jpg" : "https://ocdn.eu/images/pulscms/OGQ7MDA_/ed526a9db4576b6660ab856f1a2ab5cd.jpeg";
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
    const img = robotCell.querySelector(".player-icon");
    img.src = "https://ocdn.eu/images/pulscms/OGQ7MDA_/ed526a9db4576b6660ab856f1a2ab5cd.jpeg";
    if (checkWin()) {
        resultMessage.textContent = "A robot nyert!";
        gameEnded = true;
    } else {
        currentPlayer = "X";
    }
}
