import React from 'react';

const ColorDisplay = ({ color }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Copied ${color} to clipboard!`);
    });
  };

  return (
    <div className="color-display">
      <span>{color}</span>
      <button onClick={copyToClipboard} className="copy-button">Copy</button>
    </div>
  );
};

export default ColorDisplay;
