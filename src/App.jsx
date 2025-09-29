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
  // Държи имената на играчите (X и O)
  const [players, setPlayers] = useState(PLAYERS);

  // История на всички изиграни ходове
  const [gameTurns, setGameTurns] = useState([]);

  // Определя кой е активният играч на база историята
  const active = deriveActivePlayer(gameTurns);

  // Генерира текущото състояние на дъската според изиграните ходове
  let gameBoard = deriveGameBoard(gameTurns, initialGameBoard);

  // Проверява дали има победител
  const winner = deriveWinner(gameBoard, players, WINNING_COMBINATIONS);

  // Проверява за равенство (ако всички полета са заети и няма победител)
  const draw = gameTurns.length === 9 && !winner;

  // Обработва избора на квадратче от играча
  function handleSelectSquare(x, y) {
    setGameTurns((prevTurn) => {
      // Определя текущия играч на база предишните ходове
      const currentPlayer = deriveActivePlayer(prevTurn);

      // Добавя новия ход най-отпред в историята
      const updatedTurns = [
        { square: { x: x, y: y }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  }

  // Рестартира играта (изчиства историята на ходовете)
  function handleRestart() {
    setGameTurns([]);
  }

  // Променя името на играч (X или O)
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
        {/* Списък с играчите и възможност за смяна на име */}
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
        {/* Показва GameOver компонент при победа или равенство */}
        {(winner || draw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        {/* Рендерира дъската за игра */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* Показва историята на ходовете */}
      <Log logData={gameTurns} />
    </main>
  );
}

export default App;
