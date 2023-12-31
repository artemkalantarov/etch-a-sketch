function newSquare() {
    const square = document.createElement("div");
    if (gridBorder) {
        square.className = "square square-border";
    } else {
        square.className = "square";
    }
    return square;
}

function newRow() {
    const row = document.createElement("div");
    row.className = "row"
    for (let i = 0; i < gridSize; i++) row.appendChild(newSquare());
    return row;
}

function newGrid(grid) {
    for (let i = 0; i < gridSize; i++) grid.appendChild(newRow());
}

function changeBackgroundColor() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener("mouseover", function() {
            if (colorMode === "black"){
                square.style.backgroundColor = "black";
            } else if (colorMode === "rainbow") {
                square.style.backgroundColor = getRandomColor(1);
            } else {
                rainbowColor(square);
            }
    }));
}

function rainbowColor(square) {
    priorColor = getComputedStyle(square).backgroundColor;
    alpha = parseFloat(priorColor.split(",")[3]) + .1;
    if (alpha < 1) {
        square.style.backgroundColor = getRandomColor(alpha);
    } else {
        square.style.backgroundColor = getRandomColor(1);
    }
}

function getUserInput(){
    const userInput = prompt("Please indicated how many squares per side? \nPlease enter a number from 10 - 100.");
    if (isNaN(userInput) || userInput > 100 || userInput < 10) {
        alert("Please enter a number from 10 - 100  only.");
        getUserInput();
    } else {
        gridSize = userInput;
    }
} 

function setUpGrid(){
    const grid = document.querySelector(".grid");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    newGrid(grid);
    changeBackgroundColor();
}

function removeOldGrid(){
    const oldRows = document.querySelectorAll('.row');
    oldRows.forEach(row => row.remove());
}

function changeGridSize (){
    const changeGridSizeBtn = document.querySelector('.grid-size-change');
    changeGridSizeBtn.addEventListener("click", () => {
        getUserInput();
        setUpGrid();
    });
}

function getRandomColor(alpha) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}, ${alpha})`
}

function getColorMode() {
    const buttons = document.querySelectorAll(".color-btn");
    buttons.forEach(button => button.addEventListener("click", function(){
        colorMode = this.id;
        setUpGrid();
    }))
}

function clearGrid() {
    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", () => setUpGrid());
}

function borderChange() {
    document.querySelector(".grid").classList.toggle("grid-border");
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.classList.toggle("square-border"));
    gridBorder ? gridBorder = false : gridBorder = true ;
    console.log(gridBorder)
}

function borderToggle() {
    const gridBtn = document.querySelector(".border-toggle");
    gridBtn.addEventListener("click", () => borderChange());
}
let colorMode = "black"
let gridSize = 16;
let gridBorder = true;

setUpGrid();
getColorMode();
changeGridSize();
clearGrid();
borderToggle();