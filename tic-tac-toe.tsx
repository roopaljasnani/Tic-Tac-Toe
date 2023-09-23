import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({ playerOMarks, playerXMarks, onClick, value, winner }) {
  const disabled = playerOMarks.includes(value) || playerXMarks.includes(value) || winner !== "None";
  return (
    <div className="square" style={squareStyle} disabled={disabled} value={value} onClick={() => !disabled && onClick()}>
      {playerOMarks.includes(value) ? "O" : playerXMarks.includes(value) ? "X" : ""}
    </div>
  );
}

function Board() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [winner, setWinner] = useState("None");
  const [playerXMarks, setPlayerXMarks] = useState([]);
  const [playerOMarks, setPlayerOMarks] = useState([]);

  function handleReset() {
    setActivePlayer("X");
    setPlayerOMarks([]);
    setPlayerXMarks([]);
    setWinner("None");
  }

  function handleClick(value) {
    if (activePlayer === "X") {
      setPlayerXMarks((x) => [...x, value].sort());
      setActivePlayer("O");
    } else {
      setPlayerOMarks((o) => [...o, value].sort());
      setActivePlayer("X");
    }
  }

  useEffect(() => {
    if (winner === "None") {
      const winningPatterns = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let pattern in winningPatterns) {
        if (pattern.every((i) => playerOMarks.includes(i))) {
          setWinner("O");
          return;
        }
        if (pattern.every((i) => playerXMarks.includes(i))) {
          setWinner("X");
          return;
        }
      }
    }
  }, [activePlayer]);

  const renderSquare = (value) => <Square {...{ value, playerXMarks, playerOMarks, winner }} onClick={() => handleClick(value)} />;

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{activePlayer}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Game />);
