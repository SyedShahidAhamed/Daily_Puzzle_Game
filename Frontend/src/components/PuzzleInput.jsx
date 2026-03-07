import React, { useState, useEffect, useRef } from "react";

function PuzzleInput({ answer, onSolved, disabled, timeUp }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  // 🔹 Auto focus input when puzzle loads
  useEffect(() => {
    inputRef.current?.focus();
  }, [answer]);

  // 🔹 Show time up message
  useEffect(() => {
    if (timeUp) {
      setResult(`⏰ Time's Up! Try Again Tomorrow. Correct Answer: ${answer}`);
    }
  }, [timeUp, answer]);

  const checkAnswer = (e) => {
    e.preventDefault();

    if (disabled || timeUp) return;

    if (Number(input) === answer) {
      setResult("✅ Correct!");
      setInput("");
      onSolved();
    } else {
      setResult("❌ Try Again");
    }
  };

  return (
    <div className="puzzle-input">
      <form onSubmit={checkAnswer}>
        <input
          ref={inputRef}
          type="number"
          placeholder="Enter answer"
          value={input}
          disabled={disabled || timeUp}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" disabled={disabled || timeUp}>
          Submit
        </button>
      </form>

      {result && (
        <p style={{ marginTop: "8px", fontWeight: "bold" }}>
          {result}
        </p>
      )}
    </div>
  );
}

export default PuzzleInput;
