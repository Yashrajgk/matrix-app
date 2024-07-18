import React, { useState } from 'react';
import './App.css';

function App() {
  const initialMatrix = Array(3).fill().map(() => Array(3).fill(null));
  const [matrix, setMatrix] = useState(initialMatrix);
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
  };

  const handleReset = () => {
    setMatrix(initialMatrix);
    setClicks([]);
  };

  React.useEffect(() => {
    if (clicks.length === 9) {
      const orangeMatrix = initialMatrix.map((r, rowIndex) =>
        r.map((c, colIndex) => {
          const click = clicks.find(click => click.row === rowIndex && click.col === colIndex);
          return click ? 'orange' : null;
        })
      );

      setTimeout(() => {
        setMatrix(orangeMatrix);
      }, 1000);
    }
  }, [clicks]);

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
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
