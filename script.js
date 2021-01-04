// Container will be this many pixels on each side
const CONTAINERSIZE = 500;
let color = "#5D737E";
let colorOn = true;

function createGrid() {
    let slider = document.querySelector("#slider");
    let width = slider.value;
    let container = document.querySelector("#container");

    // Set boxWidth so that boxes always add up to fill entire container
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

function toggleColor() {
    let container = document.querySelector("#container");
    container.addEventListener("click", function() {
        colorOn ? (colorOn = false) : (colorOn = true);
    });
}

function colorBox() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(function(box) {
        box.addEventListener("mouseenter", function(e) {
            if (colorOn === true) {
                if (color === "Rainbow") {
                    randomColor = Math.floor(Math.random()*16777215).toString(16);
                    e.target.style.backgroundColor = "#" + randomColor;
                }
                else e.target.style.backgroundColor = color;
            }
        });
    });
}

function clear() {
    let clearButton = document.querySelector("#clear");
    let containerColor = document.querySelector("#container").style.backgroundColor;
    clearButton.addEventListener("click", function(e) {
        // Remove current grid
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => box.style.backgroundColor = containerColor);

        colorOn = true;
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

            if (colorChoice === "Dark") color = "#5D737E";
            else if (colorChoice === "Erase") color = "#C0FDFB";
            else if (colorChoice === "Rainbow") color = "Rainbow";
        });
    });
    
    // Set up event listeners to store custom colors
    let customColor = document.querySelector("#customColor");
    customColor.addEventListener("input", function(e) {
        color = e.target.value;
    });
    customColor.addEventListener("click", function(e) {
        color = e.target.value;
    });

    // Give only the chosen color option a dark border
    let colorSelectors = document.querySelectorAll(".colorSelector");
    colorSelectors.forEach(function(selector) {
        selector.addEventListener("click", function(e) {
            colorSelectors.forEach(button => button.style.border = "1px solid #C0FDFB");
            e.target.style.border = "1px solid #5D737E";
        });
    });
}

function changeSize() {
    // Set up event listener to resize container when slider is used
    slider.addEventListener("change", function(e) {
        // Remove current grid
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => box.remove());

        // Create new grid
        createGrid();
        colorBox();

        colorOn = true;
    });
}

createGrid();
colorBox()
clear();
chooseColor();
changeSize();
toggleColor();