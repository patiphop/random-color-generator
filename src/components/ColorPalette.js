import React, { useState } from 'react';

const ColorPalette = ({ palette, fontColor }) => {
  return (
    <div className="color-palette">
      {palette.map((color, index) => (
        <PaletteBox key={index} color={color} fontColor={fontColor} />
      ))}
    </div>
  );
};

const PaletteBox = ({ color, fontColor }) => {
  const [copied, setCopied] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState({});

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      // Calculate contrasting colors for tooltip
      const contrastBg = getContrastingColor(color);
      setTooltipStyles({
        backgroundColor: contrastBg,
        color: contrastBg === '#FFFFFF' ? '#000000' : '#FFFFFF'
      });
      setTimeout(() => setCopied(false), 1500);
    }).catch(err => {
      alert('Failed to copy!');
    });
  };

  return (
    <div
      className="palette-box"
      onClick={copyToClipboard}
      style={{ backgroundColor: color }}
    >
      {copied && (
        <span
          className="palette-tooltip"
          style={tooltipStyles}
        >
          Copied!
        </span>
      )}
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

export default ColorPalette;
