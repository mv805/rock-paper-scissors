function computerPlay() {

    switch (getRandomInt(1, 4)) {
        case 1:
            return "ROCK";
            break;
        case 2:
            return "PAPER";
            break;
        case 3:
            return "SCISSORS";
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
    } else if (playerSelection === "ROCK" && computerSelection === "SCISSORS") {
        return "You Win! Rock beats Scissors.";
    } else if (playerSelection === "PAPER" && computerSelection === "ROCK") {
        return "You Win! Paper beats Rock.";
    } else if (playerSelection === "PAPER" && computerSelection === "SCISSORS") {
        return "You Lose! Scissors beats Paper.";
    } else if (playerSelection === "SCISSORS" && computerSelection === "ROCK") {
        return "You Lose! Rock beats Scissors.";
    } else if (playerSelection === "SCISSORS" && computerSelection === "PAPER") {
        return "You Win! Scissors beats Paper.";
    } else {
        return "Invalid Game";
    }

}


function getPlayerInput() {
    let inputChoice = prompt("Make a choice of hand... (Rock, paper, or scissors)");
    return inputChoice.toUpperCase();
}

function game(gamesToPlay) {

    let playerWins = 0;
    let computerWins = 0;

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
}