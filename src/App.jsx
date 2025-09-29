import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import {
  deriveActivePlayer,
  initialGameBoard,
  deriveWinner,
  deriveGameBoard,
  WINNING_COMBINATIONS,
  PLAYERS,
} from "./utils/helpers";

function App() {
  // Holds the names of the players (X and O)
  const [players, setPlayers] = useState(PLAYERS);

  // History of all moves made
  const [gameTurns, setGameTurns] = useState([]);

  // Determines the active player based on the history
  const active = deriveActivePlayer(gameTurns);

  // Generates the current state of the board according to the moves made
  let gameBoard = deriveGameBoard(gameTurns, initialGameBoard);

  // Checks if there is a winner
  const winner = deriveWinner(gameBoard, players, WINNING_COMBINATIONS);

  // Checks for a draw (if all fields are occupied and there is no winner)
  const draw = gameTurns.length === 9 && !winner;

  // Handles the player's selection of a square
  function handleSelectSquare(x, y) {
    setGameTurns((prevTurn) => {
      // Determines the current player based on previous moves
      const currentPlayer = deriveActivePlayer(prevTurn);

      // Adds the new move to the front of the history
      const updatedTurns = [
        { square: { x: x, y: y }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  }

  // Restarts the game (clears the move history)
  function handleRestart() {
    setGameTurns([]);
  }

  // Changes the name of a player (X or O)
  function handlePlayersCahngeName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* List of players and option to change name */}
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            activePlayer={active === "X"}
            onChangeName={handlePlayersCahngeName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            activePlayer={active === "O"}
            onChangeName={handlePlayersCahngeName}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log logData={gameTurns} />
    </main>
  );
}

export default App;
