// ELEMENTS
const humanScore = document.querySelector(".human-score p");
const computerScore = document.querySelector(".computer-score p");
const humanTools = document.querySelectorAll(".human .tool");
const computerTools = document.querySelectorAll(".computer .tool");
const playAgain = document.querySelector(".play-again");
const winnerMessage = document.querySelector(".winner");

// SCORE AND CHOICE VARIABLES
const options = ["rock", "paper", "scissors"];
let humanScoreValue = 0;
let computerScoreValue = 0;
let humanChoice = "";
let computerChoice = "";

// EVENT LISTENERS
humanTools.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.add("yellow-background");
    humanChoice = e.target.getAttribute("name");
    computerChoice = getComputerChoice();
    computerTools.forEach((item) => {
      if (item.getAttribute("name") === computerChoice) {
        item.classList.add("yellow-background");
      }
    });

    playRound(humanChoice, computerChoice, e);
    endGame(humanScoreValue, computerScoreValue);
  });
});

// RESET GAME OR PLAY AGAIN GAME
playAgain.addEventListener("click", () => {
  humanScoreValue = 0;
  computerScoreValue = 0;
  humanScore.textContent = humanScoreValue;
  computerScore.textContent = computerScoreValue;
  humanTools.forEach((item) => {
    item.removeAttribute("disabled");
  });
  winnerMessage.classList.add("hide");
  playAgain.classList.add("hide");
});

// FUNCTIONS
function getComputerChoice() {
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(humanChoice, computerChoice, humanTargetEvent) {
  if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScoreValue++;
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScoreValue++;
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScoreValue++;
  } else if (humanChoice === computerChoice) {
  } else {
    computerScoreValue++;
  }

  humanScore.textContent = humanScoreValue;
  computerScore.textContent = computerScoreValue;

  setTimeout(() => {
    computerTools.forEach((item) => {
      if (item.getAttribute("name") === computerChoice) {
        item.classList.remove("yellow-background");
      }
    });
    humanTargetEvent.target.classList.remove("yellow-background");
  }, 2000);
}

function endGame(humanScoreValue, computerScoreValue) {
  if (humanScoreValue === 5 || computerScoreValue === 5) {
    const winner = humanScoreValue === 5 ? "Player" : "Computer";
    winnerMessage.textContent = "WINNER: " + winner;
    winnerMessage.classList.remove("hide");
    playAgain.classList.remove("hide");
    humanTools.forEach((item) => {
      item.disabled = true;
    });
  }
}
