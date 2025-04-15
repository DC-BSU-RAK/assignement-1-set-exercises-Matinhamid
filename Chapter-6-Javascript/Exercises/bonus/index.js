// HTML element references
const rgbDisplay = document.getElementById('rgb-display');
const optionsContainer = document.getElementById('options-container');
const resultMessage = document.getElementById('result-message');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

// Game state
let correctColor = '';
let lives = 3;
let score = 0;

// Generate a random RGB color
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start or reset the game
function startGame() {
  lives = 3;
  score = 0;
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  restartButton.classList.add('hidden');
  resultMessage.textContent = '';
  generateRound();
}

// Generate a new round
function generateRound() {
  // Clear previous options
  optionsContainer.innerHTML = '';
  resultMessage.textContent = '';

  // Pick correct color
  correctColor = randomRGB();
  rgbDisplay.textContent = correctColor;

  // Set of options
  const options = new Set();
  options.add(correctColor);
  while (options.size < 3) {
    options.add(randomRGB());
  }

  // Shuffle and display options
  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  shuffled.forEach(color => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.style.backgroundColor = color;
    div.addEventListener('click', () => handleGuess(color));
    optionsContainer.appendChild(div);
  });
}

// Handle guess
function handleGuess(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    resultMessage.textContent = '✅ Correct!';
  } else {
    lives--;
    resultMessage.textContent = '❌ Incorrect!';
  }

  // Update displays
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;

  // Check game over
  if (lives <= 0) {
    resultMessage.textContent = `🎉 Game Over! Final Score: ${score}`;
    restartButton.classList.remove('hidden');
    optionsContainer.innerHTML = '';
  } else {
    setTimeout(generateRound, 800); // Wait a bit before next round
  }
}

// Restart the game
restartButton.addEventListener('click', startGame);

// Initialize on page load
startGame();
