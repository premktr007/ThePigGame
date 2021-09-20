// variable declaration
var scores, roundScores, activePlayer, dice, gamePlaying, winningPoints, playerNames;

init();

// switching between the dark and light mode
document.querySelector('.theme-switch input[type="checkbox"]').addEventListener('change', switchTheme, false);

// on game intializes
function init() {
    playerNames = [];
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;


    // hiding the dice on new game
    document.querySelector('.dice').style.display = 'none';

    // asking users to enter player names
    playerNames[0] = prompt('Enter the Player 1 name', 'Player 1');
    playerNames[1] = prompt('Enter the Player 2 name', 'Player 2');

    player1DOM = document.querySelector('#name-0');
    player2DOM = document.querySelector('#name-1');
    
    // setting default player names
    if (!playerNames[0]) {
        player1DOM.textContent = 'player 1';
    }
    if (!playerNames[1]) {
        player2DOM.textContent = 'player 2';
    }

    player1DOM.textContent = playerNames[0];
    player2DOM.textContent = playerNames[1];
}

function newGame() {
    window.location.reload();
}

function rollDice() {
    if (gamePlaying) {
        // setting the dice value
        dice = Math.floor(Math.random() * 6) + 1;
    
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        // setting the winning points and put if condition here
        winningPoints = document.querySelector('#winning_points').value;
        if (winningPoints <  10) {
            document.querySelector('#winning_points').value = 100;
        }

        currentScoreDOM = document.querySelector('#current-' + activePlayer)
        if (dice > 1){
            roundScores += dice;
            currentScoreDOM.textContent = roundScores;
        }
        else {
            togglePlayers()
        }

    }
 
}

function hold() {
    if (gamePlaying) {
        scores[activePlayer] += roundScores
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer]
        if (scores[activePlayer] >=winningPoints) {  winner() }
       
        togglePlayers()
    }
}

function togglePlayers() {
    roundScores = 0
    currentScoreDOM.textContent = roundScores
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    activePlayer = activePlayer ? 0 : 1
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('active')
}

function winner() {
        winnerDOM = document.querySelector('#name-' + activePlayer)
        winnerDOM.textContent = 'Winner!'
        winnerDOM.classList.add('winner')
        document.querySelector('.dice').style.display = 'none' 
        gamePlaying = false // game over on winning
}

function switchTheme(mode) {
    if (mode.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}