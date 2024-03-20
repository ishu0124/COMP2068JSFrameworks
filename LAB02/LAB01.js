// Importing the 'prompt' module for user input
const prompt = require('prompt');

// Function to get the user's choice and convert it to uppercase
function getUserSelection(callback) {
    // Asking the user to type something and converting it to uppercase
    prompt.get(['userSelection'], function (err, result) {
        callback(result.userSelection.toUpperCase());
    });
}

// Function to generate the computer's choice based on a random number
function getComputerSelection() {
    // Getting a random number between 0 and 1
    const randomNumber = Math.random();

    // Deciding the computer's choice based on the value of the random number
    if (randomNumber <= 0.34) {
        return 'PAPER';
    } else if (randomNumber <= 0.67) {
        return 'SCISSORS';
    } else {
        return 'ROCK';
    }
}

// Function to determine the winner based on user and computer choices
function determineWinner(userSelection, computerSelection) {
    // If the user's choice and computer's choice are the same, it's a tie
    if (userSelection === computerSelection) {
        return "It's a tie";
    }
    // If the user wins based on the game rules, we declare the user as the winner
    else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        return 'You Win!';
    }
    // If it's not a tie or a user win, the computer wins
    else {
        return 'Computer Wins';
    }
}

// Starting the tool to get user input
prompt.start();

// Using the functions to play the Rock, Paper, Scissors game
getUserSelection(function (userSelection) {
    // The computer makes its choice
    const computerSelection = getComputerSelection();

    // Displaying the choices made by the user and the computer
    console.log('Your Choice:', userSelection);
    console.log('Computer\'s Choice:', computerSelection);

    // Figuring out who won and displaying the result
    const result = determineWinner(userSelection, computerSelection);
    console.log('Result:', result);

    // Stopping the tool after the game is played
    prompt.stop();
});

