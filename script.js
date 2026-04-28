const GRID_PIXELS = 720;
const MAX_GRID_SIZE = 100;

const grid = document.getElementById("grid");
const sizeInput = document.getElementById("grid-size");
const colorModeSelect = document.getElementById("color-mode");
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
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = getDrawColor();
        });
        grid.appendChild(cell);
    }
}

function getDrawColor() {
    if (colorModeSelect.value === "rainbow") {
        return getRandomRgbColor();
    }

    return "#000";
}

function getRandomRgbColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
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
