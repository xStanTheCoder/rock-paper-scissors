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
  item.addEventListener("click", handleHumanChoice);
});

// RESET GAME OR PLAY AGAIN GAME
playAgain.addEventListener("click", resetGame);

// FUNCTIONS
function handleHumanChoice(e) {
  if (humanChoice !== "") return; // Prevent selecting multiple choices during the round
  const selectedTool = e.target;
  selectedTool.classList.add("yellow-background");
  humanChoice = selectedTool.getAttribute("name");
  computerChoice = getComputerChoice();
  computerTools.forEach((item) => {
    if (item.getAttribute("name") === computerChoice) {
      item.classList.add("yellow-background");
    }
  });

  playRound();
}

function getComputerChoice() {
  return options[Math.floor(Math.random() * options.length)];
}

function playRound() {
  let roundResult = 0; // 0: Draw, 1: Human Wins, -1: Computer Wins
  if (humanChoice === computerChoice) {
    roundResult = 0;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    roundResult = 1;
  } else {
    roundResult = -1;
  }

  if (roundResult === 1) {
    humanScoreValue++;
  } else if (roundResult === -1) {
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
    humanTools.forEach((item) => {
      if (item.getAttribute("name") === humanChoice) {
        item.classList.remove("yellow-background");
      }
    });

    humanChoice = ""; // Reset human choice for the next round
  }, 2000);

  endGame();
}

function endGame() {
  if (humanScoreValue === 5 || computerScoreValue === 5) {
    const winner = humanScoreValue === 5 ? "PLAYER" : "COMPUTER";
    winnerMessage.textContent = "WINNER: " + winner;
    winnerMessage.classList.remove("hide");
    playAgain.classList.remove("hide");
    humanTools.forEach((item) => {
      item.disabled = true;
    });
  }
}

function resetGame() {
  humanScoreValue = 0;
  computerScoreValue = 0;
  humanScore.textContent = humanScoreValue;
  computerScore.textContent = computerScoreValue;
  humanTools.forEach((item) => {
    item.removeAttribute("disabled");
  });
  winnerMessage.classList.add("hide");
  playAgain.classList.add("hide");
}
