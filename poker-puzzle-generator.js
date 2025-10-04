// Poker Puzzle Generator (JS Version)
// Using poker-evaluator to assess hands

import { Hand } from 'poker-evaluator';

// Utility: Generate a standard deck
function createDeck() {
  const suits = ['s', 'h', 'd', 'c'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push(rank + suit);
    });
  });
  return deck;
}

// Utility: Draw n cards from the deck
function drawCards(deck, n) {
  const drawn = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * deck.length);
    drawn.push(deck.splice(idx, 1)[0]);
  }
  return drawn;
}

// Convert cards to evaluator format (e.g., "As" to "A♠")
function formatCard(card) {
  const suitMap = { s: '♠', h: '♥', d: '♦', c: '♣' };
  return card[0] + suitMap[card[1]];
}

// Evaluate hand strength
function evaluateHand(hand, board) {
  const allCards = hand.concat(board).map(c => c.toUpperCase());
  return Hand.solve(allCards);
}

// Generate a single puzzle
function generatePuzzle() {
  const deck = createDeck();
  const heroHand = drawCards(deck, 2);
  const board = drawCards(deck, 3); // flop only

  const handEval = evaluateHand(heroHand, board);
  const equity = handEval.value; // Lower is better (0 = best)

  let bestMove;
  if (equity <= 2) bestMove = 'Raise';
  else if (equity <= 5) bestMove = 'Call';
  else bestMove = 'Fold';

  return {
    board: board.map(formatCard),
    hand: heroHand.map(formatCard),
    bestMove,
    explanation: `Hand rank score: ${equity}`
  };
}

// Generate multiple puzzles
function generatePuzzles(count = 10) {
  const puzzles = [];
  for (let i = 0; i < count; i++) {
    puzzles.push(generatePuzzle());
  }
  return puzzles;
}

console.log(generatePuzzles());
