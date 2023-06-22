const grid = document.getElementById('grid');
const gridSize = 10;

let cellCount = 1;

// Funzione per generare la griglia
function generateGrid() {
    grid.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('td');
            cell.innerText = cellCount++;
            cell.addEventListener('click', function () {
                this.classList.toggle('clicked');
                handleClick(this.innerText);
            });
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

// Funzione per gestire il clic su una cella
function handleClick(cellNumber) {
    console.log('Cella cliccata:', cellNumber);
}