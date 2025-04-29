const submit = document.querySelector(".guessSubmit");
const reset = document.querySelector(".resetBtn");
const UserInput = document.querySelector("#guessField");
const Preguess = document.querySelector(".Preguess");
const GuessRemain = document.querySelector(".guesses");
const LoworHi =document.querySelector('.lowOrHi')

let prearray = [];
let numGuess = 0;
let playGame = true;

const randomNumber = parseInt(Math.random() * 10 + 1);

if (playGame) {
  submit.addEventListener("click", function (c) {
    c.preventDefault();
    const input = UserInput.value;
    ValidateInput(input);
  });
}

function ValidateInput(input) {
  if (isNaN(input)) {
    alert("Please enter a Valid number");
  } else if (input < 1) {
    alert("Please enter a number between 1 and 100");
  } else if (input > 10) {
    alert("Please enter a number between 1 and 100");
  } else {
    if (numGuess === 9) {
      displayGuess(input);
      displayMessage(`Game Over! You have used all your guesses. The correct number was : ${randomNumber}`);
      endGamr();
    } else {
    displayGuess(input)
    checkGuess(input)
    }
    prearray.push(input);
  } 
}

function checkGuess(input) {
    if(input === randomNumber) {
        displayMessage(`You Guessed it Right ${randomNumber}`)
        endGamr()
    } else if(input >randomNumber){
        displayMessage(`Your Guess is too High`)
        LoworHi.style.color = "Red"
    } else if(input<randomNumber){
        displayMessage(`Youe Guess is To Low`)
         LoworHi.style.color = "green"
    }
}

function displayGuess(input) {
    UserInput.value = '' ;
    Preguess.innerHTML += `${input} `
    GuessRemain.innerHTML = `${9 - numGuess}`;
    numGuess++;
}

function displayMessage(message) {
    LoworHi.innerHTML = `${message}`
}

function endGamr() {
    playGame = false;
    prearray = [];
    numGuess = 0;
    UserInput.value = '';
    UserInput.disabled = true;
    submit.style.display= "none";
    reset.style.display = "block";
}

function newGame() {
    playGame = true;
    prearray = [];
    numGuess = 0;
    Preguess.innerHTML = '';
    UserInput.value = '';
    UserInput.disabled = false;
    submit.style.display= "block";
    reset.style.display = "none";
    LoworHi.innerHTML = ``;
}
 reset.addEventListener("click", function () {
    newGame()
 })
 console.log(randomNumber)
