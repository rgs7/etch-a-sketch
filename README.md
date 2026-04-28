# Etch-a-Sketch

A browser-based Etch-a-Sketch built with vanilla HTML, CSS, and JavaScript.

## Features

- Dynamic grid generation from `1x1` up to `100x100`
- Fixed drawing area that always keeps the same board size
- Two color modes:
  - `Black`
  - `Rainbow` (random RGB color per cell)
- Progressive shading effect with configurable steps
- Optional draw-on-drag mode
- Clear board button
- Responsive UI layout with a controls panel on the left and board on the right

## Controls

- **Grid size**: Choose the number of squares per side and click `Apply grid`
- **Color mode**: Switch between black and rainbow drawing
- **Draw on drag**:
  - Off: draws on hover
  - On: draws only while mouse button is pressed
- **Clear board**: Resets all painted cells

## Project Structure

- `index.html` - app structure and controls
- `style.css` - layout and visual styling
- `script.js` - grid creation and drawing behavior

## How to Run

1. Clone/download the project.
2. Open `index.html` in your browser.

No build step or dependencies required.

🌐 Live site: [Etch-a-Sketch](https://rgs7.github.io/etch-a-sketch/)