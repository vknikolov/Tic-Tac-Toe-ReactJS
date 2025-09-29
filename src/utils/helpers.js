export const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

export const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const WINNING_COMBINATIONS = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ],
];

export function deriveActivePlayer(turn) {
  let currentPlayer = "X";

  if (turn.length > 0 && turn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export function deriveWinner(gameBoard, players, winnerCombo) {
  let winner;

  for (const combos of winnerCombo) {
    const firstSquare = gameBoard[combos[0].x][combos[0].y];
    const secondSquare = gameBoard[combos[1].x][combos[1].y];
    const thirdSquare = gameBoard[combos[2].x][combos[2].y];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

export function deriveGameBoard(gameTurns, initialGameBoard) {
  let gameBoard = initialGameBoard.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { x, y } = square;
    gameBoard[x][y] = player;
  }

  return gameBoard;
}
