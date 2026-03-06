import React, { useState } from 'react';

function PuzzleInput({ answer, onSolved }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const checkAnswer = () => {
    if (Number(input) === answer) {
      setResult('✅ Correct!');
      onSolved();
    } else {
      setResult('❌ Try again');
    }
  };

  return (
    <div className="puzzle-input">
      <input
        type="number"
        placeholder="Enter answer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={checkAnswer}>Submit</button>

      <p>{result}</p>
    </div>
  );
}

export default PuzzleInput;
