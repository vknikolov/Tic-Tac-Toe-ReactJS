export default function GameOver({ winner, restart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>The winnes is: {winner}</p>}
      {!winner && <p>We have a Draw</p>}
      <p>
        <button onClick={restart}>Rematch!</button>
      </p>
    </div>
  );
}
