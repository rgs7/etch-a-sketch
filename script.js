const GRID_PIXELS = 720;
const MAX_GRID_SIZE = 100;
const MAX_SHADE_STEPS = 3;

const grid = document.getElementById("grid");
const sizeInput = document.getElementById("grid-size");
const colorModeSelect = document.getElementById("color-mode");
const dragDrawModeCheckbox = document.getElementById("drag-draw-mode");
const setGridButton = document.getElementById("set-grid-size");
const clearGridButton = document.getElementById("clear-grid");

let isMouseDown = false;

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
        cell.addEventListener("mousedown", () => {
            paintCell(cell);
        });
        cell.addEventListener("mouseenter", () => {
            if (dragDrawModeCheckbox.checked && !isMouseDown) {
                return;
            }

            paintCell(cell);
        });
        grid.appendChild(cell);
    }
}

function getDrawColor() {
    if (colorModeSelect.value === "rainbow") {
        return getRandomRgbColor();
    }

    return "rgb(0, 0, 0)";
}

function getRandomRgbColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function paintCell(cell) {
    const currentShadeLevel = Number.parseInt(cell.dataset.shadeLevel || "0");
    const nextShadeLevel = Math.min(currentShadeLevel + 1, MAX_SHADE_STEPS);
    const opacity = nextShadeLevel / MAX_SHADE_STEPS;

    let baseColor = cell.dataset.baseColor;

    if (!baseColor || currentShadeLevel === 0) {
        baseColor = getDrawColor();
        cell.dataset.baseColor = baseColor;
    }

    cell.dataset.shadeLevel = String(nextShadeLevel);
    cell.style.backgroundColor = convertRgbToRgba(baseColor, opacity);
}

function clearGrid() {
    const cells = grid.querySelectorAll(".cell");
    for (const cell of cells) {
        cell.style.backgroundColor = "";
        delete cell.dataset.shadeLevel;
        delete cell.dataset.baseColor;
    }
}

function convertRgbToRgba(rgbColor, opacity) {
    const rgbParts = rgbColor.match(/\d+/g);

    if (!rgbParts || rgbParts.length < 3) {
        return rgbColor;
    }

    const [red, green, blue] = rgbParts;
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
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

clearGridButton.addEventListener("click", () => {
    clearGrid();
});

document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

grid.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

createGrid(16);
