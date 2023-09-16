function newSquare() {
    const square = document.createElement("div");
    square.className = "square";
    return square;
}

function newRow() {
    const row = document.createElement("div");
    row.className = "row"
    for (let i = 0; i < gridSize; i++) row.appendChild(newSquare());
    return row;
}

function newGrid(grid) {
    console.log(gridSize);
    for (let i = 0; i < gridSize; i++) grid.appendChild(newRow());
}

function changeBackgroundColor() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener("mouseover", () => square.classList.add("hover")));
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

let gridSize = 16;
setUpGrid();
changeGridSize();