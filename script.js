// Select necessary DOM elements
const submit = document.querySelector(".guessSubmit");
const reset = document.querySelector(".resetBtn");
const UserInput = document.querySelector("#guessField");
const Preguess = document.querySelector(".Preguess");
const GuessRemain = document.querySelector(".guesses");
const LoworHi = document.querySelector('.lowOrHi');

// Initialize game variables
let prearray = []; // Stores previous guesses
let numGuess = 0; // Tracks the number of guesses
let playGame = true; // Game state flag

// Generate a random number between 1 and 10
const randomNumber = parseInt(Math.random() * 10 + 1);

// Attach event listener if the game is active
if (playGame) {
  submit.addEventListener("click", function (c) {
    c.preventDefault(); // Prevent form submission
    const input = UserInput.value; // Get user input
    ValidateInput(input); // Call validation function
  });
}

// Function to validate user input
function ValidateInput(input) {
  if (isNaN(input)) {
    alert("Please enter a Valid number"); // Non-numeric input check
  } else if (input < 1 || input > 10) {
    alert("Please enter a number between 1 and 100"); // Range check (should say 1–10)
  } else {
    if (numGuess === 9) {
      displayGuess(input); // Show last guess
      displayMessage(`Game Over! You have used all your guesses. The correct number was : ${randomNumber}`);
      endGamr(); // End game
    } else {
      displayGuess(input); // Display current guess
      checkGuess(input); // Check if guess is correct
    }
    prearray.push(input); // Add to guess history
  } 
}

// Function to check if the guess is correct
function checkGuess(input) {
  if (input == randomNumber) { // Correct guess
    displayMessage(`You Guessed it Right ${randomNumber}`);
    endGamr(); // End game
  } else if (input > randomNumber) {
    displayMessage(`Your Guess is too High`); // Guess too high
    LoworHi.style.color = "Red";
  } else if (input < randomNumber) {
    displayMessage(`Your Guess is Too Low`); // Guess too low
    LoworHi.style.color = "green";
  }
}

// Function to display each guess and remaining guesses
function displayGuess(input) {
  UserInput.value = ''; // Clear input field
  Preguess.innerHTML += `${input} `; // Show previous guesses
  GuessRemain.innerHTML = `${9 - numGuess}`; // Update remaining guesses
  numGuess++; // Increment guess count
}

// Function to show feedback messages
function displayMessage(message) {
  LoworHi.innerHTML = `${message}`; // Display hint or result
}

// Function to handle game end state
function endGamr() {
  playGame = false; // Disable further play
  prearray = []; // Clear guess history
  numGuess = 0; // Reset guess count
  UserInput.value = '';
  UserInput.disabled = true; // Disable input
  submit.style.display = "none"; // Hide submit button
  reset.style.display = "block"; // Show reset button
}

// Function to reset all values and start a new game
function newGame() {
  playGame = true; // Re-enable game
  prearray = [];
  numGuess = 0;
  Preguess.innerHTML = ''; // Clear guess history display
  UserInput.value = '';
  UserInput.disabled = false; // Re-enable input
  submit.style.display = "block"; // Show submit button
  reset.style.display = "none"; // Hide reset button
  LoworHi.innerHTML = ''; // Clear message
}

// Event listener for reset button to start a new game
reset.addEventListener("click", function () {
  newGame();
});

// Debug: Log the random number to console
console.log(randomNumber);
// Note: Remove or comment out the console.log in production
// to avoid revealing the answer to the user.
// This is for debugging purposes only.
