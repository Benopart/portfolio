import React, { useState, useEffect } from "react";

const Mastermind = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const [secretCode, setSecretCode] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(Array(6).fill(""));
  const [pastGuesses, setPastGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setSecretCode(
      Array.from(
        { length: 6 },
        () => colors[Math.floor(Math.random() * colors.length)]
      )
    );
    setCurrentGuess(Array(6).fill(""));
    setPastGuesses([]);
    setFeedback([]);
    setAttemptCount(0);
    setGameOver(false);
    setGameWon(false);
  };

  const handleDragStart = (color, e) => {
    e.dataTransfer.setData("color", color);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    const newGuess = [...currentGuess];
    newGuess[index] = color;
    setCurrentGuess(newGuess);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleGuessSubmit = () => {
    if (attemptCount >= 7) {
      setGameOver(true);
      setGameWon(JSON.stringify(currentGuess) === JSON.stringify(secretCode));
      return;
    }

    let tempSecretCode = [...secretCode];
    let newFeedback = currentGuess.map((guess, index) => {
      if (guess === secretCode[index]) {
        tempSecretCode[index] = null;
        return "green";
      }
      return null;
    });

    currentGuess.forEach((guess, index) => {
      if (newFeedback[index] === null) {
        if (tempSecretCode.includes(guess)) {
          newFeedback[index] = "yellow";
          tempSecretCode[tempSecretCode.indexOf(guess)] = null;
        } else {
          newFeedback[index] = "red";
        }
      }
    });

    setPastGuesses([...pastGuesses, currentGuess]);
    setFeedback([...feedback, newFeedback]);
    setCurrentGuess(Array(6).fill(""));
    setAttemptCount(attemptCount + 1);

    if (JSON.stringify(currentGuess) === JSON.stringify(secretCode)) {
      setGameOver(true);
      setGameWon(true);
    }
  };

  const renderColorCircle = (color, index, isDraggable = false) => {
    if (isDraggable) {
      return (
        <i
          key={index}
          className={`bi bi-palette`}
          style={{
            color: color,
            cursor: "grab",
            fontSize: "30px",
            margin: "5px",
          }}
          draggable={true}
          onDragStart={(e) => handleDragStart(color, e)}
        ></i>
      );
    } else {
      return (
        <div
          key={index}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px solid white",
            backgroundColor: color || "lightgrey",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
          }}
          onDrop={(e) => handleDrop(index, e)}
          onDragOver={(e) => handleDragOver(e)}
        ></div>
      );
    }
  };

  const renderFeedbackCircle = (color) => (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        margin: "2px",
      }}
    ></div>
  );

  return (
    <div className="gameMindBox text-light ">
      <h2 className="text-center gap-2 align-items-center">
        Mastermind <i className="bi bi-controller"></i>
      </h2>

      {gameOver ? (
        <div className="text-center result-text">
          {gameWon ? (
            <h4>Congratulations! You've guessed the secret code!</h4>
          ) : (
            <h4>Game Over! You didn't guess the code in 8 attempts.</h4>
          )}
          <button className="btn outlinebtn" onClick={resetGame}>
            Restart <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
      ) : (
        <div className="game-board">
          <h6 className="text-center">
            Guess the hidden color pattern <br />
            drag and drop colors
          </h6>
          <h6 className="text-center">
            <br /> 8 tries to win it !
          </h6>
          <h4 className="palette-icon">
            <i className="bi bi-palette"></i>
          </h4>
          <div
            className="board-row btn-palette"
            style={{ marginBottom: "20px" }}
          >
            {colors.map((color) => renderColorCircle(color, color, true))}
          </div>
          <div className="guess-row">
            {currentGuess.map((guess, index) =>
              renderColorCircle(guess, index)
            )}
          </div>
          <div className="submit-btn">
            <button className="btn outlinebtn" onClick={resetGame}>
              Restart <i className="bi bi-arrow-repeat"></i>
            </button>

            <button
              className="btn outlinebtn text-center"
              onClick={handleGuessSubmit}
            >
              Guess
              <i className="bi bi-question-lg"></i>
            </button>
          </div>
          <div className="result-row">
            {pastGuesses.map((guess, index) => (
              <div key={index}>
                <span>
                  {guess.map((color, idx) => renderColorCircle(color, idx))}
                </span>{" "}
                - <span>{feedback[index].map(renderFeedbackCircle)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mastermind;
