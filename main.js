let gameOver = false;
let playerWins = 0;
let computerWins = 0;
let resultCondition;
let playerSelection;
let computerSelection;
let gameResults;

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
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

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

    setButtonsForNewGame(playerHandSelectButtons);

}

function setButtonsForNewGame(buttons) {
    buttons.forEach(button => button.addEventListener('click', runGameSimulation));
}

function startNewGame() {
    if (!gameOver) {
        prepareNewGame();
        setButtonsForNewGame(playerHandSelectButtons);
    } else if (gameOver) {
        playerWins = 0;
        computerWins = 0;
        gameOver = false;
        playerWinCounter.textContent = playerWins;
        computerWinCounter.textContent = computerWins;
        resultsArea.style.backgroundColor = '#133B5C';
        prepareNewGame();
        setButtonsForNewGame(playerHandSelectButtons);
    }
}
function prepareNewGame() {
    console.log('started a new game');
    toggleHandButtonColors(playerHandSelectButtons, true);
    toggleHighlightChosenHand(playerHandSelectButtons, false);
    togglePlayAgainButtonColors(playAgainButton, false);
    toggleChooseWeaponText(true);
    resultCondition = undefined;
    playerSelection = undefined;
    computerSelection = undefined;
}

function runGameSimulation(e) {

    playerSelection = returnCorrectedHand(e.target.id);
    computerSelection = computerPlay();
    gameResults = playRound(playerSelection, computerSelection);
    toggleChooseWeaponText(false);
    toggleResultsText(true);

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
    playerWinCounter.textContent = playerWins;
    computerWinCounter.textContent = computerWins;
    if (playerWins === 3) {
        resultsArea.removeChild(resultsText);
        resultsArea.removeChild(resultsBigNote);
        resultsArea.textContent = "CONGRATULATIONS! YOU WIN!";
        resultsArea.style.backgroundColor = '#35853a';
        gameOver = true;
    } else if (computerWins === 3) {
        resultsArea.removeChild(resultsText);
        resultsArea.removeChild(resultsBigNote);
        resultsArea.textContent = "SORRY YOU LOSE!";
        resultsArea.style.backgroundColor = '#8a292b';
        gameOver = true;
    }
    togglePlayAgainButtonColors(playAgainButton, true);
    toggleHandButtonColors(playerHandSelectButtons, false);
    toggleHighlightChosenHand(playerHandSelectButtons, true);
    playerHandSelectButtons.forEach(button => button.removeEventListener('click', runGameSimulation));
    playAgainButton.addEventListener('click', startNewGame);

}
function togglePlayAgainButtonColors(button, status) {
    if (status === true) {
        button.classList.add('active-play-again-button');
        button.classList.remove('inactive-play-again-button');
    } else if (status === false) {
        button.classList.remove('active-play-again-button');
        button.classList.add('inactive-play-again-button');
    }
}
function toggleResultsText(status) {
    if (status === true) {
        resultsArea.appendChild(resultsText);
        resultsText.textContent = `${gameResults.toUpperCase()}`;
        resultsArea.appendChild(resultsBigNote);
    } else if (status === false) {
        resultsArea.removeChild(resultsText);
        resultsArea.removeChild(resultsBigNote);
    }
}

function toggleChooseWeaponText(status) {
    if (status === false) {
        resultsArea.textContent = '';
    } else if (status === true) {
        resultsArea.textContent = `CHOOSE YOUR WEAPON`;
    }
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

function toggleHandButtonColors(buttons, status) {
    if (status === true) {
        buttons.forEach(button => {
            button.classList.remove('inactive-button');
            button.classList.add('active-button');
            button.classList.add(`${returnCorrectedHand(button.id)}-hand-hover`);
        });
    } else if (status === false) {
        buttons.forEach(button => {
            button.classList.add('inactive-button');
            button.classList.remove('active-button');
            button.classList.remove(`${returnCorrectedHand(button.id)}-hand-hover`);
        });
    }

}

function toggleHighlightChosenHand(buttons, on) {
    buttons.forEach(button => {
        if (returnCorrectedHand(button.id) === playerSelection) {
            if (on === true) {
                button.classList.add('chosen-button');
                button.style.backgroundImage = `url('images/${returnCorrectedHand(button.id)}-white.svg')`;
            } else if (on === false) {
                button.classList.remove('chosen-button');
                button.style.backgroundImage = `url('images/${returnCorrectedHand(button.id)}-green.svg')`;
            }
        }
    });
}

game();
