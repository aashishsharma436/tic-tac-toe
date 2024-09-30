import React, { useState } from 'react';
import './App.css';

// Create a Modal component using plain CSS
const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
};

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }

    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const winnerCheck = calculateWinner(squaresCopy);
    if (winnerCheck) {
      setMessage(`${winnerCheck} has won the game!`);
      setShowModal(true);
    } else if (squaresCopy.every(square => square !== null)) {
      // If all squares are filled and there's no winner, it's a tie
      setMessage("It's a tie!");
      setShowModal(true);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowModal(false);
    setMessage('');
  };

  let status;
  if (calculateWinner(squares)) {
    status = 'Winner: ' + calculateWinner(squares);
  } else if (squares.every(square => square !== null)) {
    status = "It's a tie!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
      <Modal isOpen={showModal} message={message} onClose={handleReset} />
    </div>
  );
};

export default Game;
