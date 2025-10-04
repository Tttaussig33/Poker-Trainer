// Integration: Load generated puzzles into UI

// This would typically be part of a module system or embedded directly in a script tag
// Below is a sample function that bridges the puzzle generator into the existing UI

// Assuming `generatePuzzles()` is imported or defined globally
const puzzles = generatePuzzles(100); // preload 100 puzzles
let puzzleIndex = 0;
let score = 0;

function updateScoreDisplay() {
  document.getElementById('puzzle-counter').textContent = `Puzzle #${puzzleIndex + 1}`;
  document.getElementById('score').textContent = `Score: ${score}`;
}

function animateEntry(element) {
  element.classList.remove('fade-enter');
  void element.offsetWidth;
  element.classList.add('fade-enter-active');
}

function loadPuzzle() {
  const currentPuzzle = puzzles[puzzleIndex % puzzles.length];
  document.getElementById('c1').textContent = currentPuzzle.board[0];
  document.getElementById('c2').textContent = currentPuzzle.board[1];
  document.getElementById('c3').textContent = currentPuzzle.board[2];
  document.getElementById('h1').textContent = currentPuzzle.hand[0];
  document.getElementById('h2').textContent = currentPuzzle.hand[1];
  document.getElementById('feedback').innerHTML = '';
  animateEntry(document.getElementById('puzzle-container'));
  updateScoreDisplay();
  return currentPuzzle;
}

document.addEventListener('DOMContentLoaded', function () {
  let currentPuzzle = loadPuzzle();

  document.querySelectorAll('.action-btns button').forEach(btn => {
    btn.addEventListener('click', () => {
      const move = btn.textContent;
      const feedback = document.getElementById('feedback');

      if (move === currentPuzzle.bestMove) {
        feedback.innerHTML = `<h4 class="text-success">Correct! ${currentPuzzle.explanation}</h4>`;
        score++;
      } else {
        feedback.innerHTML = `<h4 class="text-danger">Not optimal. ${currentPuzzle.explanation}</h4>`;
        score = 0;
      }

      updateScoreDisplay();
    });
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    puzzleIndex++;
    currentPuzzle = loadPuzzle();
  });
});
