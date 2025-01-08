import React, { useState } from 'react';

const ColorBox = ({ color, fontColor }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(err => {
      alert('Failed to copy!');
    });
  };

  return (
    <div className="color-box" onClick={copyToClipboard} style={{ color: fontColor }}>
      <p>{color}</p>
      <small>Click to copy</small>
      {copied && <span className="copy-tooltip" style={{ backgroundColor: fontColor, color: getContrastingColor(fontColor) }}>Copied!</span>}
    </div>
  );
};

// Utility function to get contrasting color for tooltip
const getContrastingColor = (hexColor) => {
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0,2),16);
  const g = parseInt(color.substr(2,2),16);
  const b = parseInt(color.substr(4,2),16);
  const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default ColorBox;
