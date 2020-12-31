// Container will be this many pixels on each side
const CONTAINERSIZE = 600;
let color = "#495057";

function createGrid(width) {
    let container = document.querySelector("#container");
    let boxWidth = CONTAINERSIZE / width;
    
    // Gives container a fixed width so that boxes won't wrap to fit in window
    container.style.width = `${CONTAINERSIZE}px`;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            let newBox = document.createElement("div");
            if (j === 0) newBox.style.clear = "left";
            newBox.classList.add("box");
            newBox.style.width = `${boxWidth}px`;
            newBox.style.height = `${boxWidth}px`;
            container.appendChild(newBox);
        }
    }
}

function colorBox() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(function(box) {
        box.addEventListener("mouseenter", e => {
            if (color === "Rainbow") {
                randomColor = Math.floor(Math.random()*16777215).toString(16);
                e.target.style.backgroundColor = "#" + randomColor;
            }
            else e.target.style.backgroundColor = color;
        });
    });
}

function clear() {
    let clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", function(e) {
        // Prompt user for width of new grid
        let width = getWidth();

        // Remove current grid
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => box.remove());

        // Create new grid
        createGrid(width);
        colorBox();
    });
}

function getWidth() {
    do {
        width = +prompt("How many squares per side?", 16)
    } while (!Number.isInteger(width) || width <= 0 || width > 100);
    return width;
}

function chooseColor() {
    // Set up event listeners for when each button is clicked
    let colorButtons = document.querySelectorAll(".colorButton");
    colorButtons.forEach(function(button) {
        button.addEventListener("click", function(e) {
            let colorChoice = e.target.textContent;

            if (colorChoice === "Dark") color = "#495057";
            else if (colorChoice === "Erase") color = "#DEE2E6";
            else if (colorChoice === "Rainbow") color = "Rainbow";
        });
    });
    
    let customColor = document.querySelector("#customColor");
    customColor.addEventListener("input", function(e) {
        color = e.target.value;
    });
}

createGrid(16);
colorBox()
clear();
chooseColor();