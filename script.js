const GRID_PIXELS = 720;
const MAX_GRID_SIZE = 100;

const grid = document.getElementById("grid");
const sizeInput = document.getElementById("grid-size");
const setGridButton = document.getElementById("set-grid-size");

function normalizeGridSize(size) {
    return Math.min(Math.max(size, 1), MAX_GRID_SIZE);
}

function createGrid(size) {
    grid.replaceChildren();

    const safeSize = normalizeGridSize(size);
    const cellSize = GRID_PIXELS / safeSize;

    for (let i = 0; i < safeSize * safeSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        grid.appendChild(cell);
    }
}

setGridButton.addEventListener("click", () => {
    const requestedSize = Number.parseInt(sizeInput.value);

    if (Number.isNaN(requestedSize)) {
        return;
    }

    const normalizedSize = normalizeGridSize(requestedSize);
    sizeInput.value = normalizedSize;
    createGrid(normalizedSize);
});

createGrid(16);
