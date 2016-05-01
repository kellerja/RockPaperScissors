var currentRound = document.getElementById("current_game");
var numberOfRounds = document.getElementById("games_amount");
var playerScore = document.getElementById("player_score");
var computerScore = document.getElementById("computer_score");
var drawsScore = document.getElementById("draws");
var pasteInfo = document.getElementById("result");
var scoreBoard = document.getElementById("scoreBoard");
var playButton = document.getElementById("playButton");
var announceVictor = document.getElementById("announceVictor");

var scissors = document.getElementById("scissors");
var paper = document.getElementById("paper");
var rock = document.getElementById("rock");
var lizard = document.getElementById("lizard");
var spock = document.getElementById("Spock");

var roundNumber = 0;
var maxRoundNumber = 0;
var playerScoreNumber = 0;
var computerScoreNumber = 0;
var drawsScoreNumber = 0;
var gameInProgress = false;

/*
console.log(currentRound + " " + numberOfRounds + " " + playerScore + " " + computerScore +
 " " + drawsScore + " " + scissors + " " + paper + " " + rock + " " + lizard  + " " + spock);
 */

function updateCurrentRound() {
	roundNumber++;
	currentRound.innerHTML = roundNumber.toString();
}

function updateMaxRounds(rounds) {
	if (gameInProgress) {
		return;
	}
	maxRoundNumber = parseInt(rounds);
	numberOfRounds.innerHTML = rounds.toString();
}

function addScoreAndRemoveStart() {
	scoreBoard.innerHTML = '<h1 class="game_data">Round <span id="current_game">0</span> of <span id="games_amount">0</span></h1><h1 class="game_data">Player: <span id="player_score">0</span> Computer: <span id="computer_score">0</span> Draws: <span id="draws">0</span></h1>'
	currentRound = document.getElementById("current_game");
	numberOfRounds = document.getElementById("games_amount");
	playerScore = document.getElementById("player_score");
	computerScore = document.getElementById("computer_score");
	drawsScore = document.getElementById("draws");
	playButton.innerHTML = "";
}

function addAnnouncement(winner) {
	data = "";
	if (winner == "Draw") {
		data = "The game was a Draw!";
	} else {
		data = winner + " is the winner!!!!";
	}
	announceVictor.innerHTML = '<h1>' + data + '</h1><h2 style="display: inline;">Play again? </h2><input type="button" onclick="addStartAndRemoveScore()" value="yes" style="display: inline;">';
}

function addStartAndRemoveScore() {
	removeAnnouncement();
	playButton.innerHTML = '<h1 style="display: inline;">How many rounds would you want to play?</h1><input type="button" onclick="updateMaxRounds(value)" value="11" style="display: inline;"><input type="button" onclick="updateMaxRounds(value)" value="21" style="display: inline;"><input type="button" onclick="startGame()" value="Start a new game">';
	scoreBoard.innerHTML = "";
}

function removeAnnouncement() {
	announceVictor.innerHTML = "";
}

function startGame() {
	if (gameInProgress || maxRoundNumber <= 0) {
		return;
	}
	addScoreAndRemoveStart();
	updateMaxRounds(maxRoundNumber);
	roundNumber = 0;
	playerScoreNumber = 0;
	computerScoreNumber = 0;
	drawsScoreNumber = 0;
	updateCurrentRound();
	updateScores();
	gameInProgress = true;
}

function gameOver(winner) {
	gameInProgress = false;
	addAnnouncement(winner);
}

function updateScores() {
	playerScore.innerHTML = playerScoreNumber.toString();
	computerScore.innerHTML = computerScoreNumber.toString();
	drawsScore.innerHTML = drawsScoreNumber.toString();
}

function getWinner(a, b) {
	if (a == b) {
		return 0;
	} else if (a % 2 == 0 && b % 2 != 0 || a % 2 != 0 && b % 2 == 0) {
		if (a > b) {
			return 1;
		} else {
			return -1;
		}
	} else {
		if (a > b) {
			return -1;
		} else {
			return 1;
		}
	}
}

function computerPick() {
	return Math.floor((Math.random() * 5) + 1);
}

function identifyPick(pick) {
	if (pick == "rock") {
		return 1;
	} else if (pick == "paper") {
		return 2;
	} else if (pick == "scissors") {
		return 3;
	} else if (pick == "Spock") {
		return 4;
	} else if (pick == "lizard") {
		return 5;
	}
}

function reverseIdentify(number) {
	if (number == 1) {
		return "rock";
	} else if (number == 2) {
		return "paper";
	} else if (number == 3) {
		return "scissors";
	} else if (number == 4) {
		return "Spock";
	} else if (number == 5) {
		return "lizard";
	}
}

function fightMessage(win, lose) {
	if (win == 1) {
		if (lose == 3) {
			return "crushes";
		} else if (lose == 5) {
			return "crushes";
		}
	} else if (win == 2) {
		if (lose == 1) {
			return "covers";
		} else if (lose == 4) {
			return "disproves";
		}
	} else if (win == 3) {
		if (lose == 2) {
			return "cuts";
		} else if (lose == 5) {
			return "decapitates";
		}
	} else if (win == 4) {
		if (lose == 1) {
			return "vaporizes";
		} else if (lose == 3) {
			return "smashes";
		}
	} else if (win == 5) {
		if (lose == 2) {
			return "eats";
		} else if (lose == 4) {
			return "poisons";
		}
	}
}

function playerPick(pick) {
	return identifyPick(pick);
}

function getWinnerString() {
	if (playerScoreNumber == computerScoreNumber) {
		return "Draw";
	} else if (playerScoreNumber > computerScoreNumber) {
		return "Player";
	} else if (playerScoreNumber < computerScoreNumber) {
		return "Computer";
	}
}

function playRound(el) {
	if (!gameInProgress) {
		return;
	}
	var player = playerPick(el);
	var computer = computerPick();
	var result = getWinner(player, computer);
	console.log(player + " " + computer + " " + result);
	if (result == 0) {
		drawsScoreNumber++;
	} else if (result > 0) {
		playerScoreNumber++;
	} else if (result < 0) {
		computerScoreNumber++;
	}
	updateScores();
	if (roundNumber == maxRoundNumber) {
		gameOver(getWinnerString());
	}
	if (roundNumber < maxRoundNumber) {
	updateCurrentRound();
	} else {
		roundNumber++;
	}
	shoutWinner(player, computer, result);
}

function getDrawMessage() {
	return "Player and Computer though alike and a draw was the result";
}

function shoutWinner(p, c, r) {
	var data = "";
	if (r == 0) {
		data = getDrawMessage();
	} else if (r > 0) {
		data = "Player's " + reverseIdentify(p) + " " + fightMessage(p, c) + " Computer's " + reverseIdentify(c);
	} else if (r < 0) {
		data = "Computer's " + reverseIdentify(c) + " " + fightMessage(c, p) + " Player's " + reverseIdentify(p);
	}
	pasteInfo.innerHTML = data;
}

function announceWinner() {}