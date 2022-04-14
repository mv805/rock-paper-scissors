let gameOver = false;
let playerWins = 0;
let computerWins = 0;
let playerSelection;
let playerHandSelectButtons = Array.from(document.querySelectorAll('.hand-select button'));


function computerPlay() {

    switch (getRandomInt(1, 4)) {
        case 1:
            return "ROCK";
            break;
        case 2:
            return "PAPER";
            break;
        case 3:
            return "SCISSOR";
            break;
        default:
            return "INVALID"
            break;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function playRound(playerSelection, computerSelection) {
    /*
        Possible Combinations:
        rock-rock 
        rock-paper 
        rock-scissors 
        paper-rock 
        paper-paper 
        paper-scissors 
        scissors-rock 
        scissors-paper
        scissors-scissors 
    */

    if (playerSelection === computerSelection) {
        return "Tie. No Winner";
    } else if (playerSelection === "ROCK" && computerSelection === "PAPER") {
        return "You Lose! Rock loses to Paper.";
    } else if (playerSelection === "ROCK" && computerSelection === "SCISSOR") {
        return "You Win! Rock beats Scissors.";
    } else if (playerSelection === "PAPER" && computerSelection === "ROCK") {
        return "You Win! Paper beats Rock.";
    } else if (playerSelection === "PAPER" && computerSelection === "SCISSOR") {
        return "You Lose! Scissors beats Paper.";
    } else if (playerSelection === "SCISSOR" && computerSelection === "ROCK") {
        return "You Lose! Rock beats Scissors.";
    } else if (playerSelection === "SCISSOR" && computerSelection === "PAPER") {
        return "You Win! Scissors beats Paper.";
    } else {
        return "Invalid Game";
    }

}

function game() {

    getPlayerSelection(playerHandSelectButtons);
    /* 
    for (let i = 1; i <= gamesToPlay; i++) {

        let playersChoice = getPlayerInput();
        let computersChoice = computerPlay();
        let currentGame = playRound(playersChoice, computersChoice);

        if (currentGame.charAt(4) === 'W') {
            playerWins++;
        } else if (currentGame.charAt(4) === 'L') {
            computerWins++;
        }

        console.log(`Players Hand: ${playersChoice}`);
        console.log(`Computers Hand: ${computersChoice}`);
        console.log(`Game ${i} result: ${currentGame}`);
        console.log(`Total Player Wins:${playerWins}`);
        console.log(`Total Computer Wins:${computerWins}`);
        console.log('---------------------------------------');
    }

    if (playerWins > computerWins) {
        console.log("FINAL RESULT: You won more games than the computer!");
    } else if (computerWins > playerWins) {
        console.log("FINAL RESULT: You lost more games than the computer!");
    } else {
        console.log("FINAL RESULT: You tied the computer!");
    }
    */
}


function getPlayerSelection(buttons) {
    buttons.forEach(button => button.addEventListener('click', runGameSimulation));
}

function runGameSimulation(e) {
    //set the players selection
    playerSelection = e.target.id;

    //run a game simulation with playerSelection
    console.log(playRound(returnCorrectedHand(playerSelection), computerPlay()));

    //display game results

    //activate play again button
    
    //remove the event listeners and turn off button graphics
    removeButtonListeners(playerHandSelectButtons);
}

function removeButtonListeners(buttons) {
    buttons.forEach(button => button.removeEventListener('click', runGameSimulation));
}

function returnCorrectedHand(selection) {
    switch (selection) {
        case 'scissor-hand':
            return 'SCISSOR';
            break;
        case 'rock-hand':
            return 'ROCK';
            break;
        case 'paper-hand':
            return 'PAPER';
        break;
        default:
            return 'BAD INPUT';
            break;
    }
}

game();
