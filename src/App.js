import React, { useState } from 'react';
import './App.css';

function App() {
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(null)));
  const [clicks, setClicks] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] === 'green' || clicks.length === 9) return;

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((c, colIndex) => {
        if (rowIndex === row && colIndex === col) return 'green';
        return c;
      })
    );

    setMatrix(newMatrix);
    setClicks([...clicks, { row, col }]);

    if (row === 2 && col === 2 && clicks.length === 8) {
      setTimeout(() => {
        let newClicks = [...clicks, { row, col }];
        const interval = setInterval(() => {
          if (newClicks.length === 0) {
            clearInterval(interval);
            return;
          }

          const { row, col } = newClicks.shift();
          setMatrix(prevMatrix => prevMatrix.map((r, rowIndex) =>
            r.map((c, colIndex) => {
              if (rowIndex === row && colIndex === col) return 'orange';
              return c;
            })
          ));
        }, 500);
      }, 500);
    }
  };

  return (
    <div className="App">
      <h1>Internship Task</h1>
      <div className="matrix">
        {matrix.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="box"
              style={{ backgroundColor: col || 'white' }}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
