const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
     let answer = "";

     winningPosition.forEach((position) => {
         if((gameGrid [position[0]] !== "" || gameGrid [position[1]] !== "" || gameGrid [position[2]] !== "" )
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer = "X";
           }
           else{
            answer = "O";
           }

           boxes.forEach((box) =>{
              box.style.pointerEvents = "none";
           })
           boxes[position[0]].classList.add("Win");
           boxes[position[1]].classList.add("Win");
           boxes[position[2]].classList.add("Win");
        }
     });
     if(answer !==""){
        gameInfo.innerText = `Winner Plyear  - ${answer}`;
        newGamebtn.classList.add("active");
        return;
     }
     let fillCount = 0 ;
     gameGrid.forEach((box) => {
    if(box !== "")
    fillCount++;
});



if(fillCount === 9){
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
}
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
    //   bari ko badlo
        swapTurn();
    //    check kro game khatam toh nhi ho gya 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);

