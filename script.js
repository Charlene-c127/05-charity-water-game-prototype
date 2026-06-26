// Check if JavaScript is linked correctly
console.log("JavaScript file is linked correctly.");

// Get HTML elements
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const scenarioTitle = document.getElementById("scenario-title");
const feedback = document.getElementById("feedback");
const choicesContainer = document.getElementById("choices");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const progressFill = document.getElementById("progress-fill");
const celebration = document.getElementById("celebration");

// Game variables
let score = 0;
let timeLeft = 45;
let timer;
let gameActive = false;
let currentScenarioIndex = 0;

const goalScore = 30;

// Game scenarios
const scenarios = [
  {
    title: "A village water pump breaks.",
    choices: [
      {
        text: "Repair the pump with local workers",
        points: 8,
        message: "Great choice! Local repair keeps clean water flowing."
      },
      {
        text: "Wait and ignore the problem",
        points: -5,
        message: "The community loses access to safe water. You lost points."
      }
    ]
  },
  {
    title: "Children are missing school to collect water.",
    choices: [
      {
        text: "Build a closer clean water point",
        points: 7,
        message: "Good job! Students now have more time for school."
      },
      {
        text: "Make families walk farther for water",
        points: -4,
        message: "That makes daily life harder for the community."
      }
    ]
  },
  {
    title: "A water source may be contaminated.",
    choices: [
      {
        text: "Test the water before using it",
        points: 6,
        message: "Smart choice! Testing helps protect community health."
      },
      {
        text: "Use the water without checking",
        points: -6,
        message: "Dirty water can make people sick. You lost points."
      }
    ]
  },
  {
    title: "The community needs long-term support.",
    choices: [
      {
        text: "Train local leaders to maintain the water system",
        points: 9,
        message: "Excellent! Local training makes the project more sustainable."
      },
      {
        text: "Only deliver water one time",
        points: -3,
        message: "A one-time solution does not create long-term change."
      }
    ]
  },
  {
    title: "A flood damages the clean water area.",
    choices: [
      {
        text: "Repair and protect the water point",
        points: 6,
        message: "Nice work! You protected the clean water source."
      },
      {
        text: "Let dirty water mix with the clean source",
        points: -7,
        message: "Obstacle hit! Dirty water reduced your score."
      }
    ]
  }
];

// Start the game
function startGame() {
  if (gameActive) {
    return;
  }

  score = 0;
  timeLeft = 45;
  currentScenarioIndex = 0;
  gameActive = true;
  celebration.innerHTML = "";

  updateDisplay();
  showScenario();

  timer = setInterval(function () {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

// Show the current scenario
function showScenario() {
  if (!gameActive) {
    return;
  }

  const currentScenario = scenarios[currentScenarioIndex];

  scenarioTitle.textContent = currentScenario.title;
  choicesContainer.innerHTML = "";

  currentScenario.choices.forEach(function (choice) {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("choice-btn");

    button.addEventListener("click", function () {
      handleChoice(choice);
    });

    choicesContainer.appendChild(button);
  });
}

// Handle player choice
function handleChoice(choice) {
  if (!gameActive) {
    return;
  }

  score += choice.points;

  if (score < 0) {
    score = 0;
  }

  feedback.textContent = choice.message;
  updateDisplay();

  if (score >= goalScore) {
    endGame(true);
    return;
  }

  currentScenarioIndex++;

  if (currentScenarioIndex >= scenarios.length) {
    currentScenarioIndex = 0;
  }

  setTimeout(showScenario, 700);
}

// Update score, timer, and progress bar
function updateDisplay() {
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  let progressPercent = (score / goalScore) * 100;

  if (progressPercent > 100) {
    progressPercent = 100;
  }

  progressFill.style.width = progressPercent + "%";
}

// End the game
function endGame(playerWon) {
  gameActive = false;
  clearInterval(timer);
  choicesContainer.innerHTML = "";

  if (playerWon) {
    scenarioTitle.textContent = "You reached the clean water goal!";
    feedback.textContent =
      "You helped the community move closer to safe and reliable clean water.";
    showCelebration();
  } else {
    scenarioTitle.textContent = "Time is up!";
    feedback.textContent =
      "You made progress, but the community still needs more support. Try again!";
  }
}

// Simple win celebration
function showCelebration() {
  celebration.innerHTML = "💧 🎉 💛 You made an impact! 💛 🎉 💧";
}

// Reset the game
function resetGame() {
  clearInterval(timer);

  score = 0;
  timeLeft = 45;
  currentScenarioIndex = 0;
  gameActive = false;

  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  progressFill.style.width = "0%";

  scenarioTitle.textContent = "Ready to start?";
  feedback.textContent =
    "Click start and choose the best clean water solutions before time runs out.";

  choicesContainer.innerHTML = "";
  celebration.innerHTML = "";
}

// Button click events
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);