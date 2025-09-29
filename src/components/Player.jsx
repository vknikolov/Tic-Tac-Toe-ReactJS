import { useState } from "react";

export default function Player({ name, symbol, activePlayer, onChangeName }) {
  // Toggle between input and name
  const [isEditing, setIsEditing] = useState(false);
  // edit name value
  const [playerName, setPlayerName] = useState(name);

  function handleEdit() {
    setIsEditing((prev) => !prev);
    console.log(isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
    console.log(playerName, "on Change");
  }

  return (
    <li className={activePlayer ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            onChange={handleChange}
            value={playerName}
            name="player-name"
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
