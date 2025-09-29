export default function Log({ logData }) {
  return (
    <ol id="log">
      {logData.map((logs, index) => (
        <li key={`${logs.square.x}${logs.square.y}`}>
          <span>
            {logs.player} selected {logs.square.x}, {logs.square.y}
          </span>
        </li>
      ))}
    </ol>
  );
}
