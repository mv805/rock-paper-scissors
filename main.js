let gameOver = false;
let playerWins = 0;
let computerWins = 0;
let resultCondition;
let playerSelection;
let computerSelection;

let playerHandSelectButtons = Array.from(document.querySelectorAll('.hand-select button'));
let resultsArea = document.querySelector('#results-area');
let playerWinCounter = document.querySelector('#player-score');
let computerWinCounter = document.querySelector('#cpu-score');
let playAgainButton = document.querySelector('#play-again-button');

const resultsText = document.createElement('div');
resultsText.classList.add('results-text');
const resultsBigNote = document.createElement('div');

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
        resultCondition = 'tie';
        return "Tie. No Winner";
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        computerWins++;
        resultCondition = 'lose';
        return "Your Rock loses to their Paper";
    } else if (playerSelection === "rock" && computerSelection === "scissor") {
        playerWins++;
        resultCondition = 'win';
        return "Your Rock beats their Scissors";
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        playerWins++;
        resultCondition = 'win';
        return "Your Paper beats their Rock";
    } else if (playerSelection === "paper" && computerSelection === "scissor") {
        computerWins++;
        resultCondition = 'lose';
        return "Your Paper loses to their Scissors";
    } else if (playerSelection === "scissor" && computerSelection === "rock") {
        computerWins++;
        resultCondition = 'lose';
        return "Your scissors loses to their rock";
    } else if (playerSelection === "scissor" && computerSelection === "paper") {
        playerWins++;
        resultCondition = 'win';
        return "Your scissors beats their paper";
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
    //set the players and computer selection
    playerSelection = returnCorrectedHand(e.target.id);
    computerSelection = computerPlay();
    //run a game simulation with playerSelection
    let gameResults = playRound(playerSelection, computerSelection);
    //remove choose your weapon text
    resultsArea.textContent = ` `;
    //display game results
    resultsArea.appendChild(resultsText);
    resultsText.textContent = `${gameResults.toUpperCase()}`;
    resultsArea.appendChild(resultsBigNote);

    if (resultCondition === 'win') {
        resultsBigNote.className = '';
        resultsBigNote.classList.add('win-text');
        resultsBigNote.textContent = 'YOU WIN!';
    } else if (resultCondition === 'lose') {
        resultsBigNote.className = '';
        resultsBigNote.classList.add('lose-text');
        resultsBigNote.textContent = 'YOU LOSE!';
    } else {
        resultsBigNote.className = '';
        resultsBigNote.classList.add('tie-text');
        resultsBigNote.textContent = '---';
    }
    //update scoring
    playerWinCounter.textContent = playerWins;
    computerWinCounter.textContent = computerWins;
    //check if there is a game winner and display results if so
    if (playerWins === 3) {
        resultsArea.removeChild(resultsText);
        resultsArea.removeChild(resultsBigNote);
        resultsArea.textContent("CONGRATULATIONS! YOU WIN!");
    } else if (computerWins === 3) {
        resultsArea.removeChild(resultsText);
        resultsArea.removeChild(resultsBigNote);
        resultsArea.textContent("SORRY YOU LOSE!");
    }
    //activate play again button
    playAgainButton.classList.toggle('inactive-play-again-button');
    playAgainButton.classList.toggle('active-play-again-button');
    //remove the event listeners and turn off button graphics
    toggleButtonColors(playerHandSelectButtons);
    highlightChosenHand(playerHandSelectButtons);
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

function toggleButtonColors(buttons) {
    buttons.forEach(button => {
        button.classList.toggle('inactive-button');
        button.classList.toggle('active-button');
        button.classList.toggle(`${returnCorrectedHand(button.id)}-hand-hover`);
    });
}

function highlightChosenHand(buttons) {
    buttons.forEach(button => {
        if (returnCorrectedHand(button.id) === playerSelection) {
            button.classList.toggle('chosen-button');
            button.style.backgroundImage = `url('/images/${returnCorrectedHand(button.id)}-white.svg')`;
        }
    });
}

game();
