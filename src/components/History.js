import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history">
      <h2>Color History</h2>
      <ul className="history-list">
        {history.map((color, index) => (
          <li key={index} className="history-item">
            <div className="history-color" style={{ backgroundColor: color }}></div>
            <span className="history-text">{color}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
