$(function() {
    var cell = document.getElementsByClassName("box");
    reset = document.getElementById("restart");
    message = document.getElementById("message");
    player = "X";
    stepCount = 0;
    winningCombinations = [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9]
    ],
    dataX = [],
    dataO = [];
  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", currentStep);
  }
function currentStep() {
    var num = +this.getAttribute("data-cell");
    if (!this.textContent) {
      this.innerText = player;
      player === "X"
        ? dataX.push(num) && this.classList.add("x") : dataO.push(num) && this.classList.add("o");
      if (
        (dataO.length > 2 || dataX.length > 2) && (calculateWinner(dataO, num) || calculateWinner(dataX, num))
      ) {
        for (var i = 0; i < cell.length; i++) {
          cell[i].removeEventListener("click", currentStep);
        }
        return (message.innerText = "Победил игрок " + player);
      }
      changePlayer();
      stepCount++;
      stepCount === 9
        ? (message.innerText = "Ничья") : (message.innerText = "Ходит игрок " + player);
    }
  }
function changePlayer() {
    player === "X" ? (player = "O") : (player = "X");
  }
  reset.addEventListener("click", function() {
    for (var i = 0; i < cell.length; i++) {
      cell[i].innerText = "";
    }
    dataO = [];
    dataX = [];
    player = "O";
    stepCount = 0;
    message.innerText = "Ходит игрок " + player;
    for (var i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", currentStep);
      cell[i].classList.remove("x", "o");
    }
  });
function calculateWinner(arr, number) {
    for (var a = 0, aComb = winningCombinations.length; a < aComb; a++) {
      var someWinArr = winningCombinations[a],
        count = 0;
      if (someWinArr.indexOf(number) !== -1) {
        for (var b = 0, bComb = someWinArr.length; b < bComb; b++) {
          if (arr.indexOf(someWinArr[b]) !== -1) {
            count++;
            if (count === 3) {
              return true;
            }
          }
        }
        count = 0;
      }
    }
  }
});