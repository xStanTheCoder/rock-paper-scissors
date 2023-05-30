const options = ["rock", "paper", "scissors"];
let play = true;

while (play) {
  game();
  play = playOneMoreTime();
}

function getPlayerChoice() {
  let choice = prompt(
    "Choose your figure (rock, paper, scissors): "
  ).toLowerCase();
  while (!options.includes(choice)) {
    choice = prompt(
      "Please select the right figure (rock, paper, scissors): "
    ).toLowerCase();
  }
  return choice;
}

function getComputerChoice() {
  let choice = options[Math.floor(Math.random() * options.length)];
  return choice;
}

function playOneMoreTime() {
  let playerAnswer = prompt("Do you want to play again? Y or N ").toLowerCase();
  while (playerAnswer !== "y" && playerAnswer !== "n") {
    playerAnswer = prompt("Please enter Y or N: ").toLowerCase();
  }
  if (playerAnswer === "y") {
    return true;
  }
  return false;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection;
  if (playerSelection === "rock" && computerSelection === "scissors") {
    console.log("You won! Rock beats Scissors");
    return "user";
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    console.log("You won! Paper beats Rock");
    return "user";
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    console.log("You won! Scissors beats Paper");
  } else if (playerSelection === computerSelection) {
    console.log("Tie game!");
    return "";
  } else {
    console.log(
      `You lose! ${
        computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)
      } beats ${
        playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)
      }`
    );
    return "computer";
  }
}

function game() {
  let userWins = 0;
  let computerWins = 0;
  let total = 0;
  while (total < 5) {
    let playerSelection = getPlayerChoice();
    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);
    if (result === "user") {
      userWins++;
      total++;
    }
    if (result === "computer") {
      computerWins++;
      total++;
    }
  }

  if (userWins > computerWins) {
    console.log(`You won! With score ${userWins}-${computerWins}`);
  } else {
    console.log(`You lose! With score ${userWins}-${computerWins}`);
  }
}
