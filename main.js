let gameOver = false;
let playerWins = 0;
let computerWins = 0;
let playerSelection;
let playerHandSelectButtons = Array.from(document.querySelectorAll('.hand-select button'));


function computerPlay() {

    switch (getRandomInt(1, 4)) {
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissor';
            break;
        default:
            return 'INVALID'
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
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        return "You Lose! Rock loses to Paper.";
    } else if (playerSelection === "rock" && computerSelection === "scissor") {
        return "You Win! Rock beats Scissors.";
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        return "You Win! Paper beats Rock.";
    } else if (playerSelection === "paper" && computerSelection === "scissor") {
        return "You Lose! Scissors beats Paper.";
    } else if (playerSelection === "scissor" && computerSelection === "rock") {
        return "You Lose! Rock beats Scissors.";
    } else if (playerSelection === "scissor" && computerSelection === "paper") {
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
    toggleButtonColors(playerHandSelectButtons);
    removeButtonListeners(playerHandSelectButtons);

}

function removeButtonListeners(buttons) {
    buttons.forEach(button => button.removeEventListener('click', runGameSimulation));
}

function returnCorrectedHand(selection) {
    switch (selection) {
        case 'scissor-hand':
            return 'scissor';
            break;
        case 'rock-hand':
            return 'rock';
            break;
        case 'paper-hand':
            return 'paper';
        break;
        default:
            return 'BAD INPUT';
            break;
    }
}

function toggleButtonColors(buttons){
    buttons.forEach(button => {
        button.classList.toggle('inactive-button');
        button.classList.toggle('active-button');
        button.classList.toggle(`${returnCorrectedHand(button.id)}-hand-hover`);
    });
}

game();
