// Container will be 960 pixels on each side
const CONTAINERSIZE = 960;

function createGrid(width) {
    let container = document.querySelector("#container");
    let boxWidth = CONTAINERSIZE / width;
    console.log(boxWidth);
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
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            console.log(randomColor);
            e.target.style.backgroundColor = "#" + randomColor;
        });
    });
}

function clear() {
    let button = document.querySelector("button");
    button.addEventListener("click", function(e) {
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

createGrid(16);
colorBox()
clear();