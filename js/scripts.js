let gridSize = 10;
let bombCount = 16;
let bombPositions = [];
let clicks = 0;
let gameOver = false;

// Funzione per generare la griglia
function generateGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    // Genera numeri casuali per le posizioni delle bombe
    bombPositions = generateRandomNumbers(bombCount, 1, gridSize * gridSize);

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('td');
            const cellNumber = i * gridSize + j + 1;

            // Aggiungi l'evento click alla cella
            cell.addEventListener('click', function () {
                handleClick(this, cellNumber);
            });

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

// Funzione per generare numeri casuali unici nell'intervallo specificato
function generateRandomNumbers(count, min, max) {
    const numbers = new Set();

    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
    }

    return Array.from(numbers);
}

// Funzione per gestire il clic su una cella
function handleClick(cell, cellNumber) {
    if (gameOver) {
        return;
    }

    if (bombPositions.includes(cellNumber)) {
        // La cella contiene una bomba
        cell.innerHTML = '<i class="fa fa-bomb"></i>';
        cell.style.backgroundColor = 'red';
        gameOver = true;
        showScore();
        showMessage('Mi dispiace, hai perso');
    } else {
        // La cella non contiene una bomba
        cell.innerHTML = '<i class="fas fa-check"></i>';
        cell.style.backgroundColor = 'blue';
        cell.removeEventListener('click', handleClick);
        clicks++;

        if (clicks === gridSize * gridSize - bombCount) {
            gameOver = true;
            showScore();
            showMessage('Complimenti, hai vinto');
        }
    }
}

// Funzione per mostrare il punteggio
function showScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = 'Punteggio: ' + clicks;
    console.log('Punteggio:', clicks);
}

// Funzione per mostrare un messaggio
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

// Funzione per avviare il gioco
function startGame() {
    const grid = document.getElementById('grid');
    grid.style.display = 'table';

    // Aggiorna la griglia in base alla difficoltà selezionata
    const difficultySelect = document.getElementById('difficulty-select');
    const selectedDifficulty = parseInt(difficultySelect.value);
    if (selectedDifficulty === 1) {
        gridSize = 10;
        bombCount = 16;
    } else if (selectedDifficulty === 2) {
        gridSize = 9;
        bombCount = 12;
    } else if (selectedDifficulty === 3) {
        gridSize = 7;
        bombCount = 8;
    }

    generateGrid();
    clicks = 0;
    gameOver = false;
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = '';
    showMessage('');
}

// Funzione per resettare il gioco
function resetGame() {
    const grid = document.getElementById('grid');
    grid.style.display = 'none';

    const scoreElement = document.getElementById('score');
    scoreElement.innerText = '';

    const messageElement = document.getElementById('message');
    messageElement.innerText = '';

    clicks = 0;
    gameOver = false;
    bombPositions = [];
}

// Avvia il gioco al caricamento della pagina
document.addEventListener('DOMContentLoaded', function () {
    const fightButton = document.getElementById('fight-button');
    const resetButton = document.getElementById('reset-button');
    const difficultySelect = document.getElementById('difficulty-select');

    fightButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    difficultySelect.addEventListener('change', function () {
        const selectedDifficulty = parseInt(difficultySelect.value);
        if (selectedDifficulty === 1) {
            gridSize = 10;
            bombCount = 16;
        } else if (selectedDifficulty === 2) {
            gridSize = 9;
            bombCount = 12;
        } else if (selectedDifficulty === 3) {
            gridSize = 7;
            bombCount = 8;
        }
    });
});
